# Security / Permissions Skill

## Purpose

To enforce security and permission policies, including rate-limiting, XSS prevention, SQL injection prevention, JWT expiry checks, and user access control. This skill serves as the reasoning layer for all security-related decisions across the full-stack Todo application, ensuring robust protection against common vulnerabilities, proper authentication and authorization, and comprehensive security logging and alerting.

## When to Use (Trigger Conditions)

This skill should be invoked when:

- An API request is received and needs security validation
- A JWT token needs to be verified or validated
- User access to a resource needs to be authorized
- Rate limiting needs to be applied to an endpoint or user
- Input validation and sanitization is required
- SQL query parameters need to be validated
- User permissions need to be checked for an action
- Security event needs to be logged or alerted
- Suspicious activity is detected
- Security configuration needs to be updated
- Audit trail needs to be generated for a sensitive operation
- CORS headers need to be configured
- Security headers need to be set on responses

**Triggers:**
- API request received at endpoint
- JWT token presented for authentication
- Protected resource access attempt
- Form submission or user input
- Database query execution
- File upload/download request
- User action requiring permission check
- Security policy violation detected

## Inputs

### Required Inputs

1. **API Request Context**
   - HTTP method and endpoint path
   - Request headers (Authorization, Content-Type, Origin, etc.)
   - Request body or parameters
   - Query parameters
   - Path parameters
   - Client IP address
   - User agent
   - Request timestamp

2. **Authentication Context**
   - JWT token (from Authorization header or cookie)
   - Token type (access token, refresh token)
   - Token expiration status
   - Token metadata (issued at, not before, audience, issuer)

3. **Authorization Context**
   - User ID (extracted from token)
   - User roles and permissions
   - Tenant ID (for multi-tenant)
   - Resource being accessed
   - Action being performed (create, read, update, delete)

4. **Input Data**
   - User-provided input (forms, query params, etc.)
   - File uploads (if applicable)
   - Database query parameters
   - External data or API responses

### Supported Security Controls

| Security Control | Scope | Purpose |
|-----------------|--------|---------|
| Authentication | All requests | Verify user identity via JWT |
| Authorization | Protected resources | Enforce access control and permissions |
| Rate Limiting | All requests | Prevent abuse and DoS attacks |
| Input Validation | All user input | Validate and sanitize input data |
| XSS Prevention | Output rendering | Prevent cross-site scripting attacks |
| SQL Injection Prevention | Database queries | Prevent SQL injection attacks |
| CORS | Cross-origin requests | Control cross-origin resource sharing |
| Security Headers | HTTP responses | Set security-related headers |
| CSRF Protection | State-changing requests | Prevent cross-site request forgery |
| Content Security Policy | Browser execution | Control script and resource loading |
| JWT Security | Token management | Secure token generation, validation, and storage |

## Actions

### Step 1: Request Authentication Validation
1. Extract JWT token:
   - From Authorization header: `Authorization: Bearer {token}`
   - From httpOnly cookie (if using cookie-based auth)
   - From query parameter (not recommended for production)
2. Validate token presence:
   - Token exists in expected location
   - Token format is valid (JWT structure: header.payload.signature)
3. Verify token signature:
   - Use appropriate signing key (private/public key based on algorithm)
   - Support RS256 (asymmetric) for production
   - Support HS256 (symmetric) for development
4. Validate token claims:
   - **Issuer (iss)**: Matches expected issuer
   - **Audience (aud)**: Includes expected audience
   - **Expiration (exp)**: Current time < exp
   - **Not Before (nbf)**: Current time >= nbf
   - **Issued At (iat)**: Timestamp is reasonable (not in future)
   - **Subject (sub)**: Valid user ID format (UUID)
5. Check token revocation:
   - Verify token not in blacklist (if using blacklist)
   - Verify token not marked as revoked in database
   - Verify user account is not suspended/banned
6. Handle authentication failures:
   - Missing token: Return 401 Unauthorized with clear message
   - Invalid signature: Return 401 Unauthorized, log potential attack
   - Expired token: Return 401 Unauthorized, suggest refresh
   - Revoked token: Return 401 Unauthorized, prompt re-authentication
   - Suspended user: Return 403 Forbidden with reason

