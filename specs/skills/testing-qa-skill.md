# Testing & QA Skill

## Purpose

To generate automated unit tests for frontend and backend, verifying CRUD operations, authentication, and API endpoints to ensure features work correctly. This skill serves as the reasoning layer for test generation, test execution, coverage analysis, and QA verification across the full-stack Todo application. It ensures comprehensive test coverage for all features, validates system correctness, and provides actionable test reports.

## When to Use (Trigger Conditions)

This skill should be invoked when:

- New features have been implemented and need testing
- Existing features have been modified and require regression testing
- Unit tests need to be generated for a component or module
- API endpoints need to be tested
- Authentication and authorization logic needs verification
- CRUD operations need validation
- Test coverage needs to be calculated and reported
- Test execution results need to be analyzed
- Bugs or issues have been reported and need verification tests
- Refactoring has been done and tests need updating
- Code quality metrics (coverage, flaky tests) need assessment
- Continuous integration pipeline requires test execution
- Release candidate needs QA verification

**Triggers:**
- Feature implementation complete, ready for testing
- Pull request opened or updated (CI/CD trigger)
- Manual test generation request
- Bug fix requires validation tests
- Refactoring requires test updates
- Coverage threshold not met
- Release requires QA approval

## Inputs

### Required Inputs

1. **Feature Specification**
   - Feature requirements and user stories
   - Acceptance criteria
   - Business rules and validation rules
   - Edge cases and error scenarios
   - Location: `/specs/features/*.md`

2. **Frontend Specifications**
   - Component definitions and props
   - State management and hooks
   - User interactions and events
   - Expected behaviors and outputs
   - Location: From Frontend UI Skill outputs

3. **Backend Specifications**
   - API endpoint definitions
   - Request/response schemas
   - Business logic and validation
   - Database models and relationships
   - Location: From API Construction Skill and Database Modeling Skill outputs

4. **Authentication Specifications**
   - JWT token structure
   - Authentication flows (login, register, refresh)
   - Authorization rules and roles
   - Protected endpoints
   - Location: From Authentication Skill output

### Test-Specific Inputs

1. **For Unit Test Generation**:
   - Component or module to test
   - Props and state
   - Methods and functions
   - Dependencies and mocks

2. **For API Test Generation**:
   - Endpoint path and method
   - Request parameters and body
   - Expected response
   - Error scenarios

3. **For Coverage Calculation**:
   - Source code files
   - Test files
   - Coverage configuration

### Supported Test Types

| Test Type | Scope | Purpose |
|------------|--------|---------|
| Unit Tests | Individual functions, components, modules | Verify isolated functionality |
| Integration Tests | Multiple components/services together | Verify integration points |
| API Tests | Backend endpoints | Verify API contracts and behavior |
| Authentication Tests | Auth flows and protected endpoints | Verify security and access control |
| CRUD Tests | Create, Read, Update, Delete operations | Verify data operations |
| Component Tests | React components | Verify rendering and user interactions |
| Hook Tests | Custom React hooks | Verify hook logic |
| Service Tests | Backend services/business logic | Verify business rules |
| Repository Tests | Database access layer | Verify data persistence |

## Actions

### Step 1: Test Scope Analysis
1. Analyze feature specifications:
   - Identify all user stories and acceptance criteria
   - Extract business rules and validation rules
   - Identify edge cases and error scenarios
   - Map requirements to test scenarios
2. Analyze code to test:
   - Identify components, functions, modules to test
   - Identify dependencies and external integrations
   - Identify side effects and state mutations
   - Identify complex logic paths
3. Determine test types needed:
   - Unit tests for individual functions/components
   - Integration tests for component interactions
   - API tests for backend endpoints
   - Auth tests for security verification
   - CRUD tests for data operations
4. Prioritize test scenarios:
   - Critical: Core functionality, security, data integrity
   - High: User-facing features, API contracts
   - Medium: Edge cases, error handling
   - Low: UI details, non-critical paths

