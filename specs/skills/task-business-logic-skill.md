# Task Business Logic Skill

## Purpose

To define and enforce the business rules of Todo tasks, including creation, updates, completion, deletion, and validation of task data per authenticated user. This skill translates feature requirements into executable business logic that governs task behavior, ensuring data integrity, enforcing constraints, and managing task lifecycle. It serves as the reasoning layer for all task-related business decisions.

## When to Use (Trigger Conditions)

This skill should be invoked when:

- Task creation validation rules are being implemented
- Task update logic needs to be defined (e.g., partial vs full updates)
- Task completion state transitions are being managed
- Task deletion policies need enforcement
- Task data validation requirements are being implemented
- Business rules for task attributes are being defined (e.g., due dates, priorities)
- Task ownership and access control logic is needed
- Task filtering, sorting, and searching logic is being designed
- Task status transitions need validation (e.g., incomplete → completed → reopened)
- Task dependencies or relationships need enforcement (if applicable)
- Bulk task operations require validation
- Task audit logging or history tracking is needed

**Triggers:**
- Feature spec introduces task CRUD operations
- Task spec defines new task attributes or behaviors
- User performs task-related action (create, update, complete, delete)
- Business rules need validation before task persistence
- Task state transitions require enforcement

## Inputs

### Required Inputs

1. **Task Specification File**
   - Format: String path relative to `/specs/` directory
   - Examples: `features/task-crud.md`, `features/task-attributes.md`, `database/models/todo.md`

2. **Feature Specification File**
   - Format: String path relative to `/specs/` directory
   - Examples: `features/todo-basic.md`, `features/todo-intermediate.md`, `features/todo-advanced.md`

3. **User Context**
   - User ID (UUID)
   - User roles (optional, for permission checks)
   - Tenant ID (for multi-tenant isolation)

### Operation-Specific Inputs

1. **For Task Creation:**
   - Task data (title, description, due_date, priority, tags, etc.)

2. **For Task Update:**
   - Task ID (UUID)
   - Updated fields (partial or complete)
   - Original task data (for validation comparison)

3. **For Task Completion:**
   - Task ID (UUID)
   - Original task data (to validate completion eligibility)

4. **For Task Deletion:**
   - Task ID (UUID)
   - Original task data (to validate deletion eligibility)

5. **For Task Query:**
   - Filters (status, priority, due date range, tags, etc.)
   - Sort criteria (due date, priority, created date, completion date)
   - Pagination parameters (page, limit)

### Supported Specification Types

| Spec Type | Location Pattern | Purpose |
|-----------|-----------------|---------|
| Feature Specs | `/specs/features/*.md` | Task CRUD requirements, validation rules, business scenarios |
| Database Specs | `/specs/database/*.md` | Task model definitions, field constraints, relationships |
| Task Specs | `/specs/tasks/*.md` | Task behaviors, state transitions, business rules |
| Architecture Specs | `/specs/architecture/*.md` | Business logic layer patterns, validation strategies |

### Specification Format Expectations

Task/Feature specs MUST include:
- Task attribute definitions (title, description, status, priority, due_date, tags)
- Validation rules for each attribute (required fields, length limits, format constraints)
- Business rules (e.g., "completed tasks cannot be edited", "due date cannot be in past for new tasks")
- State transition rules (e.g., incomplete → completed → reopened)
- Access control rules (ownership, sharing, permissions)
- Sorting, filtering, and searching requirements
- Audit logging requirements

## Actions

### Step 1: Operation Classification
1. Identify the task operation type:
   - Create: New task creation
   - Update: Task modification (full or partial)
   - Complete: Mark task as completed
   - Reopen: Change completed task back to incomplete
   - Delete: Remove task
   - Query: Search/filter/sort tasks
   - Bulk: Multiple tasks operation
2. Determine if operation requires user context (most do)
3. Check if operation is idempotent (GET, PUT, DELETE vs POST, PATCH)
4. Identify affected task attributes and state

### Step 2: Task Data Validation
1. For task creation:
   - Validate required fields: title (always required)
   - Validate field lengths: title (1-255), description (optional, max 2000)
   - Validate field types: title (string), description (string), due_date (datetime), priority (enum)
   - Validate field formats: due_date must be valid ISO 8601 datetime, email format if applicable
   - Validate field constraints: due_date cannot be in past for new tasks (configurable)
   - Validate enum values: priority must be one of (low|medium|high|critical)
   - Validate tags: unique tags list, max tag count, max tag length
   - Check for duplicate task titles within user's tasks (if uniqueness required)
2. For task update:
   - Validate fields being updated (same validation as creation for updated fields)
   - Validate that completed tasks cannot be edited (configurable policy)
   - Validate that completed_at and completed_by cannot be modified directly
   - Validate that created_at and created_by cannot be modified
   - Check for immutable field violations
3. For task completion:
   - Validate task is not already completed
   - Validate task belongs to the user
   - Check if task has uncompleted dependencies (if applicable)
   - Validate completion is allowed for current task state

### Step 3: Business Rule Enforcement
1. Enforce task ownership:
   - Verify task belongs to requesting user (user_id matches task.user_id)
   - For shared tasks, verify user has required permissions
   - For multi-tenant, verify tenant_id matches user's tenant
2. Enforce state transition rules:
   - Incomplete → Completed: Allowed if task is incomplete
   - Completed → Reopened: Allowed if task is completed and re-open is permitted
   - Cannot transition directly to invalid states
3. Enforce due date rules:
   - New tasks: due_date cannot be in past (or allow with warning)
   - Updates: due_date can be modified (past, present, future)
   - Overdue tasks: flag or notification logic (not validation)
4. Enforce priority rules:
   - Priority changes are allowed for incomplete tasks
   - Priority cannot be set to invalid enum value
5. Enforce tag rules:
   - Tags must be unique within a task
   - Tag count limit (e.g., max 10 tags per task)
   - Tag format rules (e.g., alphanumeric, hyphens, underscores only)
6. Enforce description rules:
   - Optional field, no required validation
   - Max length limit (e.g., 2000 characters)
   - HTML/sanitization rules (if applicable)

### Step 4: State Management
1. For task creation:
   - Set initial status: incomplete (default)
   - Set created_at: current timestamp
   - Set created_by: requesting user ID
   - Initialize completed_at: null
   - Initialize completed_by: null
   - Set updated_at: current timestamp
   - Set updated_by: requesting user ID
2. For task update:
   - Update only specified fields (partial update) or all fields (full update)
   - Set updated_at: current timestamp
   - Set updated_by: requesting user ID
   - Preserve immutables: created_at, created_by, user_id, tenant_id
3. For task completion:
   - Set status: completed
   - Set completed_at: current timestamp
   - Set completed_by: requesting user ID
   - Set updated_at: current timestamp
   - Set updated_by: requesting user ID
4. For task reopening:
   - Set status: incomplete
   - Clear completed_at: null
   - Clear completed_by: null
   - Set updated_at: current timestamp
   - Set updated_by: requesting user ID
5. For task deletion:
   - No state changes (task is removed)
   - Record deletion timestamp for audit (soft delete if applicable)

### Step 5: Audit and History Tracking
1. For state-changing operations (create, update, complete, reopen, delete):
   - Record operation type and timestamp
   - Record user who performed operation
   - Record previous state (for updates)
   - Record changes made (delta between old and new state)
2. For task creation:
   - Log: task created with ID, title, priority, due_date
3. For task update:
   - Log: task ID updated, changed fields, old values, new values
4. For task completion:
   - Log: task ID completed, completed_at, completed_by
5. For task reopening:
   - Log: task ID reopened, reopened_at, reopened_by
6. For task deletion:
   - Log: task ID deleted, deleted_at, deleted_by, task snapshot (soft delete)

### Step 6: Query Logic Design
1. Design filtering logic:
   - Filter by status: incomplete, completed, all
   - Filter by priority: low, medium, high, critical
   - Filter by due date: overdue, due_today, due_this_week, due_this_month, custom range
   - Filter by tags: tasks with specific tag(s)
   - Filter by title/description: text search (contains, starts with)
   - Filter by creation date: created today, this week, this month, custom range
   - Filter by completion date: completed today, this week, custom range
2. Design sorting logic:
   - Sort by due_date: ascending (earliest first), descending (latest first)
   - Sort by priority: custom order (critical > high > medium > low)
   - Sort by created_at: newest first, oldest first
   - Sort by completed_at: most recently completed first
   - Sort by title: alphabetical, reverse alphabetical
   - Multi-sort: primary sort, secondary sort, tertiary sort