### Step 2: User Authorization Validation
1. Extract user context from token:
   - User ID (sub claim)
   - User roles (custom claim)
   - User permissions (custom claim)
   - Tenant ID (custom claim for multi-tenant)
2. Determine required permissions:
   - From endpoint configuration (defined per route)
   - From action being performed (create, read, update, delete)
   - From resource type and ID
3. Check role-based access:
   - User has required role (e.g., admin, user, guest)
   - Role hierarchy (if applicable: admin > user > guest)
4. Check permission-based access:
   - User has specific permission (e.g., "todo:read", "todo:write", "todo:delete")
   - Permission matches action and resource
5. Check resource ownership:
   - For user-specific resources: User ID matches resource owner
   - For multi-tenant: Tenant ID matches resource tenant
   - For shared resources: User has access permission
6. Handle authorization failures:
   - Insufficient role: Return 403 Forbidden
   - Missing permission: Return 403 Forbidden
   - Not owner: Return 403 Forbidden or 404 Not Found (security by obscurity)
   - Tenant mismatch: Return 403 Forbidden

### Step 3: Rate Limiting Enforcement
1. Identify rate limiting scope:
   - **Per IP**: All requests from same IP address
   - **Per User**: All requests from same user ID
   - **Per Endpoint**: Requests to specific endpoint
   - **Per Action**: Specific type of action (login, create, etc.)
2. Get current usage:
   - Count requests in sliding window (e.g., last 15 minutes, last 1 hour)
   - Track from cache or database (Redis, in-memory)
3. Apply rate limit rules:
   - **Authentication endpoints**: 5 attempts per 15 minutes per IP
   - **Registration endpoints**: 3 attempts per hour per IP
   - **General API**: 1000 requests per hour per user
   - **Write operations**: 100 per hour per user
   - **Read operations**: 1000 per hour per user
4. Check limit exceeded:
   - Current count > threshold: Rate limit exceeded
5. Handle rate limit exceeded:
   - Return 429 Too Many Requests
   - Include Retry-After header: `Retry-After: 60`
   - Include limit info in response: remaining, limit, reset time
   - Log rate limit event
   - Block repeated violations (progressive penalties)

### Step 4: Input Validation
1. Validate all user input:
   - **Required fields**: Present and not empty
   - **Field types**: Correct type (string, number, boolean, etc.)
   - **Field lengths**: Within min/max limits
   - **Field formats**: Valid format (email, URL, UUID, date)
   - **Enum values**: From allowed set
   - **Numeric ranges**: Within min/max values
2. Validate JSON structure:
   - Valid JSON syntax
   - Expected keys present
   - No unexpected keys (if strict validation)
   - No nested objects beyond allowed depth
3. Validate query parameters:
   - Parse and validate types
   - Check for injection attempts
   - Validate pagination parameters (page, limit)
   - Validate sorting parameters (field, direction)
4. Validate file uploads:
   - File type allowed (whitelist)
   - File size within limits
   - File name sanitized (no path traversal)
   - Virus scan (if available)
5. Handle validation failures:
   - Return 422 Unprocessable Entity
   - Include field-specific error messages
   - Log validation failures
   - Do not reveal internal details

### Step 5: Input Sanitization (XSS Prevention)
1. Sanitize text input:
   - Escape HTML entities: `<`, `>`, `&`, `"`, `'`
   - Remove dangerous tags: `<script>`, `<iframe>`, `<object>`, etc.
   - Remove dangerous attributes: `onclick`, `onerror`, `onload`, etc.
   - Use sanitization library (DOMPurify, validator.js)
2. Sanitize URLs:
   - Validate URL format
   - Check protocol (allow only http, https)
   - Prevent javascript: protocol
   - Encode special characters
