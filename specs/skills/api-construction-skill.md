# API Construction Skill

## Purpose

To design and structure secure REST API endpoints in FastAPI, handling request/response schemas, and enforcing JWT authentication for user-specific data. This skill translates feature requirements into well-defined, RESTful API contracts while ensuring proper authentication, validation, and security. It serves as the reasoning layer for backend API architecture decisions.

## When to Use (Trigger Conditions)

This skill should be invoked when:

- New API endpoints need to be created for a feature
- Existing endpoints require modification or enhancement
- RESTful API structure is being designed or refactored
- Request and response validation schemas are needed
- JWT authentication needs to be applied to endpoints
- Authorization rules must be enforced for protected resources
- Error handling and status code conventions are being defined
- API versioning or route organization is required
- Multi-user data isolation needs API-level enforcement
- Rate limiting or throttling is being implemented
- File upload/download endpoints are being created
- WebSocket endpoints need design (if applicable)
- API documentation or OpenAPI specs are being generated

**Triggers:**
- Feature spec introduces new CRUD operations
- API spec defines new endpoints or routes
- Auth spec requires protected endpoints
- User registration/login endpoints are needed
- API security patterns are being designed

## Inputs

### Required Inputs

1. **Feature Specification File**
   - Format: String path relative to `/specs/` directory
   - Examples: `features/todo-crud.md`, `features/todo-filtering.md`, `features/user-profile.md`

2. **API Specification File** (Optional but recommended)
   - Format: String path relative to `/specs/` directory
   - Examples: `api/routes/todos.md`, `api/routes/auth.md`, `api/endpoints.md`

3. **Authentication Context**
   - Required authentication: boolean
   - Required authorization roles: [string]
   - User data isolation required: boolean

### Supported Specification Types

| Spec Type | Location Pattern | Purpose |
|-----------|-----------------|---------|
| Feature Specs | `/specs/features/*.md` | Business requirements, CRUD operations, user stories |
| API Specs | `/specs/api/*.md` | Endpoint definitions, route structure, API contracts |
| Auth Specs | `/specs/auth/*.md` | Authentication requirements, protected endpoint lists |
| Architecture Specs | `/specs/architecture/*.md` | API design patterns, security architecture |

### Specification Format Expectations

Feature specs MUST include:
- Functional requirements for API operations
- CRUD operation details (create, read, update, delete)
- Data fields and validation rules
- Business logic requirements
- Error scenarios and edge cases

API specs MUST include:
- Endpoint paths and HTTP methods
- Request/response data structures
- Authentication requirements
- Status code conventions
- Error response formats

## Actions

### Step 1: Endpoint Identification
1. Extract all CRUD operations from feature specification
2. Map operations to RESTful HTTP methods:
   - Create → POST
   - Read (single) → GET
   - Read (list) → GET with query parameters
   - Update → PUT (full) or PATCH (partial)
   - Delete → DELETE
3. Identify additional non-CRUD endpoints (bulk operations, search, filters)
4. Determine if endpoints are resource collections or individual resources
5. Group endpoints by domain entity (e.g., /api/todos, /api/users)

### Step 2: Route Design
1. Design RESTful route paths following conventions:
   - Collections: `/api/{resource}` (e.g., `/api/todos`)
   - Single resource: `/api/{resource}/{id}` (e.g., `/api/todos/{todo_id}`)
   - Nested resources: `/api/{resource1}/{id1}/{resource2}` (e.g., `/api/users/{user_id}/todos`)
   - Actions: `/api/{resource}/{id}/{action}` (e.g., `/api/todos/{todo_id}/complete`)
2. Apply HTTP method semantics:
   - GET: Retrieve data, no side effects
   - POST: Create new resource
   - PUT: Replace entire resource
   - PATCH: Partial update
   - DELETE: Remove resource
3. Ensure idempotency for GET, PUT, DELETE operations
4. Design route parameters for variable data (IDs, slugs)
5. Plan API versioning strategy (e.g., `/api/v1/`)

