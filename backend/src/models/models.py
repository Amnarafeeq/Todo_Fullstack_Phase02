from datetime import datetime
from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship
from enum import Enum

class PriorityEnum(str, Enum):
    high = "high"
    medium = "medium"
    low = "low"

class TaskStatusEnum(str, Enum):
    all = "all"
    pending = "pending"
    completed = "completed"

class UserBase(SQLModel):
    email: str = Field(index=True, unique=True)
    name: str

class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

    tasks: List["Task"] = Relationship(back_populates="user")

class UserCreate(UserBase):
    password: str

class UserLogin(SQLModel):
    email: str
    password: str

class UserPublic(UserBase):
    id: int
    created_at: datetime

class TaskBase(SQLModel):
    title: str
    description: Optional[str] = None
    priority: PriorityEnum = Field(default=PriorityEnum.medium)
    category: Optional[str] = None
    completed: bool = Field(default=False)

class Task(TaskBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id", index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    user: Optional[User] = Relationship(back_populates="tasks")

class TaskCreate(TaskBase):
    pass

class TaskUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[PriorityEnum] = None
    category: Optional[str] = None
    completed: Optional[bool] = None

class TaskPublic(TaskBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime
