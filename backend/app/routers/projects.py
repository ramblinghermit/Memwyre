from datetime import datetime, timezone
from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select, func, update, delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.api import deps
from app.models.project import Project
from app.models.user import User
from app.models.memory import Memory
from app.models.document import Document
from app.models.chat import ChatSession
from app.models.fact import Fact
from app.schemas.project import ProjectCreate, ProjectOut, ProjectUpdate, ProjectStats

router = APIRouter()


async def get_project_stats(db: AsyncSession, project_id: int) -> ProjectStats:
    memories_count = await db.scalar(select(func.count(Memory.id)).where(Memory.project_id == project_id))
    documents_count = await db.scalar(select(func.count(Document.id)).where(Document.project_id == project_id))
    chats_count = await db.scalar(select(func.count(ChatSession.id)).where(ChatSession.project_id == project_id))
    return ProjectStats(
        memories_count=memories_count or 0,
        documents_count=documents_count or 0,
        chats_count=chats_count or 0
    )


@router.get("/", response_model=List[ProjectOut])
async def list_projects(
    include_archived: bool = False,
    include_stats: bool = True,
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    q = select(Project).where(Project.user_id == current_user.id)
    if not include_archived:
        q = q.where(Project.archived_at.is_(None))
    q = q.order_by(Project.created_at.desc())
    result = await db.execute(q)
    projects = list(result.scalars().all())

    # We can inject stats manually into the schema since from_attributes=True
    if include_stats:
        for p in projects:
            p.stats = await get_project_stats(db, p.id)
    else:
        for p in projects:
            p.stats = None

    return projects


@router.get("/{project_id}", response_model=ProjectOut)
async def get_project(
    project_id: int,
    include_stats: bool = True,
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    result = await db.execute(
        select(Project).where(Project.id == project_id, Project.user_id == current_user.id)
    )
    project = result.scalars().first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    if include_stats:
        project.stats = await get_project_stats(db, project.id)

    return project


@router.post("/", response_model=ProjectOut)
async def create_project(
    payload: ProjectCreate,
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    name_clean = payload.name.strip()
    
    # Check for duplicates (case-insensitive)
    existing_q = select(Project).where(
        Project.user_id == current_user.id,
        func.lower(Project.name) == name_clean.lower(),
        Project.archived_at.is_(None)
    )
    existing = (await db.execute(existing_q)).scalars().first()
    if existing:
        raise HTTPException(status_code=409, detail=f"Active workspace with name '{name_clean}' already exists.")

    project = Project(
        user_id=current_user.id,
        name=name_clean,
        description=payload.description,
        color=payload.color,
        icon=payload.icon,
    )
    db.add(project)
    await db.commit()
    await db.refresh(project)
    
    project.stats = ProjectStats()
    return project


@router.put("/{project_id}", response_model=ProjectOut)
async def update_project(
    project_id: int,
    payload: ProjectUpdate,
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    result = await db.execute(
        select(Project).where(Project.id == project_id, Project.user_id == current_user.id)
    )
    project = result.scalars().first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    if payload.name is not None:
        name_clean = payload.name.strip()
        if project.name.lower() == "default" and name_clean.lower() != "default":
            raise HTTPException(status_code=400, detail="Cannot rename the 'default' workspace.")
        
        if name_clean.lower() != project.name.lower():
            existing_q = select(Project).where(
                Project.user_id == current_user.id,
                func.lower(Project.name) == name_clean.lower(),
                Project.archived_at.is_(None)
            )
            existing = (await db.execute(existing_q)).scalars().first()
            if existing:
                raise HTTPException(status_code=409, detail=f"Active workspace with name '{name_clean}' already exists.")
        
        project.name = name_clean

    if payload.description is not None:
        project.description = payload.description
    if payload.color is not None:
        project.color = payload.color
    if payload.icon is not None:
        project.icon = payload.icon
        
    if payload.archived is True:
        if project.name.lower() == "default":
            raise HTTPException(status_code=400, detail="Cannot archive the 'default' workspace.")
        project.archived_at = datetime.now(timezone.utc)
    elif payload.archived is False:
        project.archived_at = None

    await db.commit()
    await db.refresh(project)
    project.stats = await get_project_stats(db, project.id)
    return project


@router.post("/{project_id}/restore", response_model=ProjectOut)
async def restore_project(
    project_id: int,
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    result = await db.execute(
        select(Project).where(Project.id == project_id, Project.user_id == current_user.id)
    )
    project = result.scalars().first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    project.archived_at = None
    await db.commit()
    await db.refresh(project)
    project.stats = await get_project_stats(db, project.id)
    return project


@router.delete("/{project_id}")
async def archive_or_delete_project(
    project_id: int,
    permanent: bool = Query(False, description="Permanently delete instead of archiving"),
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    result = await db.execute(
        select(Project).where(Project.id == project_id, Project.user_id == current_user.id)
    )
    project = result.scalars().first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    if project.name.lower() == "default":
        raise HTTPException(status_code=400, detail="Cannot delete or archive the 'default' workspace.")

    if not permanent:
        project.archived_at = datetime.now(timezone.utc)
        await db.commit()
        return {"status": "archived", "project_id": project_id}
    else:
        # Reassign items to default project
        default_project_id = await deps.resolve_project_id(db, current_user.id, None, "default")
        
        await db.execute(update(Memory).where(Memory.project_id == project_id).values(project_id=default_project_id))
        await db.execute(update(Document).where(Document.project_id == project_id).values(project_id=default_project_id))
        await db.execute(update(ChatSession).where(ChatSession.project_id == project_id).values(project_id=default_project_id))
        await db.execute(update(Fact).where(Fact.project_id == project_id).values(project_id=default_project_id))
        
        await db.execute(delete(Project).where(Project.id == project_id))
        await db.commit()
        
        return {"status": "deleted", "project_id": project_id, "reassigned_to": default_project_id}
