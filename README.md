# Todo App - Hackathon Phase II

## Overview
Phase II transforms the Phase I console-based Todo application into a full-stack web application with multi-user support, authentication, persistent storage, and a responsive UI.

**Current Phase**: Phase II - Full-Stack Web Application

## Quick Start

### Prerequisites
- Node.js 20+
- Python 3.13+
- Docker and Docker Compose
- UV (Python package manager)

### Development Setup

1. **Clone and navigate to project**:
   ```bash
   cd hackathon-todo
   ```

2. **Set environment variables**:
   ```bash
   # Copy example .env file
   cp backend/.env.example backend/.env

   # Edit backend/.env and set your secrets
   # BETTER_AUTH_SECRET=your-super-secret-key
   ```

3. **Start development environment**:
   ```bash
   docker-compose up -d
   ```

4. **Install dependencies** (if running locally without Docker):
   ```bash
   # Backend
   cd backend
   uv sync

   # Frontend
   cd ../frontend
   npm install
   ```

5. **Run applications** (local development):
   ```bash
   # Backend (in backend/)
   uv run uvicorn src.main:app --reload --host 0.0.0.0 --port 8000

   # Frontend (in frontend/)
   npm run dev
   ```

6. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

## Architecture

### Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16+ (TypeScript, Tailwind CSS) |
| Backend | FastAPI (Python 3.13+, SQLModel) |
| Database | Neon Serverless PostgreSQL |
| Authentication | Better Auth (JWT tokens) |
| ORM | SQLModel |
| Development | Spec-Kit Plus + Claude Code |

### Project Structure

```
hackathon-todo/
├── .spec-kit/           # Spec-Kit Plus configuration
├── specs/               # Specification documents
│   ├── overview.md      # This file
│   ├── architecture.md  # System architecture
│   ├── features/        # Feature specifications
│   ├── api/             # API endpoint specifications
│   ├── database/        # Database schema specifications
│   └── ui/              # UI component specifications
├── frontend/            # Next.js application
│   ├── CLAUDE.md        # Frontend development guide
│   └── ...
├── backend/             # FastAPI application
│   ├── CLAUDE.md        # Backend development guide
│   └── ...
├── docker-compose.yml   # Development environment
├── README.md            # User documentation
└── CLAUDE.md           # Root Claude instructions
```

## Development Workflow

This project follows the **Spec-Kit Plus workflow** with spec-driven development:

1. **Create Specifications**: Define features, APIs, database schemas, and UI components in `/specs/`
2. **Run Agents**: Use specialized agents to implement features across frontend, backend, and database
3. **Test and Validate**: Test API endpoints and frontend UI
4. **Update Specs**: Modify specifications as requirements evolve

## Agents and Skills

### Available Agents
- **Full-Stack Task Agent**: Implements task CRUD operations across all layers
- **Authentication Agent**: Implements authentication and JWT handling
- **Spec-Driven Agent**: Orchestrates feature implementation from specs

### Available Skills
- **Task CRUD**: Backend endpoints + DB operations
- **Authentication**: Better Auth + JWT + middleware
- **Frontend Component**: React/Tailwind components
- **Database**: SQLModel tables, relationships, indexes
- **API Client**: Wrapper for API requests with JWT
- **Spec Handling**: Read specs and convert to implementation tasks

## Key Features

### Multi-User Support
- User registration and login
- Each user has isolated task lists
- Backend enforces user isolation

### Authentication
- Better Auth integration
- JWT tokens for secure API access
- Protected routes and endpoints

### Task Management
All Phase I features preserved:
- Create, view, update, delete tasks
- Toggle completion status
- Task priorities (high/medium/low)
- Task categories/tags
- Search by keyword
- Filter by status, priority, category
- Sort by priority and alphabetically

### Responsive UI
- Mobile-first design with Tailwind CSS
- Optimized for phones, tablets, and desktops
- Accessible and user-friendly

## API Endpoints

All endpoints require JWT authentication:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and get JWT |
| GET | `/api/{user_id}/tasks` | List all tasks |
| POST | `/api/{user_id}/tasks` | Create task |
| GET | `/api/{user_id}/tasks/{id}` | Get task details |
| PUT | `/api/{user_id}/tasks/{id}` | Update task |
| DELETE | `/api/{user_id}/tasks/{id}` | Delete task |
| PATCH | `/api/{user_id}/tasks/{id}/complete` | Toggle completion |

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://todo_user:todo_password@postgres:5432/todo_db
BETTER_AUTH_SECRET=your-super-secret-key
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

### Integration Tests
```bash
docker-compose up -d
# Run full test suite
```

## Development Commands

### Docker Compose
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Restart specific service
docker-compose restart backend
```

### Backend
```bash
cd backend

# Install dependencies
uv sync

# Run development server
uv run uvicorn src.main:app --reload

# Run tests
pytest

# Check Python version
python --version  # Must be 3.13+
```

### Frontend
```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test
```

## Documentation

- **Project Overview**: `specs/overview.md`
- **System Architecture**: `specs/architecture.md`
- **Frontend Guide**: `frontend/CLAUDE.md`
- **Backend Guide**: `backend/CLAUDE.md`
- **API Documentation**: http://localhost:8000/docs (when running)

## Troubleshooting

### Database Issues
```bash
# Check PostgreSQL status
docker-compose ps

# View database logs
docker-compose logs postgres

# Restart database
docker-compose restart postgres
```

### Backend Issues
```bash
# Check backend logs
docker-compose logs backend

# Restart backend
docker-compose restart backend
```

### Frontend Issues
```bash
# Clear Next.js cache
cd frontend
rm -rf .next node_modules
npm install
npm run dev
```

## Contributing

1. Follow the spec-driven development workflow
2. Create specifications before implementing features
3. Write tests for all new functionality
4. Update documentation as needed
5. Ensure all previous Phase I features work

## Phase II vs Phase I

### Upgrades
| Aspect | Phase I | Phase II |
|--------|---------|----------|
| UI | Console | Responsive Web |
| Storage | In-memory | PostgreSQL |
| Users | Single | Multi-user with auth |
| Communication | Direct functions | REST API |
| Tech Stack | Python only | TypeScript + Python |

### Preserved Features
All Phase I functionality is preserved and enhanced:
- ✅ Task CRUD operations
- ✅ Task completion toggle
- ✅ Task priorities
- ✅ Task categories
- ✅ Search functionality
- ✅ Filter by status/priority/category
- ✅ Sort by priority/alphabetically

## Next Steps

1. Review specifications in `/specs/`
2. Set up development environment
3. Run agents to implement features
4. Test thoroughly
5. Deploy to production

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [SQLModel Documentation](https://sqlmodel.tiangolo.com)
- [Better Auth](https://better-auth.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Neon PostgreSQL](https://neon.tech)
- [Docker Documentation](https://docs.docker.com)

## License

This project is part of the "Evolution of Todo" hackathon.
