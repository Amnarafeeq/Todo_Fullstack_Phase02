---
ID: 3
TITLE: Create REST API Specification
STAGE: spec
DATE_ISO: 2026-01-05
SURFACE: agent
MODEL: claude-sonnet-4-5-20250929
FEATURE: api
BRANCH: none
USER: none
COMMAND: /sp.spec /specs/api/rest-endpoints.md
LABELS: ["api", "spec", "rest", "jwt"]
LINKS:
  SPEC: /specs/api/rest-endpoints.md
  TICKET: null
  ADR: null
  PR: null
FILES_YAML:
  - hackathon-todo/specs/api/rest-endpoints.md
TESTS_YAML:
  - none
---

# PROMPT_TEXT
Create REST API specification for Phase II backend.

Objective:
- Define CRUD endpoints for tasks
- JWT authentication requirement
- Request / Response examples
- Error cases (401, 403, 404)

# RESPONSE_TEXT
Created a detailed REST API specification at `/specs/api/rest-endpoints.md`.
The spec includes:
1.  **Auth Endpoints**: Register and Login with JWT response.
2.  **Task Endpoints**: Full CRUD mapped to `/api/{user_id}/tasks`.
3.  **Security**: Multi-user isolation policy and JWT enforcement.
4.  **Data Formats**: Request/Response JSON examples.
5.  **Error Handling**: Standardized error taxonomy.

# OUTCOME
API specification is ready for backend implementation.
