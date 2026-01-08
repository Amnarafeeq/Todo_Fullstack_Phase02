# Backend Testing & QA Skill

## Purpose

To generate automated tests for backend FastAPI application, verifying endpoints, business logic, database operations, and ensuring features work correctly. This skill serves as the reasoning layer for test generation, test execution, coverage analysis, and QA verification across the backend.

## When to Use (Trigger Conditions)

This skill should be invoked when:

- New backend endpoints need to be tested
- Existing endpoints require regression testing
- Unit tests need to be generated for services or business logic
- Integration tests need to be created for API endpoints
- Database tests need to be generated for repositories
- Authentication and authorization tests are required
- Test coverage needs to be calculated and reported
- Bugs or issues have been reported and need verification tests
- Refactoring has been done and tests need updating
- Code quality metrics (coverage, flaky tests) need assessment
- Continuous integration pipeline requires test execution
- Release candidate needs QA verification

**Triggers:**
- Backend feature implementation complete, ready for testing
- Pull request opened or updated (CI/CD trigger)
- Manual test generation request
- Bug fix requires validation tests
- Refactoring requires test updates
- Coverage threshold not met

## Inputs

### Required Inputs

1. **Feature Specification**
   - Feature requirements and user stories
   - Acceptance criteria
   - Business rules and validation requirements
   - Edge cases and error scenarios
   - Location: `/specs/features/*.md`

2. **Backend Specifications**
   - API endpoint definitions
   - Request/response schemas
   - Business logic and services
   - Database models and relationships
   - Location: From API Construction Skill and Database Modeling Skill outputs

3. **Authentication Specifications**
   - JWT token structure
   - Authentication flows
   - Authorization rules and roles
   - Location: From Authentication Skill output

### Test-Specific Inputs

1. **For Unit Test Generation**:
   - Service or module to test
   - Functions and methods
   - Dependencies and mocks

2. **For API Test Generation**:
   - Endpoint path and method
   - Request parameters and body
   - Expected response
   - Error scenarios

3. **For Database Test Generation**:
   - Model or repository to test
   - Database operations (CRUD)
   - Test data fixtures

### Supported Test Types

| Test Type | Scope | Purpose |
|------------|--------|---------|
| Unit Tests | Individual functions, classes | Verify isolated functionality |
| Integration Tests | Multiple services together | Verify integration points |
| API Tests | FastAPI endpoints | Verify API contracts and behavior |
| Database Tests | Database access layer | Verify data persistence and constraints |
| Service Tests | Backend services | Verify business logic and rules |
| Repository Tests | Database queries | Verify query correctness |
| Auth Tests | Authentication flows | Verify security and access control |

## Actions

### Step 1: Test Scope Analysis

1. Analyze backend specifications:
   - Identify all endpoints to test
   - Identify all services and business logic to test
   - Identify all database repositories to test
   - Identify authentication and authorization requirements
2. Identify testing priorities:
   - Critical: API endpoints, business logic, database operations
   - High: Authentication, authorization, validation
   - Medium: Error handling, edge cases
   - Low: Logging, configuration
3. Determine test types needed:
   - Unit tests for services and repositories
   - Integration tests for service interactions
   - API tests for all endpoints
   - Database tests for repositories
   - Auth tests for authentication and authorization

### Step 2: Unit Test Generation (Services)

1. Generate service tests:
   - **Business Logic Tests**: Verify business rules
     - Test valid operations
     - Test invalid operations (validation)
     - Test edge cases
     - Test state transitions
   - **Validation Tests**: Verify input validation
     - Test required fields
     - Test field types
     - Test field constraints (min, max, pattern)
     - Test custom validators
   - **Error Handling Tests**: Verify error scenarios
     - Test with invalid data
     - Test with missing data
     - Test with conflicting data
2. Generate test data:
   - Create realistic test data
   - Create edge case test data
   - Create invalid test data
   - Create test fixtures
3. Generate mocks:
   - Mock database sessions
   - Mock external service calls
   - Mock authentication context
   - Mock user context

