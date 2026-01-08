# Database Schema Specification

## Overview
This specification defines the database schema for the Todo App Phase II using Neon Serverless PostgreSQL.

## Database Technology

- **Database**: PostgreSQL 16+
- **Hosting**: Neon Serverless PostgreSQL
- **ORM**: SQLModel (based on SQLAlchemy and Pydantic)
- **Migration Tool**: Alembic (optional for Phase II)

## Schema Diagram

```
┌─────────────────────────────────────────────────────┐
│                      users                           │
├─────────────────────────────────────────────────────┤
│ id              SERIAL   PRIMARY KEY                │
│ email           VARCHAR(255)  UNIQUE, NOT NULL       │
│ name            VARCHAR(255)  NOT NULL               │
│ password_hash   VARCHAR(255)  NOT NULL               │
│ created_at      TIMESTAMP     DEFAULT NOW()          │
├─────────────────────────────────────────────────────┤
│ Indexes:                                           │
│   - idx_users_email (UNIQUE on email)              │
└─────────────────────────────────────────────────────┘
                         │
                         │ 1:N
                         │
                         ▼
┌─────────────────────────────────────────────────────┐
│                      tasks                           │
├─────────────────────────────────────────────────────┤
│ id              SERIAL   PRIMARY KEY                │
│ user_id         INTEGER   NOT NULL, FK → users(id)   │
│ title           VARCHAR(200)  NOT NULL               │
│ description     TEXT          NULL                   │
│ completed       BOOLEAN       DEFAULT FALSE         │
│ priority        VARCHAR(10)   DEFAULT 'medium'       │
│ category        VARCHAR(50)   NULL                   │
│ created_at      TIMESTAMP     DEFAULT NOW()          │
│ updated_at      TIMESTAMP     DEFAULT NOW()          │
├─────────────────────────────────────────────────────┤
│ Indexes:                                           │
│   - idx_tasks_user_id (user_id)                     │
│   - idx_tasks_completed (completed)                 │
│   - idx_tasks_priority (priority)                   │
│   - idx_tasks_category (category)                   │
└─────────────────────────────────────────────────────┘
```

## Table Definitions

### users table

Stores user account information.

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Indexes
CREATE UNIQUE INDEX idx_users_email ON users(email);

-- Comment
COMMENT ON TABLE users IS 'User accounts for authentication';
COMMENT ON COLUMN users.password_hash IS 'Bcrypt hashed password';
COMMENT ON COLUMN users.created_at IS 'Account creation timestamp';
```

#### Fields

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | SERIAL | PRIMARY KEY | Unique user identifier |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | User email address (login identifier) |
| `name` | VARCHAR(255) | NOT NULL | User's full name |
| `password_hash` | VARCHAR(255) | NOT NULL | Bcrypt hashed password (12 rounds) |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Account creation timestamp |

#### Constraints

- **Primary Key**: `id`
- **Unique**: `email` - No duplicate email addresses
- **Not Null**: `email`, `name`, `password_hash`
- **Default**: `created_at` defaults to current timestamp

#### Indexes

- `idx_users_email`: Unique index on `email` for fast login queries

---

### tasks table

Stores task information for each user.

```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE NOT NULL,
    priority VARCHAR(10) DEFAULT 'medium' NOT NULL,
    category VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    CONSTRAINT fk_tasks_user_id
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- Indexes
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_completed ON tasks(completed);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_category ON tasks(category);

-- Check constraints
ALTER TABLE tasks
ADD CONSTRAINT chk_priority
CHECK (priority IN ('high', 'medium', 'low'));

-- Comments
COMMENT ON TABLE tasks IS 'Task items belonging to users';
COMMENT ON COLUMN tasks.user_id IS 'Foreign key to users table (owner)';
COMMENT ON COLUMN tasks.priority IS 'Task priority: high, medium, or low';
COMMENT ON COLUMN tasks.completed IS 'Task completion status';
```

#### Fields

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | SERIAL | PRIMARY KEY | Unique task identifier |
| `user_id` | INTEGER | NOT NULL, FK | User who owns this task |
| `title` | VARCHAR(200) | NOT NULL | Task title |
| `description` | TEXT | NULL | Detailed task description |
| `completed` | BOOLEAN | DEFAULT FALSE | Completion status |
| `priority` | VARCHAR(10) | DEFAULT 'medium' | Priority level |
| `category` | VARCHAR(50) | NULL | Task category/tag |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Task creation timestamp |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Last update timestamp |

#### Constraints

- **Primary Key**: `id`
- **Foreign Key**: `user_id` → `users(id)` with CASCADE DELETE
- **Not Null**: `user_id`, `title`, `completed`, `priority`, `created_at`, `updated_at`
- **Check**: `priority` must be one of ('high', 'medium', 'low')
- **Defaults**:
  - `completed` defaults to FALSE
  - `priority` defaults to 'medium'
  - `created_at` and `updated_at` default to NOW()

#### Indexes

- `idx_tasks_user_id`: Index on `user_id` for filtering by user
- `idx_tasks_completed`: Index on `completed` for filtering by status
- `idx_tasks_priority`: Index on `priority` for filtering/sorting
- `idx_tasks_category`: Index on `category` for filtering

---

## Relationships

### One-to-Many: users → tasks

```
users (1) ←────── (N) tasks
```

- One user can have many tasks
- Each task belongs to exactly one user
- Foreign key: `tasks.user_id` → `users.id`
- Cascade delete: Deleting a user deletes all their tasks

---

## SQLModel Models

### Python Models (SQLModel)

```python
# src/models/user.py
from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime
from typing import TYPE_CHECKING, List

