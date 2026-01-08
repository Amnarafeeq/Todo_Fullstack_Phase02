from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from api.auth import router as auth_router
from api.tasks import router as tasks_router
from db import check_connection, ensure_db_ready

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database tables on startup
    try:
        ensure_db_ready()
        print("Database tables initialized")

        if check_connection():
            print("Database connection successful")
        else:
            print("Warning: Database not reachable")
    except Exception as e:
        print("DB startup error:", e)

    yield

app = FastAPI(
    title="Todo App API",
    description="Backend for Todo App Phase II with JWT and SQLModel",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",  # In case of same-origin requests
        "http://127.0.0.1:8000",
        "http://localhost:3001",  # Common alternative port
        "http://127.0.0.1:3001",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allow_headers=["*"],
    # Expose the Authorization header to the browser
    expose_headers=["Access-Control-Allow-Origin", "Authorization"]
)

app.include_router(auth_router)
app.include_router(tasks_router)

@app.get("/")
async def root():
    return {"message": "Todo App API is running", "docs": "/docs"}