### Step 3: Unit Test Generation (Repositories)

1. Generate repository tests:
   - **CRUD Tests**: Verify database operations
     - Test create (successful and failed)
     - Test read (single and list)
     - Test update (partial and full)
     - Test delete (successful and failed)
   - **Query Tests**: Verify data retrieval
     - Test filtering
     - Test sorting
     - Test pagination
     - Test relationships
   - **Transaction Tests**: Verify transaction behavior
     - Test rollback on error
     - Test commit on success
3. Generate test database fixtures:
   - Create test data models
   - Setup and teardown functions
   - Clean up after tests
4. Generate test scenarios:
   - Happy path: Normal operations succeed
   - Sad path: Error conditions
   - Edge cases: Boundary values, empty data
   - Concurrency: Multiple operations

### Step 4: API Test Generation

1. Generate endpoint tests for each API route:
   - **GET Tests**: Verify read operations
     - Test with valid ID/path
     - Test with invalid ID (404)
     - Test with query parameters
     - Test without authentication (401)
     - Test without authorization (403)
     - Test with filters, sorting, pagination
   - **POST Tests**: Verify create operations
     - Test with valid request body
     - Test with missing required fields (422)
     - Test with invalid field types (422)
     - Test with invalid field values (422)
     - Test with duplicate data (409)
     - Test without authentication (401)
   - **PATCH Tests**: Verify update operations
     - Test with valid partial update
     - Test with invalid field values (422)
     - Test with invalid ID (404)
     - Test modifying immutable fields (422)
     - Test updating non-owned resource (403)
     - Test without authentication (401)
   - **DELETE Tests**: Verify delete operations
     - Test with valid ID
     - Test with invalid ID (404)
     - Test deleting non-owned resource (403)
     - Test deleting already deleted resource (404)
     - Test without authentication (401)
2. Generate authentication tests:
   - **Login Tests**: Verify authentication flow
     - Test with valid credentials
     - Test with invalid credentials (401)
     - Test with missing fields (422)
     - Test with invalid email format (422)
     - Verify JWT token returned
     - Verify token structure (claims, expiration)
   - **Register Tests**: Verify registration flow
     - Test with valid data
     - Test with duplicate email (409)
     - Test with invalid email format (422)
     - Test with weak password (422)
     - Test with missing required fields (422)
   - **Token Refresh Tests**: Verify token refresh
     - Test with valid refresh token
     - Test with expired refresh token (401)
     - Test with invalid refresh token (401)
3. Generate authorization tests:
   - **Role-Based Access Tests**: Verify role-based authorization
     - Test admin can access admin endpoints
     - Test regular user cannot access admin endpoints (403)
   - **Resource Ownership Tests**: Verify user can only access own data
     - Test user can access own task
     - Test user cannot access another user's task (403)
   - Test with multi-user scenario (verify isolation)
4. Generate error handling tests:
   - Test all error response codes (400, 401, 403, 404, 409, 422, 500)
   - Verify error response structure
   - Verify error messages are user-friendly
   - Verify error codes are consistent

### Step 5: Database Test Generation

1. Generate model tests:
   - Test model validation rules
   - Test field constraints
   - Test relationship constraints
   - Test constraint violations
2. Generate migration tests:
   - Test schema changes
   - Test data migration
   - Test rollback
3. Generate query tests:
   - Test query correctness
   - Test query performance
   - Test with large datasets

### Step 6: Test File Organization

1. Organize tests by type:
   - `/app/tests/unit/services/` - Service tests
   - `/app/tests/unit/repositories/` - Repository tests
   - `/app/tests/integration/` - Integration tests
   - `/app/tests/api/` - API endpoint tests
   - `/app/tests/auth/` - Authentication tests
2. Name test files:
   - Match service/repository name: `test_task_service.py`, `test_task_repository.py`
   - Use descriptive test names
3. Structure test files:
   - Test class or fixture
   - Individual test methods
   - Setup and teardown functions

### Step 7: Mock and Fixture Generation

1. Generate test fixtures:
   - Create database fixtures (test data)
   - Create authentication fixtures (test users, tokens)
   - Create API client fixtures
