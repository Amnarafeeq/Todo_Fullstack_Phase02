"""
Neon PostgreSQL Database Connection Setup

This module configures the SQLModel database engine with Neon-specific
connection pooling and provides a reusable session dependency for FastAPI.
"""

import os
from typing import Generator
from dotenv import load_dotenv
from sqlmodel import SQLModel, create_engine, Session
from sqlalchemy import text

# Load environment variables
load_dotenv()

# Get database URL from environment
DATABASE_URL = os.environ.get("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError(
        "DATABASE_URL environment variable is not set. "
        "Please configure your .env file with: DATABASE_URL=postgresql://..."
    )

# Create SQLModel engine with Neon-compatible settings
# Neon is a serverless PostgreSQL, so we need specific pool settings
if DATABASE_URL.startswith("sqlite"):
    # SQLite settings for local development
    engine = create_engine(
        DATABASE_URL,
        echo=False,                      # Set to True in development to see SQL queries
    )
else:
    # PostgreSQL settings for production/Neon
    engine = create_engine(
        DATABASE_URL,
        # Connection pool settings for serverless/Neon
        pool_pre_ping=True,              # Validate connections before use
        pool_recycle=300,                # Recycle connections after 5 minutes
        pool_size=5,                     # Small pool for serverless
        max_overflow=10,                 # Allow up to 10 extra connections
        echo=False,                      # Set to True in development to see SQL queries
        connect_args={
            # SSL is required for Neon in production
            "sslmode": "require",
        } if "neon.tech" in DATABASE_URL else {}
    )


def init_db() -> None:
    """
    Initialize database tables by creating all registered SQLModel tables.

    This should be called on application startup to ensure all tables exist.
    The models must be imported before calling this function.
    """
    # Import all models to register them with SQLModel metadata
    from models.models import User, Task

    # Create all tables if they don't exist
    SQLModel.metadata.create_all(engine)


def get_session() -> Generator[Session, None, None]:
    """
    FastAPI dependency that provides a database session.

    This function yields a SQLAlchemy session and ensures it's properly
    closed after the request completes.

    Usage:
        @app.get("/api/tasks")
        async def list_tasks(session: Session = Depends(get_session)):
            tasks = session.exec(select(Task)).all()
            return tasks

    Yields:
        Session: A SQLAlchemy session for database operations
    """
    with Session(engine) as session:
        yield session


def ensure_db_ready() -> None:
    """Ensure database is ready by creating tables if missing."""
    try:
        init_db()
    except Exception:
        pass


def check_connection() -> bool:
    """
    Test the database connection.

    Returns:
        bool: True if connection is successful, False otherwise

    This is useful for health checks and startup validation.
    """
    try:
        with Session(engine) as session:
            session.exec(text("SELECT 1"))
            return True
    except Exception:
        return False
