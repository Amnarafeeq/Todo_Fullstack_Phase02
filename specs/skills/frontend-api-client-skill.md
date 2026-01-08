# Frontend API Client Skill

## Purpose

To create a reusable API client in the frontend that handles all communication with backend endpoints, attaches JWT tokens, and manages request/response handling, errors, and data transformation. This skill centralizes HTTP communication logic, provides type-safe API interactions, handles authentication token management, and standardizes error handling across the frontend application. It serves as the reasoning layer for frontend-backend communication architecture.

## When to Use (Trigger Conditions)

This skill should be invoked when:

- A new API endpoint needs to be integrated into the frontend
- API client architecture is being designed or refactored
- JWT token attachment to requests needs configuration
- Request/response data transformation logic is required
- Error handling and retry logic needs standardization
- Request interceptors (logging, auth token injection) are needed
- Response interceptors (error handling, data extraction) are needed
- API caching strategies are being implemented
- File upload/download handling is required
- WebSocket client setup is needed (if applicable)
- API request mocking for development is needed
- Request cancellation and timeout handling is required
- Optimistic updates and cache invalidation are being planned

**Triggers:**
- API spec defines new endpoints to be consumed
- Feature spec requires data fetching from backend
- Auth spec requires JWT token management for API calls
- Backend integration patterns need design
- Error handling strategy for API failures is being defined

## Inputs

### Required Inputs

1. **API Specification File**
   - Format: String path relative to `/specs/` directory
   - Examples: `api/routes/todos.md`, `api/routes/auth.md`, `api/endpoints.md`

2. **Feature Specification File** (Optional but recommended)
   - Format: String path relative to `/specs/` directory
   - Examples: `features/todo-crud.md`, `features/user-profile.md`
   - Purpose: Understand data requirements and usage patterns

3. **Authentication Context**
   - JWT token location (storage mechanism)
   - Token refresh strategy (automatic refresh vs manual)
   - Token attachment method (Authorization header, cookie)

### Request-Specific Inputs

1. **For Making Requests:**
   - HTTP method (GET, POST, PATCH, DELETE)
   - Endpoint path (e.g., `/api/v1/todos`)
   - Request body (for POST, PATCH)
   - Query parameters (for GET)
   - Path parameters (for dynamic URLs)
   - Request headers (custom headers beyond auth)

2. **For Handling Responses:**
   - Expected response format (JSON, blob, text)
   - Success response schema (TypeScript interface)
   - Error response schema
   - Data transformation requirements

### Supported Specification Types

| Spec Type | Location Pattern | Purpose |
|-----------|-----------------|---------|
| API Specs | `/specs/api/*.md` | Endpoint definitions, request/response schemas, error handling |
| Feature Specs | `/specs/features/*.md` | Data requirements, usage patterns, caching needs |
| Auth Specs | `/specs/auth/*.md` | Token management, protected endpoints, refresh strategies |
| Architecture Specs | `/specs/architecture/*.md` | API client patterns, error handling architecture |

### Specification Format Expectations

API specs MUST include:
- Endpoint paths and HTTP methods
- Request body schemas (for POST, PATCH)
- Query parameter definitions (for GET)
- Response schemas (success and error)
- Authentication requirements
- Error response formats
- Rate limiting information

Feature specs MUST include:
- Data fetching requirements
- Caching strategies
- Real-time update needs
- Optimistic update requirements

## Actions

### Step 1: Endpoint Analysis
1. Extract endpoint details from API specification:
   - Base URL (e.g., `http://localhost:8000/api/v1`)
   - Endpoint path (e.g., `/todos`, `/todos/{id}`)
   - HTTP method (GET, POST, PATCH, DELETE)
2. Identify request requirements:
   - Request body schema and required fields
   - Query parameters and their types
   - Path parameters and their types
   - Custom headers needed
3. Identify response requirements:
   - Success response schema
   - Error response schema
   - HTTP status codes for success and error
4. Identify authentication requirements:
   - Token required (yes/no)
   - Token type (Bearer JWT, API key, etc.)
   - Token location (Authorization header, cookie)

