from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional, Any
from pydantic import BaseModel
from app.api.deps import get_db, get_current_user
from app.models.user import User
from app.models.memory import Memory
from app.worker_router import process_plugin_transcript_task
import json

router = APIRouter()

class TranscriptCaptureRequest(BaseModel):
    session_id: str
    project_name: str
    cwd: str
    transcript: List[Any]

@router.get("/context")
async def get_plugin_context(
    project: str,
    query: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Fetch memories relevant to the project for SessionStart hooks using the RAG & retrieval pipeline with cross-encoding re-ranking.
    """
    from app.core.config import settings
    from app.api import deps

    # 1. Resolve project_id strictly by workspace_name (auto-creates container if new)
    project_id = await deps.resolve_project_id(db, current_user.id, workspace_name=project)

    # 2. Select Retrieval Engine
    if settings.MEMORY_ENGINE_VERSION == "v2":
        from app.services.retrieval_service_v2 import retrieval_service
    else:
        from app.services.retrieval_service import retrieval_service

    # 3. Formulate Search Query
    search_query = query or f"Context, state, user preferences, and key decisions for project {project}"

    memories_out = []
    try:
        results = await retrieval_service.search_memories(
            query=search_query,
            user_id=current_user.id,
            db=db,
            top_k=10,
            view="auto",
            project_id=project_id
        )

        for res in results:
            text = res.get("text") or res.get("content")
            if text:
                res_id = res.get("id") or (res.get("metadata", {}).get("memory_id") if isinstance(res.get("metadata"), dict) else None)
                memories_out.append({
                    "id": res_id or 0,
                    "content": text,
                    "score": res.get("score", 1.0)
                })
    except Exception as e:
        print(f"Plugin Context RAG Retrieval Engine warning: {e}")

    # Fallback to direct SQL if vector RAG search returns empty (e.g. initial setup before vector indexing)
    if not memories_out and project_id:
        stmt = select(Memory).where(
            Memory.user_id == current_user.id,
            Memory.project_id == project_id
        ).order_by(Memory.created_at.desc()).limit(10)
        
        result = await db.execute(stmt)
        sql_memories = result.scalars().all()
        memories_out = [
            {"id": m.id, "content": m.content, "created_at": m.created_at.isoformat()}
            for m in sql_memories
        ]

    return {"project": project, "memories": memories_out}

@router.post("/capture", status_code=202)
async def capture_plugin_session(
    request: TranscriptCaptureRequest,
    current_user: User = Depends(get_current_user)
):
    """
    Receive raw transcript from Claude Code plugin Stop hook.
    Returns 202 Accepted immediately and enqueues background processing.
    """
    
    # Enqueue Celery task for signal extraction
    process_plugin_transcript_task.delay(
        session_id=request.session_id,
        project_name=request.project_name,
        cwd=request.cwd,
        transcript=request.transcript,
        user_id=current_user.id
    )
    
    return {"message": "Transcript accepted for processing", "session_id": request.session_id}
