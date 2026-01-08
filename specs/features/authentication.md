# Authentication & Authorization Specification

## Overview
This document specifies the authentication and authorization mechanism for the Todo App Phase II backend using FastAPI and JWT-based authentication (integrated with Better Auth on the frontend).

## Technology Stack
- **Framework**: FastAPI
- **Authentication**: JWT (JSON Web Tokens)
- **Hashing**: Bcrypt
- **Auth Provider Logic**: Better Auth compatibility

## JWT Strategy

### Token Structure
The backend expects a standard JWT containing the user identity in the payload.

**Standard Claims**:
- `sub`: User ID (integer)
- `email`: User's registered email
- `exp`: Expiration timestamp (UTC)
- `iat`: Issued at timestamp (UTC)

### Verification Flow
For every protected request, the backend must:
1.  Extract the token from the `Authorization: Bearer <TOKEN>` header.
2.  Validate the JWT signature using the shared secret key.
3.  Verify the `exp` claim to ensure the token hasn't expired.
4.  Extract the user ID from the `sub` claim.

## Middleware & Dependencies

### Auth Middleware (Dependency Injection)
FastAPI **Dependencies** will be used to protect specific routes. This allows for granular control and automatic status code handling (401/403).

```python
# Conceptual Dependency
async def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    # 1. Verify JWT
    # 2. Query User from DB
    # 3. Return User object or raise HTTPException(401)
```

### Route Protection
Any endpoint requiring authentication will include the `get_current_user` dependency.

```python
@app.get("/api/{user_id}/tasks")
async def list_tasks(
    user_id: int,
    current_user: User = Depends(get_current_user)
):
    # Authorization check happens here
    if user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Forbidden")
    pass
```

## Authorization & Multi-user Isolation

### The "ID Matching" Principle
Authentication only proves *who* the user is. **Authorization** ensures they only access their own data.

**Security Constraints**:
1.  **Path Validation**: If a route contains `{user_id}`, the backend MUST verify that `user_id == current_user.id`.
2.  **Resource Ownership**: When querying specific tasks (e.g., `/tasks/{task_id}`), the query must always include `WHERE user_id = current_user.id`.
3.  **Forbidden Access**: If a user attempts to access a `{user_id}` that is not theirs, return **403 Forbidden**.

## Security Constraints

| Feature | Requirement |
|---------|-------------|
| **HTTPS** | Mandatory for all traffic |
| **Secrets** | Never commit `SECRET_KEY` to repo; use environment variables |
| **Hashing** | Use Bcrypt with salt rounds = 12 |
| **Isolation** | Hard isolation between user data using `user_id` foreign keys |
| **CORS** | Restricted to frontend domain only |

## Error Responses

| Status Code | Reason | Response Detail |
|-------------|--------|-----------------|
| 401 | Missing/Invalid Token | "Could not validate credentials" |
| 401 | Token Expired | "Signature has expired" |
| 403 | ID Mismatch | "You do not have access to this resource" |
| 404 | User Deleted | "User not found" |

## Workflow Diagram

```
[ Frontend ] --(Login Req)--> [ FastAPI /login ]
[ Frontend ] <--(JWT Token)-- [ FastAPI /login ]

[ Frontend ] --(Header: Bearer JWT)--> [ FastAPI Protected Route ]
                                          |
                                   1. Verify Signature
                                   2. Extract User ID
                                   3. Match user_id in Path
                                          |
[ Frontend ] <----(Data)--------------- [ Success ]
```