3. Sanitize file names:
   - Remove path traversal sequences: `../`, `..\`, etc.
   - Remove null bytes
   - Keep only safe characters (alphanumeric, hyphens, underscores)
4. Sanitize database queries:
   - Use parameterized queries (prepared statements)
   - Never concatenate user input into SQL
   - Use ORM (SQLModel) for automatic escaping
   - Avoid raw SQL queries unless necessary and properly escaped
5. Sanitize output:
   - Context-aware escaping (HTML, URL, JavaScript)
   - Use template engine auto-escaping (React, Jinja2)
   - Do not trust user input in output context

### Step 6: SQL Injection Prevention
1. Use parameterized queries:
   - All database queries use placeholders/parameters
   - Never concatenate user input into SQL
   - Use SQLModel/FastAPI ORM for automatic parameterization
2. Validate query parameters:
   - Ensure parameters match expected types
   - Reject unexpected parameters
   - Validate numeric IDs (must be positive integers)
3. Use safe query patterns:
   - Avoid dynamic SQL generation
   - Use whitelisted column/field names
   - Validate ORDER BY clauses against whitelist
4. Handle special characters:
   - Properly escape special SQL characters (via ORM)
   - Reject quotes, comments, semicolons in unexpected places
5. Log SQL injection attempts:
   - Detect patterns: `' OR '1'='1`, `'; DROP TABLE`, `UNION SELECT`
   - Log suspicious query patterns
   - Block user on repeated attempts
   - Alert security team

### Step 7: CORS Configuration
1. Configure allowed origins:
   - Whitelist frontend origins: `https://app.example.com`
   - Support development origins: `http://localhost:3000`
   - Use exact match or allow subdomains if needed
2. Configure allowed methods:
   - Allow required methods: GET, POST, PATCH, DELETE
   - Reject unsafe methods if not needed
3. Configure allowed headers:
   - Allow Content-Type for JSON requests
   - Allow Authorization header for JWT
   - Allow custom headers if needed
4. Configure credentials:
   - Allow credentials if using cookie-based auth
   - `Access-Control-Allow-Credentials: true`
5. Configure CORS headers in response:
   - `Access-Control-Allow-Origin: {origin}`
   - `Access-Control-Allow-Methods: GET, POST, PATCH, DELETE`
   - `Access-Control-Allow-Headers: Content-Type, Authorization`
   - `Access-Control-Allow-Credentials: true`
   - `Access-Control-Max-Age: 86400` (24 hours for preflight)
6. Handle preflight requests:
   - Respond to OPTIONS method
   - Return appropriate CORS headers
   - Do not require authentication for OPTIONS

### Step 8: Security Headers
1. Set Content Security Policy (CSP):
   - Restrict script sources: `script-src 'self'`
   - Restrict style sources: `style-src 'self' 'unsafe-inline'`
   - Restrict image sources: `img-src 'self' data:`
   - Restrict font sources: `font-src 'self'`
   - Restrict connect sources: `connect-src 'self' https://api.example.com`
   - Restrict frame sources: `frame-src 'none'` (prevent clickjacking)
   - Report CSP violations: `report-uri /csp-report`
