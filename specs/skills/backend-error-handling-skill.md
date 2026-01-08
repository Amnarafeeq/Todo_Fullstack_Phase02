# Backend Error Handling / Logging Skill

## Purpose

To handle errors in backend FastAPI application, generate structured logs for debugging and monitoring, and provide consistent error responses to frontend. This skill serves as the reasoning layer for error handling strategy, logging architecture, and error response formatting across the Todo application backend.

## When to Use (Trigger Conditions)

This skill should be invoked when:

- An exception occurs in backend (API endpoints, business logic, database)
- Validation errors are detected (invalid input, business rule violations)
- Database errors occur (constraint violations, connection failures)
- API errors need to be formatted and returned
- Authentication or authorization failures occur
- Unhandled exceptions are caught by global error handler
- Logging needs to be configured for monitoring
- Error responses need to be consistent across endpoints
- Error alerts or notifications need to be triggered

**Triggers:**
- Exception raised in FastAPI route handler
- Database constraint violation
- Authentication/authorization failure
- Business rule violation
- Validation error from Pydantic models
- Network or external service failure
- Global exception handler triggered

## Inputs

### Required Inputs

1. **Error Event Data**
   - Exception type and instance
   - Error message and stack trace
   - Error code or status
   - Timestamp of error
   - Request context (endpoint, method, parameters, headers)

2. **Request Context**
   - HTTP method and endpoint path
   - Request headers (sanitized)
   - Request parameters (path, query, body)
   - User ID (if authenticated)
   - Request ID/correlation ID

3. **Context Information**
   - Environment (development, staging, production)
   - Service name (e.g., "todo-api")
   - Instance or pod identifier
   - System resources (CPU, memory, disk usage)

### Supported Error Types

| Error Type | Source | Purpose |
|------------|--------|---------|
| Validation Errors | Pydantic models, custom validators | Invalid input, constraint violations |
| Authentication Errors | Auth middleware | Invalid credentials, token issues |
| Authorization Errors | Auth middleware | Insufficient permissions |
| Database Errors | SQLModel, database driver | Constraint violations, connection failures |
| Business Logic Errors | Service layer | Rule violations, invalid state transitions |
| API Errors | API endpoints | Invalid requests, unsupported operations |
| Network Errors | External services | Connection failures, timeouts |
| System Errors | Infrastructure | Resource exhaustion, service unavailable |

## Actions

### Step 1: Error Classification
1. Categorize error by type:
   - **Validation Errors**: Input validation, schema validation
   - **Authentication Errors**: Invalid credentials, token issues
   - **Authorization Errors**: Insufficient permissions
   - **Database Errors**: Constraint violations, connection issues
   - **Business Logic Errors**: Rule violations, state transitions
   - **Network Errors**: External service failures
   - **System Errors**: Resource exhaustion, infrastructure issues
2. Determine severity level:
   - **CRITICAL**: System-wide failure, data loss, security breach
   - **ERROR**: Feature broken, data corruption, service unavailable
   - **WARN**: Degraded functionality, potential issue
   - **INFO**: Normal operation, significant events
   - **DEBUG**: Detailed debugging information (development only)
3. Determine HTTP status code:
   - 400 Bad Request: Validation errors, invalid input
   - 401 Unauthorized: Invalid credentials, token issues
   - 403 Forbidden: Insufficient permissions
   - 404 Not Found: Resource doesn't exist
   - 409 Conflict: Duplicate data, constraint violation
   - 422 Unprocessable Entity: Validation errors
   - 429 Too Many Requests: Rate limit exceeded
   - 500 Internal Server Error: Unhandled exception, system error
   - 502 Bad Gateway: Upstream service failure
   - 503 Service Unavailable: Service overloaded
   - 504 Gateway Timeout: Request timeout

### Step 2: Error Context Extraction
1. Extract user context:
   - User ID (from JWT token or session)
   - User roles and permissions
   - Tenant ID (for multi-tenant)
   - Session ID or correlation ID
2. Extract request context:
   - HTTP method and endpoint
   - Request ID or correlation ID
   - Request parameters (path, query, body - sanitized)
   - Request headers (excluding Authorization token)
   - Client IP address
   - User agent
3. Extract system context:
   - Environment (development, staging, production)
   - Service name and version
   - Instance/pod identifier
   - Current timestamp
   - System resources (CPU, memory, disk usage if applicable)