### Step 2: Request Construction
1. Build HTTP request:
   - Combine base URL with endpoint path
   - Substitute path parameters with actual values
   - Append query parameters (properly URL-encoded)
   - Set HTTP method
   - Set Content-Type header (default: `application/json`)
   - Set Accept header (default: `application/json`)
   - Add custom headers if required
2. Serialize request body:
   - Convert JavaScript/TypeScript object to JSON
   - Handle FormData for file uploads
   - Handle multipart/form-data for file uploads
3. Set request options:
   - Timeout duration (default: 30 seconds)
   - Credentials mode (include, same-origin, omit)
   - Cache mode (no-cache, reload, default)

### Step 3: Authentication Token Management
1. Retrieve JWT token:
   - From httpOnly cookie (recommended for security)
   - From localStorage (if using token-based auth)
   - From memory state (for SSR compatibility)
2. Validate token presence:
   - Check if token exists
   - Check if token is not expired (if stored with expiration)
3. Attach token to request:
   - Add to Authorization header: `Authorization: Bearer ${token}`
   - Or rely on httpOnly cookie (automatic)
4. Handle missing/invalid token:
   - Return error (401 Unauthorized)
   - Redirect to login page
   - Trigger token refresh (if refresh token available)

### Step 4: Request Interceptor Logic
1. Apply request interceptors (before request is sent):
   - Inject JWT token into Authorization header
   - Add request ID for tracking (X-Request-ID header)
   - Add timestamp (X-Request-Time header)
   - Log request details (method, URL, headers, body - omit sensitive data)
   - Apply rate limiting (client-side throttling)
2. Handle request cancellation:
   - Support AbortController for request cancellation
   - Cancel previous requests for same endpoint (if configured)
   - Cancel requests on component unmount
3. Apply retry logic:
   - Retry failed requests with exponential backoff
   - Retry only on specific error codes (500, 502, 503, 504)
   - Limit retry attempts (default: 3)
   - Respect Retry-After header if present

### Step 5: Response Processing
1. Parse response:
   - Check HTTP status code
   - Parse response body based on Content-Type:
     - `application/json` → Parse as JSON
     - `text/*` → Parse as text
     - `application/octet-stream` → Parse as blob
2. Extract data from response:
   - For 200-299 status codes: Extract success data
   - For 400-499 status codes: Extract error details
   - For 500-599 status codes: Extract server error details
3. Transform response data:
   - Convert snake_case (backend) to camelCase (frontend)
   - Transform date strings to Date objects
   - Transform UUID strings to typed IDs
   - Apply custom transformations if required
4. Validate response schema:
   - Validate against TypeScript interface
   - Validate required fields exist
   - Validate field types
   - Handle unexpected schema changes gracefully

### Step 6: Response Interceptor Logic
1. Apply response interceptors (after response is received):
   - Extract error details from error responses
   - Check for token expiration (401 with specific error code)
   - Trigger token refresh if needed
   - Log response details (status, headers, body - omit sensitive data)
   - Track response metrics (latency, status codes)
2. Handle successful responses:
   - Return data in standardized format
   - Include metadata (pagination, filters, sorting)
   - Update cache if applicable
   - Trigger optimistic update rollback if needed
3. Handle error responses:
   - Parse error message and error code
   - Extract field-level validation errors
   - Extract rate limit information (if applicable)
   - Return standardized error object

### Step 7: Error Handling Strategy
1. Categorize errors:
   - Network errors (no internet, DNS failure, timeout)
   - Client errors (400-499): Bad request, unauthorized, forbidden, not found
   - Server errors (500-599): Internal server error, service unavailable
   - Authentication errors (401): Invalid or expired token
   - Authorization errors (403): Insufficient permissions
   - Validation errors (422): Invalid request data
   - Rate limit errors (429): Too many requests
2. Handle authentication errors (401):
   - Attempt token refresh if refresh token available
   - If refresh succeeds, retry original request
   - If refresh fails, redirect to login page
   - Clear stored tokens
3. Handle authorization errors (403):
   - Show user-friendly error message
   - Log to console/monitoring service
   - Optionally redirect to error page