2. Set other security headers:
   - `X-Content-Type-Options: nosniff` (prevent MIME sniffing)
   - `X-Frame-Options: DENY` (prevent clickjacking)
   - `X-XSS-Protection: 1; mode=block` (XSS filter)
   - `Strict-Transport-Security: max-age=31536000; includeSubDomains` (HTTPS only)
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Permissions-Policy: geolocation=(), microphone=(), camera=()` (restrict features)
3. Set cache headers for sensitive data:
   - `Cache-Control: no-store, no-cache, must-revalidate`
   - `Pragma: no-cache`
   - `Expires: 0`
4. Set CORS headers (see Step 7)

### Step 9: CSRF Protection
1. Generate CSRF token:
   - Generate random, unpredictable token
   - Store token in session or httpOnly cookie
   - Include token in forms and AJAX requests
2. Validate CSRF token:
   - For POST/PATCH/DELETE: Verify token matches session
   - Check token is not expired
   - Regenerate token after use (optional)
3. Implement SameSite cookies:
   - `Set-Cookie: session_id=...; SameSite=Strict`
   - Use Lax for GET requests, Strict for POST
4. Use httpOnly cookies for session:
   - Prevent JavaScript access to cookies
   - Mitigate XSS token theft
5. Handle CSRF failures:
   - Return 403 Forbidden
   - Log CSRF attempt
   - Do not reveal token in error messages

### Step 10: JWT Security Enforcement
1. Secure token generation:
   - Use strong signing algorithm (RS256 for production)
   - Use cryptographically random secrets/keys
   - Set appropriate expiration times:
     - Access tokens: 15-30 minutes
     - Refresh tokens: 7-30 days
   - Include required claims (iss, sub, aud, exp, iat)
   - Include custom claims (roles, permissions, tenant_id)
2. Secure token storage:
   - Frontend: Store in httpOnly cookie (preferred) or secure localStorage
   - Backend: Never store tokens in plain text
   - Transmission: Always use HTTPS
3. Secure token transmission:
   - Use Authorization header: `Authorization: Bearer {token}`
   - Or use httpOnly cookie (automatic)
   - Never include token in URL
4. Implement token refresh:
   - Refresh access token before expiration
   - Validate refresh token
   - Invalidate old access token after refresh
   - Rotate refresh tokens (issue new one on refresh)
5. Handle token compromise:
   - Support token revocation/blacklist
   - Implement logout-all-sessions
   - Revoke tokens on password change
   - Monitor for suspicious token usage

### Step 11: User Access Control
1. Enforce resource ownership:
   - User can only access their own resources (tasks, profile, etc.)
   - Check `user_id` matches `resource.user_id`
   - For multi-tenant: Check `tenant_id` matches `resource.tenant_id`
2. Enforce permission-based access:
   - Check user has required permission for action
   - Map permissions to actions:
     - `todo:read` - View tasks
     - `todo:write` - Create and edit tasks
     - `todo:delete` - Delete tasks
     - `admin:*` - All admin actions
3. Enforce role-based access:
   - Admin role can access all resources
   - User role can access own resources
   - Guest role has limited read-only access
4. Handle access violations:
   - Return 403 Forbidden or 404 Not Found
   - Log access attempt
   - Alert on repeated violations
   - Lock account if suspicious

### Step 12: Security Event Logging
1. Log all security-relevant events:
   - Authentication successes and failures
   - Authorization denials
   - Rate limit violations
   - XSS attempts detected
   - SQL injection attempts detected
   - CSRF violations
   - Token validation failures
   - Suspicious user behavior
2. Include event details:
   - Event type and severity
   - Timestamp
   - User ID (if authenticated)
   - IP address
   - User agent
   - Request details (endpoint, method)
   - Error message
3. Categorize events:
   - **INFO**: Normal security events (successful login, logout)
   - **WARN**: Potential issues (failed login, rate limit exceeded)
   - **ERROR**: Security violations (authorization denied, suspicious activity)
   - **CRITICAL**: Attacks detected (SQL injection, XSS, brute force)
4. Alert on critical events:
   - Brute force attack detected
   - SQL injection attempt
   - XSS attempt
   - Account compromise suspected
   - Privilege escalation attempt
   - Multiple failed logins from different IPs

### Step 13: Security Decision Output
1. Determine access decision:
   - **Allow**: All security checks passed
   - **Deny**: Security check failed
   - **Challenge**: Additional verification needed (MFA, CAPTCHA)
2. Generate response with decision:
   - Allow status: 200 OK with requested resource
   - Deny status: 401, 403, or 429 with reason
   - Challenge status: 200 with challenge data
3. Include security headers:
   - All responses include security headers
   - CORS headers as appropriate
4. Include security metadata:
   - Rate limit info (remaining, limit, reset)
   - CSRF token (if needed)
   - Request ID for traceability

## Outputs

### Primary Output: Security Decision

```yaml
security_decision:
  meta:
    request_id: string  # Correlation ID
    timestamp: datetime
    ip_address: string
    user_agent: string
    endpoint: string
    method: string

  authentication:
    status: enum(authenticated|unauthenticated|invalid|expired|revoked)
    token_present: boolean
    token_valid: boolean
    token_expired: boolean
    token_revoked: boolean
    user_id: string  # If authenticated
    user_status: enum(active|suspended|banned)

  authorization:
    status: enum(authorized|unauthorized)
    required_permissions: [string]
    user_permissions: [string]
    required_roles: [string]
    user_roles: [string]
    resource_owner_check:
      matches: boolean
      resource_user_id: string
      request_user_id: string
    tenant_check:
      matches: boolean
      resource_tenant_id: string
      request_tenant_id: string

  rate_limit:
    status: enum(within_limit|exceeded)
    limit: int
    remaining: int
    reset_at: datetime
    window: string  # e.g., "15 minutes", "1 hour"
    violation_count: int

  input_validation:
    status: enum(valid|invalid)
    validated_fields: [string]
    invalid_fields: [string]
    sanitization_applied: [string]
    xss_detected: boolean
    sql_injection_detected: boolean

  cors:
    status: enum(allowed|denied)
    origin: string
    allowed_origins: [string]
    credentials_allowed: boolean

  csrf:
    status: enum(valid|invalid|not_required)
    token_valid: boolean
    token_present: boolean

  security_headers:
    content_security_policy: string
    x_frame_options: string
    x_xss_protection: string
    strict_transport_security: string
    cors_headers: object

  decision:
    action: enum(allow|deny|challenge)
    http_status_code: int
    allow_access: boolean
    reason: string
    block_reason: string  # If denied

  challenge:  # If action=challenge
    type: enum(mfa|captcha|re_authenticate)
    challenge_data: object
    required: boolean

  security_event:
    event_id: string
    event_type: enum(auth_success|auth_failure|auth_denial|rate_limit_violation|xss_attempt|sql_injection_attempt|csrf_violation|suspicious_activity)
    severity: enum(info|warn|error|critical)
    logged: boolean
    alerted: boolean