### Step 2: Unit Test Generation (Frontend)
1. Generate component tests:
   - **Rendering Tests**: Verify component renders correctly
     - Test with default props
     - Test with all prop combinations
     - Test with empty/null props
     - Test with loading/error states
   - **Interaction Tests**: Verify user interactions
     - Test click events (buttons, links)
     - Test form submissions
     - Test input changes
     - Test keyboard interactions
   - **State Tests**: Verify component state
     - Test initial state
     - Test state updates
     - Test derived state
     - Test state transitions
2. Generate hook tests:
   - **Lifecycle Tests**: Verify hook initialization
   - **Return Value Tests**: Verify hook returns correct values
   - **State Updates Tests**: Verify state changes
   - **Side Effect Tests**: Verify useEffect behavior
   - **Cleanup Tests**: Verify cleanup functions
3. Generate utility function tests:
   - Test with valid inputs
   - Test with invalid inputs
   - Test with edge cases
   - Test return values
4. Generate mock implementations:
   - Mock external dependencies
   - Mock API calls
   - Mock hooks and context
   - Mock user events

### Step 3: Unit Test Generation (Backend)
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
2. Generate repository tests:
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
3. Generate API handler tests:
   - **Request Tests**: Verify request handling
     - Test valid requests
     - Test invalid requests (validation)
     - Test missing required fields
     - Test malformed requests
   - **Response Tests**: Verify response structure
     - Test success responses
     - Test error responses
     - Test response codes
     - Test response data format

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

### Step 5: CRUD Test Generation
1. Generate Create tests:
   - Test creating valid task
   - Test creating task with all fields
   - Test creating task with minimal fields
   - Test creating task with invalid title (422)
   - Test creating task with invalid due date (422)
   - Test creating task as authenticated user
   - Test creating task without authentication (401)
   - Verify task is created in database
   - Verify task has correct user_id (ownership)
2. Generate Read tests:
   - Test reading own task (successful)
   - Test reading all tasks (list, filtered by user)
   - Test reading by ID (successful)
   - Test reading non-existent task (404)
   - Test reading another user's task (403)
   - Test filtering by status, priority, due_date
   - Test sorting by various fields
   - Test pagination (page, limit)
3. Generate Update tests:
   - Test updating task title
   - Test updating task priority
   - Test updating task due date
   - Test partial update (only some fields)
   - Test updating completed task (if allowed)
   - Test updating non-owned task (403)
   - Test updating non-existent task (404)
   - Test updating immutable fields (created_at, user_id) (422)
   - Verify task is updated in database
   - Verify update history is recorded (if applicable)
4. Generate Delete tests:
   - Test deleting own task (successful)
   - Test deleting non-owned task (403)
   - Test deleting non-existent task (404)
   - Test deleting task with no authentication (401)
   - Verify task is removed from database
   - Verify cascade deletes (if applicable)

### Step 6: Test File Organization
1. Organize tests by layer:
   - `/src/__tests__/unit/components/` - Component tests
   - `/src/__tests__/unit/hooks/` - Hook tests
   - `/src/__tests__/unit/utils/` - Utility tests
   - `/src/__tests__/integration/` - Integration tests
   - `/src/__tests__/e2e/` - End-to-end tests
   - `/app/tests/` - Backend tests
2. Name test files:
   - Match component/module name: `TaskList.test.tsx`
   - Use `.test.ts` or `.spec.ts` suffix
   - Group related tests in same file
3. Structure test files:
   - Describe block for test suite
   - Test blocks for individual tests
   - Before/After hooks for setup/teardown
   - Clear, descriptive test names

### Step 7: Mock and Stub Generation
1. Generate frontend mocks:
   - Mock API client functions
   - Mock React hooks (useRouter, useParams)
   - Mock context providers (AuthContext, ThemeContext)
   - Mock user events (click, change, submit)
   - Mock browser APIs (localStorage, Notification)
2. Generate backend mocks:
   - Mock database sessions
   - Mock external service calls
   - Mock time/date functions
   - Mock environment variables
3. Generate test data:
   - Create realistic test data (task objects, users)
   - Create edge case data (empty, null, large values)
   - Create invalid data for validation tests

### Step 8: Test Execution
1. Execute unit tests:
   - Run all tests: `npm test` or `pytest`
   - Run specific test file: `npm test TaskList.test.tsx`
   - Run tests matching pattern: `npm test -- --testNamePattern="Todo"`