### Step 3: Request Schema Design
1. Define request body structure for POST, PUT, PATCH:
   - Identify all required fields with validation rules
   - Identify optional fields with default values
   - Specify data types for each field
   - Define field-level constraints (min/max length, patterns)
2. Define query parameters for GET requests:
   - Filtering parameters (e.g., `?status=completed`)
   - Sorting parameters (e.g., `?sort=-created_at`)
   - Pagination parameters (e.g., `?page=1&limit=10`)
   - Search parameters (e.g., `?q=search_term`)
3. Design path parameters:
   - Resource identifiers (UUIDs or slugs)
   - Nested resource references
4. Define header requirements:
   - Content-Type headers
   - Authorization headers (Bearer token)
   - Custom headers (X-Request-ID, etc.)
5. Specify validation rules:
   - Field types and formats
   - Required vs optional
   - Min/max values and lengths
   - Pattern matching (email, URL, regex)
   - Enum values for constrained fields

### Step 4: Response Schema Design
1. Define success response structures:
   - Single resource response (GET /api/{resource}/{id})
   - Collection response (GET /api/{resource})
   - Creation response (POST with 201 Created and resource in body)
   - Update response (200 OK with updated resource)
   - Delete response (204 No Content or 200 OK with deleted resource)
2. Design pagination metadata for collections:
   - Page number and size
   - Total items and total pages
   - Links (next, previous, first, last)
3. Define error response structures:
   - Error code and message
   - Request identifier
   - Timestamp
   - Validation errors field-by-field
   - Stack trace (development only)
4. Determine appropriate HTTP status codes:
   - 200 OK: Successful GET, PUT, PATCH, DELETE
   - 201 Created: Successful POST
   - 204 No Content: Successful DELETE (no body)
   - 400 Bad Request: Validation errors, malformed request
   - 401 Unauthorized: Missing or invalid authentication
   - 403 Forbidden: Valid auth but insufficient permissions
   - 404 Not Found: Resource doesn't exist
   - 409 Conflict: Resource already exists, unique constraint violation
   - 422 Unprocessable Entity: Validation errors
   - 429 Too Many Requests: Rate limit exceeded
   - 500 Internal Server Error: Server errors
5. Design hypermedia links (HATEOAS) if required:
   - Self link
   - Related resource links
   - Action links

### Step 5: Authentication Integration
1. Determine authentication requirements for each endpoint:
   - Public: No authentication required (e.g., health check)
   - Authenticated: Valid JWT required
   - Optional: Works with or without authentication
2. Specify authentication mechanism:
   - Bearer token in Authorization header
   - API key (if applicable)
   - Cookie-based session (if applicable)
3. Design authentication failure responses:
   - 401 Unauthorized with WWW-Authenticate header
   - Clear error message for missing token
   - Specific error for expired/invalid token
4. Plan token extraction and validation:
   - Extract token from Authorization header
   - Validate signature and claims
   - Extract user context (user_id, roles, tenant_id)

### Step 6: Authorization Enforcement
1. Define authorization rules for each endpoint:
   - Resource ownership (users can only access their own data)
   - Role-based access (admin, user, guest roles)
   - Permission-based access (todo:read, todo:write, todo:delete)
2. Design authorization checks:
   - Check user_id matches resource owner (for user-specific data)
   - Verify required roles/permissions in JWT claims
   - Check tenant_id for multi-tenant isolation
3. Define authorization failure responses:
   - 403 Forbidden with specific reason
   - Missing permission details
4. Plan authorization middleware or dependency injection

### Step 7: Validation Logic
1. Define request validation:
   - Field type validation (string, int, bool, etc.)
   - Length constraints (min/max for strings/arrays)
   - Numeric constraints (min/max for numbers)
   - Pattern validation (email, URL, regex)
   - Enum validation (allowed values)
   - Custom validators (business rules)