2. Generate mocks:
   - Mock database sessions
   - Mock external API calls
   - Mock time/date functions
   - Mock environment variables
3. Generate test utilities:
   - Helper functions for test data creation
   - Helper functions for test assertions
   - Helper functions for authentication

### Step 8: Test Execution

1. Execute unit tests:
   - Run all tests: `pytest`
   - Run specific test file: `pytest tests/unit/services/test_task_service.py`
   - Run tests matching pattern: `pytest -k test_create`
2. Execute API tests:
   - Start test database
   - Run migrations
   - Execute API test suite
   - Clean up test database
3. Execute integration tests:
   - Setup test environment
   - Run integration tests
   - Cleanup after tests
4. Execute coverage analysis:
   - Run tests with coverage: `pytest --cov=app --cov-report=html`

### Step 9: Coverage Calculation

1. Calculate code coverage:
   - Use pytest-cov for backend
   - Measure coverage by type:
     - Statement coverage: Percentage of statements executed
     - Branch coverage: Percentage of branches taken
     - Function coverage: Percentage of functions called
     - Line coverage: Percentage of lines executed
2. Generate coverage reports:
   - HTML report with line-by-line coverage
   - JSON report for CI/CD integration
   - Console summary with percentages
3. Identify uncovered code:
   - List files with low coverage
   - Highlight uncovered lines
   - Identify untested branches
   - Suggest additional tests

### Step 10: Test Result Analysis

1. Analyze test failures:
   - Identify failed tests and error messages
   - Categorize failures:
     - Assertion errors (expected vs actual)
     - Timeout errors (async issues)
     - Mock errors (incorrect mocks)
     - Integration errors (setup issues)
2. Identify flaky tests:
   - Tests that fail intermittently
   - Tests with timing issues
   - Tests with race conditions
3. Generate test summary:
   - Total tests run
   - Tests passed
   - Tests failed
   - Tests skipped
   - Pass rate percentage
   - Execution time
4. Identify coverage gaps:
   - Files below coverage threshold
   - Functions not tested
   - Branches not covered
   - Critical code not tested

### Step 11: Test Report Generation

1. Generate comprehensive test report:
   - Test execution summary
   - Coverage metrics (overall, by file, by module)
   - Failed tests with details
   - Flaky tests
   - Coverage gaps
   - Recommendations for improvement
2. Generate QA report:
   - Feature test results
   - Critical bugs found
   - Release recommendation (go/no-go)
   - Remaining risks
3. Generate coverage report:
   - Overall coverage percentage
   - Coverage by layer (services, repositories, api)
   - Uncovered files list
   - Coverage trends (if available)
4. Generate test recommendations:
   - Add tests for uncovered code
   - Fix flaky tests
   - Improve test stability
   - Increase coverage to meet threshold

### Step 12: Regression Test Planning

1. Identify regression test scenarios:
   - Core functionality (CRUD operations)
   - Authentication and authorization
   - Multi-user data isolation
   - Phase I features compatibility
2. Prioritize regression tests:
   - Critical: Must work (core features, security, data integrity)
   - High: Important features, frequently used
   - Medium: Edge cases, error handling
   - Low: Nice to have features
3. Schedule regression tests:
   - Run on every PR merge
   - Run before release
   - Run after major refactoring

## Outputs

### Primary Output: Test Suite Specification

