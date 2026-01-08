# System Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend Layer                       │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Next.js 16+ (React + TypeScript)        │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │    │
│  │  │   Pages  │  │ Components│  │   Hooks   │           │    │
│  │  └──────────┘  └──────────┘  └──────────┘           │    │
│  │  ┌──────────────────────────────────────┐            │    │
│  │  │     API Client (/lib/api.ts)         │            │    │
│  │  │  - JWT management                    │            │    │
│  │  │  - Request/response handling         │            │    │
│  │  │  - Error handling                    │            │    │
│  │  └──────────────────────────────────────┘            │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP (JWT Bearer Token)
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Authentication Layer                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │            JWT Validation Middleware                  │    │
│  │  - Token extraction from header                      │    │
│  │  - Token validation with SECRET_KEY                   │    │
│  │  - User context injection                            │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Backend Layer                           │
│  ┌─────────────────────────────────────────────────────┐    │
│  │               FastAPI (Python)                      │    │
│  │  ┌─────────────────────────────────────────────┐   │    │
│  │  │            API Endpoints                     │   │    │
│  │  │  - /api/auth/register                        │   │    │
│  │  │  - /api/auth/login                           │   │    │
│  │  │  - /api/{user_id}/tasks/*                    │   │    │
│  │  └─────────────────────────────────────────────┘   │    │
│  │  ┌─────────────────────────────────────────────┐   │    │
│  │  │           Services Layer                     │   │    │
│  │  │  - Auth service (hashing, token creation)     │   │    │
│  │  │  - Task service (CRUD operations)            │   │    │
│  │  └─────────────────────────────────────────────┘   │    │
│  │  ┌─────────────────────────────────────────────┐   │    │
│  │  │            Validation Layer                  │   │    │
│  │  │  - Pydantic schemas                          │   │    │
│  │  │  - Input validation                          │   │    │
│  │  │  - Response serialization                     │   │    │
│  │  └─────────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       Data Access Layer                      │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                   SQLModel ORM                       │    │
│  │  - Table definitions                                │    │
│  │  - Relationships                                    │    │
│  │  - Query builder                                    │    │
│  │  - Session management                               │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Database Layer                          │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Neon Serverless PostgreSQL              │    │
│  │  ┌──────────┐  ┌──────────┐                         │    │
│  │  │  users   │  │  tasks   │                         │    │
│  │  └──────────┘  └──────────┘                         │    │
│  │  ┌──────────────────────────────────────┐            │    │
│  │  │  Indexes:                             │            │    │
│  │  │  - users.email (unique)              │            │    │
│  │  │  - tasks.user_id (FK)                │            │    │
│  │  │  - tasks.completed (filtering)       │            │    │
│  │  └──────────────────────────────────────┘            │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Component Relationships

### Frontend Components

```
App Router (layout.tsx)
    │
    ├── AuthProvider
    │   ├── useAuth Hook
    │   └── Token Management
    │
    ├── Public Routes
    │   ├── /login → LoginPage
    │   └── /register → RegisterPage
    │
    └── Protected Routes
        └── / → Dashboard
            ├── FilterBar (status, priority, category, search)
            ├── TaskForm (create/edit)
            ├── TaskList
            │   └── TaskItem × N
            │       ├── ToggleCompleteButton
            │       ├── EditButton
            │       └── DeleteButton
            └── SortControls
```

### Backend Architecture

```
main.py (FastAPI App)
    │
    ├── CORS Middleware
    ├── JWT Middleware
    │
    ├── /api/auth/*
    │   ├── register → AuthController.register()
    │   └── login → AuthController.login()
    │       └── AuthService.authenticate()
    │
    └── /api/{user_id}/tasks/*
        ├── GET → TaskController.list()
        ├── POST → TaskController.create()
        ├── GET /:id → TaskController.get()
        ├── PUT /:id → TaskController.update()
        ├── DELETE /:id → TaskController.delete()
        └── PATCH /:id/complete → TaskController.toggle()
            │
            └── TaskService (Business Logic)
                └── SQLAlchemy (Data Access)
                    └── Database (PostgreSQL)
```

## Data Flow

### Authentication Flow

```
1. User enters credentials in LoginPage
   ↓
2. Frontend: POST /api/auth/login
   ↓
3. Backend: AuthController.login()
   ↓
4. AuthService.authenticate()
   - Hash password
   - Validate credentials
   ↓
5. Create JWT token (user_id, email, exp)
   ↓
6. Return { access_token, token_type }
   ↓
7. Frontend: Store token in localStorage
   ↓
8. Update AuthContext state
   ↓
9. Redirect to /dashboard
```

### Task CRUD Flow

```
1. User creates task in TaskForm
   ↓
2. Frontend: api.post('/api/{user_id}/tasks', data)
   - Auto-attach JWT: Authorization: Bearer <token>
   ↓
3. Backend: JWT Middleware validates token
   - Extract user_id from token
   - Inject user_id into request
   ↓
4. TaskController.create()
   - Validate request data (Pydantic)
   - Verify user_id matches token
   ↓
5. TaskService.create()
   - Business validation
   - Create Task model
   ↓
6. Database: Insert into tasks table
   ↓
7. Return created task
   ↓
8. Frontend: Update UI with new task
```

### Protected Request Flow

```
1. Frontend: api.get('/api/{user_id}/tasks')
   - Retrieve token from localStorage
   - Attach: Authorization: Bearer <token>
   ↓
2. Backend: JWT Middleware
   - Extract token from header
   - Validate signature and expiration
   - Decode payload (user_id)
   ↓
3. Request Handler
   - Access user_id from dependency
   - Verify user_id matches path parameter
   ↓
4. Execute business logic
   - Fetch user's tasks from database
   - Apply filters/sorts if provided
   ↓
5. Return response
```

## Security Architecture

### Authentication
- **Token Type**: JWT (JSON Web Token)
- **Algorithm**: HS256 (HMAC-SHA256)
- **Secret Key**: Shared between frontend and backend (BETTER_AUTH_SECRET)
- **Expiration**: 24 hours
- **Storage**: localStorage (frontend)

### Authorization
- **User Isolation**: All queries filtered by user_id from JWT
- **Path Validation**: Verify {user_id} in URL matches authenticated user
- **Role-Based**: Single role (user) - all authenticated users have equal access

### Data Protection
- **Password Hashing**: bcrypt (passlib)
- **HTTPS**: Required in production
- **CORS**: Configured for frontend origin only
- **SQL Injection Prevention**: SQLModel ORM with parameterized queries

## Database Schema

### users table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
```

### tasks table
```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    priority VARCHAR(10) DEFAULT 'medium',
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_completed ON tasks(completed);
CREATE INDEX idx_tasks_priority ON tasks(priority);
```

### Relationships
- **users (1) ←→ (N) tasks**: One user has many tasks
- **CASCADE DELETE**: Deleting a user deletes all their tasks

## Performance Considerations

### Database
- Indexes on frequently queried columns (user_id, completed, priority)
- Connection pooling (via SQLAlchemy engine)
- Query optimization with proper JOINs

### Frontend
- Code splitting with Next.js dynamic imports
- Image optimization with next/image
- Debounced search input
- Lazy loading for task lists (pagination if needed)

### Backend
- Async endpoint handlers
- Response caching for static data (if applicable)
- Rate limiting (to be added if needed)

## Scalability Considerations

### Current Design (Phase II)
- Single server deployment
- Direct database connection
- Session-less authentication (JWT)

### Future Enhancements (Phase III+)
- Load balancer with multiple backend instances
- Redis caching for frequent queries
- CDN for static assets
- WebSocket support for real-time updates
- Background job queue for email notifications

## Error Handling Strategy

### Frontend
- Try-catch around all API calls
- Display user-friendly error messages
- Redirect to login on 401 errors
- Toast notifications for success/error feedback

### Backend
- Custom exception classes for domain errors
- HTTPException with appropriate status codes
- Detailed error messages (without exposing internals)
- Logging all errors for debugging

### Status Codes
- 200 OK: Successful GET/PUT/PATCH
- 201 Created: Successful POST
- 204 No Content: Successful DELETE
- 400 Bad Request: Invalid input
- 401 Unauthorized: Missing/invalid token
- 403 Forbidden: Access to another user's data
- 404 Not Found: Resource doesn't exist
- 500 Internal Server Error: Unexpected error

## Deployment Architecture

### Development
```
localhost:3000 (Next.js dev server)
         ↕ HTTP
localhost:8000 (FastAPI dev server)
         ↕ TCP
localhost:5432 (PostgreSQL via Docker)
```

### Production (recommended)
```
Domain: todo-app.example.com

          ┌──────────────┐
          │    Nginx     │ (Reverse Proxy, SSL termination)
          └──────┬───────┘
                 │
        ┌────────┴────────┐
        │                 │
   ┌────▼────┐       ┌───▼───┐
   │ Frontend │       │Backend│ (Gunicorn + Uvicorn)
   │ (Next.js)│       │FastAPI│
   └─────────┘       └───┬───┘
                             │
                     ┌───────▼──────┐
                     │ Neon PostgreSQL│
                     │   (Cloud DB)  │
                     └───────────────┘
```

## Monitoring and Observability

### Logging
- Backend: Structured logging (JSON format)
- Frontend: Error tracking (console, optional Sentry)
- Database: Query logging (development only)

### Metrics (to be added)
- Request latency
- Error rates
- Database query performance
- User activity

## Development Workflow Integration

### Spec-Kit Plus
- Specifications in `/specs/` drive implementation
- Agents use specs to generate code
- Automated testing based on acceptance criteria
- Continuous validation against architecture

### Git Workflow
- Feature branches for new specs
- Pull requests require spec update
- Code reviews against architecture document
- Deployment after all tests pass