2. Execute API tests:
   - Start test server
   - Run API test suite
   - Test with different environments (dev, test)
3. Execute integration tests:
   - Setup test database
   - Run migration scripts
   - Execute integration tests
   - Cleanup test database
4. Execute end-to-end tests:
   - Start application
   - Run Playwright/Cypress tests
   - Capture screenshots on failure
   - Cleanup after tests

### Step 9: Coverage Calculation
1. Calculate code coverage:
   - Use Jest/Istanbul for frontend: `npm test -- --coverage`
   - Use pytest-cov for backend: `pytest --cov=app --cov-report=html`
2. Measure coverage by type:
   - Statement coverage: Percentage of statements executed
   - Branch coverage: Percentage of branches taken
   - Function coverage: Percentage of functions called
   - Line coverage: Percentage of lines executed
3. Generate coverage reports:
   - HTML report with line-by-line coverage
   - JSON report for CI/CD integration
   - Console summary with percentages
4. Identify uncovered code:
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
   - Coverage by layer (frontend, backend)
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
   - Critical: Must work (core features, security)
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
    frontend_spec: string
    backend_spec: string
    auth_spec: string
    generated_at: datetime
    version: string

  test_scope:
    layers:
      - name: enum(frontend|backend)
        components: [string]
        modules: [string]

    coverage_target:
      overall: float  # 0.0 to 1.0
      critical_code: float
      frontend: float
      backend: float

  frontend_tests:
    unit:
      - file: string  # Test file path
        component: string
        description: string
        test_cases:
          - name: string
            description: string
            type: enum(rendering|interaction|state|edge_case)
            scenario: string
            setup: string
            assertions: [string]
            cleanup: string
            mocks: [string]

      - file: string
        hook: string
        description: string
        test_cases:
          - name: string
            description: string
            type: enum(lifecycle|return_value|state_update|side_effect|cleanup)
            scenario: string
            setup: string
            assertions: [string]

      - file: string
        function: string
        description: string
        test_cases:
          - name: string
            description: string
            type: enum(valid_input|invalid_input|edge_case)
            scenario: string
            assertions: [string]

    integration:
      - file: string
        components: [string]
        description: string
        test_cases:
          - name: string
            description: string
            scenario: string
            setup: string
            assertions: [string]
            cleanup: string

  backend_tests:
    unit:
      - file: string
        module: string  # Service, repository, etc.
        description: string
        test_cases:
          - name: string
            description: string
            type: enum(business_logic|validation|error_handling|transaction)
            scenario: string
            setup: string
            database_setup: boolean
            assertions: [string]
            cleanup: string
            mocks: [string]

    api:
      - file: string
        endpoint: string
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
            token_validation: boolean

  crud_tests:
    - file: string
      resource: string  # e.g., "todo"
      description: string
      test_cases:
        - operation: enum(create|read|update|delete)
          name: string
          description: string
          scenario: string
          setup: string
          request: object
          expected_response: object
          database_verification:
            operation: enum(insert|select|update|delete)
            table: string
            condition: object
          assertions: [string]
          cleanup: string

  test_data:
    - name: string  # e.g., "valid_task", "invalid_task"
      data: object
      purpose: string
      used_in: [string]  # Test files

  mocks:
    - name: string
      type: enum(api|hook|context|browser|database)
      mock_function: string
      implementation: string
      usage: [string]

  coverage:
    targets:
      overall: float
      frontend: float
      backend: float
      critical_code: float

    thresholds:
      pass: float  # Coverage must be >= this
      fail: float  # Coverage must be >= this
      minimum: float  # Minimum acceptable

    excluded_files: [string]  # Files to exclude from coverage

  execution_config:
    test_command: string  # npm test, pytest, etc.
    coverage_command: string
    test_environment: enum(development|test|staging)
    database_setup:
      migration: string
      seed_data: string
      cleanup: boolean
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
       frontend:
         total: int
         passed: int
         failed: int
         duration: int
       backend:
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
         screenshot: string  # If available

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
       statements: float  # 0.0 to 1.0
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

     by_feature:
       - feature: string
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