if TYPE_CHECKING:
    from .task import Task

class User(SQLModel, table=True):
    __tablename__ = "users"

    id: int | None = Field(default=None, primary_key=True)
    email: str = Field(max_length=255, unique=True, index=True)
    name: str = Field(max_length=255)
    password_hash: str = Field(max_length=255)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    tasks: List["Task"] = Relationship(back_populates="user")
```

```python
# src/models/task.py
from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .user import User

class Task(SQLModel, table=True):
    __tablename__ = "tasks"

    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id", index=True)
    title: str = Field(max_length=200)
    description: str | None = Field(default=None, max_length=1000)
    completed: bool = Field(default=False, index=True)
    priority: str = Field(default="medium")  # "high" | "medium" | "low"
    category: str | None = Field(default=None, max_length=50)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    user: User = Relationship(back_populates="tasks")
```

---

## Database Operations

### User Operations

#### Create User
```python
def create_user(session: Session, user_data: UserCreate) -> User:
    hashed_password = get_password_hash(user_data.password)
    user = User(
        email=user_data.email,
        name=user_data.name,
        password_hash=hashed_password
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user
```

#### Find User by Email
```python
def find_user_by_email(session: Session, email: str) -> User | None:
    statement = select(User).where(User.email == email)
    return session.exec(statement).first()
```

---

### Task Operations

#### Create Task
```python
def create_task(session: Session, user_id: int, task_data: TaskCreate) -> Task:
    task = Task(**task_data.model_dump(), user_id=user_id)
    session.add(task)
    session.commit()
    session.refresh(task)
    return task
```

#### List User's Tasks
```python
def list_user_tasks(
    session: Session,
    user_id: int,
    status: str | None = None,
    priority: str | None = None,
    category: str | None = None,
    search: str | None = None,
    sort_by: str = "created_at",
    sort_order: str = "desc"
) -> list[Task]:
    statement = select(Task).where(Task.user_id == user_id)

    # Apply filters
    if status == "pending":
        statement = statement.where(Task.completed == False)
    elif status == "completed":
        statement = statement.where(Task.completed == True)

    if priority and priority != "all":
        statement = statement.where(Task.priority == priority)

    if category:
        statement = statement.where(Task.category == category)

    if search:
        search_pattern = f"%{search}%"
        statement = statement.where(
            (Task.title.ilike(search_pattern)) |
            (Task.description.ilike(search_pattern))
        )

    # Apply sorting
    if sort_by == "priority":
        priority_order = {"high": 1, "medium": 2, "low": 3}
        # For complex sorting, use SQL expressions
        # Simplified here
        statement = statement.order_by(Task.priority.desc())
    elif sort_by == "title":
        statement = statement.order_by(Task.title.asc() if sort_order == "asc" else Task.title.desc())
    else:
        statement = statement.order_by(Task.created_at.asc() if sort_order == "asc" else Task.created_at.desc())

    return session.exec(statement).all()
```

#### Get Task by ID
```python
def get_task_by_id(session: Session, task_id: int) -> Task | None:
    return session.get(Task, task_id)
```

#### Update Task
```python
def update_task(session: Session, task: Task, task_data: TaskUpdate) -> Task:
    task_data_dict = task_data.model_dump(exclude_unset=True)
    for key, value in task_data_dict.items():
        setattr(task, key, value)
    task.updated_at = datetime.utcnow()
    session.add(task)
    session.commit()
    session.refresh(task)
    return task
```

#### Delete Task
```python
def delete_task(session: Session, task: Task) -> None:
    session.delete(task)
    session.commit()
```

---

## Database Initialization

### Python (SQLModel)

```python
# src/database/init_db.py
from sqlmodel import SQLModel, create_engine, Session
from src.models.user import User
from src.models.task import Task

DATABASE_URL = "postgresql://user:password@host:5432/todo_db"

engine = create_engine(DATABASE_URL, echo=True)

def init_db():
    """Create all tables"""
    SQLModel.metadata.create_all(engine)

if __name__ == "__main__":
    init_db()
    print("Database initialized successfully!")
```

### Raw SQL

```sql
-- Create database (if not exists)
CREATE DATABASE todo_db;

-- Connect to database
\c todo_db;

-- Create tables
CREATE TABLE users (...);
CREATE TABLE tasks (...);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
-- ... other indexes

-- Create constraints
ALTER TABLE tasks ADD CONSTRAINT chk_priority
CHECK (priority IN ('high', 'medium', 'low'));

-- Add foreign key
ALTER TABLE tasks
ADD CONSTRAINT fk_tasks_user_id
FOREIGN KEY (user_id)
REFERENCES users(id)
ON DELETE CASCADE;
```

---

## Database Configuration

### Connection String Format

```
postgresql://username:password@host:port/database_name
```

Examples:

- **Development (Docker)**:
  ```
  postgresql://todo_user:todo_password@localhost:5432/todo_db
  ```

- **Production (Neon)**:
  ```
  postgresql://username:password@ep-neon-host.us-east-1.aws.neon.tech/todo_db?sslmode=require
  ```

### Environment Variables

```bash
# .env file
DATABASE_URL=postgresql://todo_user:todo_password@localhost:5432/todo_db
DATABASE_POOL_SIZE=20
DATABASE_MAX_OVERFLOW=10
```

---

## Database Migrations (Alembic - Optional)

For Phase II, tables can be created programmatically with SQLModel. For production, consider using Alembic for migrations.

### Setup Alembic

```bash
# Install alembic
uv add alembic

# Initialize alembic
uv run alembic init alembic

# Generate migration
uv run alembic revision --autogenerate -m "Initial migration"

# Apply migration
uv run alembic upgrade head
```

### Migration Example

```python
# alembic/versions/001_initial.py
from alembic import op
import sqlalchemy as sa

def upgrade():
    op.create_table(
        'users',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('name', sa.String(length=255), nullable=False),
        sa.Column('password_hash', sa.String(length=255), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email')
    )

    op.create_table(
        'tasks',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('title', sa.String(length=200), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('completed', sa.Boolean(), nullable=True),
        sa.Column('priority', sa.String(length=10), nullable=True),
        sa.Column('category', sa.String(length=50), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id'),
        sa.CheckConstraint("priority IN ('high', 'medium', 'low')", name='chk_priority')
    )

def downgrade():
    op.drop_table('tasks')
    op.drop_table('users')
```

---

## Performance Considerations

### Indexing Strategy

Indexes are created on:
- `users.email`: Unique index for fast login
- `tasks.user_id`: Foreign key for user filtering (most common query)
- `tasks.completed`: For filtering by completion status
- `tasks.priority`: For filtering/sorting by priority
- `tasks.category`: For filtering by category

### Query Optimization Tips

1. **Always filter by user_id first** (primary filtering)
2. **Use indexed columns in WHERE clauses**
3. **Avoid LIKE with leading wildcards** (`%word` is slow, `word%` is okay)
4. **Use LIMIT for large result sets** (pagination in future phases)
5. **Consider composite indexes** for common filter combinations

### Connection Pooling

SQLAlchemy handles connection pooling:

```python
engine = create_engine(
    DATABASE_URL,
    echo=False,
    pool_size=20,
    max_overflow=10,
    pool_pre_ping=True,  # Check connections before using
    pool_recycle=3600    # Recycle connections after 1 hour
)
```

---

## Backup and Recovery

### Neon Automatic Backups

Neon provides automatic backups:
- Daily backups retained for 7 days
- Point-in-time recovery (PITR)
- Branching for development/testing

### Manual Backup (if needed)

```bash
# Backup to SQL file
pg_dump -h localhost -U todo_user -d todo_db > backup.sql

# Restore from backup
psql -h localhost -U todo_user -d todo_db < backup.sql
```

---

## Security

### Access Control

- Database access restricted to application only
- No direct database access from frontend
- Use environment variables for credentials
- Never commit secrets to version control

### Data Encryption

- Passwords: bcrypt hashing (cost factor 12)
- Data at rest: Neon handles encryption
- Data in transit: Use SSL (sslmode=require in production)

---

## Testing Data

### Seed Script (Development)

```python
def seed_database(session: Session):
    """Seed database with test data"""
    # Create test user
    user = User(
        email="test@example.com",
        name="Test User",
        password_hash=get_password_hash("password123")
    )
    session.add(user)
    session.commit()

    # Create test tasks
    tasks = [
        Task(user_id=user.id, title="Task 1", priority="high", category="Work"),
        Task(user_id=user.id, title="Task 2", priority="medium", category="Personal"),
        Task(user_id=user.id, title="Task 3", completed=True, priority="low"),
    ]
    for task in tasks:
        session.add(task)
    session.commit()
    print("Database seeded successfully!")
```

---

## Future Enhancements (Phase III+)

### Additional Tables
- `categories`: Predefined categories for users
- `task_dependencies`: Parent-child task relationships
- `task_comments`: Comments on tasks
- `reminders`: Task reminders
- `attachments`: File attachments for tasks

### Additional Indexes
- Composite indexes for common filter combinations
- Full-text search indexes (GIN)
- Trigram indexes for fuzzy search

### Performance
- Read replicas for scaling
- Caching layer (Redis)
- Query result caching
- Database partitioning for large datasets
