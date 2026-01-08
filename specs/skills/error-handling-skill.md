# Error Handling / Logging Skill

## Purpose

To centralize and manage errors in both frontend and backend, generating logs for debugging, and providing reports for QA and testing phases. This skill serves as the reasoning layer for error tracking, logging strategy, error aggregation, and error reporting across the full-stack application. It ensures consistent error handling patterns, comprehensive logging for debugging, and actionable error reports for QA and development teams.

## When to Use (Trigger Conditions)

This skill should be invoked when:

- An error occurs in the frontend (React component errors, API client errors, validation errors)
- An error occurs in the backend (FastAPI route errors, business logic errors, database errors)
- An error response is received from an API endpoint (4xx, 5xx status codes)
- A validation error is detected (form validation, schema validation)
- A network error occurs (timeout, connection failure, offline)
- An unhandled exception occurs in any layer
- Error logging needs to be configured or standardized
- Error aggregation and analysis is required
- QA reports need to be generated with error summaries
- Error patterns or trends need to be identified
- Error alerting thresholds need to be configured
- Error tracking and debugging workflow is being designed

**Triggers:**
- Error event received from frontend or backend
- API error response detected
- Exception caught in application code
- Validation error triggered
- Network request failed
- QA testing phase requires error report
- Error monitoring setup is needed
- Error patterns analysis is requested

## Inputs

### Required Inputs

1. **Error Event Data**
   - Error type (exception, validation error, network error, API error)
   - Error message and stack trace
   - Error code or status code
   - Timestamp of error
   - User context (user_id, session_id, if available)
   - Request context (endpoint, method, parameters, if applicable)

2. **Context Information**
   - Frontend context: Component name, user action, browser info, device info
   - Backend context: Endpoint, request ID, headers, request body (sanitized)
   - Database context: Query, table, operation type
   - System context: Environment, version, deployment ID

3. **Log Entry Data**
   - Log level (DEBUG, INFO, WARN, ERROR, CRITICAL)
   - Log message
   - Structured data (key-value pairs)
   - Correlation ID for request tracing
   - Tags for filtering and grouping

### Supported Error Types

| Error Type | Source | Purpose |
|------------|--------|---------|
| Validation Errors | Frontend/Backend | Invalid input, failed validation rules |
| Authentication Errors | Frontend/Backend | Invalid credentials, expired tokens |
| Authorization Errors | Backend | Insufficient permissions, access denied |
| API Errors | Frontend | Failed API requests, error responses |
| Network Errors | Frontend | Connection failures, timeouts |
| Database Errors | Backend | Query failures, constraint violations |
| Business Logic Errors | Backend | Rule violations, state transitions |
| Component Errors | Frontend | React component failures, render errors |
| System Errors | Backend | Infrastructure failures, resource exhaustion |

### Error Data Format

Error events MUST include:
- Error type and code
- Error message (user-friendly and technical)
- Stack trace (for exceptions)
- Timestamp
- Context data (user, request, environment)
- Severity level
- Correlation/request ID for tracing

## Actions

### Step 1: Error Classification
1. Determine error category:
   - **Validation Errors**: Input validation failures, schema violations
   - **Authentication Errors**: Invalid credentials, token issues
   - **Authorization Errors**: Permission failures, access denied
   - **API Errors**: HTTP 4xx/5xx responses from backend
   - **Network Errors**: Connection failures, timeouts
   - **Database Errors**: Query failures, constraint violations
   - **Business Logic Errors**: Rule violations, invalid state
   - **Component Errors**: React component failures
   - **System Errors**: Infrastructure failures, resource issues
2. Determine severity level:
   - **CRITICAL**: System-wide failure, data loss, security breach
   - **ERROR**: Feature broken, data corruption, service unavailable
   - **WARN**: Degraded functionality, potential issue
   - **INFO**: Normal operation, significant events
   - **DEBUG**: Detailed debugging information
3. Determine error source:
   - Frontend (client-side)
   - Backend (server-side)
   - Database
   - External service
   - Infrastructure

### Step 2: Context Extraction
1. Extract user context:
   - User ID (if authenticated)
   - User roles and permissions
   - Session ID
   - Tenant ID (multi-tenant)
