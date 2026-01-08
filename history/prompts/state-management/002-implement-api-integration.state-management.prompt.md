---
ID: 2
TITLE: Implement Frontend State Management & API Integration
STAGE: tasks
DATE_ISO: 2026-01-04
SURFACE: agent
MODEL: claude-sonnet-4-5-20250929
FEATURE: state-management
BRANCH: none
USER: none
COMMAND: /sp.implement
LABELS: ["api", "hooks", "context", "jwt", "auth"]
LINKS:
  SPEC: null
  TICKET: null
  ADR: null
  PR: null
FILES_YAML:
  - hackathon-todo/frontend/src/lib/api.ts
  - hackathon-todo/frontend/src/lib/auth.ts
  - hackathon-todo/frontend/src/hooks/useTasks.ts
  - hackathon-todo/frontend/src/hooks/useAuth.ts
  - hackathon-todo/frontend/src/contexts/AuthContext.tsx
  - hackathon-todo/frontend/src/app/dashboard/page.tsx
  - hackathon-todo/frontend/src/app/(auth)/login/page.tsx
  - hackathon-todo/frontend/src/app/(auth)/register/page.tsx
  - hackathon-todo/frontend/src/types/index.ts
TESTS_YAML:
  - none
---

# PROMPT_TEXT
Implement the NEXT frontend task: **Frontend State Management & API Integration**

Objective:
- Add state management for tasks
- Connect UI components to API client
- Prepare frontend for authenticated multi-user flow

# RESPONSE_TEXT
Implemented a complete state management and API integration layer:
1. Created `api.ts` client with fetch and automatic JWT attachment.
2. Implemented `authUtils.ts` for token and session management.
3. Updated `AuthContext.tsx` to handle real login/register/logout API calls.
4. Created `useTasks.ts` and `useAuth.ts` hooks for clean data access.
5. Integrated hooks into Dashboard, Login, and Register pages.
6. Standardized request/response types in `types/index.ts`.

# OUTCOME
The frontend is now fully boilerplate-free and ready for real backend communication with multi-user support.
