# Authentication Skill

## Purpose

To implement user authentication and authorization using Better Auth and JWT tokens, ensuring secure API access and user-specific data isolation. This skill manages identity verification, token lifecycle, access control, and session security across the full-stack Todo application. It serves as the centralized reasoning layer for all authentication-related decisions.

## When to Use (Trigger Conditions)

This skill should be invoked when:

- User registration and onboarding flow is being implemented
- User login credentials need to be verified
- JWT tokens need to be generated, validated, or refreshed
- Protected API endpoints require authorization checks
- User session management is needed
- Password hashing, verification, or reset is required
- Multi-tenant user data isolation must be enforced
- Token expiration, revocation, or blacklisting is needed
- OAuth or third-party authentication integration is required
- Authentication middleware or guards need configuration
- Rate limiting for auth endpoints is being implemented

**Triggers:**
- Auth spec defines new authentication flows
- API spec requires protected endpoints
- Feature spec introduces user-specific data access
- User attempts login or registration
- Token validation is requested
- Session initialization or termination

## Inputs

### Required Inputs

1. **Authentication Specification File**
   - Format: String path relative to `/specs/` directory
   - Examples: `auth/user-auth.md`, `auth/session-management.md`, `features/user-registration.md`

2. **Authentication Context**
   - Operation type: enum(register|login|logout|refresh|verify|revoke)
   - User credentials (email, password, or OAuth token)
   - Client metadata (IP, user-agent, device info)
   - Request context (endpoint, method, headers)

3. **Better Auth Configuration** (Optional but recommended)
   - Provider settings (credentials, OAuth providers)
   - Session duration and timeout policies
   - Token signing secrets (from environment)
   - MFA configuration if enabled

### Supported Specification Types

| Spec Type | Location Pattern | Purpose |
|-----------|-----------------|---------|
| Auth Specs | `/specs/auth/*.md` | Auth flows, token policies, session rules |
| Feature Specs | `/specs/features/*.md` | User registration, profile management, role-based access |
| API Specs | `/specs/api/*.md` | Protected endpoint definitions, auth requirements |
| Architecture Specs | `/specs/architecture/*.md` | Auth middleware, security patterns, session architecture |

### Specification Format Expectations

Auth specs MUST include:
- Registration flow requirements (email validation, password policies)
- Login flow (credentials validation, remember me, MFA)
- Token specifications (JWT structure, claims, expiration)
- Session management (duration, refresh, concurrent sessions)
- Authorization rules (roles, permissions, resource access)
- Security requirements (rate limiting, brute force protection, token blacklisting)

## Actions

### Step 1: Operation Classification
1. Identify the authentication operation type:
   - Registration: New user account creation
   - Login: Credential-based authentication
   - Logout: Session termination
   - Refresh: Token renewal
   - Verify: Token or session validation
   - Revoke: Token or session invalidation
2. Determine if operation requires user context or is public
3. Check if operation is synchronous or async (email verification, etc.)

### Step 2: Credential Validation
1. For registration:
   - Validate email format and uniqueness
   - Validate password against security policies (length, complexity)
   - Check for disposable email addresses (if required)
   - Generate secure password hash (bcrypt/scrypt/argon2)
2. For login:
   - Retrieve user record by email
   - Verify password hash matches provided password
   - Check account status (active, suspended, deleted)
   - Check for rate limiting violations (failed attempts)
   - Log authentication attempt for audit trail

### Step 3: User Identity Resolution
1. Retrieve complete user profile from database
2. Verify user has necessary permissions for the operation
3. Extract user metadata for token claims (roles, groups, scopes)
4. Determine user data scope for multi-tenant isolation
5. Calculate user-specific context (timezone, preferences, MFA status)

### Step 4: Token Generation
1. Construct JWT payload with required claims:
   - Standard claims: iss (issuer), sub (user ID), aud (audience), exp (expiration), iat (issued at), jti (token ID)
   - Custom claims: roles, permissions, tenant_id, session_id
