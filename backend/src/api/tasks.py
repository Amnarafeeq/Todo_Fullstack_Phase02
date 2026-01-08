"""
Task CRUD REST API endpoints.

Implements all task management operations with JWT authentication
and per-user data isolation.
"""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlmodel import Session, select, or_, desc, asc
from typing import List, Optional
from datetime import datetime

from db import get_session
from models.models import (
    Task, TaskCreate, TaskPublic, TaskUpdate,
    PriorityEnum, TaskStatusEnum
)
from middleware.auth import AuthenticatedUser, get_current_user

router = APIRouter(prefix="/api/{user_id}/tasks", tags=["Tasks"])


def verify_user_access(user_id: str, current_user: AuthenticatedUser) -> None:
    """
    Verify that the user_id in the path matches the authenticated user.

    Args:
        user_id: User ID from URL path
        current_user: Authenticated user from JWT token

    Raises:
        HTTPException (403): If user_id doesn't match
    """
    if str(user_id) != current_user.user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have access to this resource"
        )


@router.get("", response_model=List[TaskPublic])
async def list_tasks(
    user_id: str,
    status: TaskStatusEnum = TaskStatusEnum.all,
    priority: PriorityEnum = Query(None, description="Filter by priority"),
    category: Optional[str] = Query(None, description="Filter by category"),
    search: Optional[str] = Query(None, description="Search in title and description"),
    sort_by: str = Query("createdAt", description="Sort by field: createdAt, priority, title"),
    sort_order: str = Query("desc", description="Sort order: asc, desc"),
    current_user: AuthenticatedUser = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    List all tasks for the authenticated user with optional filters and sorting.

    Supports filtering by status, priority, category, and free-text search.
    Supports sorting by creation date, priority, or title.
    """
    verify_user_access(user_id, current_user)

    statement = select(Task).where(Task.user_id == int(user_id))

    # Filter by completion status
    if status == TaskStatusEnum.completed:
        statement = statement.where(Task.completed == True)
    elif status == TaskStatusEnum.pending:
        statement = statement.where(Task.completed == False)

    # Filter by priority (only if not 'all')
    if priority:
        statement = statement.where(Task.priority == priority)

    # Filter by category
    if category:
        statement = statement.where(Task.category == category)

    # Free-text search in title and description
    if search:
        search_filter = or_(
            Task.title.ilike(f"%{search}%"),
            Task.description.ilike(f"%{search}%")
        )
        statement = statement.where(search_filter)

    # Apply sorting
    order_func = desc if sort_order == "desc" else asc

    if sort_by == "priority":
        # Custom priority ordering: high > medium > low
        priority_order = {"high": 1, "medium": 2, "low": 3}
        # For now, use alphabetical ordering (can be enhanced with CASE expression)
        statement = statement.order_by(order_func(Task.priority))
    elif sort_by == "title":
        statement = statement.order_by(order_func(Task.title))
    elif sort_by == "createdAt":
        statement = statement.order_by(order_func(Task.created_at))
    else:
        statement = statement.order_by(order_func(Task.created_at))

    tasks = session.exec(statement).all()
    return tasks


@router.post("", response_model=TaskPublic, status_code=status.HTTP_201_CREATED)
async def create_task(
    user_id: str,
    task_in: TaskCreate,
    current_user: AuthenticatedUser = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Create a new task for the authenticated user.

    The task is automatically assigned to the authenticated user.
    """
    verify_user_access(user_id, current_user)

    # Convert to dict based on the Pydantic version
    task_data = task_in.dict() if hasattr(task_in, 'dict') else task_in.model_dump()
    db_task = Task(**task_data, user_id=int(user_id))
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task


@router.get("/{task_id}", response_model=TaskPublic)
async def get_task(
    user_id: str,
    task_id: int,
    current_user: AuthenticatedUser = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Get details of a specific task by ID.

    Ensures the task belongs to the authenticated user.
    """
    verify_user_access(user_id, current_user)

    task = session.get(Task, task_id)

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Verify task ownership
    if task.user_id != int(user_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return task


@router.put("/{task_id}", response_model=TaskPublic)
async def update_task(
    user_id: str,
    task_id: int,
    task_in: TaskUpdate,
    current_user: AuthenticatedUser = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Update an existing task.

    Only updates fields that are provided in the request.
    Automatically updates the updated_at timestamp.
    """
    verify_user_access(user_id, current_user)

    db_task = session.get(Task, task_id)

    if not db_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Verify task ownership
    if db_task.user_id != int(user_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Update only provided fields - compatible with different Pydantic versions
    update_data = task_in.dict(exclude_unset=True) if hasattr(task_in, 'dict') else task_in.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_task, key, value)

    db_task.updated_at = datetime.utcnow()
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    user_id: str,
    task_id: int,
    current_user: AuthenticatedUser = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Delete a task by ID.

    Ensures the task belongs to the authenticated user.
    """
    verify_user_access(user_id, current_user)

    db_task = session.get(Task, task_id)

    if not db_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Verify task ownership
    if db_task.user_id != int(user_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    session.delete(db_task)
    session.commit()
    return None


@router.patch("/{task_id}/complete")
async def toggle_completion(
    user_id: str,
    task_id: int,
    current_user: AuthenticatedUser = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Toggle the completion status of a task.

    If task is incomplete, marks it as complete.
    If task is complete, marks it as incomplete.
    """
    verify_user_access(user_id, current_user)

    db_task = session.get(Task, task_id)

    if not db_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Verify task ownership
    if db_task.user_id != int(user_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Toggle completion status
    db_task.completed = not db_task.completed
    db_task.updated_at = datetime.utcnow()
    session.add(db_task)
    session.commit()
    session.refresh(db_task)

    return {
        "id": db_task.id,
        "completed": db_task.completed,
        "updated_at": db_task.updated_at
    }