### Step 3: Error Response Formatting
1. Design consistent error response structure:
   ```json
   {
     "success": false,
     "error": {
       "code": "VALIDATION_ERROR",
       "message": "Invalid request data",
       "details": [
         {
           "field": "title",
           "message": "Title is required"
         }
       ],
       "request_id": "req_abc123",
       "timestamp": "2024-01-01T12:00:00Z"
     }
   }
   ```
2. Define error code format:
   - Prefix by category: `VALIDATION_ERROR`, `AUTH_ERROR`, `AUTHZ_ERROR`, `DB_ERROR`, `BUSINESS_ERROR`, `API_ERROR`, `NETWORK_ERROR`, `SYSTEM_ERROR`
   - Specific error: `{CATEGORY}_{SPECIFIC_CODE}`
3. Define error messages:
   - User-friendly messages for display
   - Technical messages for debugging (development)
   - Include suggestions when applicable
4. Map error types to HTTP status codes:
   - Validation errors → 400 or 422
   - Authentication errors → 401
   - Authorization errors → 403
   - Not found → 404
   - Conflict → 409
   - Rate limit → 429
   - System errors → 500+

### Step 4: Logging Strategy
1. Design log entry structure:
   ```python
   log_entry = {
       "timestamp": datetime.utcnow(),
       "level": "ERROR",
       "service": "todo-api",
       "environment": "production",
       "request_id": "req_abc123",
       "user_id": "user_123",
       "error": {
           "type": "ValidationError",
           "code": "VALIDATION_ERROR",
           "message": str(exception),
           "stack_trace": traceback.format_exc(),
           "context": error_context
       }
   }
   ```
2. Determine log level:
   - DEBUG: Detailed debugging info (development only)
   - INFO: Normal operations, significant events
   - WARN: Potential issues, degraded functionality
   - ERROR: Errors requiring attention
   - CRITICAL: System-wide failures, data loss
3. Design log destinations:
   - **Development**: Console output
   - **Staging**: Console + log aggregation service
   - **Production**: Log aggregation service (Datadog, CloudWatch, etc.)
4. Design log rotation:
   - Retention period (e.g., 30 days)
   - Archive old logs to cold storage
   - Rotate log files (if using files)

### Step 5: Error Handling by Type
1. Handle validation errors:
   - Catch Pydantic ValidationErrors
   - Extract field-level errors
   - Map to 422 status code
   - Include field names and messages in response
2. Handle authentication errors:
   - Catch invalid credential exceptions
   - Catch expired token exceptions
   - Map to 401 status code
   - Suggest re-authentication
3. Handle authorization errors:
   - Catch permission denied exceptions
   - Map to 403 status code
   - Include required permissions
4. Handle database errors:
   - Catch SQLModel and database driver exceptions
   - Identify constraint violations (unique, foreign key)
   - Map to appropriate status code (409 for unique, 500 for connection)
   - Include constraint details in error message
5. Handle business logic errors:
   - Catch custom business rule exceptions
   - Map to appropriate status code (400 or 422)
   - Include business rule details
6. Handle network errors:
   - Catch connection failures, timeouts
   - Map to 502 or 504 status codes
   - Include retry information
7. Handle system errors:
   - Catch unhandled exceptions
   - Map to 500 status code
   - Include system context
   - Log with full stack trace

### Step 6: Global Exception Handler
1. Design FastAPI exception handler:
   ```python
   @app.exception_handler(Exception)
   async def global_exception_handler(request: Request, exc: Exception):
       # Log error
       logger.error(f"Unhandled exception: {exc}", exc_info=True)

       # Return formatted error response
       return JSONResponse(
           status_code=500,
           content={
               "success": false,
               "error": {
                   "code": "INTERNAL_SERVER_ERROR",
                   "message": "An unexpected error occurred"
               }
           }
       )
   ```
2. Register specific exception handlers:
   - ValidationError handler (Pydantic)
   - HTTPException handler (FastAPI)
   - Database error handler
   - Business logic error handler
3. Ensure handlers are registered before routes

### Step 7: Request ID Generation
1. Generate unique request ID:
   - Use UUID for uniqueness
   - Or use ULID for time-ordered IDs
2. Add request ID to all:
   - Log entries
   - Error responses
   - Monitoring spans
3. Include in headers:
   - `X-Request-ID: {request_id}`
4. Use request ID for:
   - Correlating logs across services
   - Tracing request through system
   - Debugging specific requests

### Step 8: Error Metrics and Monitoring
1. Track error metrics:
   - Error count by type
   - Error count by endpoint
   - Error count by user
   - Error rate (errors per request)