```

### Secondary Outputs

1. **Security Log Entry**:
   ```yaml
   security_log:
     event_id: string
     timestamp: datetime
     event_type: string
     severity: string
     user_id: string
     ip_address: string
     user_agent: string
     endpoint: string
     method: string
     request_body: object  # Sanitized
     details: string
     action_taken: string
     blocked: boolean
   ```

2. **Security Alert**:
   ```yaml
   security_alert:
     alert_id: string
     timestamp: datetime
     alert_type: enum(brute_force|sql_injection|xss|csrf|privilege_escalation|suspicious_activity|account_compromise)
     severity: enum(low|medium|high|critical)
     description: string
     affected_user_id: string
     ip_address: string
     pattern: string
     occurrences: int
     time_window: string
     action_taken: enum(blocked|flagged|monitored|none)
   ```

3. **Rate Limit Status**:
   ```yaml
   rate_limit_status:
     user_id: string
     ip_address: string
     endpoint: string
     current_count: int
     limit: int
     remaining: int
     window_start: datetime
     window_end: datetime
     reset_at: datetime
     blocked: boolean
     block_expires: datetime
   ```

4. **Input Validation Report**:
   ```yaml
   validation_report:
     validation_id: string
     timestamp: datetime
     input_type: string
     input_data: object  # Sanitized representation
     validation_results:
       - field: string
         status: enum(valid|invalid|sanitized)
         errors: [string]
         sanitization_applied: string
     security_issues:
       xss_detected: boolean
       sql_injection_detected: boolean
       path_traversal_detected: boolean
       other_issues: [string]
   ```

## Scope & Boundaries

### This Skill MUST:

- Validate JWT tokens (signature, claims, expiration, revocation)
- Enforce authorization (roles, permissions, resource ownership)
- Apply rate limiting to prevent abuse
- Validate and sanitize all user input
- Prevent XSS attacks through input sanitization
- Prevent SQL injection through parameterized queries
- Configure and enforce CORS policies
- Set security headers on all responses
- Implement CSRF protection
- Enforce JWT security (generation, storage, refresh)
- Control user access to resources
- Log security events and detect attacks
- Generate security decisions (allow/deny)
- Alert on critical security events

### This Skill MUST NOT:

- Implement application features or business logic
- Create or modify database schemas
- Implement actual JWT signing/validation (only validate provided tokens)
- Write application code for features
- Generate UI components or pages
- Configure actual security infrastructure (firewall, WAF)
- Implement user registration or login flows
- Fix security vulnerabilities (only detect and alert)
- Implement 2FA/MFA (only enforce if configured)
- Implement CAPTCHA (only enforce if configured)
- Configure production security tools (only apply security rules)
- Modify user permissions (only validate existing permissions)

### Boundary Examples

**In Scope:**
- Validate JWT token signature and claims
- Check user has `todo:write` permission before allowing task creation
- Apply rate limit: "5 login attempts per 15 minutes" and return 429 on exceed
- Sanitize task title: Escape HTML entities `<`, `>`, remove `<script>` tags
- Use parameterized query: `SELECT * FROM todos WHERE user_id = :user_id`
- Set CORS header: `Access-Control-Allow-Origin: https://app.example.com`
- Set CSP header: `Content-Security-Policy: script-src 'self'`
- Check resource ownership: User ID 123 trying to access task with user_id 456 → Deny
- Log security event: "AUTH_FAILURE, invalid credentials from IP 192.168.1.1"
- Alert: "BRUTE_FORCE_DETECTED, 20 failed login attempts from IP in 5 minutes"

