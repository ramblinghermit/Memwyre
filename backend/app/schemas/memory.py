from pydantic import BaseModel, model_validator
from typing import Optional, List, Any
from datetime import datetime


class MemoryBase(BaseModel):
    title: Optional[str] = None
    content: str
    tags: Optional[List[str]] = None
    project_id: Optional[int] = None
    interaction_type: Optional[str] = "conversation"
    source_app: Optional[str] = None

    @model_validator(mode="before")
    @classmethod
    def set_default_title(cls, data: Any) -> Any:
        if isinstance(data, dict):
            if not data.get("title") and data.get("content"):
                lines = [line.strip() for line in str(data["content"]).splitlines() if line.strip()]
                first_line = lines[0] if lines else "Untitled Memory"
                data["title"] = first_line[:80].lstrip("#").strip() or "Untitled Memory"
        return data


class MemoryCreate(MemoryBase):
    created_at: Optional[datetime] = None


class MemoryUpdate(MemoryBase):
    pass


from typing import Union


class MemoryInDBBase(MemoryBase):
    id: Union[int, str]
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    doc_type: str = "memory"
    type: str = "memory"
    status: str = "approved"
    task_type: Optional[str] = None
    source: Optional[str] = "manually_created"
    project_name: Optional[str] = None

    class Config:
        from_attributes = True


class Memory(MemoryInDBBase):
    pass