4. Handle validation errors (422):
   - Extract field-level errors
   - Map errors to form fields for display
   - Return detailed error object for UI
5. Handle rate limit errors (429):
   - Extract Retry-After header
   - Show user-friendly message with wait time
   - Schedule retry after delay (if applicable)
6. Handle network errors:
   - Show offline/error message
   - Implement retry logic with exponential backoff
   - Check internet connectivity
7. Handle server errors (500+):
   - Show generic error message
   - Log error details to monitoring service
   - Implement retry logic for idempotent requests

### Step 8: Data Transformation
1. Transform request data (frontend → backend):
   - Convert camelCase to snake_case (e.g., `userId` → `user_id`)
   - Convert Date objects to ISO 8601 strings
   - Format boolean values (if backend expects specific format)
   - Handle null/undefined values (omit or send as null)
   - Handle nested objects and arrays
2. Transform response data (backend → frontend):
   - Convert snake_case to camelCase (e.g., `user_id` → `userId`)
   - Convert ISO 8601 strings to Date objects
   - Handle null values appropriately
   - Flatten nested objects if needed
   - Transform arrays to typed arrays
3. Type conversion:
   - String → Number (e.g., "123" → 123)
   - String → Boolean (e.g., "true" → true)
   - String → Enum (map string values to enum members)
   - Number → String (e.g., 123 → "123")

### Step 9: Caching Strategy
1. Determine cacheability:
   - GET requests: Cacheable by default
   - POST/PATCH/DELETE: Invalidate cache
   - Cache duration based on endpoint (e.g., 5 minutes for user profile, 30 seconds for todos)
2. Implement cache keys:
   - Generate unique cache key from endpoint, method, params, body
   - Example: `GET:/api/v1/todos?page=1&limit=10`
3. Cache invalidation:
   - Invalidate on POST/PATCH/DELETE
   - Invalidate based on resource path (e.g., POST /api/v1/todos invalidates all /api/v1/todos cache)
   - Implement partial cache invalidation (if applicable)
4. Cache revalidation:
   - Stale-while-revalidate: Serve stale data, fetch fresh in background
   - Refetch on window focus
   - Refetch on reconnection
   - Refetch on interval (polling)

### Step 10: Optimistic Updates
1. Identify updateable endpoints:
   - POST (create)
   - PATCH (update)
   - DELETE (delete)
2. Cache previous state before optimistic update
3. Update cache with optimistic result:
   - Add new item to list (POST)
   - Update item in list (PATCH)
   - Remove item from list (DELETE)
4. Rollback on error:
   - Restore previous state if request fails
   - Show error notification
   - Automatically refetch correct data

### Step 11: Request Type Safety
1. Define TypeScript interfaces for all API requests:
   - Request body interfaces (for POST, PATCH)
   - Query parameter interfaces (for GET)
   - Path parameter interfaces
2. Define TypeScript interfaces for all API responses:
   - Success response interfaces
   - Error response interfaces
   - Paginated response interfaces
3. Define generic API client type:
   - Type-safe method signatures
   - Generic for response type
   - Generic for error type
4. Ensure type safety at compile time:
   - TypeScript checks request body structure
   - TypeScript checks response type
   - Prevent typos and type errors

### Step 12: Request Response Standardization
1. Define standard response wrapper:
   ```typescript
   interface ApiResponse<T> {
     data: T;
     success: boolean;
     message?: string;
     metadata?: {
       pagination?: {
         page: number;
         limit: number;
         total: number;
         pages: number;
       };
       filters?: object;
       sort?: object;
     };
   }
   ```
2. Define standard error response:
   ```typescript
   interface ApiError {
     success: false;
     error: {
       code: string;
       message: string;
       details?: {
         field?: string;
         message?: string;
       }[];
       request_id: string;
       timestamp: string;
     };
   }
   ```
3. Ensure consistent response format across all endpoints

### Step 13: Client-Side API Functions
1. Create typed API functions for each endpoint:
   - GET function: `getTodos(params): Promise<ApiResponse<Todo[]>>`
   - POST function: `createTodo(data): Promise<ApiResponse<Todo>>`
   - PATCH function: `updateTodo(id, data): Promise<ApiResponse<Todo>>`
   - DELETE function: `deleteTodo(id): Promise<ApiResponse<void>>`