**Out of Scope:**
- Implement login flow: `POST /auth/login` with password verification
- Generate JWT token: `encode_jwt(user_id, roles, permissions)`
- Create user registration form: `<form onSubmit={handleRegister}>`
- Fix XSS vulnerability: Remove `<script>` tags from React component
- Fix SQL injection: Change query to use parameterized approach
- Configure AWS WAF or Cloudflare
- Implement 2FA with SMS or TOTP
- Implement CAPTCHA widget
- Set up firewall rules
- Create security policy document
- Modify user roles in database

## Dependencies

### Required Dependencies

1. **Spec-Kit Plus Schema**
   - Location: `/specs/.spec-kit/schema.md`
   - Purpose: Defines specification file structure

2. **Project Configuration**
   - Location: `/specs/.spec-kit/config.md`
   - Purpose: Provides security policies and configurations

### Specification Dependencies

1. **Security Specs**
   - Location: `/specs/security/*.md`
   - Purpose: Define security policies, rate limits, headers

2. **Auth Specs**
   - Location: `/specs/auth/*.md`
   - Purpose: Define JWT structure, roles, permissions

3. **API Specs**
   - Location: `/specs/api/*.md`
   - Purpose: Define protected endpoints and required permissions

4. **Architecture Specs**
   - Location: `/specs/architecture/*.md`
   - Purpose: Define security architecture and patterns

### Skill Dependencies

1. **Authentication Skill**
   - Purpose: Understand JWT token structure and validation requirements
   - Used to validate token format and claims

2. **API Construction Skill**
   - Purpose: Understand endpoint security requirements
   - Used to enforce per-endpoint security policies

3. **Spec Interpretation Skill**
   - Purpose: Parse and understand security and auth specifications
   - Used to extract security policies and requirements

### Optional Dependencies

1. **Error Handling / Logging Skill**
   - Purpose: Log security events
   - Used to record security decisions and alerts

2. **Database Modeling Skill**
   - Purpose: Understand data relationships for ownership checks
   - Used to enforce multi-tenant data isolation

## Used By Agents

### Primary Consumers

1. **General-Purpose Agents**
   - When handling any API request
   - When enforcing security policies
   - When logging security events
   - When generating security decisions

2. **API Implementation Agents**
   - When implementing authentication middleware
   - When implementing authorization guards
   - When applying rate limiting
   - When validating input

3. **Security Agents**
   - When monitoring security events
   - When detecting attacks
   - When responding to security incidents
   - When enforcing security policies

4. **Plan Agents (Software Architect)**
   - When designing security architecture
   - When planning security controls
   - When defining security policies
   - When planning threat mitigation

### Secondary Consumers

1. **Backend Implementation Agents**
   - When implementing security middleware
   - When setting security headers
   - When configuring CORS
   - When protecting endpoints