4. **Test File Templates**:
   ```typescript
   // Example: Component Test Template
   import { render, screen, fireEvent, waitFor } from '@testing-library/react';
   import { ComponentName } from './ComponentName';

   describe('ComponentName', () => {
     it('should render correctly', () => {
       render(<ComponentName {...props} />);
       expect(screen.getByText('...')).toBeInTheDocument();
     });

     it('should handle user interaction', () => {
       render(<ComponentName {...props} />);
       const button = screen.getByRole('button');
       fireEvent.click(button);
       // Assert expected behavior
     });
   });
   ```

   ```python
   # Example: API Test Template
   from fastapi.testclient import TestClient
   from app.main import app

   client = TestClient(app)

   def test_endpoint_name():
       # Setup
       response = client.post("/api/resource", json={...})

       # Assert status
       assert response.status_code == 200

       # Assert response
       assert response.json()["field"] == expected_value
   ```

## Scope & Boundaries

### This Skill MUST:

- Generate unit tests for frontend components and hooks
- Generate unit tests for backend services and repositories
- Generate API endpoint tests (GET, POST, PATCH, DELETE)
- Generate authentication and authorization tests
- Generate CRUD operation tests
- Generate integration tests for component interactions
- Generate test data and mocks
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
- Create UI components or pages
- Write production code for frontend or backend
- Configure actual testing infrastructure (CI/CD pipelines)
- Implement authentication or authorization logic
- Define database schemas or models
- Generate application code (only test code)
- Execute manual testing (only automated tests)

### Boundary Examples

**In Scope:**
- Generate test: `test_create_todo_with_valid_data()` that POSTs to `/api/todos` and asserts 201
- Generate test: `test_TaskList_renders_correctly()` that renders TaskList component and verifies it's in document
- Generate test: `test_user_cannot_access_other_users_task()` that attempts to GET task with different user_id and asserts 403
- Generate test: `test_login_with_valid_credentials()` that POSTs to `/api/auth/login` and verifies JWT token is returned
- Calculate coverage: `/src/components/TaskList.tsx` has 85% line coverage
- Generate mock: `jest.mock('../../api/client', () => ({ createTodo: jest.fn() }))`
- Execute tests: `npm test` and capture results
- Generate QA report: "Release is GO, 0 critical bugs, 2 low-priority issues"

**Out of Scope:**
- Implement TaskList component: `export function TaskList() { ... }`
- Implement API endpoint: `@app.post("/api/todos") ...`
- Fix bug: "Task not saving to database"
- Implement authentication: `def verify_token(token: str) -> User: ...`
- Create SQLModel class: `class Todo(SQLModel, table=True): ...`
- Write production code: `export const createTodo = async (data) => { ... }`
- Configure GitHub Actions CI/CD pipeline
- Implement business logic: "Completed tasks cannot be edited"
- Fix test failure by modifying source code

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

2. **Test Specs**
   - Location: `/specs/tests/*.md`
   - Purpose: Define test requirements and coverage targets

3. **QA Specs**
   - Location: `/specs/qa/*.md`
   - Purpose: Define QA processes and release criteria

### Skill Dependencies

1. **All Implementation Skills**:
   - **Frontend UI Skill**: Understand components for test generation
   - **Frontend API Client Skill**: Understand API client for mocking
   - **API Construction Skill**: Understand endpoints for API testing
   - **Task Business Logic Skill**: Understand business rules for test scenarios
   - **Authentication Skill**: Understand auth flows for auth testing
   - **Database Modeling Skill**: Understand models for repository testing

2. **Spec Interpretation Skill**:
   - Purpose: Parse and understand feature, API, and QA specifications

### Optional Dependencies

1. **Integration & Validation Skill**:
   - Purpose: Understand integration points for integration tests

2. **Error Handling / Logging Skill**:
   - Purpose: Understand error scenarios for error handling tests

3. **Phase I Feature Specs**:
   - Location: Phase I specifications
   - Purpose: Generate regression tests for Phase I features

## Used By Agents

### Primary Consumers

1. **General-Purpose Agents**
   - When generating tests for new features
   - When testing bug fixes
   - When calculating code coverage
   - When generating test reports

2. **Test Generation Agents**
   - When creating unit tests for components
   - When creating API tests for endpoints
   - When creating auth and authorization tests
   - When creating CRUD tests