2. Organize API functions by resource:
   - `todoApi.getTodos()`
   - `todoApi.getTodo(id)`
   - `todoApi.createTodo(data)`
   - `todoApi.updateTodo(id, data)`
   - `todoApi.deleteTodo(id)`
3. Support query parameters and path parameters
4. Support request cancellation (AbortController)

## Outputs

### Primary Output: API Client Specification

```yaml
api_client_specification:
  meta:
    api_spec: string
    feature_spec: string
    version: string
    base_url: string  # e.g., http://localhost:8000/api/v1

  endpoints:
    - name: string  # e.g., getTodos
      resource: string  # e.g., todos
      method: enum(GET|POST|PATCH|DELETE)
      path: string  # e.g., /todos
      requires_auth: boolean

      request:
        path_params:
          - name: string
            type: string
            required: boolean

        query_params:
          - name: string
            type: string
            required: boolean
            default: any

        body:
          type: object
          required_fields: [string]
          optional_fields: [string]

        headers:
          - name: string
            required: boolean
            default: string

      response:
        success:
          status_code: int
          data_type: string  # TypeScript interface name
          wrapper: enum(data|pagination|list|single)

        error:
          status_codes: [int]
          error_type: string

      cache:
        cacheable: boolean
        duration_seconds: int
        invalidate_on: [string]  # Operations that invalidate this cache

      retry:
        enabled: boolean
        max_attempts: int
        backoff: enum(fixed|exponential)

      timeout:
        enabled: boolean
        duration_seconds: int

  type_definitions:
    request_types:
      - name: string  # TypeScript interface name
        endpoint: string
        properties:
          - name: string
            type: string
            required: boolean
            nullable: boolean

    response_types:
      - name: string
        endpoint: string
        properties:
          - name: string
            type: string
            required: boolean
            nullable: boolean
            is_enum: boolean

    error_types:
      - name: string
        error_codes: [string]
        properties:
          - name: string
            type: string
            required: boolean

  auth_config:
    token_storage: enum(cookie|localStorage|memory)
    token_type: "Bearer"
    token_header: "Authorization"
    auto_refresh: boolean
    refresh_endpoint: string
    on_unauthorized: enum(redirect_to_login|throw_error|retry_with_refresh)

  error_handling:
    network_errors:
      retry_enabled: boolean
      retry_attempts: int
      backoff_ms: int

    client_errors:
      401:
        action: enum(refresh_token|redirect_to_login|throw_error)
        refresh_endpoint: string
      403:
        action: enum(throw_error|redirect_to_error_page|show_message)
      404:
        action: enum(throw_error|show_message|return_null)
      422:
        action: enum(throw_error|return_validation_errors)
      429:
        action: enum(retry_after|show_message|throw_error)
        respect_retry_after: boolean

    server_errors:
      retry_enabled: boolean
      retry_attempts: int
      backoff_ms: int

  data_transformation:
    request_transform:
      - transform: enum(camel_to_snake|date_to_iso|bool_to_string)
      enabled: boolean

    response_transform:
      - transform: enum(snake_to_camel|iso_to_date|string_to_bool)
      enabled: boolean

    custom_transforms:
      - field: string
        from_type: string
        to_type: string
        transform_function: string

  interceptors:
    request:
      - name: string
        order: int
        action: enum(add_token|add_request_id|log_request|throttle)
        config: object

    response:
      - name: string
        order: int
        action: enum(check_token_expiry|log_response|handle_errors|extract_data)
        config: object

  cache_config:
    enabled: boolean
    strategy: enum(stale_while_revalidate|cache_first|network_only)
    default_duration_seconds: int
    cache_by_endpoint:
      - endpoint: string
        duration_seconds: int
        revalidation_interval_seconds: int

  optimistic_updates:
    - endpoint: string
      method: enum(POST|PATCH|DELETE)
      rollback_on_error: boolean
      invalidates_cache: [string]

  api_functions:
    - name: string
      endpoint: string
      method: enum(GET|POST|PATCH|DELETE)
      typescript_signature: string
      usage_example: string
      returns: string  # Promise type

  client_methods:
    - name: string
      purpose: string
      signature: string
      description: string
      example: string
```