2. **Frontend Implementation Agents**
   - When integrating CSRF tokens
   - When handling authentication errors
   - When displaying security messages

3. **Monitoring Agents**
   - When tracking security metrics
   - When setting up security alerting
   - When analyzing security logs

4. **Compliance Agents**
   - When verifying security compliance
   - When generating security audit reports
   - When documenting security controls

## Integration Notes

### Calling Convention

```yaml
skill: "security"
inputs:
  request:
    method: string
    endpoint: string
    headers: object
    body: object
    query_params: object
    path_params: object
    ip_address: string
    user_agent: string
  token:
    token_string: string
    token_type: enum(access|refresh)
  authorization:
    required_permissions: [string]
    required_roles: [string]
    resource_owner_check: boolean
  security_policies:
    rate_limit_enabled: boolean
    rate_limit_rules: object
    cors_enabled: boolean
    csrf_enabled: boolean
  operation: enum(validate_auth|validate_authorization|apply_rate_limit|validate_input|check_xss|check_sql_injection|log_security_event)
  output_format: enum(security_decision|security_log|security_alert|validation_report)
```

### Error Handling

- **Invalid Token**: Return 401 Unauthorized, log potential attack
- **Expired Token**: Return 401 Unauthorized, suggest refresh
- **Unauthorized Access**: Return 403 Forbidden, log event
- **Rate Limit Exceeded**: Return 429 Too Many Requests, include Retry-After
- **Invalid Input**: Return 422 Unprocessable Entity, include field errors
- **XSS Detected**: Return 400 Bad Request, log critical event, block IP
- **SQL Injection Detected**: Return 400 Bad Request, log critical event, block IP
- **CSRF Violation**: Return 403 Forbidden, log event

### Security Best Practices

**Authentication**:
- Use strong signing algorithms (RS256 for production)
- Keep token expiration short (15-30 minutes for access tokens)
- Use httpOnly cookies for token storage
- Rotate refresh tokens
- Support token revocation

**Authorization**:
- Check permissions before accessing resources
- Enforce resource ownership
- Use least privilege principle
- Log all authorization denials

**Rate Limiting**:
- Limit sensitive endpoints more strictly
- Use sliding window for accurate limits
- Include remaining info in responses
- Block repeated violations

**Input Validation**:
- Validate all input on server side
- Never trust client-side validation
- Use whitelisting over blacklisting
- Sanitize dangerous characters

**SQL Injection**:
- Always use parameterized queries
- Use ORM for automatic escaping
- Validate numeric IDs
- Never concatenate input into SQL

**XSS Prevention**:
- Escape output contextually
- Use sanitization libraries
- Set CSP headers
- httpOnly cookies prevent token theft

**Headers**:
- Always set security headers
- Use HSTS for HTTPS only
- Prevent clickjacking with X-Frame-Options
- Prevent MIME sniffing with X-Content-Type-Options

### Security Levels

**Development**:
- Relaxed rate limits for testing
- Detailed error messages (not in production)
- Localhost allowed in CORS
- HTTP allowed (not production)

**Staging**:
- Production-like security
- Slightly relaxed rate limits
- Logging enabled
- Monitoring enabled

**Production**:
- Strict rate limits
- Generic error messages
- HTTPS only (HSTS)
- Comprehensive monitoring and alerting

### Attack Detection Patterns

**Brute Force**:
- Multiple failed logins from same IP
- Multiple failed logins for same user
- High rate of authentication attempts

**SQL Injection**:
- SQL keywords in input: `' OR`, `UNION SELECT`, `; DROP`
- Special characters: `'`, `"`, `;`, `--`, `/*`

**XSS**:
- Script tags: `<script>`, `<img onerror=`
- Event handlers: `onload=`, `onclick=`
- JavaScript URIs: `javascript:alert(1)`

**CSRF**:
- Missing or invalid CSRF token
- Referer header mismatch

**Path Traversal**:
- `../` in file paths
- `%2e%2e/` encoded traversal
- Absolute paths in relative locations

---

**Version:** 1.0.0
**Last Updated:** 2026-01-01
**Maintainer:** Spec-Kit Plus AI Agent System