2. Sign token with configured secret key (RS256 for production, HS256 for development)
3. Set appropriate expiration times:
   - Access token: Short-lived (15-30 minutes)
   - Refresh token: Longer-lived (7-30 days)
4. Generate unique token IDs (JTI) for revocation tracking
5. Store token metadata in database (if blacklisting enabled)

### Step 5: Session Management
1. Create or update session record:
   - Session ID (unique identifier)
   - User ID
   - Access token JTI
   - Refresh token JTI
   - Device info (user-agent, IP, device fingerprint)
   - Created at and expires at timestamps
   - Last activity timestamp
2. Enforce concurrent session limits (if configured)
3. Terminate old sessions when limit is exceeded (FIFO or LRU)
4. Update last activity timestamp on successful token refresh
5. Implement session timeout and idle timeout policies

### Step 6: Token Validation
1. Verify token signature using secret/public key
2. Validate standard claims:
   - Not before (nbf): Current time >= nbf
   - Expiration (exp): Current time < exp
   - Issuer (iss): Matches configured issuer
   - Audience (aud): Includes expected audience
3. Validate token hasn't been revoked (check blacklist if enabled)
4. Verify session is still active and not expired
5. Check token JTI matches session record
6. Extract user claims for authorization context

### Step 7: Authorization Decision
1. Extract user roles and permissions from token
2. Determine required permissions for the requested resource/operation
3. Check if user has all required permissions:
   - Direct permission: User has explicit permission
   - Role-based: User's role grants permission
   - Resource ownership: User owns the resource
4. Check tenant isolation: User can only access their data
5. Evaluate custom authorization rules (if defined)
6. Return authorization decision: enum(allowed|denied|unauthenticated)

### Step 8: Security Controls
1. Apply rate limiting based on operation type:
   - Registration: Limit per IP and email
   - Login: Limit per IP and email
   - Token refresh: Limit per session
2. Track failed authentication attempts:
   - Increment failure counter
   - Lock account after threshold (temporary or permanent)
   - Notify user of suspicious activity
3. Implement token blacklisting for:
   - Explicit logout
   - Password change
   - Role/permission changes
   - Account suspension/deletion
4. Check for suspicious patterns:
   - Multiple failed attempts from different IPs
   - Login from unusual geographic location
   - Multiple sessions from different devices

### Step 9: Response Preparation
1. For successful authentication:
   - Return access token and refresh token
   - Return token expiration timestamps
   - Return user profile (excluding sensitive data)
   - Set authentication cookies if using cookie-based auth
