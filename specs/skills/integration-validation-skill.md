# Integration & Validation Skill

## Purpose

To orchestrate the integration of frontend, backend, and database components, performing validation across all layers to ensure features work correctly and user data is isolated and consistent. This skill serves as the reasoning layer for end-to-end system validation, ensuring that all components work together seamlessly, contracts are honored, data flows correctly through the system, and multi-user data isolation is properly enforced. It validates that Phase I features continue to work correctly in Phase II.

## When to Use (Trigger Conditions)

This skill should be invoked when:

- A new feature has been implemented across frontend, backend, and database
- Existing features have been modified or refactored
- Multi-user data isolation needs validation
- End-to-end integration testing is required
- API contracts between frontend and backend need verification
- Data flow through all layers needs validation
- Error handling across layers needs testing
- Phase I feature compatibility with Phase II needs verification
- System integration issues need diagnosis
- Automated validation pipelines are being designed
- Feature rollback or hotfix validation is needed
- Database schema changes impact frontend/backend integration
- Authentication and authorization integration needs testing

**Triggers:**
- Feature implementation complete (all layers implemented)
- Integration tests are being designed
- Multi-user authentication integration needs validation
- Data isolation bugs or issues are suspected
- Phase I to Phase II migration validation is required
- Contract validation between frontend API client and backend endpoints

## Inputs

### Required Inputs

1. **Frontend Specification**
   - UI component specifications
   - API client functions and type definitions
   - State management configuration
   - Component hierarchy and data flow
   - Location: From Frontend UI Skill and Frontend API Client Skill outputs

2. **Backend Specification**
   - API endpoint definitions and contracts
   - Request/response schemas
   - Authentication and authorization configuration
   - Error handling strategy
   - Location: From API Construction Skill and Authentication Skill outputs

3. **Database Specification**
   - Model definitions and schemas
   - Relationships and constraints
   - Migration history
   - Location: From Database Modeling Skill output

4. **Feature Specification**
   - Business logic requirements
   - User stories and acceptance criteria
   - Expected data flow
   - Location: `/specs/features/*.md`

5. **Authentication Context**
   - JWT token structure
   - User/session data format
   - Multi-tenant configuration

### Supported Specification Types

| Spec Type | Location Pattern | Purpose |
|-----------|-----------------|---------|
| Integration Specs | `/specs/integration/*.md` | Integration test scenarios, validation rules |
| Feature Specs | `/specs/features/*.md` | Feature requirements, acceptance criteria |
| API Specs | `/specs/api/*.md` | Endpoint contracts for validation |
| Database Specs | `/specs/database/*.md` | Model structures for data validation |
| Auth Specs | `/specs/auth/*.md` | Authentication requirements for security validation |

### Specification Format Expectations

Integration specs MUST include:
- Test scenarios and expected behaviors
- Data flow diagrams or descriptions
- Integration points between layers
- Error scenarios and expected error handling
- Multi-user data isolation requirements

Feature specs MUST include:
- Acceptance criteria for validation
- Expected user workflows
- Edge cases and error scenarios

## Actions

### Step 1: Component Inventory and Mapping
1. Inventory all components in each layer:
   - Frontend: Pages, components, API client functions
   - Backend: API endpoints, services, business logic
   - Database: Models, tables, relationships
2. Map frontend components to backend endpoints:
   - Identify which frontend components call which API endpoints
   - Verify endpoint paths, methods, and parameters match
   - Check request/response types align
3. Map backend endpoints to database models:
   - Identify which models/tables are used by each endpoint
   - Verify field names and types match
   - Check relationships are properly used
4. Create integration graph showing component connections

### Step 2: Contract Validation
1. Validate frontend-backend API contracts:
   - Verify endpoint paths match between API client and backend
   - Verify HTTP methods match (GET, POST, PATCH, DELETE)
   - Verify request body structures match TypeScript interfaces
   - Verify response structures match TypeScript interfaces
   - Verify query parameters match on both sides
   - Verify path parameters match on both sides