2. Extract request context (for API errors):
   - Request ID / Correlation ID
   - HTTP method and endpoint
   - Request parameters (sanitize sensitive data)
   - Request headers (exclude Authorization header)
   - Request body (sanitize passwords, tokens)
3. Extract system context:
   - Environment (development, staging, production)
   - Application version
   - Deployment ID / Commit hash
   - Server/instance identifier
4. Extract frontend context (for frontend errors):
   - Component name and stack
   - User action triggering error
   - Browser and version
   - Device type (mobile, tablet, desktop)
   - Screen resolution
   - Network type (WiFi, cellular, offline)

### Step 3: Error Enrichment
1. Enrich error with metadata:
   - Add error ID (unique identifier for tracking)
   - Add timestamp with timezone
   - Add correlation/request ID
   - Add session ID
   - Add user journey context (recent actions)
   - Add error frequency (how many times seen recently)
2. Enrich with stack trace parsing:
   - Parse stack trace to identify file, line, function
   - Identify the root cause location
   - Group similar stack traces for aggregation
3. Enrich with error patterns:
   - Check if error is a recurring issue
   - Check if error is related to recent deployment
   - Check if error affects specific users or segments
   - Check if error has known workarounds

### Step 4: Error Sanitization
1. Sanitize sensitive data:
   - Remove passwords from logs
   - Remove API keys and secrets
   - Remove JWT tokens (show only token type)
   - Remove credit card numbers, SSN, PII
   - Sanitize request bodies (filter sensitive fields)
2. Sanitize error messages:
   - Remove internal implementation details from user-facing errors
   - Remove file paths and line numbers from user-facing messages
   - Keep detailed info for technical logs
3. Apply data retention policies:
   - Determine how long to keep error logs (e.g., 30 days for production, 90 days for debugging)
   - Anonymize user data in logs after retention period
   - Compress or archive old logs

### Step 5: Log Generation
1. Generate structured log entry:
   - Timestamp (ISO 8601 format)
   - Log level (DEBUG, INFO, WARN, ERROR, CRITICAL)
   - Error ID (unique identifier)
   - Error type and code
   - Error message (user-friendly and technical)
   - Stack trace (for ERROR and CRITICAL)
   - Context data (user, request, system)
   - Tags for filtering
2. Generate log levels appropriately:
   - DEBUG: Detailed debugging information (development only)
   - INFO: Normal operation, significant events
   - WARN: Degraded functionality, potential issues
   - ERROR: Feature broken, errors that need attention
   - CRITICAL: System-wide failures, immediate action required
3. Format log entry:
   - JSON format for structured logging
   - Include correlation/request ID for tracing
   - Include tags for filtering and grouping
   - Include severity for prioritization

### Step 6: Log Routing and Storage
1. Route logs to appropriate destinations:
   - **Development**: Console output, local log files
   - **Staging**: Console + log aggregation service
   - **Production**: Log aggregation service (e.g., Datadog, CloudWatch, Sentry)
2. Configure log storage:
   - Set retention periods based on log level
   - Set up log rotation to manage disk space
   - Archive old logs to cold storage (S3, etc.)
   - Configure indexing for fast search
3. Set up log shipping:
   - Configure log forwarding to central service
   - Set up buffering for network failures
   - Ensure reliable delivery (retry on failure)
   - Configure log sampling for high-volume logs

### Step 7: Error Aggregation
1. Aggregate errors by type:
   - Group errors with same error code
   - Group errors with similar stack traces
   - Group errors from same endpoint/component
2. Aggregate errors by frequency:
   - Count occurrences of each error type
   - Identify trending errors (increasing frequency)
   - Identify recurring errors (happening multiple times)
3. Aggregate errors by user impact:
   - Count affected users
   - Identify errors affecting specific user segments
   - Calculate error rate (errors per user, errors per request)
4. Aggregate errors by timeframe:
   - Count errors in last hour, day, week, month
   - Compare error rates to baseline
   - Identify anomalies or spikes

### Step 8: Error Alerting
1. Configure alerting rules:
   - **Critical errors**: Alert immediately (pager, Slack, email)
   - **High error rate**: Alert when error rate exceeds threshold
   - **Recurring errors**: Alert when same error occurs N times
   - **New errors**: Alert when new error type is detected
