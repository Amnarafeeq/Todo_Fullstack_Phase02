# Backend Implementation Plan - Phase II

## Overview
This plan outlines the steps to implement the FastAPI backend for the Todo App Phase II, featuring JWT authentication and PostgreSQL storage via SQLModel and Neon.

## Phase 1: Environment & Project Setup
1.  **Initialize Project**: Create `backend/` directory and set up `pyproject.toml` (using `uv`).
2.  **Install Dependencies**:
    - `fastapi`, `uvicorn`: Framework and server.
    - `sqlmodel`, `psycopg2-binary`: ORM and Postgres driver.
    - `python-jose[cryptography]`, `passlib[bcrypt]`: JWT and hashing.
    - `python-dotenv`: Environment variables.
3.  **Environment Configuration**: Create `.env` file with `DATABASE_URL`, `JWT_SECRET_KEY`, and `ALGORITHM`.

## Phase 2: Database Layer (SQLModel)
1.  **Define Models**: Implement `User` and `Task` table models in `backend/src/models/`.
2.  **Define Schemas**: Implement Pydantic-based schemas for Create/Update/Public representations.
3.  **Database Connection**: Setup `backend/src/database/session.py` with the engine and session generator.
4.  **Initialization**: Script to create tables on start (or manual run for serverless compatibility).

## Phase 3: Authentication & Security Logic
1.  **Hashing Utilities**: Implement `src/auth/hashing.py` for password verification.
2.  **JWT Handling**: Implement `src/auth/jwt_utils.py` for token generation and decoding.
3.  **Auth Dependencies**: Implement `src/auth/dependencies.py` with `get_current_user`.

## Phase 4: REST API Endpoints
1.  **Auth Endpoints**:
    - `POST /api/auth/register`
    - `POST /api/auth/login`
2.  **Task CRUD Endpoints**:
    - `GET /api/{user_id}/tasks` (with filtering/sorting logic)
    - `POST /api/{user_id}/tasks`
    - `GET /api/{user_id}/tasks/{task_id}`
    - `PUT /api/{user_id}/tasks/{task_id}`
    - `DELETE /api/{user_id}/tasks/{task_id}`
    - `PATCH /api/{user_id}/tasks/{task_id}/complete`
3.  **Verification**: Ensure all endpoints apply the ID Match principle (`user_id == current_user.id`).

## Phase 5: Integration & CORS
1.  **Setup CORS**: Configure `main.py` to allow requests from the frontend domain.
2.  **Main Application**: Assemble all routers in `backend/src/main.py`.

## Acceptance Criteria
- [ ] Registered users can log in and receive a valid JWT.
- [ ] Users can only access their own tasks via the `/api/{user_id}/...` endpoints.
- [ ] Task filtering (status, priority, search) works correctly in the backend.
- [ ] Code follows the single-responsibility principle and remains testable.

## Risks & Mitigations
- **JWT Secret Leak**: Mitigate by using strict environment variable management and avoiding hardcoding.
- **Neon Cold Starts**: Mitigate by using `pool_pre_ping` in SQLModel engine configuration.
- **Data Leakage**: Mitigate by enforcing ownership checks in every database query.
