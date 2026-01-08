# Feature: Task CRUD Operations

## User Stories
- As a user, I can create a new task
- As a user, I can view all my tasks
- As a user, I can update a task
- As a user, I can delete a task
- As a user, I can mark a task complete

## Acceptance Criteria

### Create Task
- Title is required (1-200 characters)
- Description is optional (max 1000 characters)
- Task is associated with logged-in user
- Default priority is "medium"
- Category is optional (max 50 characters)

### View Tasks
- Only show tasks for current user
- Display title, status, created date
- Support filtering by status (pending/completed)
- Support filtering by priority (high/medium/low)
- Support filtering by category
- Support search by keyword in title/description
- Support sorting by priority, title, or created date

### Update Task
- User can only update their own tasks
- Partial updates supported (only changed fields)
- Updated timestamp is refreshed

### Delete Task
- User can only delete their own tasks
- Confirmation dialog before deletion
- Cascade: no other entities depend on tasks

### Toggle Completion
- Quick toggle between pending and completed
- Visual indication of status change