2. Set alert thresholds:
   - Error rate > 5% for 5 minutes (high priority)
   - Error rate > 10% for 1 minute (critical)
   - Same error > 10 times in 1 hour (medium)
   - New critical error detected (high)
3. Configure alert channels:
   - Slack/Discord for developer notifications
   - Email for formal notifications
   - PagerDuty/Opsgenie for on-call alerts (critical)
   - Webhook for custom integrations
4. Configure alert escalation:
   - Escalate if not acknowledged within time window
   - Escalate to on-call if severity increases
   - Auto-acknowledge for known non-critical issues

### Step 9: Error Reporting for QA
1. Generate QA error report:
   - List all errors encountered during testing
   - Categorize errors by severity and type
   - Count errors by feature or component
   - Identify most frequent errors
   - Identify errors blocking release
2. Generate error details:
   - Error ID for tracking
   - Error type and code
   - Error message and stack trace
   - User scenario or test case that triggered error
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if available for frontend)
3. Generate error impact analysis:
   - Number of users affected (if in production)
   - Features impacted
   - Estimated effort to fix
   - Priority and severity
4. Generate recommendations:
   - Fix before release (critical/blocking issues)
   - Fix in next sprint (high priority issues)
   - Track for future (low priority issues)
   - Add to technical debt (minor issues)

### Step 10: Error Analysis and Insights
1. Analyze error patterns:
   - Identify errors with same root cause
   - Identify errors from recent deployments
   - Identify errors affecting specific users or features
   - Identify seasonal or time-based patterns
2. Identify error hotspots:
   - Components or endpoints with most errors
   - Users or sessions with high error rates
   - Times of day with high error rates
3. Generate error trends:
   - Error rate over time (hourly, daily, weekly)
   - Comparison to baseline (before/after deployment)
   - Top 10 most frequent errors
   - Top 10 errors by user impact
4. Generate debugging insights:
   - Common stack traces
   - Common error messages
   - Common user actions before errors
   - Correlated events (what happened before error)

### Step 11: Log Query and Search
1. Design log query interface:
   - Query by error ID
   - Query by error type or code
   - Query by user ID or session ID
   - Query by correlation/request ID
   - Query by time range
   - Query by tags
2. Design search filters:
   - Filter by log level
   - Filter by error severity
   - Filter by component or endpoint
   - Filter by environment
   - Filter by deployment
3. Design log aggregation queries:
   - Count errors by type
   - Count errors by user
   - Count errors by time
   - Average error rate
   - Percentile error rates (p50, p95, p99)

### Step 12: Error Recovery Guidance
1. Provide error-specific guidance:
   - Validation errors: Show field-level errors, provide correction hints
   - Authentication errors: Suggest login, check credentials
   - Authorization errors: Explain permission requirement, contact admin
   - Network errors: Suggest retry, check connection
   - Database errors: Contact support, try again later
   - System errors: Apologize, contact support
2. Provide recovery actions:
   - Retry the operation (with exponential backoff)
   - Refresh the page
   - Log out and log back in
   - Clear cache and reload
   - Contact support with error ID
3. Provide user-friendly error messages:
   - Explain what happened (in plain language)
   - Explain impact (what the user can/cannot do)
   - Provide next steps (what to do next)
   - Include error ID for support reference

## Outputs

### Primary Output: Error Log Entry