2. For failed authentication:
   - Return generic error message (don't reveal if user exists)
   - Include retry-after header if rate limited
   - Return error code for client handling
3. For token refresh:
   - Return new access token and refresh token
   - Invalidate old refresh token
4. For logout/revoke:
   - Invalidate session and tokens
   - Clear cookies if set
   - Return success confirmation

## Outputs

### Primary Output: Authentication Response

```yaml
authentication_result:
  meta:
    operation: enum(register|login|logout|refresh|verify|revoke)
    timestamp: datetime
    request_id: string
    success: boolean

  # Successful Authentication Output
  tokens:
    access_token:
      token: string  # JWT string
      type: "Bearer"
      expires_at: datetime
      jti: string  # Token ID for revocation
    refresh_token:
      token: string
      expires_at: datetime
      jti: string

  user:
    user_id: string  # UUID
    email: string
    username: string
    roles: [string]
    permissions: [string]
    tenant_id: string  # For multi-tenant isolation
    session_id: string
    created_at: datetime

  session:
    session_id: string
    device_info:
      user_agent: string
      ip_address: string
      device_type: enum(desktop|mobile|tablet|unknown)
    created_at: datetime
    expires_at: datetime
    last_activity: datetime
    concurrent_sessions: int

  # Authorization Output (for verify operation)
  authorization:
    authorized: boolean
    user_id: string
    user_roles: [string]
    user_permissions: [string]
    requested_resource: string
    required_permissions: [string]
    tenant_id: string

  # Error Output (for failed operations)
  error:
    code: enum(invalid_credentials|user_not_found|account_suspended|password_invalid|email_invalid|token_expired|token_invalid|rate_limit_exceeded|session_not_found)
    message: string  # User-friendly message (generic)
    retry_after: int  # Seconds to wait before retry
    lockout_expires: datetime  # When account lockout expires

  # Security Output
  security:
    rate_limit:
      remaining: int
      reset_at: datetime
      limit_exceeded: boolean
    failed_attempts:
      count: int
      lockout_threshold: int
      locked: boolean
    warnings: [string]  # Security warnings (e.g., unusual login location)
    requires_mfa: boolean
    mfa_required_methods: [string]
```

### Secondary Outputs

1. **Audit Log Entry**: Authentication attempt record for compliance
2. **Session Record**: Database-ready session object
3. **Token Metadata**: Token information for blacklisting
4. **Security Flags**: Suspicious activity indicators
5. **Metrics**: Authentication success/failure rates, latency

## Scope & Boundaries

### This Skill MUST:

- Implement user registration and login flows
- Generate and validate JWT tokens (access and refresh)
- Manage session lifecycle (create, validate, refresh, revoke)
- Perform authorization checks based on user roles and permissions
- Enforce multi-tenant data isolation
- Apply rate limiting and brute force protection
- Implement token revocation and blacklisting
- Hash and verify passwords securely
- Integrate with Better Auth for identity management
- Track authentication attempts for audit logging

### This Skill MUST NOT:

- Generate frontend UI components (login forms, registration pages)
- Create API route handlers or controllers
- Write database migration scripts or SQL queries
- Implement business logic beyond authentication
- Generate user profile pages or dashboard UI
- Create OAuth provider UI flow screens
- Write database models (User, Session, etc.)
- Configure Next.js middleware or API routes
- Define API endpoint schemas or DTOs
- Implement business rules for application features
- Generate TypeScript types or interfaces

### Boundary Examples

**In Scope:**
- Validate user credentials and generate JWT token
- Check if token has expired and return appropriate error
- Verify user has "todo:read" permission before allowing access
- Invalidate session on logout and blacklist tokens
- Enforce rate limiting: 5 login attempts per 15 minutes
- Hash password with bcrypt and verify against stored hash
- Determine user's data scope for multi-tenant queries
- Return authorization decision: user can access todo ID if they own it

**Out of Scope:**
- Create login form component with email/password fields
- Write FastAPI route handler for POST /auth/login
- Generate User SQLModel class definition
- Implement todo item creation business logic
- Create OAuth callback endpoint handler
- Configure Next.js middleware to validate JWT
- Write Alembic migration to create users table
- Generate TypeScript interface for User type
- Implement todo list filtering and sorting logic

## Dependencies

### Required Dependencies

1. **Spec-Kit Plus Schema**
   - Location: `/specs/.spec-kit/schema.md`
   - Purpose: Defines specification file structure

2. **Project Configuration**
   - Location: `/specs/.spec-kit/config.md`
   - Purpose: Provides auth stack details (Better Auth, JWT)

### Specification Dependencies

1. **Auth Specs**
   - Location: `/specs/auth/*.md`
   - Purpose: Define authentication flows, token policies, authorization rules

2. **Feature Specs**
   - Location: `/specs/features/*.md`
   - Purpose: Define user registration, role requirements, access patterns

3. **API Specs**
   - Location: `/specs/api/*.md`
   - Purpose: Define protected endpoints and authorization requirements

4. **Architecture Specs**
   - Location: `/specs/architecture/*.md`
   - Purpose: Define auth middleware patterns, session architecture

### Skill Dependencies

1. **Spec Interpretation Skill**
   - Purpose: Parse and understand authentication specifications
   - Used to extract auth flows, token policies, and authorization rules

2. **Database Modeling Skill**
   - Purpose: Understand User and Session model structures
   - Used to reference entity definitions for token claims and session storage

### Optional Dependencies

1. **Environment Configuration**
   - Location: Environment variables or secrets manager
   - Purpose: Provide JWT secrets, OAuth credentials, auth provider config

2. **Security Specs**
   - Location: `/specs/security/*.md`
   - Purpose: Define additional security requirements (MFA, 2FA, audit logging)

3. **Performance Specs**
   - Location: `/specs/performance/*.md`
   - Purpose: Define rate limiting thresholds and session limits

## Used By Agents

### Primary Consumers

1. **General-Purpose Agents**
   - When implementing user registration and login features
   - When protecting API endpoints with authentication
   - When managing user sessions and tokens
   - When enforcing authorization for protected resources

2. **Backend Implementation Agents**
   - When writing FastAPI authentication endpoints
   - When creating JWT token validation middleware
   - When implementing session management logic
   - When integrating Better Auth providers

3. **API Implementation Agents**
   - When protecting FastAPI routes with auth decorators
   - When implementing authorization checks in handlers
   - When extracting user context from JWT tokens

4. **Plan Agents (Software Architect)**
   - When designing authentication architecture
   - When planning session management strategy
   - When designing authorization rules and roles

### Secondary Consumers

1. **Test Generation Agents**
   - When creating authentication test cases
   - When generating test scenarios for authorization
   - When mocking authentication in integration tests

2. **Frontend Agents**
   - When understanding authentication flows for state management
   - When implementing token storage and refresh logic
   - When building protected route guards

3. **Security Agents**
   - When auditing authentication implementation
   - When validating security controls (rate limiting, token revocation)
   - When testing for auth vulnerabilities (session hijacking, token theft)

## Integration Notes

### Calling Convention

```yaml
skill: "authentication"
inputs:
  auth_spec: "auth/user-auth.md"
  operation: enum(register|login|logout|refresh|verify|revoke)
  credentials:
    email: string
    password: string
  context:
    ip_address: string
    user_agent: string
    device_fingerprint: string
  token: string  # For verify/refresh/revoke operations
  session_id: string  # For refresh/revoke operations
  required_permissions: [string]  # For verify operation
  resource_type: string  # For verify operation (e.g., "todo")
  resource_id: string  # For verify operation (e.g., todo UUID)
  output_format: "authentication_response"
```

### Error Handling

- **Invalid Credentials**: Return generic error with retry-after, don't reveal user existence
- **Account Locked**: Return lock status with expiration time
- **Rate Limit Exceeded**: Return retry-after header and time until reset
- **Token Expired**: Return clear expiration timestamp, suggest refresh
- **Token Invalid**: Return validation error with specific reason
- **Session Not Found**: Return session expired or revoked error
- **MFA Required**: Return required MFA methods and next steps

### Security Considerations

- Never include sensitive data (passwords, secrets) in error messages
- Use constant-time comparison for password verification
- Rotate refresh tokens on each refresh (token rotation)
- Implement secure token storage (httpOnly, secure, sameSite cookies)
- Validate token on every protected request
- Implement token blacklisting for immediate revocation
- Log all authentication attempts for audit trail
- Detect and prevent token replay attacks

### Better Auth + JWT Specifics

- Use Better Auth for identity management and provider integration
- Generate custom JWT claims with user context (roles, tenant_id)
- Sign tokens with RS256 (private/public key) for production
- Use HS256 (shared secret) for development only
- Store JWT secrets in environment variables (never in code)
- Implement token refresh before expiration (proactive refresh)
- Set appropriate cookie attributes: httpOnly, secure, sameSite=strict
- Validate token signature and all claims before extracting user data

### Multi-User / Multi-Tenant Support

- Include tenant_id in JWT claims for data isolation
- Enforce tenant_id in all authorization checks
- Scope user sessions to tenant context
- Prevent cross-tenant data access via authorization
- Validate tenant_id exists and is active
- Implement tenant-specific rate limiting

---

**Version:** 1.0.0
**Last Updated:** 2026-01-01
**Maintainer:** Spec-Kit Plus AI Agent System
