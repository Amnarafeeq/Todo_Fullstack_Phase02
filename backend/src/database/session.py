import os
from dotenv import load_dotenv
from sqlmodel import SQLModel, create_engine, Session
from typing import Generator

load_dotenv()

DATABASE_URL = os.environ.get("DATABASE_URL")

# pool_pre_ping=True helps handle stale connections (common with serverless like Neon)
engine = create_engine(DATABASE_URL, pool_pre_ping=True)

def init_db():
    from ..models.models import User, Task  # Ensure models are registered
    SQLModel.metadata.create_all(engine)

def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session
