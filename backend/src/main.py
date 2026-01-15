from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os

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
    lifespan=lifespan,
    # Production settings
    docs_url="/docs" if os.getenv("ENVIRONMENT") != "production" else None,
    redoc_url="/redoc" if os.getenv("ENVIRONMENT") != "production" else None,
)

# Configure CORS based on environment
allowed_origins = os.getenv("ALLOWED_ORIGINS", "").split(",")
if not allowed_origins or allowed_origins == [""]:
    allowed_origins = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",  # In case of same-origin requests
        "http://127.0.0.1:8000",
        "http://localhost:3001",  # Common alternative port
        "http://127.0.0.1:3001",
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
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

@app.get("/health")
async def health_check():
    """Health check endpoint for production monitoring"""
    db_status = check_connection()
    return {
        "status": "healthy" if db_status else "degraded",
        "database": "connected" if db_status else "disconnected",
        "environment": os.getenv("ENVIRONMENT", "development")
    }

@app.get("/ready")
async def readiness_check():
    """Readiness check endpoint"""
    db_status = check_connection()
    if not db_status:
        from fastapi import HTTPException
        raise HTTPException(status_code=503, detail="Database not ready")
    return {"status": "ready"}