3. Design pagination logic:
   - Page-based: page number, page size
   - Offset-based: offset, limit
   - Cursor-based: last seen ID, limit (for infinite scroll)
4. Apply user scope:
   - Always filter by user_id (user sees only their tasks)
   - For shared tasks, include tasks where user has access
   - For multi-tenant, filter by tenant_id

### Step 7: Error Detection and Validation
1. Detect validation errors:
   - Missing required fields (title)
   - Invalid field types (priority must be enum)
   - Field length violations (title too long)
   - Invalid formats (invalid due_date)
   - Invalid enum values (priority = "urgent" not allowed)
2. Detect business rule violations:
   - Attempting to edit completed task (if not allowed)
   - Attempting to complete already completed task
   - Attempting to reopen task (if not allowed)
   - Attempting to modify immutable fields (created_at, created_by)
   - Attempting to set due_date in past for new task (if not allowed)
3. Detect ownership violations:
   - User does not own task
   - User lacks required permissions
   - Tenant mismatch (multi-tenant)
4. Detect dependency violations:
   - Task has uncompleted dependencies (if applicable)
   - Completing parent before children (if applicable)
5. Generate error details:
   - Error code (e.g., VALIDATION_ERROR, BUSINESS_RULE_VIOLATION)
   - Error message (user-friendly)
   - Field-level errors (with field names)
   - Violated rule details

### Step 8: Data Enrichment and Derivations
1. Enrich task data:
   - Add task age (time since creation)
   - Add task urgency (based on due_date and priority)
   - Add completion progress (if subtasks exist)
   - Add overdue flag (if due_date < current_time and status != completed)
2. Calculate derived fields:
   - days_until_due: days between now and due_date
   - is_overdue: boolean (due_date < now and incomplete)
   - is_due_today: boolean (due_date is today)
   - days_overdue: days since due_date (if overdue)
3. Format output data:
   - Format dates as ISO 8601 strings
   - Format timestamps consistently
   - Ensure field naming follows conventions (camelCase for JSON)

### Step 9: Consistency and Integrity Checks
1. Check referential integrity:
   - Task references valid user (user_id exists)
   - Task references valid tenant (tenant_id exists)
2. Check data consistency:
   - completed_at is not null only if status is completed
   - completed_by is not null only if status is completed
   - updated_at is always after created_at (or equal for new tasks)
   - Due date is after creation date (if enforced)
3. Check state consistency:
   - Task status matches completed_at presence
   - Task status matches completed_by presence

### Step 10: Response Preparation
1. For successful operations:
   - Return validated task object
   - Include all task fields
   - Include enriched/derived fields
   - Include audit metadata (if applicable)
2. For query operations:
   - Return task list with pagination metadata
   - Include total count
   - Include page information
   - Include filters applied
   - Include sort applied
3. For validation errors:
   - Return error with field-level details
   - Return validation rules violated
   - Return suggested corrections
4. For business rule violations:
   - Return error with rule name
   - Return rule description
   - Return action required to resolve

## Outputs

### Primary Output: Task Business Logic Result

