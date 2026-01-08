# Backend Development Guide

## Tech Stack
- **Framework**: FastAPI
- **Language**: Python 3.13+
- **ORM**: SQLModel
- **Database**: Neon Serverless PostgreSQL
- **Authentication**: Better Auth (JWT validation)
- **Validation**: Pydantic
- **Package Manager**: UV

## Project Structure

```
backend/
├── src/
│   ├── main.py                 # FastAPI application entry point
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py             # User model
│   │   ├── task.py             # Task model
│   │   └── schemas.py          # Pydantic schemas
│   ├── api/
│   │   ├── __init__.py
│   │   ├── auth.py             # Authentication endpoints
│   │   └── tasks.py            # Task CRUD endpoints
│   ├── services/
│   │   ├── __init__.py
│   │   ├── auth_service.py     # Auth business logic
│   │   └── task_service.py     # Task business logic
│   ├── middleware/
│   │   ├── __init__.py
│   │   └── auth.py             # JWT validation middleware
│   └── database/
│       ├── __init__.py
│       ├── connection.py       # Database connection
│       └── session.py          # DB session management
├── tests/
│   ├── test_auth.py
│   └── test_tasks.py
├── .env                        # Environment variables (gitignored)
└── pyproject.toml              # Project configuration
```

## Core Patterns

### Database Setup

Use `/src/database/connection.py` for engine and session management.

### Models

Use SQLModel for database tables with proper field types and relationships.

### Schemas

Use Pydantic models in `/src/models/schemas.py` for request/response validation.

### JWT Authentication

Use `/src/middleware/auth.py` for JWT validation middleware.

### Task Endpoints

All task endpoints require JWT authentication and user ID validation.

### Authentication Endpoints

Use `/src/api/auth.py` for user registration and login.

## Main Application

`/src/main.py` is the FastAPI application entry point.

## Environment Variables

Create `.env` file:

```env
DATABASE_URL=postgresql://todo_user:todo_password@localhost:5432/todo_db
BETTER_AUTH_SECRET=your-super-secret-key
```

## Dependencies

See `pyproject.toml` for all required packages.

## Error Handling

Use HTTPException with appropriate status codes:
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Testing

Use pytest for testing. See test examples in `/tests/`.

## Running the Application

```bash
cd backend
uv sync
uv run uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

## API Documentation

FastAPI automatically generates docs:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Best Practices

1. Type Hints: Use type hints everywhere
2. Validation: Use Pydantic models for validation
3. Error Handling: Handle exceptions gracefully
4. Security: Always validate user permissions
5. Database: Use context managers for sessions
6. Testing: Write tests for all endpoints
7. Documentation: Keep docstrings clear
8. Secrets: Never commit to version control

## Important Notes

1. Always read specs before implementing
2. Use Pydantic models for request/response validation
3. Validate user permissions on every protected endpoint
4. Use context managers for database sessions
5. Return appropriate status codes
6. Write tests for critical functionality
7. Never commit secrets
8. Use type hints throughout