```yaml
test_suite_specification:
  meta:
    feature_spec: string
    backend_spec: string
    auth_spec: string
    generated_at: datetime
    version: string

  test_scope:
    layers:
      - name: enum(api|services|repositories|database)
        components: [string]
        modules: [string]

    coverage_target:
      overall: float  # 0.0 to 1.0
      critical_code: float
      api: float
      services: float
      repositories: float

  unit_tests:
    services:
      - file: string  # Test file path
        service: string  # Service being tested
        description: string
        test_cases:
          - name: string
            description: string
            type: enum(business_logic|validation|error_handling|state_transition)
            scenario: string
            setup: string
            assertions: [string]
            cleanup: string
            mocks: [string]

    repositories:
      - file: string
        repository: string  # Repository being tested
        description: string
        test_cases:
          - name: string
            description: string
            type: enum(crud|query|transaction|constraint)
            scenario: string
            setup: string
            database_setup: boolean
            assertions: [string]
            cleanup: string
            test_data: string  # Fixture name

  api_tests:
    - file: string
      endpoint: string  # e.g., "/api/v1/todos"
        method: enum(GET|POST|PATCH|DELETE)
        description: string
        test_cases:
          - name: string
            description: string
            type: enum(valid_request|invalid_request|missing_fields|unauthorized|forbidden)
            scenario: string
            request:
              method: string
              path: string
              body: object
              headers: object
            expected_response:
              status_code: int
              body: object
            assertions: [string]

    auth:
      - file: string
        flow: enum(login|register|token_refresh|authorization)
        description: string
        test_cases:
          - name: string
            description: string
            scenario: string
            setup: string
            assertions: [string]

  database_tests:
    - file: string
      model: string  # e.g., "Task"
      repository: string  # e.g., "TaskRepository"
      description: string
      test_cases:
          - name: string
            description: string
            type: enum(crud|query|migration|constraint)
            scenario: string
            setup: string
            database_setup: boolean
            assertions: [string]
            cleanup: string

  test_data:
    - name: string  # e.g., "valid_task", "invalid_task"
      data: object  # Test data
      purpose: string
      used_in: [string]  # Test files

  fixtures:
    - name: string  # e.g., "db_session", "auth_token"
      type: enum(database|auth|api_client|time)
      implementation: string
      usage: [string]  # Test files

  mocks:
    - name: string
      type: enum(api|database|service|external)
      mock_function: string
      implementation: string
      usage: [string]

  coverage:
    targets:
      overall: float
      services: float
      repositories: float
      api: float
      critical_code: float

    thresholds:
      pass: float  # Coverage must be >= this
      fail: float  # Coverage must be >= this
      minimum: float  # Minimum acceptable

    excluded_files: [string]  # Files to exclude from coverage

  execution_config:
    test_command: string  # pytest, pytest -xvs, etc.
    coverage_command: string
    test_environment: enum(development|test|staging)
    database_setup:
      migration: string
      seed_data: string
      cleanup: boolean

  integration:
    - name: string
      components: [string]
      description: string
      test_cases:
        - name: string
          description: string
          scenario: string
          setup: string
          assertions: [string]
          cleanup: string

  regression_tests:
    - feature: string
      scenarios:
        - name: string
          description: string
          priority: enum(critical|high|medium|low)
          test_files: [string]
          assertions: [string]
```

### Secondary Outputs

1. **Test Execution Report**:
   ```yaml
   test_execution_report:
     meta:
       run_at: datetime
       test_suite: string
       environment: string
       commit_hash: string

     summary:
       total_tests: int
       passed_tests: int
       failed_tests: int
       skipped_tests: int
       pass_rate: float
       duration_seconds: int

     by_layer:
       api:
         total: int
         passed: int
         failed: int
         duration: int
       services:
         total: int
         passed: int
         failed: int
         duration: int
       repositories:
         total: int
         passed: int
         failed: int
         duration: int

     failures:
       - test_name: string
         file: string
         error_type: string
         error_message: string
         stack_trace: string

     flaky_tests:
       - test_name: string
         file: string
         flakiness_rate: float
         last_failed_at: datetime

     recommendations: [string]
   ```

2. **Coverage Report**:
   ```yaml
   coverage_report:
     generated_at: datetime
     overall:
       statements: float
       branches: float
       functions: float
       lines: float

     by_file:
       - file: string
         statements: float
         branches: float
         functions: float
         lines: float
         uncovered_lines: [int]
         uncovered_branches: [string]

     by_module:
       - module: string
         coverage: float
         files: [string]

     gaps:
       - file: string
         coverage: float
         critical: boolean
         recommended_tests: [string]

     threshold_status: enum(passed|failed|warning)
     target: float
     actual: float
   ```