### Secondary Outputs

1. **TypeScript Interface Definitions**: All request/response interfaces
2. **API Function Skeletons**: Type-safe function signatures
3. **Error Code Reference**: Comprehensive error codes and handling strategies
4. **Cache Strategy Documentation**: Cache rules and invalidation patterns
5. **Integration Examples**: Usage examples for each endpoint

## Scope & Boundaries

### This Skill MUST:

- Design API client architecture for frontend-backend communication
- Create type-safe request/response interfaces
- Implement JWT token attachment to requests
- Handle request/response data transformation
- Standardize error handling across all API calls
- Implement request/response interceptors
- Design caching strategies for GET requests
- Plan optimistic updates for write operations
- Define retry logic for failed requests
- Handle authentication errors and token refresh
- Transform data between frontend (camelCase) and backend (snake_case)
- Create reusable API client utilities

### This Skill MUST NOT:

- Generate UI components or rendering code
- Implement backend API endpoints
- Define database schemas or models
- Create database queries or migrations
- Implement server-side business logic
- Manage user sessions on the server
- Store or retrieve data directly from database
- Implement actual HTTP requests (only design/spec)
- Configure Next.js API routes (those are backend)
- Implement authentication logic (JWT validation, token issuance)
- Generate HTML/CSS/JavaScript code
- Handle file uploads (only design the interface)

### Boundary Examples

**In Scope:**
- Design API client function: `getTodos(page, limit): Promise<Todo[]>`
- Define TypeScript interface: `interface Todo { id: string; title: string; userId: string; }`
- Transform request data: `{ userId: "123" }` → `{ user_id: "123" }`
- Transform response data: `{ user_id: "123" }` → `{ userId: "123" }`
- Handle 401 error: Refresh token, retry request
- Cache GET /api/todos for 30 seconds
- Implement retry logic with exponential backoff for 500 errors
- Attach JWT token to Authorization header: `Authorization: Bearer ${token}`
- Define error response interface: `interface ApiError { code: string; message: string; }`

**Out of Scope:**
- Create TaskList component in React
- Write FastAPI route: @app.get("/api/todos")
- Validate JWT token or issue new tokens
- Create SQLModel class: class Todo(SQLModel, table=True): ...
- Write database query: SELECT * FROM todos WHERE user_id = ...
- Implement actual fetch request: `fetch('/api/todos', ...)`
- Generate actual React hooks: `const { data } = useQuery(...)`
- Configure Next.js middleware for authentication
- Store user session in database or cookies
- Implement actual HTTP client (only design/spec)

## Dependencies

### Required Dependencies

1. **Spec-Kit Plus Schema**
   - Location: `/specs/.spec-kit/schema.md`
   - Purpose: Defines specification file structure

2. **Project Configuration**
   - Location: `/specs/.spec-kit/config.md`
   - Purpose: Provides frontend/backend stack details

### Specification Dependencies

1. **API Specs**
   - Location: `/specs/api/*.md`
   - Purpose: Define endpoint contracts, request/response schemas, error handling

2. **Feature Specs**
   - Location: `/specs/features/*.md`
   - Purpose: Define data requirements, caching needs, usage patterns

3. **Auth Specs**
   - Location: `/specs/auth/*.md`
   - Purpose: Define JWT token structure, refresh strategies, protected endpoints

4. **Architecture Specs**
   - Location: `/specs/architecture/*.md`
   - Purpose: Define API client patterns, error handling architecture

### Skill Dependencies

1. **Spec Interpretation Skill**
   - Purpose: Parse and understand API and auth specifications
   - Used to extract endpoint contracts, token requirements, and error handling needs

2. **API Construction Skill**
   - Purpose: Understand backend API endpoint design
   - Used to ensure frontend client matches backend contracts

3. **Authentication Skill**
   - Purpose: Understand JWT token structure and refresh logic
   - Used to design token attachment and refresh strategies

### Optional Dependencies