3. **QA Agents**
   - When executing test suites
   - When analyzing test results
   - When generating QA reports
   - When making release recommendations

4. **CI/CD Agents**
   - When running tests in pipeline
   - When enforcing coverage thresholds
   - When blocking PRs based on test results

### Secondary Consumers

1. **Development Agents**
   - When updating tests after refactoring
   - When adding tests for new code
   - When fixing flaky tests

2. **Code Review Agents**
   - When reviewing test coverage
   - When verifying tests for new features
   - When checking test quality

3. **Documentation Agents**
   - When documenting test strategy
   - When creating testing guides
   - When documenting test coverage requirements

## Integration Notes

### Calling Convention

```yaml
skill: "testing-qa"
inputs:
  feature_spec: "features/todo-crud.md"
  frontend_spec: string  # From Frontend UI Skill
  backend_spec: string  # From API Construction Skill
  auth_spec: "auth/user-auth.md"
  test_scope:
    - enum(unit|integration|api|auth|crud|regression)
  coverage_target: float  # 0.0 to 1.0 (e.g., 0.8 for 80%)
  test_types:
    - enum(component|hook|service|repository|endpoint)
  execute_tests: boolean
  generate_report: boolean
  phase_i_compatibility: boolean
  output_format: enum(test_suite|execution_report|coverage_report|qa_report)
```

### Error Handling

- **No Test Scenarios**: Generate default test scenarios based on feature requirements
- **Missing Specs**: Warn about missing specs, generate basic tests
- **Test Execution Failed**: Return detailed error logs and stack traces
- **Coverage Below Threshold**: Warning, identify files with low coverage

### Testing Frameworks

**Frontend**:
- Jest - Test runner and assertion library
- React Testing Library - Component testing
- Playwright - End-to-end testing (optional)
- Mock Service Worker (MSW) - API mocking

**Backend**:
- pytest - Test runner
- pytest-asyncio - Async test support
- pytest-cov - Coverage calculation
- TestClient (FastAPI) - API testing

### Coverage Best Practices

**Targets**:
- Overall coverage: 80% minimum
- Critical code: 90% minimum
- Frontend components: 75% minimum
- Backend services: 85% minimum

**Exclusions**:
- Configuration files
- Type definition files (.d.ts)
- Test files
- Migration files
- Build artifacts

**Tools**:
- Jest/Istanbul (frontend)
- pytest-cov (backend)
- Coverage HTML reports for detailed analysis

### Test Organization Best Practices

**Frontend**:
```
src/
  components/
    TaskList.tsx
    TaskList.test.tsx  # Co-located test
  __tests__/
    unit/
      components/
      hooks/
      utils/
    integration/
```

**Backend**:
```
app/
  tests/
    unit/
      services/
      repositories/
    integration/
      api/
    conftest.py  # Shared fixtures
```

### Test Naming Conventions

**Frontend (Jest)**:
- Files: `ComponentName.test.tsx` or `ComponentName.spec.tsx`
- Tests: `should [do something] when [condition]`
  - `should render correctly when props are provided`
  -should call onSubmit when form is submitted`

**Backend (pytest)**:
- Files: `test_module.py`
- Tests: `test_[feature]_behavior` or `test_[module]_[function]`
  - `test_create_task_with_valid_data`
  - `test_user_cannot_access_other_users_task`

### Flaky Test Detection

**Signs of Flaky Tests**:
- Pass/fail inconsistently across runs
- Timing-dependent failures
- Race conditions
- Random data dependencies

**Mitigation**:
- Use deterministic test data (seeds)
- Avoid sleep/wait, use waitFor
- Mock time/dates
- Isolate tests from external dependencies
- Retry flaky tests in CI/CD

### Coverage Strategy

**Critical Code** (Higher coverage target):
- Authentication and authorization
- Data validation
- Business logic rules
- Error handling
- Security-sensitive operations

**Non-Critical Code** (Lower coverage target):
- UI components (visual testing with Playwright)
- Configuration code
- Logging code
- Type definitions

---

**Version:** 1.0.0
**Last Updated:** 2026-01-01
**Maintainer:** Spec-Kit Plus AI Agent System