```yaml
task_result:
  meta:
    operation: enum(create|update|complete|reopen|delete|query)
    user_id: string  # UUID
    tenant_id: string  # UUID
    timestamp: datetime
    request_id: string
    success: boolean

  # Successful Operation Output
  task:
    task_id: string  # UUID
    user_id: string  # UUID
    tenant_id: string  # UUID
    title: string
    description: string  # Optional
    status: enum(incomplete|completed)
    priority: enum(low|medium|high|critical)
    due_date: datetime  # Optional
    tags: [string]  # Optional
    created_at: datetime
    created_by: string  # UUID
    updated_at: datetime
    updated_by: string  # UUID
    completed_at: datetime  # Null if incomplete
    completed_by: string  # UUID, Null if incomplete

    # Enriched fields (read-only)
    derived:
      days_until_due: int
      is_overdue: boolean
      is_due_today: boolean
      days_overdue: int
      task_age_seconds: int
      urgency_level: enum(low|medium|high|critical)

  # Query Operation Output
  query_result:
    tasks: [object]  # Array of task objects
    pagination:
      page: int
      limit: int
      total: int
      pages: int
      has_next: boolean
      has_previous: boolean
    filters_applied:
      status: string
      priority: string
      due_date_range:
        from: datetime
        to: datetime
      tags: [string]
      search_query: string
    sort_applied:
      field: string
      direction: enum(asc|desc)

  # Validation Error Output
  validation_error:
    code: enum(VALIDATION_ERROR|MISSING_REQUIRED_FIELD|INVALID_FIELD_TYPE|INVALID_FIELD_FORMAT|FIELD_LENGTH_VIOLATION|INVALID_ENUM_VALUE)
    message: string
    field_errors:
      - field: string
        error_code: string
        message: string
        current_value: any
        allowed_values: [any]
        min_length: int
        max_length: int
    rules_violated: [string]
    corrections: [string]

  # Business Rule Error Output
  business_rule_error:
    code: enum(BUSINESS_RULE_VIOLATION|OWNERSHIP_VIOLATION|STATE_TRANSITION_ERROR|IMMUTABLE_FIELD_ERROR|DEPENDENCY_ERROR)
    message: string
    rule_name: string
    rule_description: string
    violated_constraints: [string]
    action_required: string

  # Audit Output
  audit_log:
    operation: enum(create|update|complete|reopen|delete)
    task_id: string
    user_id: string
    timestamp: datetime
    changes:
      old_values: object  # For updates
      new_values: object  # For updates
      fields_changed: [string]
    previous_state: object  # For updates
    new_state: object

  # Business Rules Applied
  business_rules:
    enforced_rules: [string]
    skipped_rules: [string]
    rule_results:
      - rule: string
        enforced: boolean
        result: enum(passed|failed|skipped)
        details: string
```

### Secondary Outputs

1. **Task State Transition Diagram**: Valid transitions between task states
2. **Validation Rules Summary**: All validation rules for task attributes
3. **Error Code Reference**: Comprehensive list of error codes and meanings
4. **Business Rules Documentation**: All business rules with descriptions
5. **Audit Log Schema**: Structure for audit trail records

## Scope & Boundaries

### This Skill MUST:

- Define task business rules and constraints
- Validate task data before persistence
- Enforce state transitions (incomplete → completed → reopened)
- Apply task ownership and access control logic
- Implement task filtering, sorting, and query logic
- Generate audit logs for task operations
- Enforce immutability of task metadata fields
- Calculate derived task fields (overdue, days_until_due, etc.)
- Detect business rule violations
- Provide clear error messages for validation failures
- Support task lifecycle management (create, update, complete, reopen, delete)

### This Skill MUST NOT:

- Handle user authentication (login, JWT validation, token issuance)
- Define database schemas or SQLModel models
- Create or execute database queries
- Write database migration scripts
- Generate frontend UI components or code
- Create HTML/CSS/JavaScript/TypeScript code
- Implement API endpoints or route handlers
- Configure Next.js or frontend frameworks
- Generate frontend task list, form, or detail components
- Implement caching or performance optimization
- Manage user sessions or token refresh
- Store or retrieve data from database

### Boundary Examples

**In Scope:**
- Validate task title is required and has 1-255 characters
- Enforce that completed tasks cannot be edited (if policy enabled)
- Calculate that task is overdue if due_date < now and status is incomplete
- Validate user owns task before allowing update
- Enforce state transition: incomplete → completed is allowed, completed → completed is not
- Generate audit log: "Task abc123 completed by user xyz at 2024-01-01T12:00:00Z"
- Filter tasks by status=incomplete and priority=high for user's tasks
- Sort tasks by due_date ascending, then by priority descending
- Derive is_overdue flag based on due_date and status

**Out of Scope:**
- Validate JWT token signature or claims
- Create SQLModel class: class Todo(SQLModel, table=True): ...
- Write database query: SELECT * FROM todos WHERE user_id = ...
- Create TodoForm component in React
- Write FastAPI route: @app.post("/api/todos") ...
- Implement JWT middleware for API authentication
- Generate TypeScript interface: interface Task { id: string; title: string; ... }
- Create task list UI with checkboxes
- Configure Next.js page routing
- Store task in database or retrieve from database

## Dependencies

### Required Dependencies

1. **Spec-Kit Plus Schema**
   - Location: `/specs/.spec-kit/schema.md`
   - Purpose: Defines specification file structure

2. **Project Configuration**
   - Location: `/specs/.spec-kit/config.md`
   - Purpose: Provides business logic layer details

### Specification Dependencies

1. **Feature Specs**
   - Location: `/specs/features/*.md`
   - Purpose: Define task CRUD requirements, business scenarios, validation rules