2. Define business logic validation:
   - Unique constraint checks (e.g., email uniqueness)
   - Referential integrity checks (e.g., valid foreign key)
   - State validation (e.g., can't delete completed todo)
   - Cross-field validation (e.g., end_date > start_date)
3. Plan validation error response format:
   - Field-level errors with field names
   - Error codes for each validation failure
   - User-friendly error messages

### Step 8: Error Handling Strategy
1. Define exception hierarchy:
   - Validation errors (HTTP 422)
   - Not found errors (HTTP 404)
   - Unauthorized errors (HTTP 401)
   - Forbidden errors (HTTP 403)
   - Conflict errors (HTTP 409)
   - Server errors (HTTP 500)
2. Design error response format:
   ```json
   {
     "error": {
       "code": "VALIDATION_ERROR",
       "message": "Invalid request data",
       "details": [
         {
           "field": "email",
           "message": "Invalid email format"
         }
       ],
       "request_id": "req_abc123",
       "timestamp": "2024-01-01T12:00:00Z"
     }
   }
   ```
3. Plan error logging and monitoring:
   - Log all errors with context
   - Include request ID for tracing
   - Distinguish client vs server errors
4. Define retry behavior for transient errors

### Step 9: Security Considerations
1. Apply security best practices:
   - Validate all inputs (never trust client data)
   - Sanitize outputs (prevent XSS, injection)
   - Use parameterized queries (prevent SQL injection)
   - Implement rate limiting per endpoint
   - Add CORS headers for frontend access
   - Set secure headers (CSP, X-Frame-Options, etc.)
2. Plan security middleware:
   - Request ID generation
   - Rate limiting
   - Security headers
   - Request logging
3. Design audit logging:
   - Log all state-changing operations (POST, PUT, PATCH, DELETE)
   - Include user context and timestamps
   - Log sensitive operations (login, password change)

### Step 10: OpenAPI Documentation
1. Generate OpenAPI specification:
   - Define endpoint paths and methods
   - Document request/response schemas
   - Include authentication requirements
   - Document parameters and headers
   - Provide example requests/responses
2. Add operation descriptions:
   - Clear summary of what endpoint does
   - Detailed description of parameters
   - Example usage
3. Document error responses:
   - All possible status codes
   - Error response schemas
   - Common error scenarios

## Outputs

### Primary Output: API Endpoint Specifications

```yaml
api_specification:
  meta:
    feature_spec: string
    api_spec: string
    version: string
    base_path: string  # e.g., /api/v1

  endpoints:
    - path: string  # e.g., /todos
      method: enum(GET|POST|PUT|PATCH|DELETE)
      operation_id: string  # e.g., create_todo
      summary: string  # Brief description
      description: string  # Detailed documentation
      tags: [string]  # For grouping in docs

      authentication:
        required: boolean
        scheme: "Bearer"
        token_location: enum(header|cookie|query)

      authorization:
        required: boolean
        roles: [string]  # Empty means any authenticated user
        permissions: [string]
        resource_owner_check: boolean  # Check user owns resource
        tenant_isolation: boolean

      request:
        body:
          content_type: "application/json"
          schema:
            type: object
            required: [string]
            properties:
              - name: string
                type: string
                required: boolean
                validation:
                  min_length: int
                  max_length: int
                  pattern: string  # regex
                  enum: [string]
                  default: any

        query_parameters:
          - name: string
            type: string
            required: boolean
            description: string
            default: any
            enum: [string]

        path_parameters:
          - name: string
            type: string
            required: boolean
            description: string
            format: enum(uuid|slug|int|string)

        headers:
          - name: string
            required: boolean
            description: string
            example: string

      responses:
        success:
          status_code: int
          content_type: string
          schema:
            type: object
            properties:
              - name: string
                type: string
                nested_schema: string  # Reference to named schema

        errors:
          - status_code: int
            schema: string  # Error schema reference
            scenarios: [string]  # When this error occurs

      validation:
        request_schema: string  # Named Pydantic model
        validators: [string]
        custom_validation_logic: [string]

      security:
        rate_limit:
          requests_per_minute: int
          per_user: boolean
        cors:
          allowed_origins: [string]
          allowed_methods: [string]
        headers:
          - string  # Security headers

      business_logic:
        operations: [string]
        side_effects: [string]
        database_operations: [string]

  named_schemas:
    - name: string  # Pydantic model name
      type: object|enum
      properties:
        - name: string
          type: string
          required: boolean
          validation: object
      description: string
      example: object

  error_schemas:
    - name: string
      status_code: int
      code: string
      message: string
      fields: [string]  # Fields with validation errors

  middleware:
    - type: enum(auth|authorization|rate_limit|cors|logging|request_id)
      endpoints: [string]  # Empty means all endpoints
      configuration: object

  openapi_spec:
    openapi: string  # e.g., "3.0.0"
    info:
      title: string
      version: string
    paths: object  # OpenAPI paths object
    components:
      schemas: object
      security_schemes: object
```

### Secondary Outputs

1. **Pydantic Model Definitions**: Request/response model structures
2. **FastAPI Route Skeletons**: Route function signatures and decorators
3. **Dependency Injection Plan**: Authentication and authorization dependencies
4. **Test Cases**: API contract test scenarios
5. **CURL Examples**: Sample requests for documentation

## Scope & Boundaries

### This Skill MUST:

- Design RESTful API endpoints with proper HTTP methods
- Define request and response schemas (Pydantic models)
- Specify authentication and authorization requirements
- Plan validation logic for request data
- Design error handling and status code strategies
- Document OpenAPI specifications
- Apply security best practices (rate limiting, CORS, headers)
- Plan multi-user data isolation at API level
- Design pagination, filtering, and sorting for list endpoints
- Map business requirements to API contracts

### This Skill MUST NOT:

- Generate frontend UI components or code
- Create database schemas or SQLModel models
- Write database migration scripts
- Implement business logic beyond API layer
- Create database queries or repositories
- Generate HTML/CSS/JavaScript/TypeScript code
- Configure Next.js or frontend frameworks
- Write actual FastAPI route handler implementations
- Create frontend API client code
- Implement caching or performance optimization
- Design frontend state management

### Boundary Examples

**In Scope:**
- Design POST /api/todos endpoint with request body schema
- Define GET /api/todos/{todo_id} response with all todo fields
- Specify that PUT /api/todos/{todo_id} requires authentication and user ownership check
- Design 401 Unauthorized response when JWT is missing or invalid
- Define query parameters for GET /api/todos?status=completed&sort=-created_at
- Specify validation: todo.title min_length=1, max_length=255
- Design pagination: GET /api/todos?page=1&limit=10 with metadata

**Out of Scope:**
- Create TodoForm component in React
- Write SQLModel class: class Todo(SQLModel, table=True): ...
- Generate Alembic migration script
- Implement business logic: "if todo is completed, user cannot edit title"
- Create TodoRepository with database queries
- Write SQL: SELECT * FROM todos WHERE user_id = ...
- Generate TypeScript interface: interface Todo { id: string; title: string; ... }
- Implement actual FastAPI route: @app.post("/api/todos") ...
- Create frontend API client: const response = await fetch('/api/todos', ...)

## Dependencies

### Required Dependencies

1. **Spec-Kit Plus Schema**
   - Location: `/specs/.spec-kit/schema.md`
   - Purpose: Defines specification file structure

2. **Project Configuration**
   - Location: `/specs/.spec-kit/config.md`
   - Purpose: Provides backend stack details (FastAPI, Pydantic)

### Specification Dependencies

1. **Feature Specs**
   - Location: `/specs/features/*.md`
   - Purpose: Define business requirements and CRUD operations

2. **API Specs**
   - Location: `/specs/api/*.md`
   - Purpose: Define endpoint requirements and API contracts

3. **Auth Specs**
   - Location: `/specs/auth/*.md`
   - Purpose: Define authentication and authorization requirements

4. **Architecture Specs**
   - Location: `/specs/architecture/*.md`
   - Purpose: Define API design patterns and security architecture

### Skill Dependencies

1. **Spec Interpretation Skill**
   - Purpose: Parse and understand feature and API specifications
   - Used to extract CRUD operations, validation rules, and business requirements

2. **Authentication Skill**
   - Purpose: Understand JWT token structure and validation requirements
   - Used to integrate authentication into endpoint design

### Optional Dependencies

1. **Database Modeling Skill**
   - Purpose: Understand database model structures for request/response schemas
   - Used to map database entities to API DTOs

2. **Validation Specs**
   - Location: `/specs/validation/*.md`
   - Purpose: Define validation rules and constraints

3. **Security Specs**
   - Location: `/specs/security/*.md`
   - Purpose: Define additional security requirements

## Used By Agents

### Primary Consumers

1. **General-Purpose Agents**
   - When implementing new API endpoints for features
   - When modifying existing endpoints
   - When adding authentication or authorization to endpoints
   - When designing API contracts

2. **Backend Implementation Agents**
   - When writing FastAPI route handlers
   - When creating Pydantic request/response models
   - When implementing validation logic
   - When adding middleware for auth and security

3. **API Implementation Agents**
   - When designing RESTful API structure
   - When implementing authentication middleware
   - When creating authorization dependencies
   - When writing error handling logic

4. **Plan Agents (Software Architect)**
   - When designing API architecture
   - When planning endpoint organization
   - When designing security and validation strategies

### Secondary Consumers

1. **Test Generation Agents**
   - When creating API contract tests
   - When generating test scenarios for endpoints
   - When mocking API responses for frontend testing

2. **Frontend Agents**
   - When understanding API contracts for client implementation
   - When generating TypeScript types from API schemas
   - When creating API client functions

3. **Documentation Agents**
   - When generating OpenAPI documentation
   - When creating API usage examples
   - When writing endpoint documentation

## Integration Notes

### Calling Convention

```yaml
skill: "api-construction"
inputs:
  feature_spec: "features/todo-crud.md"
  api_spec: "api/routes/todos.md"
  auth_context:
    authentication_required: boolean
    authorization_required: boolean
    required_roles: [string]
    resource_owner_check: boolean
    tenant_isolation: boolean
  base_path: "/api/v1"
  output_format: "endpoint_specifications"
```

### Error Handling

- **Missing Spec Files**: Return error with available spec locations
- **Ambiguous Requirements**: Flag ambiguous specs and request clarification
- **Invalid HTTP Method Mapping**: Suggest correct RESTful method
- **Conflicting Auth Requirements**: Identify conflicts in auth specs

### FastAPI + Pydantic Specifics

- Use Pydantic models for request/response validation
- Leverage Pydantic's built-in validators for common types
- Use FastAPI's dependency injection for auth and validation
- Generate OpenAPI docs automatically from Pydantic models
- Use HTTPException for error responses
- Implement status codes using FastAPI's status module

### RESTful Conventions

- Use nouns for resource names (e.g., `/todos`, `/users`)
- Use plural form for collection endpoints
- Use kebab-case for route paths (e.g., `/user-profiles`)
- Use HTTP status codes appropriately
- Implement idempotency for PUT and DELETE
- Use query parameters for filtering, sorting, pagination
- Use path parameters for resource identifiers

### Security Best Practices

- Require authentication for all state-changing operations (POST, PUT, PATCH, DELETE)
- Implement user ownership checks for user-specific resources
- Use tenant_id in all queries for multi-tenant isolation
- Apply rate limiting to prevent abuse
- Implement proper CORS configuration
- Add security headers to all responses
- Validate all inputs on the server side
- Never expose sensitive data in error messages

---

**Version:** 1.0.0
**Last Updated:** 2026-01-01
**Maintainer:** Spec-Kit Plus AI Agent System