1. **Frontend UI Skill**
   - Purpose: Understand UI requirements for data fetching
   - Used to plan caching and optimization strategies

2. **Validation Specs**
   - Location: `/specs/validation/*.md`
   - Purpose: Define validation error handling requirements

## Used By Agents

### Primary Consumers

1. **General-Purpose Agents**
   - When implementing API client functions
   - When integrating new backend endpoints
   - When handling API errors and retries
   - When implementing caching strategies

2. **Frontend Implementation Agents**
   - When creating TypeScript API client
   - When writing API functions with type safety
   - When implementing request/response interceptors
   - When integrating with React Query, SWR, or similar libraries

3. **Data Layer Agents**
   - When designing data fetching architecture
   - When implementing optimistic updates
   - When configuring cache strategies
   - When implementing error boundaries for API calls

4. **Plan Agents (Software Architect)**
   - When designing frontend-backend communication
   - When planning API client architecture
   - When designing error handling strategy
   - When planning caching and optimization

### Secondary Consumers

1. **Test Generation Agents**
   - When creating API client unit tests
   - When mocking API responses for frontend testing
   - When testing error handling scenarios
   - When testing retry and retry logic

2. **Frontend UI Agents**
   - When integrating API client into components
   - When designing loading and error states
   - When implementing data fetching hooks

3. **Documentation Agents**
   - When documenting API client usage
   - When creating API integration guides
   - When documenting error codes and handling

## Integration Notes

### Calling Convention

```yaml
skill: "frontend-api-client"
inputs:
  api_spec: "api/routes/todos.md"
  feature_spec: "features/todo-crud.md"
  auth_spec: "auth/user-auth.md"
  operation: enum(analyze_endpoint|create_client_function|handle_error|transform_data)
  endpoint:
    path: string
    method: enum(GET|POST|PATCH|DELETE)
  auth_context:
    token_location: enum(cookie|localStorage|memory)
    auto_refresh: boolean
    refresh_endpoint: string
  data_transform:
    request_transform: enum(camel_to_snake|none)
    response_transform: enum(snake_to_camel|none)
  output_format: "api_client_specification"
```

### Error Handling

- **Missing API Specs**: Return error with available spec locations
- **Inconsistent API Contracts**: Identify mismatches between frontend and backend specs
- **Ambiguous Data Transformations**: Flag and request clarification
- **Invalid Auth Configuration**: Return configuration error with valid options

### TypeScript + Next.js + Fetch API Specifics

- Use native Fetch API for HTTP requests
- Use TypeScript for type safety
- Define interfaces for all request/response types
- Use async/await for async operations
- Use AbortController for request cancellation
- Implement retry logic with exponential backoff
- Support both cookie-based and header-based auth
- Use generic types for reusable API client functions

### Data Transformation Conventions

- Frontend uses camelCase: `userId`, `taskTitle`, `createdAt`
- Backend uses snake_case: `user_id`, `task_title`, `created_at`
- Transform on both request (camel → snake) and response (snake → camel)
- Transform dates: ISO 8601 strings ↔ Date objects
- Handle null/undefined consistently

### Error Handling Best Practices

- Standardize error response format across all endpoints
- Return typed error objects for UI consumption
- Implement retry logic for transient errors (500+, network errors)
- Refresh token on 401 errors (if refresh token available)
- Show user-friendly error messages
- Log errors for debugging and monitoring
- Implement exponential backoff for retries
- Respect Retry-After header for rate limits

### Caching Best Practices

- Cache GET requests with appropriate TTL
- Invalidate cache on POST/PATCH/DELETE
- Use stale-while-revalidate for better UX
- Generate unique cache keys from endpoint, method, params
- Support cache revalidation on window focus
- Support cache revalidation on reconnection
- Implement refetch on mount, focus, reconnect (React Query)

### Type Safety Best Practices

- Define TypeScript interfaces for all API contracts
- Use generic types for reusable API client
- Use discriminated unions for different response types
- Use strict null checks
- Use type guards for runtime validation
- Generate types from OpenAPI spec if available

---

**Version:** 1.0.0
**Last Updated:** 2026-01-01
**Maintainer:** Spec-Kit Plus AI Agent System