3. **QA Report**:
   ```yaml
   qa_report:
     meta:
       testing_phase: string
       feature: string
       tested_at: datetime
       tested_by: string

     summary:
       total_test_cases: int
       passed_test_cases: int
       failed_test_cases: int
       critical_bugs: int
       high_bugs: int
       medium_bugs: int
       low_bugs: int

     by_endpoint:
       - endpoint: string
         status: enum(passed|failed|partial)
         test_cases: int
         passed: int
         failed: int
         bugs: [string]

     release_recommendation:
       decision: enum(go|no_go|conditional)
       blockers: [string]  # Critical issues blocking release
       recommendations: [string]
       risks: [string]

     phase_i_compatibility:
       status: enum(passed|failed|partial)
       issues: [string]
   ```

## Scope & Boundaries

### This Skill MUST:

- Generate unit tests for services and repositories
- Generate API endpoint tests (GET, POST, PATCH, DELETE)
- Generate authentication and authorization tests
- Generate database tests for repositories
- Generate test data, fixtures, and mocks
- Execute tests and capture results
- Calculate and report code coverage
- Analyze test failures and generate reports
- Identify flaky tests and coverage gaps
- Generate QA reports with release recommendations
- Plan regression tests

### This Skill MUST NOT:

- Implement application features or functionality
- Modify source code (only generate tests)
- Fix bugs or issues found in tests
- Implement business logic for features
- Create database schemas or models
- Write production code for backend
- Implement authentication or authorization logic
- Define database schemas or models
- Implement actual HTTP requests (only test endpoints)
- Configure actual testing infrastructure (CI/CD pipelines)

### Boundary Examples

**In Scope:**
- Generate test: `test_create_todo_with_valid_data()` that POSTs to `/api/todos` and asserts 201
- Generate test: `test_TaskService_validate_title()` that validates title min/max length
- Generate test: `test_TaskRepository_create()` that inserts task and verifies in database
- Generate test: `test_get_todo_requires_auth()` that attempts GET without token and asserts 401
- Generate test: `test_user_cannot_access_other_users_task()` that attempts to GET task with different user_id and asserts 403
- Calculate coverage: `/app/services/task_service.py` has 85% line coverage
- Generate QA report: "Release is GO, 0 critical bugs, 2 low-priority issues"

**Out of Scope:**
- Implement FastAPI route: `@app.post("/api/todos")`
- Implement TaskService: `class TaskService: def create_task(...)`
- Implement TaskRepository: `def create_task(session, task): ...`
- Implement authentication: `def verify_token(token: str) -> User: ...`
- Fix bug: "Task not saving to database"
- Implement business logic: "Completed tasks cannot be edited"
- Create SQLModel class: `class Todo(SQLModel, table=True): ...`
- Write production code: `def create_todo(task_data): ...`
- Configure GitHub Actions CI/CD pipeline
- Implement actual HTTP requests: `client.post("/api/todos", ...)`

## Dependencies

### Required Dependencies

1. **Spec-Kit Plus Schema**
   - Location: `/specs/.spec-kit/schema.md`
   - Purpose: Defines specification file structure

2. **Project Configuration**
   - Location: `/specs/.spec-kit/config.md`
   - Purpose: Provides testing framework and coverage tool details

### Specification Dependencies

1. **Feature Specs**
   - Location: `/specs/features/*.md`
   - Purpose: Define feature requirements and acceptance criteria for test generation

2. **API Specs**
   - Location: `/specs/api/*.md`
   - Purpose: Define endpoint contracts for API testing

3. **QA Specs**
   - Location: `/specs/qa/*.md`
   - Purpose: Define QA processes and release criteria

### Skill Dependencies

1. **API Construction Skill**
   - Purpose: Understand API endpoints for test generation
   - Used to design API tests

2. **Database Modeling Skill**
   - Purpose: Understand database models for repository tests

3. **Authentication Skill**
   - Purpose: Understand auth flows for auth tests

4. **Task Business Logic Skill**
   - Purpose: Understand business rules for service tests