```yaml
error_log:
  meta:
    error_id: string  # Unique identifier
    correlation_id: string  # Request correlation ID
    session_id: string  # User session ID
    timestamp: datetime  # ISO 8601 format
    environment: enum(development|staging|production)
    version: string  # Application version
    deployment_id: string  # Deployment identifier

  error:
    type: enum(validation|authentication|authorization|api|network|database|business_logic|component|system)
    code: string  # Error code
    status_code: int  # HTTP status code (if applicable)
    message:
      user_friendly: string  # Message for end user
      technical: string  # Detailed technical message
    severity: enum(debug|info|warn|error|critical)
    category: string  # Custom category
    tags: [string]  # For filtering and grouping

  stack_trace:
    exception_type: string  # Python exception or JavaScript error type
    message: string
    frames:
      - file: string
        line: int
        function: string
        code_snippet: string

  context:
    user:
      user_id: string
      roles: [string]
      tenant_id: string
      authenticated: boolean

    request:
      method: string
      endpoint: string
      parameters: object  # Sanitized
      headers: object  # Excluding sensitive data
      body: object  # Sanitized

    frontend:
      component: string
      component_stack: [string]
      user_action: string
      browser: string
      device_type: enum(mobile|tablet|desktop)
      screen_resolution: string
      network_type: string

    system:
      server: string  # Server/instance identifier
      cpu_usage: float
      memory_usage: float
      disk_usage: float

  metrics:
    occurrence_count: int  # Times this error occurred recently
    affected_users: int
    first_seen: datetime
    last_seen: datetime
    error_rate: float  # Errors per request

  recovery:
    user_guidance: string  # What the user should do
    technical_guidance: string  # What developers should investigate
    retry_possible: boolean
    recovery_actions: [string]

  related_errors:
    - error_id: string
      similarity_score: float
      relation: enum(same_stack_trace|same_endpoint|same_user|same_timeframe)
```

### Secondary Outputs

1. **QA Error Report**:
   ```yaml
   qa_error_report:
     meta:
       testing_phase: string
       test_suite: string
       start_time: datetime
       end_time: datetime
       total_tests: int
       passed_tests: int
       failed_tests: int

     errors:
       - error_id: string
         test_case: string
         severity: enum(critical|high|medium|low)
         type: string
         message: string
         steps_to_reproduce: [string]
         expected_behavior: string
         actual_behavior: string
         screenshot_url: string

     summary:
       total_errors: int
       critical_errors: int
       high_errors: int
       medium_errors: int
       low_errors: int
       blocking_errors: [error_id]
       recommendations: [string]
   ```

2. **Error Aggregation Report**:
   ```yaml
   error_aggregation:
     timeframe:
       from: datetime
       to: datetime
     total_errors: int
     unique_errors: int
     affected_users: int

     by_type:
       - type: string
         count: int
         percentage: float

     by_severity:
       - severity: string
         count: int
         percentage: float

     by_endpoint:
       - endpoint: string
         count: int
         percentage: float

     top_errors:
       - error_id: string
         type: string
         count: int
         affected_users: int
         first_seen: datetime
         last_seen: datetime

     trends:
       error_rate_over_time:
         - timestamp: datetime
           rate: float
       spikes: [datetime]
       new_errors: [error_id]
       recurring_errors: [error_id]
   ```

3. **Error Alert**:
   ```yaml
   error_alert:
     alert_id: string
     timestamp: datetime
     severity: enum(critical|high|medium|low)
     error_type: string
     error_code: string

     trigger:
       condition: string
       threshold: any
       actual_value: any

     impact:
       affected_users: int
       affected_features: [string]
       error_rate: float

     details:
       error_id: string
       message: string
       stack_trace: string
       context: object

     actions:
       - action: string
         priority: string
         owner: string
         deadline: string
   ```

4. **Log Query Result**:
   ```yaml
   log_query_result:
     query: string
     filters: object
     time_range:
       from: datetime
       to: datetime

     total_results: int
     page: int
     page_size: int
     total_pages: int

     results:
       - error_id: string
         timestamp: datetime
         level: string
         type: string
         message: string
         user_id: string
         endpoint: string

     aggregations:
       by_type: object
       by_severity: object
       by_user: object
       by_time: object
   ```

## Scope & Boundaries

### This Skill MUST:

- Classify and categorize errors from all layers (frontend, backend, database)
- Extract and enrich context data for errors
- Generate structured log entries with appropriate log levels
- Sanitize sensitive data from logs (passwords, tokens, PII)
- Route logs to appropriate destinations (console, files, log aggregation services)
- Aggregate errors by type, frequency, and user impact
- Configure error alerting rules and thresholds
- Generate QA error reports with actionable recommendations
- Analyze error patterns and trends
- Provide log query and search capabilities
- Provide error recovery guidance for users and developers
- Track errors across deployments and environments

### This Skill MUST NOT:

- Fix or resolve errors automatically
- Implement error handling logic in application code
- Write try/catch blocks or error handling code
- Implement actual logging infrastructure (only design strategy)
- Fix bugs or issues causing errors
- Implement automatic retry logic (only provide guidance)
- Modify application features or functionality
- Write unit tests or integration tests
- Configure actual logging services (only design integration)
- Implement user-facing error UI components

### Boundary Examples

**In Scope:**
- Classify error as "validation_error" with severity "error"
- Extract user_id, request_id, and component stack from error context
- Generate structured log entry with error_id, timestamp, message, context
- Sanitize password from request body before logging
- Route ERROR level logs to Datadog for production
- Aggregate all "AUTHENTICATION_FAILED" errors and count occurrences
- Alert on Slack when error rate > 5% for 5 minutes
- Generate QA report listing all errors from test suite
- Query logs by error_id: "err_abc123" to find full context
- Provide user guidance: "Please check your email and password"
- Analyze error trends: Error rate increased after deployment v2.1.0

**Out of Scope:**
- Write try/catch block: `try { await fetch() } catch (error) { ... }`
- Implement error boundary: `class ErrorBoundary extends React.Component { ... }`
- Configure Datadog agent or CloudWatch Logs integration
- Fix bug: "Task not saving to database"
- Write logging code: `logger.error(message, context)`
- Implement automatic retry: `retry(async () => fetch(), { retries: 3 })`
- Write unit test: `test_validation_error()`
- Create error UI component: `<ErrorMessage error={error} />`
- Modify business logic to prevent error from occurring
- Write API error handling middleware: `@app.exception_handler(Exception)`

## Dependencies

### Required Dependencies

1. **Spec-Kit Plus Schema**
   - Location: `/specs/.spec-kit/schema.md`
   - Purpose: Defines specification file structure

2. **Project Configuration**
   - Location: `/specs/.spec-kit/config.md`
   - Purpose: Provides logging strategy and monitoring details

### Specification Dependencies

1. **Error Handling Specs**
   - Location: `/specs/errors/*.md`
   - Purpose: Define error codes, messages, and handling strategies

2. **Monitoring Specs**
   - Location: `/specs/monitoring/*.md`
   - Purpose: Define alerting rules and thresholds

3. **QA Specs**
   - Location: `/specs/qa/*.md`
   - Purpose: Define QA reporting requirements and formats

4. **Architecture Specs**
   - Location: `/specs/architecture/*.md`
   - Purpose: Define logging architecture and patterns

### Skill Dependencies

1. **All Layer-Specific Skills**:
   - **Frontend UI Skill**: Understand frontend component errors
   - **Frontend API Client Skill**: Understand API and network errors
   - **API Construction Skill**: Understand backend API errors
   - **Task Business Logic Skill**: Understand business logic errors
   - **Authentication Skill**: Understand authentication errors
   - **Database Modeling Skill**: Understand database errors
   - **Integration & Validation Skill**: Understand integration errors

2. **Spec Interpretation Skill**:
   - Parse and understand error handling and monitoring specifications

### Optional Dependencies

1. **Security Specs**
   - Location: `/specs/security/*.md`
   - Purpose: Define PII handling and data privacy requirements

2. **Compliance Specs**
   - Location: `/specs/compliance/*.md`
   - Purpose: Define log retention and data retention policies

## Used By Agents

### Primary Consumers

1. **General-Purpose Agents**
   - When handling errors from any layer
   - When generating logs for debugging
   - When aggregating and analyzing errors
   - When providing error recovery guidance

2. **Error Monitoring Agents**
   - When tracking errors in production
   - When generating error alerts
   - When analyzing error patterns and trends
   - When configuring error alerting rules

3. **QA Agents**
   - When generating QA error reports
   - When analyzing errors from testing phases
   - When reporting blocking issues for releases
   - When providing error impact analysis

4. **Debugging Agents**
   - When querying logs for debugging
   - When tracing errors across layers
   - When identifying root causes of errors
   - When providing debugging insights

### Secondary Consumers

1. **Frontend Implementation Agents**
   - When implementing error boundaries
   - When displaying user-friendly error messages
   - When integrating error tracking SDKs (Sentry, etc.)

2. **Backend Implementation Agents**
   - When implementing error handling middleware
   - When logging errors from FastAPI routes
   - When integrating error tracking services