2. Validate type consistency:
   - Check field names (snake_case vs camelCase transformation)
   - Check field types (string, number, boolean, date, UUID)
   - Check required/optional fields match
   - Check enum values match
   - Check array structures match
3. Validate error contracts:
   - Verify error response structures match
   - Verify error codes are consistent
   - Verify HTTP status codes match expectations
4. Identify contract mismatches and generate validation report

### Step 3: Data Flow Validation
1. Trace data flow for each feature:
   - User action → Frontend component → API client → Backend endpoint → Business logic → Database → Backend response → Frontend state → UI update
2. Validate data transformations:
   - Frontend request: camelCase → snake_case (backend)
   - Backend query: snake_case → database columns
   - Backend response: snake_case → camelCase (frontend)
   - Date/time transformations (ISO 8601 ↔ Date objects)
   - UUID handling (strings ↔ typed IDs)
3. Validate data integrity:
   - Check that required fields are always present
   - Check that data types are preserved through transformations
   - Check that null/undefined handling is consistent
   - Check that nested objects/arrays are properly handled
4. Validate state updates:
   - Check that frontend state is updated correctly after API calls
   - Check that cache is updated or invalidated as expected
   - Check that optimistic updates are applied correctly
   - Check that rollback occurs on error

### Step 4: Authentication and Authorization Integration
1. Validate authentication flow:
   - Frontend login → API token request → Backend auth endpoint → JWT token generation → Token storage → Token attachment to requests
   - Verify tokens are stored securely (httpOnly cookie or secure storage)
   - Verify tokens are attached to all authenticated requests
   - Verify token refresh flow works correctly
2. Validate authorization integration:
   - Check that protected endpoints require valid JWT
   - Check that user context (user_id, roles) is extracted correctly
   - Check that authorization rules are enforced at endpoint level
   - Check that authorization errors are handled correctly (403)
3. Validate multi-user data isolation:
   - Trace data queries for each user
   - Verify that queries include user_id/tenant_id filters
   - Verify that users cannot access other users' data
   - Test edge cases: same task IDs for different users, deleted users, etc.
4. Validate session management:
   - Check that logout invalidates tokens
   - Check that token expiry is handled correctly
   - Check that concurrent sessions work as expected

### Step 5: Business Logic Integration Validation
1. Validate business rules across layers:
   - Verify that frontend validation matches backend validation
   - Check that business rules are enforced in backend (not just frontend)
   - Verify that state transitions are handled correctly
   - Check that immutability rules are enforced (created_at, created_by)
2. Validate error handling across layers:
   - Check that backend errors are properly caught and transformed
   - Check that frontend displays correct error messages
   - Check that retry logic works for transient errors
   - Check that rollback occurs on failed operations
3. Validate edge case handling:
   - Check behavior with empty data (no tasks, etc.)
   - Check behavior with malformed data
   - Check behavior with concurrent updates (race conditions)
   - Check behavior with network failures

### Step 6: Phase I Feature Compatibility Validation
1. Validate all Phase I features work in Phase II:
   - Basic CRUD (create, read, update, delete tasks)
   - Intermediate features (due dates, priorities, tags)
   - Advanced features (filtering, sorting, searching)
   - Task completion and reopening
2. Validate data persistence:
   - Verify Phase I data structure is preserved
   - Check that Phase I data is accessible in Phase II
   - Verify that migrations don't break Phase I data
3. Validate UI consistency:
   - Check that Phase I UI components still work
   - Verify that user experience is consistent
   - Check that Phase I workflows are preserved

### Step 7: End-to-End Scenario Testing
1. Design test scenarios for each feature:
   - Happy path: Everything works correctly
   - Sad path: Errors occur at various stages
   - Edge cases: Empty data, large data, concurrent operations
2. Validate complete user workflows:
   - User registration → Login → Create task → Update task → Complete task → Delete task → Logout
   - Multi-user scenario: User A creates task, User B tries to access (should fail)
   - Data isolation: User A and User B have same task IDs, verify they access different tasks