### Optional Dependencies

1. **Integration & Validation Skill**
   - Purpose: Understand integration points for integration tests

2. **Error Handling / Logging Skill**
   - Purpose: Understand error scenarios for error handling tests

## Used By Agents

### Primary Consumers

1. **General-Purpose Agents**
   - When generating tests for backend features
   - When testing bug fixes
   - When calculating code coverage
   - When generating test reports

2. **Backend Implementation Agents**
   - When creating test files
   - When implementing test data and fixtures
   - When configuring test execution

3. **QA Agents**
   - When executing test suites
   - When analyzing test results
   - When making release recommendations
   - When verifying Phase I features

4. **CI/CD Agents**
   - When running tests in pipeline
   - When enforcing coverage thresholds
   - When blocking PRs based on test results

### Secondary Consumers

1. **DevOps Agents**
   - When setting up test infrastructure
   - When configuring test databases
   - When setting up test reporting

2. **Documentation Agents**
   - When documenting test coverage
   - When creating test execution guides
   - When documenting testing strategy

## Integration Notes

### Calling Convention

```yaml
skill: "backend-testing-qa"
inputs:
  feature_spec: "features/todo-crud.md"
  backend_spec: string  # From API Construction Skill
  database_spec: string  # From Database Modeling Skill
  auth_spec: "auth/user-auth.md"
  test_scope:
    - enum(unit|integration|api|auth|regression)
  test_types:
    - enum(api|services|repositories|database)
  coverage_target: float  # 0.0 to 1.0 (e.g., 0.8 for 80%)
  execute_tests: boolean
  generate_report: boolean
  phase_i_compatibility: boolean
  output_format: "test_suite_specification"
```

### Error Handling

- **No Test Scenarios**: Generate default test scenarios based on feature requirements
- **Missing Specs**: Warn about missing specs, generate basic tests
- **Test Execution Failed**: Return detailed error logs and stack traces
- **Coverage Below Threshold**: Warning, identify files with low coverage

### Testing Frameworks

**Backend (FastAPI)**:
- pytest - Test runner and assertion library
- pytest-asyncio - Async test support
- pytest-cov - Coverage calculation
- httpx - HTTP client for API tests
- TestClient (FastAPI) - API testing
- Faker - Test data generation

### Coverage Best Practices

**Targets:**
- Overall coverage: 80% minimum
- Critical code: 90% minimum
- Services: 85% minimum
- Repositories: 90% minimum
- API endpoints: 80% minimum

**Exclusions:**
- Configuration files
- Type definition files (`.pyi`)
- Test files
- Migration files
- Build artifacts

**Tools:**
- pytest-cov - Coverage calculation
- Coverage HTML reports for detailed analysis

### Test Organization Best Practices

**Backend (FastAPI)**
```
app/
  tests/
    unit/
      services/
        test_task_service.py
        test_user_service.py
      repositories/
        test_task_repository.py
        test_user_repository.py
      validators/
        test_task_validator.py
    integration/
      test_task_crud_integration.py
      test_auth_integration.py
    api/
      test_todos_api.py
      test_auth_api.py
    conftest.py  # Shared fixtures
```

### Test Naming Conventions

**Backend (pytest)**
- Files: `test_{module}.py` (e.g., `test_task_service.py`)
- Test functions: `test_{feature}_behavior` or `test_{module}_{function}`
  - `test_create_todo_with_valid_data`
  - `test_user_cannot_access_other_users_task`
  - `test_get_todo_returns_404_for_invalid_id`

### Flaky Test Detection

**Signs of Flaky Tests:**
- Pass/fail inconsistently across runs
- Timing-dependent failures
- Race conditions
- Random data dependencies

**Mitigation:**
- Use deterministic test data (seeds)
- Avoid sleep, use explicit waits
- Mock time/date functions
- Isolate tests from external dependencies
- Retry flaky tests in CI/CD

---

**Version:** 1.0.0
**Last Updated:** 2026-01-01
**Maintainer:** Spec-Kit Plus AI Agent System