3. **Documentation Agents**
   - When documenting error codes and messages
   - When creating error handling guides
   - When documenting troubleshooting procedures

## Integration Notes

### Calling Convention

```yaml
skill: "error-handling"
inputs:
  error_event:
    type: enum(validation|authentication|authorization|api|network|database|business_logic|component|system)
    code: string
    message: string
    stack_trace: string
    status_code: int
  context:
    user:
      user_id: string
      session_id: string
      roles: [string]
    request:
      method: string
      endpoint: string
      parameters: object
    frontend:
      component: string
      user_action: string
      browser: string
    system:
      environment: enum(development|staging|production)
      version: string
      deployment_id: string
  log_level: enum(debug|info|warn|error|critical)
  alert_enabled: boolean
  output_format: enum(log_entry|qa_report|error_alert|aggregation_report)
```

### Error Handling Best Practices

1. **Consistent Error Format**:
   - Use structured logging (JSON)
   - Include error_id for tracking
   - Include correlation_id for request tracing
   - Use consistent error codes

2. **Appropriate Log Levels**:
   - DEBUG: Detailed info for debugging (development only)
   - INFO: Normal operation, significant events
   - WARN: Potential issues, degraded functionality
   - ERROR: Errors requiring attention
   - CRITICAL: System-wide failures, immediate action required

3. **Data Sanitization**:
   - Remove passwords, tokens, API keys
   - Remove PII (SSN, credit cards, addresses)
   - Sanitize request bodies and headers
   - Keep technical details, hide from users

4. **Error Aggregation**:
   - Group similar errors together
   - Track error frequency over time
   - Identify trending errors
   - Measure user impact

5. **Alerting Strategy**:
   - Alert on critical errors immediately
   - Alert on high error rates
   - Alert on recurring errors
   - Alert on new error types
   - Don't alert on expected errors (validation, auth failures from invalid input)

### Log Storage Strategy

1. **Development**:
   - Console output only
   - Local log files (optional)
   - Retention: 1 week

2. **Staging**:
   - Console + log aggregation service
   - Retention: 30 days
   - Index for fast search

3. **Production**:
   - Log aggregation service only (no console)
   - Retention: 90 days for errors, 30 days for info/debug
   - Archive to cold storage after retention
   - Index for fast search

### Error Codes Convention

Format: `{LAYER}_{TYPE}_{SPECIFIC_CODE}`

Examples:
- `AUTH_INVALID_TOKEN`: Invalid or expired JWT token
- `AUTH_CREDENTIALS_INVALID`: Invalid username or password
- `AUTH_TOKEN_EXPIRED`: Token expired
- `VAL_MISSING_FIELD`: Missing required field
- `VAL_INVALID_FORMAT`: Invalid field format
- `VAL_DUPLICATE_ENTRY`: Duplicate entry violates uniqueness
- `API_NOT_FOUND`: Resource not found (404)
- `API_FORBIDDEN`: Access denied (403)
- `API_VALIDATION_ERROR`: Request validation failed (422)
- `API_RATE_LIMITED`: Too many requests (429)
- `DB_QUERY_FAILED`: Database query failed
- `DB_CONSTRAINT_VIOLATION`: Database constraint violation
- `NET_CONNECTION_FAILED`: Network connection failed
- `NET_TIMEOUT`: Request timeout
- `SYS_RESOURCE_EXHAUSTED`: System resource exhausted
- `UI_COMPONENT_ERROR`: React component error

### QA Report Sections

1. **Executive Summary**:
   - Total errors, error rate
   - Critical/blocking issues
   - Release recommendation (go/no-go)

2. **Error Details**:
   - All errors encountered
   - Severity and priority
   - Steps to reproduce
   - Screenshots (if applicable)

3. **Impact Analysis**:
   - Affected features
   - Estimated users affected
   - Risk assessment

4. **Recommendations**:
   - Must fix before release
   - Should fix in next sprint
   - Nice to have

5. **Appendix**:
   - Full error logs
   - Stack traces
   - Additional context

---

**Version:** 1.0.0
**Last Updated:** 2026-01-01
**Maintainer:** Spec-Kit Plus AI Agent System