3. Validate error scenarios:
   - Invalid credentials → Login fails
   - Expired token → Token refresh triggered
   - Network error → Retry logic
   - Validation error → User sees appropriate error message
4. Validate concurrency scenarios:
   - Two users update same task simultaneously
   - User updates task while another deletes it
   - Multiple requests in rapid succession

### Step 8: Automated Validation Rules
1. Define automated validation checks:
   - Contract matching: Frontend ↔ Backend contracts must match
   - Type safety: All types must be consistent across layers
   - Field mapping: All fields must be properly mapped (snake_case ↔ camelCase)
   - Auth enforcement: All protected endpoints must require valid auth
   - Data isolation: All user data queries must include user_id/tenant_id filter
   - Error handling: All errors must be properly transformed and displayed
2. Define validation rules for each layer:
   - Frontend: Component props match types, API calls match contracts
   - Backend: Endpoints match contracts, validation rules enforced
   - Database: Models match schemas, constraints enforced
3. Define integration validation rules:
   - Data flow completeness (no data loss in transformations)
   - State consistency (frontend state reflects backend state)
   - Cache consistency (cache matches database)
4. Implement automated checks where possible

### Step 9: Issue Detection and Diagnosis
1. Detect integration issues:
   - Contract mismatches (endpoint paths, methods, types)
   - Data transformation errors (missing fields, wrong types)
   - Authentication failures (tokens not attached, expired tokens)
   - Authorization failures (users can access others' data)
   - Business logic inconsistencies (rules not enforced)
   - State inconsistencies (frontend state doesn't match backend)
2. Diagnose root causes:
   - Trace issue through layers (frontend → backend → database)
   - Identify where transformation or logic breaks
   - Check for race conditions or timing issues
   - Verify error handling at each layer
3. Prioritize issues:
   - Critical: Security vulnerabilities, data exposure, data loss
   - High: Broken features, data isolation failures
   - Medium: Inconsistent behavior, error handling issues
   - Low: Minor UX issues, edge cases

### Step 10: Validation Report Generation
1. Generate comprehensive integration report:
   - Feature validation status (passed/failed/partial)
   - Contract validation results (mismatches found)
   - Data flow validation results (transformation errors)
   - Authentication/authorization validation results
   - Multi-user data isolation validation results
   - Phase I compatibility validation results
   - Issues found with severity and recommendations
2. Generate layer-specific reports:
   - Frontend validation report (component issues, API client issues)
   - Backend validation report (endpoint issues, business logic issues)
   - Database validation report (model issues, constraint issues)
3. Generate feature-specific reports:
   - For each feature: validation status, issues, recommendations
4. Generate actionable recommendations:
   - Specific fixes for each issue
   - Priority order for fixes
   - Risk assessment for not fixing issues

### Step 11: Regression Validation
1. Validate that fixes don't break existing functionality:
   - Re-run all validation checks after fixes
   - Verify that Phase I features still work
   - Check that no new issues are introduced
2. Validate performance impact:
   - Check that integration doesn't introduce performance regressions
   - Verify that caching strategies work correctly
   - Check that error handling doesn't slow down operations
3. Validate security implications:
   - Check that fixes don't introduce security vulnerabilities
   - Verify that data isolation is still enforced
   - Check that authentication/authorization still works

### Step 12: Continuous Integration Validation
1. Design CI/CD validation pipeline:
   - Automated contract validation on code changes
   - Automated integration tests on PR merge
   - Automated end-to-end tests on deployment
2. Define validation gates:
   - Code must pass all validation checks before merge
   - Tests must pass before deployment
   - Security scans must pass before release
3. Define monitoring:
   - Track integration test results over time
   - Monitor error rates in production
   - Alert on integration failures

## Outputs

### Primary Output: Integration Validation Report

```yaml
integration_validation_report:
  meta:
    feature_spec: string
    frontend_spec: string
    backend_spec: string
    database_spec: string
    validation_timestamp: datetime
    validator_version: string

  overall_status:
    status: enum(passed|failed|partial)
    total_checks: int
    passed_checks: int
    failed_checks: int
    warning_checks: int
    critical_issues: int
    high_issues: int
    medium_issues: int
    low_issues: int

  contract_validation:
    frontend_backend:
      status: enum(passed|failed|partial)
      endpoint_matches:
        total: int
        matched: int
        mismatched: int
      mismatches:
        - endpoint: string
          frontend_path: string
          backend_path: string
          issue: enum(path_mismatch|method_mismatch|params_mismatch|response_mismatch)
          severity: enum(critical|high|medium|low)
          recommendation: string

    backend_database:
      status: enum(passed|failed|partial)
      field_mappings:
        total: int
        matched: int
        mismatched: int
      mismatches:
        - model: string
          field: string
          expected_type: string
          actual_type: string
          severity: enum(critical|high|medium|low)
          recommendation: string

  data_flow_validation:
    status: enum(passed|failed|partial)
    data_integrity:
      status: enum(passed|failed|partial)
      transformations_valid: boolean
      field_preservation: boolean
      type_preservation: boolean
    transformations:
      - transformation: enum(camel_to_snake|snake_to_camel|date_format|uuid_handling)
      status: enum(valid|invalid|warning)
      issues: [string]

  authentication_validation:
    status: enum(passed|failed|partial)
    token_management:
      status: enum(passed|failed|partial)
      token_attached: boolean
      token_refresh: boolean
      token_storage_secure: boolean
    protected_endpoints:
      total: int
      properly_protected: int
      unprotected: [string]

  authorization_validation:
    status: enum(passed|failed|partial)
    access_control:
      status: enum(passed|failed|partial)
      roles_enforced: boolean
      permissions_enforced: boolean
    data_isolation:
      status: enum(passed|failed|partial)
      user_filters_present: boolean
      tenant_filters_present: boolean
      isolation_test_results:
        - test: string
          passed: boolean
          details: string

  business_logic_validation:
    status: enum(passed|failed|partial)
    rules_enforced:
      total: int
      enforced: int
      not_enforced: int
    validation_consistency:
      frontend_matches_backend: boolean
    state_transitions:
      status: enum(valid|invalid|warning)
      issues: [string]

  phase_i_compatibility:
    status: enum(passed|failed|partial)
    features_tested:
      - feature: string
        status: enum(passed|failed|partial)
        issues: [string]
    data_preservation:
      status: enum(passed|failed|partial)
      schema_compatible: boolean
      data_accessible: boolean

  end_to_end_scenarios:
    total_scenarios: int
    passed_scenarios: int
    failed_scenarios: int
    scenarios:
      - name: string
        type: enum(happy_path|sad_path|edge_case|concurrency)
        status: enum(passed|failed|partial)
        steps:
          - step: string
            status: enum(passed|failed)
            details: string
        issues: [string]

  issues_found:
    - issue_id: string
      severity: enum(critical|high|medium|low)
      category: enum(contract|data_flow|auth|authorization|business_logic|compatibility)
      description: string
      affected_components: [string]
      affected_layers: [string]
      reproduction_steps: [string]
      recommendation: string
      priority: int
      estimated_fix_effort: string

  recommendations:
    critical:
      - issue_id: string
        action: string
        urgency: string
    high:
      - issue_id: string
        action: string
        urgency: string
    medium:
      - issue_id: string
        action: string
        urgency: string
    low:
      - issue_id: string
        action: string
        urgency: string

  regression_validation:
    status: enum(passed|failed|partial)
    previous_issues_fixed: int
    new_issues_introduced: int
    phase_i_features_affected: int
```

### Secondary Outputs

1. **Layer-Specific Validation Reports**:
   - Frontend validation report
   - Backend validation report
   - Database validation report

2. **Feature-Specific Validation Reports**:
   - Report for each feature tested
   - Validation status per feature
   - Issues and recommendations per feature

3. **Automated Validation Rules**:
   - List of all validation rules implemented
   - Rule definitions and expected behavior
   - Rules that can be automated vs manual

4. **Integration Test Scenarios**:
   - List of all test scenarios designed
   - Test data requirements
   - Expected results for each scenario

5. **Security Validation Report**:
   - Authentication flow validation results
   - Authorization validation results
   - Data isolation validation results
   - Security vulnerabilities found

## Scope & Boundaries

### This Skill MUST:

- Orchestrate integration validation across frontend, backend, and database layers
- Validate contracts between frontend and backend (API endpoints, types, schemas)
- Validate data flow and transformations between layers
- Validate authentication and authorization integration
- Validate multi-user data isolation
- Validate business logic consistency across layers
- Perform end-to-end scenario testing
- Detect integration issues and diagnose root causes
- Generate comprehensive validation reports with actionable recommendations
- Validate Phase I feature compatibility with Phase II
- Design automated validation rules and CI/CD pipelines
- Perform regression validation after fixes

### This Skill MUST NOT:

- Generate new features or functionality
- Write production code for frontend, backend, or database
- Implement authentication logic (JWT validation, token issuance)
- Define database schemas or create models
- Implement actual HTTP requests or API calls
- Create UI components or rendering logic
- Configure Next.js or FastAPI infrastructure
- Write database queries or migrations
- Implement business logic for features
- Generate test code or test scripts (only design validation scenarios)
- Make architectural decisions for new features

### Boundary Examples

**In Scope:**
- Validate that frontend `getTodos()` function calls backend `GET /api/v1/todos`
- Verify that request body `{ userId: "123" }` is transformed to `{ user_id: "123" }`
- Check that backend endpoint requires valid JWT token
- Verify that user A cannot access user B's tasks
- Trace data flow: User creates task → Frontend form → API client → Backend → Database
- Validate that Phase I task filtering still works in Phase II
- Detect that frontend expects `userId` field but backend returns `user_id`
- Identify that protected endpoint `/api/v1/todos/{id}` doesn't verify user ownership
- Generate validation report: "Critical: Data isolation not enforced on GET /api/v1/todos"

**Out of Scope:**
- Implement `getTodos()` function in frontend
- Write FastAPI route handler for `GET /api/v1/todos`
- Create SQLModel class for Todo model
- Implement JWT validation middleware
- Write actual validation test code: `test_user_cannot_access_other_users_tasks()`
- Fix data isolation issue by adding `WHERE user_id = :user_id` to query
- Generate TypeScript interface: `interface Todo { id: string; userId: string; }`
- Create UI component to display task list
- Configure Next.js page routing
- Implement business logic: "Completed tasks cannot be edited"

## Dependencies

### Required Dependencies

1. **Spec-Kit Plus Schema**
   - Location: `/specs/.spec-kit/schema.md`
   - Purpose: Defines specification file structure

2. **Project Configuration**
   - Location: `/specs/.spec-kit/config.md`
   - Purpose: Provides tech stack and architecture details

### Specification Dependencies

1. **Feature Specs**
   - Location: `/specs/features/*.md`
   - Purpose: Define feature requirements and acceptance criteria for validation

2. **Integration Specs**
   - Location: `/specs/integration/*.md`
   - Purpose: Define integration test scenarios and validation rules

3. **API Specs**
   - Location: `/specs/api/*.md`
   - Purpose: Define API contracts for contract validation

4. **Database Specs**
   - Location: `/specs/database/*.md`
   - Purpose: Define model structures for data validation

5. **Auth Specs**
   - Location: `/specs/auth/*.md`
   - Purpose: Define authentication and authorization requirements

### Skill Dependencies

1. **All Previously Defined Skills**:
   - **Spec Interpretation Skill**: Parse and understand all specifications
   - **Database Modeling Skill**: Understand database models and schemas
   - **Authentication Skill**: Understand auth token structure and validation
   - **API Construction Skill**: Understand backend API endpoint design
   - **Task Business Logic Skill**: Understand business rules and validation
   - **Frontend UI Skill**: Understand frontend components and data flow
   - **Frontend API Client Skill**: Understand API client contracts and types

### Optional Dependencies

1. **Phase I Feature Specs**
   - Location: Phase I specifications
   - Purpose: Validate Phase I feature compatibility

2. **Security Specs**
   - Location: `/specs/security/*.md`
   - Purpose: Define additional security validation requirements

3. **Performance Specs**
   - Location: `/specs/performance/*.md`
   - Purpose: Define performance validation requirements

## Used By Agents

### Primary Consumers

1. **General-Purpose Agents**
   - When validating integration after feature implementation
   - When diagnosing integration issues
   - When performing end-to-end validation
   - When generating validation reports

2. **Integration Test Agents**
   - When designing integration test scenarios
   - When validating data flow between layers
   - When testing authentication and authorization integration
   - When validating multi-user data isolation

3. **Quality Assurance Agents**
   - When performing system validation
   - When validating Phase I compatibility
   - When performing regression testing
   - When generating validation reports for stakeholders

4. **Plan Agents (Software Architect)**
   - When designing integration architecture
   - When planning validation strategies
   - When identifying integration points and dependencies
   - When designing CI/CD validation pipelines

### Secondary Consumers

1. **DevOps Agents**
   - When setting up CI/CD validation pipelines
   - When configuring automated integration tests
   - When monitoring integration test results

2. **Documentation Agents**
   - When documenting integration architecture
   - When documenting validation rules and scenarios
   - When creating integration troubleshooting guides

3. **Frontend/Backend Implementation Agents**
   - When receiving validation reports and fixing issues
   - When understanding integration requirements
   - When validating their work before merging

## Integration Notes

### Calling Convention

```yaml
skill: "integration-validation"
inputs:
  feature_spec: "features/todo-crud.md"
  integration_spec: "integration/todo-integration.md"
  frontend_spec: string  # From Frontend UI Skill output
  backend_spec: string  # From API Construction Skill output
  database_spec: string  # From Database Modeling Skill output
  auth_spec: "auth/user-auth.md"
  validation_scope:
    - contract_validation
    - data_flow_validation
    - auth_validation
    - authorization_validation
    - business_logic_validation
    - phase_i_compatibility
  validation_level: enum(quick|comprehensive|regression)
  phase_i_validation: boolean  # Validate Phase I compatibility
  output_format: "integration_validation_report"
```

### Error Handling

- **Missing Specifications**: Return error with available spec locations
- **Contract Mismatches**: Document all mismatches with severity
- **Validation Failures**: Continue validation to collect all issues, don't stop on first failure
- **Incompatible Phase I**: Flag Phase I compatibility issues with high priority

### Validation Levels

1. **Quick Validation**:
   - Contract validation (frontend ↔ backend)
   - Critical security checks (auth, authorization, data isolation)
   - Basic data flow validation

2. **Comprehensive Validation**:
   - All quick validation checks
   - Business logic validation
   - End-to-end scenario testing
   - Phase I compatibility validation
   - Edge case testing

3. **Regression Validation**:
   - All comprehensive validation checks
   - Verify previous issues are fixed
   - Check for new issues introduced
   - Performance impact validation

### Integration Validation Best Practices

- Validate contracts before implementing features
- Test happy paths, sad paths, and edge cases
- Validate authentication and authorization for all protected endpoints
- Test multi-user data isolation thoroughly
- Validate that Phase I features work after Phase II changes
- Automate validation checks where possible
- Generate actionable recommendations with priorities
- Perform regression validation after fixes
- Monitor integration test results over time

### Phase I Compatibility Requirements

- All Phase I features must work in Phase II
- Phase I data must be accessible and preserved
- Phase I UI components must continue to work
- Phase I business logic must be preserved
- Phase I workflows must remain functional
- Phase I user experience must be consistent

### Security Validation Requirements

- All protected endpoints must require valid JWT
- Token refresh must work correctly
- Users cannot access other users' data (data isolation)
- Users cannot modify other users' data
- Multi-tenant isolation must be enforced
- Authorization rules must be enforced at backend
- Errors must not expose sensitive information

---

**Version:** 1.0.0
**Last Updated:** 2026-01-01
**Maintainer:** Spec-Kit Plus AI Agent System
