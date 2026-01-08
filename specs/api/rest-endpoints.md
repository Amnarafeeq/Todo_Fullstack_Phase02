# REST API Specification

## Overview
This document specifies the REST API endpoints for the Todo App Phase II backend.

## Base URL
- **Development**: `http://localhost:8000`
- **Production**: `https://api.todoapp.com` (Example)

## Authentication
- **Mechanism**: JWT (JSON Web Token)
- **Header**: `Authorization: Bearer <TOKEN>`
- **Token Source**: Obtained via `/api/auth/login` or `/api/auth/register`

## Data Formats
- **Request Body**: JSON
- **Response Body**: JSON
- **Date format**: ISO 8601 (UTC)

## Error Taxonomy

| Status Code | Type | Description |
|-------------|------|-------------|
| 400 | Bad Request | Invalid input parameters or missing fields |
| 401 | Unauthorized | Authentication token missing or invalid |
| 403 | Forbidden | Authenticated user lacks permission for the resource |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource already exists (e.g., email duplicate) |
| 500 | Server Error | Internal backend failure |

---

## Authentication Endpoints

### POST /api/auth/register
Create a new user account.

**Request Body**:
```json
{
  "email": "user@example.com",
  "name": "Full Name",
  "password": "strongPassword123"
}
```

**Response (201 Created)**:
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "Full Name",
  "created_at": "2026-01-05T12:00:00Z"
}
```

---

### POST /api/auth/login
Authenticate a user and receive a token.

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "strongPassword123"
}
```

**Response (200 OK)**:
```json
{
  "access_token": "JWT_TOKEN_HERE",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "Full Name"
  }
}
```

---

## Task Endpoints (Authenticated)

### GET /api/{user_id}/tasks
List all tasks for the authenticated user.

**URL Parameters**:
- `user_id`: The ID of the authenticated user (must match token sub)

**Query Parameters**:
- `status`: `all` | `pending` | `completed` (default: `all`)
- `priority`: `all` | `high` | `medium` | `low` (default: `all`)
- `category`: `string` (filter by category name)
- `search`: `string` (freetext search in title/description)
- `sort_by`: `createdAt` | `priority` | `title` (default: `createdAt`)
- `sort_order`: `asc` | `desc` (default: `desc`)

**Response (200 OK)**:
```json
[
  {
    "id": 1,
    "user_id": 1,
    "title": "Fix the navbar",
    "description": "Remove the duplicate secondary navbar",
    "completed": false,
    "priority": "high",
    "category": "Bug",
    "created_at": "2026-01-05T10:00:00Z",
    "updated_at": "2026-01-05T10:00:00Z"
  }
]
```

---

### POST /api/{user_id}/tasks
Create a new task for the user.

**Request Body**:
```json
{
  "title": "New Task Title",
  "description": "Optional details",
  "priority": "medium",
  "category": "Work"
}
```

**Response (201 Created)**:
```json
{
  "id": 2,
  "user_id": 1,
  "title": "New Task Title",
  "description": "Optional details",
  "completed": false,
  "priority": "medium",
  "category": "Work",
  "created_at": "2026-01-05T13:00:00Z",
  "updated_at": "2026-01-05T13:00:00Z"
}
```

---

### GET /api/{user_id}/tasks/{task_id}
Get details of a specific task.

**Response (200 OK)**:
```json
{
  "id": 1,
  "user_id": 1,
  "title": "Fix the navbar",
  "description": "Remove the duplicate secondary navbar",
  "completed": false,
  "priority": "high",
  "category": "Bug",
  "created_at": "2026-01-05T10:00:00Z",
  "updated_at": "2026-01-05T10:00:00Z"
}
```

---

### PUT /api/{user_id}/tasks/{task_id}
Update an existing task.

**Request Body**:
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "completed": true,
  "priority": "low",
  "category": "Personal"
}
```

**Response (200 OK)**:
```json
{
  "id": 1,
  "user_id": 1,
  "title": "Updated Title",
  "description": "Updated description",
  "completed": true,
  "priority": "low",
  "category": "Personal",
  "created_at": "2026-01-05T10:00:00Z",
  "updated_at": "2026-01-05T14:00:00Z"
}
```

---

### DELETE /api/{user_id}/tasks/{task_id}
Delete a specific task.

**Response (204 No Content)**:
(Empty body)

---

### PATCH /api/{user_id}/tasks/{task_id}/complete
Toggle the completion status of a task.

**Response (200 OK)**:
```json
{
  "id": 1,
  "completed": true,
  "updated_at": "2026-01-05T15:00:00Z"
}
```

---

## Multi-user Security Policy
1.  **Isolation**: Users can only see and modify tasks where `tasks.user_id` matches the user's ID extracted from the JWT `sub` claim.
2.  **Enforcement**: Every request to `/api/{user_id}/...` must be validated against the JWT token.
3.  **Forbidden Access**: A user attempting to access another user's ID (`403 Forbidden`) or a non-existent task ID (`404 Not Found`) will receive the respective error code.