2. **Database Specs**
   - Location: `/specs/database/*.md`
   - Purpose: Define task model structure and field constraints

3. **Task Specs**
   - Location: `/specs/tasks/*.md`
   - Purpose: Define task behaviors, state transitions, business rules

4. **Architecture Specs**
   - Location: `/specs/architecture/*.md`
   - Purpose: Define business logic patterns and validation strategies

### Skill Dependencies

1. **Spec Interpretation Skill**
   - Purpose: Parse and understand task and feature specifications
   - Used to extract business rules, validation rules, and task behaviors

### Optional Dependencies

1. **Authentication Skill**
   - Purpose: Understand user context structure (user_id, roles, tenant_id)
   - Used to validate user context but NOT to perform authentication

2. **Database Modeling Skill**
   - Purpose: Understand task model structure for validation
   - Used to reference entity definitions for validation rules

3. **Validation Specs**
   - Location: `/specs/validation/*.md`
   - Purpose: Define additional validation rules and constraints

4. **Audit Specs**
   - Location: `/specs/audit/*.md`
   - Purpose: Define audit logging requirements

## Used By Agents

### Primary Consumers

1. **General-Purpose Agents**
   - When implementing task CRUD operations
   - When applying business rules to task operations
   - When validating task data before persistence
   - When enforcing task ownership and access control

2. **Backend Implementation Agents**
   - When writing task service layer business logic
   - When implementing validation in task endpoints
   - When creating task repository methods with business rules
   - When implementing task filtering and sorting logic

3. **API Implementation Agents**
   - When integrating business logic into API endpoints
   - When implementing validation in FastAPI routes
   - When enforcing ownership in task endpoints
   - When returning appropriate error responses

4. **Plan Agents (Software Architect)**
   - When designing business logic layer
   - When planning task state machine
   - When designing validation strategy
   - When planning audit logging implementation

### Secondary Consumers

1. **Test Generation Agents**
   - When creating unit tests for business logic
   - When generating test scenarios for validation rules
   - When testing state transitions
   - When mocking business logic in integration tests

2. **Frontend Agents**
   - When understanding validation rules for form validation
   - When implementing client-side validation (mirroring server-side)
   - When displaying error messages from business logic

3. **Documentation Agents**
   - When documenting business rules
   - When creating API documentation for task operations
   - When writing error code reference documentation

## Integration Notes

### Calling Convention

```yaml
skill: "task-business-logic"
inputs:
  task_spec: "features/task-crud.md"
  feature_spec: "features/todo-advanced.md"
  operation: enum(create|update|complete|reopen|delete|query)
  user_context:
    user_id: string  # UUID
    roles: [string]
    tenant_id: string  # UUID
  task_data:
    task_id: string  # UUID (for update, complete, reopen, delete)
    title: string
    description: string
    status: string
    priority: string
    due_date: datetime
    tags: [string]
  query_params:
    filters: object
    sort: object
    pagination: object
  output_format: "task_result"
```

### Error Handling

- **Missing Required Fields**: Return validation error with list of missing fields
- **Invalid Field Values**: Return validation error with field-specific details
- **Business Rule Violation**: Return business rule error with rule name and description
- **Ownership Violation**: Return ownership error with user-friendly message
- **State Transition Error**: Return state transition error with valid transitions

### Phase I Compatibility

This skill must preserve all Phase I features:
- Basic CRUD (create, read, update, delete tasks)
- Intermediate features (due dates, priorities, tags)
- Advanced features (filtering, sorting, searching)
- Task completion and reopening
- Task ownership (user-specific data)

All Phase I business rules must be enforced in Phase II:
- Title is required (1-255 characters)
- Due date validation
- Priority enum values
- Tag uniqueness and limits
- Status state transitions

### Deterministic Behavior

- Same input always produces same output
- No randomness or external dependencies in business logic
- Validation rules are consistent and predictable
- Error messages are deterministic based on error type

### Reusability

- Business rules are abstract and not tied to specific frameworks
- Skill can be used with any backend framework (FastAPI, Flask, etc.)
- Validation logic can be reused across different layers (API, service, repository)
- Error codes and messages are consistent across the application

---

**Version:** 1.0.0
**Last Updated:** 2026-01-01
**Maintainer:** Spec-Kit Plus AI Agent System
