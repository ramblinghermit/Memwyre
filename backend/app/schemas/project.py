from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, field_validator


class ProjectStats(BaseModel):
    memories_count: int = 0
    documents_count: int = 0


class ProjectBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    color: Optional[str] = Field("#D97757", max_length=50)
    icon: Optional[str] = Field("folder", max_length=50)

    @field_validator("name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        cleaned = v.strip()
        if not cleaned:
            raise ValueError("Workspace name cannot be empty")
        return cleaned


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    name: Optional[str] = Field(None, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    color: Optional[str] = Field(None, max_length=50)
    icon: Optional[str] = Field(None, max_length=50)
    archived: Optional[bool] = None

    @field_validator("name")
    @classmethod
    def validate_name_optional(cls, v: Optional[str]) -> Optional[str]:
        if v is not None:
            cleaned = v.strip()
            if not cleaned:
                raise ValueError("Workspace name cannot be empty")
            return cleaned
        return v


class ProjectOut(ProjectBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    archived_at: Optional[datetime] = None
    stats: Optional[ProjectStats] = None

    class Config:
        from_attributes = True