2. Track error trends:
   - Error count over time (hourly, daily, weekly)
   - Identify error spikes
   - Compare to baseline
3. Define metrics to monitor:
   - Error rate per endpoint
   - Error rate by error type
   - Response time for error responses
   - Resource usage during errors
4. Set up alerting:
   - Alert on error rate > threshold
   - Alert on new error types
   - Alert on critical errors

### Step 9: Error Recovery Guidance
1. Provide user-friendly error messages:
   - Explain what happened in plain language
   - Explain what user can do
   - Include error ID for support
2. Provide retry information:
   - Retry suggested for transient errors (network, timeout)
   - No retry for client errors (validation, auth)
   - Include retry-after header if applicable
3. Provide action suggestions:
   - "Please check your input and try again"
   - "Please contact support with error ID: {error_id}"
   - "Please refresh the page and try again"

### Step 10: Error Documentation
1. Document error codes:
   - Create comprehensive error code reference
   - Include error type, HTTP status, recovery actions
2. Document common errors:
   - When they occur
   - What causes them
   - How to resolve them
3. Document error handling patterns:
   - How to add new error handlers
   - How to customize error responses
   - How to configure logging

## Outputs

### Primary Output: Error Handling Specification

```yaml
error_handling_specification:
  meta:
    generated_at: datetime
    service: string  # e.g., "todo-api"
    version: string
    environment: enum(development|staging|production)

  error_types:
    - name: string  # e.g., "ValidationError"
      category: string  # e.g., "validation", "authentication", "database"
      severity: enum(debug|info|warn|error|critical)
      http_status_code: int
      error_code: string  # e.g., "VALIDATION_ERROR", "AUTH_ERROR"
      exception_type: string
      user_message: string
      technical_message: string
      recovery_actions: [string]

  exception_handlers:
    - exception_type: string
      handler_function: string
      http_status_code: int
      error_code: string
      log_level: string
      return_format: object

  logging:
    log_entry:
      timestamp: string
      level: enum(debug|info|warn|error|critical)
      service: string
      environment: string
      request_id: string
      user_id: string
      error: object

    destinations:
      - destination: enum(console|file|aggregation_service)
        enabled: boolean
        log_level: enum(debug|info|warn|error|critical)
        format: string  # json, text

    rotation:
      retention_days: int
      archive_after_days: int
      max_file_size_mb: int

  error_response:
    format: object
    structure:
      success: boolean
      error:
        code: string
        message: string
        details: [object]  # Field-level errors
        request_id: string
        timestamp: string
        stack_trace: string  # Development only

  metrics:
    - metric_name: string
      type: enum(count|rate|gauge)
      labels:
        error_type: string
        endpoint: string
        severity: string
      alert_threshold: int
      alert_condition: string

  global_handler:
    enabled: boolean
    catch_all: boolean
    fallback_response: object

  request_id:
    generator: enum(uuid|ulid)
    header_name: string  # X-Request-ID
    include_in_logs: boolean
    include_in_responses: boolean
```

### Secondary Outputs

1. **Exception Handler Implementation**:
   ```python
   # FastAPI exception handlers
   @app.exception_handler(ValidationError)
   async def validation_exception_handler(request, exc):
       # Handle Pydantic validation errors
       pass

   @app.exception_handler(HTTPException)
   async def http_exception_handler(request, exc):
       # Handle FastAPI HTTPException
       pass
   ```

2. **Error Code Reference**:
   - Complete list of all error codes
   - HTTP status code mappings
   - User-facing messages
   - Recovery actions

3. **Logging Configuration**:
   - Log level configuration
   - Destination configuration
   - Rotation configuration
   - Format configuration

## Scope & Boundaries

### This Skill MUST:

- Handle all backend exceptions and errors
- Classify errors by type and severity
- Format consistent error responses to frontend
- Generate structured logs for debugging
- Implement global exception handlers
- Generate and track error metrics
- Provide user-friendly error messages
- Implement request ID generation for tracing
- Configure logging destinations and rotation
- Set up error alerting and monitoring

### This Skill MUST NOT:

- Fix bugs or issues that cause errors
- Implement business logic (only handle errors)
- Create database schemas or models
- Implement authentication or authorization (only handle auth errors)
- Write validation logic (only handle validation errors)
- Implement retry logic (only provide guidance)
- Generate frontend error handling code
- Create UI components for error display
- Modify application features to prevent errors

### Boundary Examples

