# Backend Implementation Tasks

## Phase 1: Models & Database
- [ ] Define `User` and `Task` SQLModel models in `backend/src/models/models.py`.
- [ ] Implement Session and Engine in `backend/src/database/session.py`.
- [ ] Create database initialization logic.

## Phase 2: Authentication Security
- [ ] Implement password hashing in `backend/src/auth/hashing.py`.
- [ ] Implement JWT token generation/decoding in `backend/src/auth/jwt_utils.py`.
- [ ] Implement `get_current_user` dependency in `backend/src/auth/dependencies.py`.

## Phase 3: Auth Endpoints
- [ ] Create `POST /api/auth/register`.
- [ ] Create `POST /api/auth/login`.

## Phase 4: Task CRUD Endpoints
- [ ] Create `GET /api/{user_id}/tasks` (list/filter).
- [ ] Create `POST /api/{user_id}/tasks` (create).
- [ ] Create `GET /api/{user_id}/tasks/{task_id}` (detail).
- [ ] Create `PUT /api/{user_id}/tasks/{task_id}` (update).
- [ ] Create `DELETE /api/{user_id}/tasks/{task_id}` (delete).
- [ ] Create `PATCH /api/{user_id}/tasks/{task_id}/complete` (toggle).

## Phase 5: Integration
- [ ] Setup CORS in `backend/src/main.py`.
- [ ] Assemble all routers.
- [ ] Final verification of multi-user isolation.