**In Scope:**
- Catch `ValidationError` from Pydantic and return 422 with field errors
- Log error: `ERROR - ValidationError - Title is required - Request ID: req_abc123`
- Return formatted error: `{ "success": false, "error": { "code": "VALIDATION_ERROR", "message": "Invalid request data" }}`
- Generate request ID: UUID for tracing
- Configure logging to send to Datadog in production
- Set up alert: Alert if error rate > 5% for 5 minutes

**Out of Scope:**
- Fix validation: Change title to be required field
- Implement business rule: "Completed tasks cannot be edited"
- Create SQLModel class with validation rules
- Write `validate_title()` function
- Implement authentication: `verify_token()` function
- Create frontend error component: `<ErrorMessage error={error} />`
- Fix database constraint: Add unique constraint to email column

## Dependencies

### Required Dependencies

1. **Spec-Kit Plus Schema**
   - Location: `/specs/.spec-kit/schema.md`
   - Purpose: Defines specification file structure

2. **Project Configuration**
   - Location: `/specs/.spec-kit/config.md`
   - Purpose: Provides backend stack details

### Specification Dependencies

1. **Error Specs**
   - Location: `/specs/errors/*.md`
   - Purpose: Define error codes and handling strategies

2. **API Specs**
   - Location: `/specs/api/*.md`
   - Purpose: Define API error response formats

3. **Monitoring Specs**
   - Location: `/specs/monitoring/*.md`
   - Purpose: Define logging and monitoring requirements

### Skill Dependencies

1. **Spec Interpretation Skill**
   - Purpose: Parse and understand error and monitoring specifications

2. **API Construction Skill**
   - Purpose: Understand API endpoint structure for error handling

3. **Authentication Skill**
   - Purpose: Understand auth errors for proper handling

### Optional Dependencies

1. **Task Business Logic Skill**
   - Purpose: Understand business logic exceptions

2. **Database Modeling Skill**
   - Purpose: Understand database errors

## Used By Agents

### Primary Consumers

1. **General-Purpose Agents**
   - When handling backend errors
   - When configuring logging
   - When implementing error handlers

2. **Backend Implementation Agents**
   - When implementing exception handlers
   - When configuring logging
   - When implementing error responses

3. **API Implementation Agents**
   - When adding error handling to endpoints
   - When formatting error responses

4. **DevOps Agents**
   - When setting up log aggregation
   - When configuring error alerting
   - When monitoring error metrics

### Secondary Consumers

1. **Testing Agents**
   - When testing error scenarios
   - When validating error responses

2. **Monitoring Agents**
   - When analyzing error metrics
   - When setting up error alerts

## Integration Notes

### Calling Convention

```yaml
skill: "backend-error-handling"
inputs:
  error_event:
    exception: object
    type: string
    message: string
    stack_trace: string
  request_context:
    method: string
    endpoint: string
    request_id: string
    user_id: string
    headers: object
  system_context:
    environment: enum(development|staging|production)
    service: string
    instance_id: string
  error_handling_config:
    log_destinations: [string]
    alert_enabled: boolean
    alert_threshold: int
  output_format: "error_handling_specification"
```

### Error Response Best Practices

- Use consistent error response format
- Include user-friendly messages
- Include error codes for programmatic handling
- Include request ID for tracing
- Return appropriate HTTP status codes
- Don't expose sensitive data in errors
- Don't expose stack traces in production
- Include field-level errors for validation
- Include retry information for transient errors

### Logging Best Practices

- Use structured logging (JSON)
- Include correlation/request ID in all logs
- Include user context when available
- Log at appropriate level (DEBUG, INFO, WARN, ERROR, CRITICAL)
- Use different destinations for different environments
- Rotate logs to manage disk space
- Archive old logs to cold storage
- Include system context in critical errors

### FastAPI Exception Handling

```python
from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

app = FastAPI()

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    # Log error
    logger.error(f"Validation error: {exc}")

    # Return formatted error response
    return JSONResponse(
        status_code=422,
        content={
            "success": False,
            "error": {
                "code": "VALIDATION_ERROR",
                "message": "Invalid request data",
                "details": exc.errors()
            }
        }
    )
```

### Error Metrics to Track

- Error rate per endpoint (errors / total requests)
- Error rate by type (validation, auth, database, etc.)
- Error count by user
- Error trends over time
- Resource usage during errors
- Response time for error responses

---

**Version:** 1.0.0
**Last Updated:** 2026-01-01
**Maintainer:** Spec-Kit Plus AI Agent System
