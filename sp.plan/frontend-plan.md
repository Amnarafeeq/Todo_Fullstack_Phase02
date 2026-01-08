# Frontend Implementation Plan

**Project:** Todo App - Hackathon II (Phase II - Full-Stack Web Application)
**Phase:** Frontend Implementation
**Plan Version:** 1.0
**Created:** 2026-01-02
**Governing Document:** Constitution (`/specs/constitution.md`)

---

## Plan Overview

This plan defines the step-by-step implementation roadmap for the Todo App Phase II frontend. All implementation must follow the spec-driven development mandate, use agent-based code generation via skills, and strictly adhere to the Constitution's principles.

**Technology Stack:**
- Framework: Next.js 16+ (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- State: React Context + Hooks
- HTTP: Native Fetch API

**Theme:** Orange / White / Black

---

## 1. Architecture Implementation

### Spec Reference: `/specs/ui/frontend-architecture.md`

### 1.1 Project Setup Tasks

**Task ARCH-001: Initialize Next.js Project**
- Location: `/hackathon-todo/`
- Action: Create Next.js project with TypeScript and Tailwind CSS
- Validation: Verify `package.json` has correct dependencies
- Dependencies: None

**Task ARCH-002: Configure TypeScript**
- Location: `tsconfig.json`
- Action: Configure strict mode, path aliases (@/ -> src/)
- Validation: TypeScript compiles without errors
- Dependencies: ARCH-001

**Task ARCH-003: Configure Tailwind CSS**
- Location: `tailwind.config.ts`
- Action: Add custom theme colors (orange primary), extend theme
- Validation: Build passes, styles apply correctly
- Dependencies: ARCH-001

**Task ARCH-004: Create Directory Structure**
- Location: `src/`
- Action: Create directories for app, components, contexts, lib, hooks, types
- Structure:
  ```
  src/
  ├── app/
  │   ├── (auth)/
  │   │   ├── login/
  │   │   └── register/
  │   ├── (dashboard)/
  │   │   └── tasks/
  │   │       └── [taskId]/
  │   ├── layout.tsx
  │   ├── loading.tsx
  │   └── error.tsx
  ├── components/
  │   ├── ui/
  │   ├── task/
  │   └── layout/
  ├── contexts/
  ├── lib/
  ├── hooks/
  └── types/
  ```
- Dependencies: ARCH-001

**Task ARCH-005: Create Global Types**
- Location: `src/types/index.ts`
- Action: Define User, Task, ApiError, and other shared types
- Validation: Types used consistently across app
- Dependencies: ARCH-004

---

### 1.2 Routing Architecture Tasks

**Task ARCH-006: Create Root Layout**
- Location: `src/app/layout.tsx`
- Action: Implement root layout with AuthProvider, Header, global CSS
- Validation: Layout wraps all pages, fonts load correctly
- Dependencies: ARCH-004, CONTEXT-001

**Task ARCH-007: Create Auth Layout**
- Location: `src/app/(auth)/layout.tsx`
- Action: Implement minimal layout for login/register (no header)
- Validation: Auth pages centered, no header
- Dependencies: ARCH-004

**Task ARCH-008: Create Global Loading State**
- Location: `src/app/loading.tsx`
- Action: Implement loading spinner component
- Validation: Shows during page transitions
- Dependencies: ARCH-006

**Task ARCH-009: Create Global Error Boundary**
- Location: `src/app/error.tsx`
- Action: Implement error boundary with retry button
- Validation: Error page displays on error
- Dependencies: ARCH-006

**Task ARCH-010: Create 404 Page**
- Location: `src/app/not-found.tsx`
- Action: Implement 404 not found page
- Validation: Displays for invalid routes
- Dependencies: ARCH-006

---

## 2. Pages Implementation

### Spec Reference: `/specs/ui/pages.md`

### 2.1 Authentication Pages

**Task PAGE-001: Create Login Page**
- Location: `src/app/(auth)/login/page.tsx`
- Action: Implement login form with email, password inputs
- Components: Input, Button, Link
- Validation: Form validates, submits, redirects on success
- Dependencies: ARCH-007, COMP-002, COMP-003, API-001

**Task PAGE-002: Create Register Page**
- Location: `src/app/(auth)/register/page.tsx`
- Action: Implement registration form with email, name, password, confirm password
- Components: Input, Button, Link
- Validation: Form validates, submits, redirects on success
- Dependencies: ARCH-007, COMP-002, COMP-003, API-002

### 2.2 Dashboard Pages

**Task PAGE-003: Create Dashboard Page**
- Location: `src/app/(dashboard)/page.tsx`
- Action: Implement main dashboard with FilterBar, TaskList, Create Task modal
- Components: FilterBar, TaskList, TaskForm, TaskDetails
- Validation: Loads tasks, filters work, CRUD operations succeed
- Dependencies: ARCH-006, COMP-006, COMP-007, COMP-009

**Task PAGE-004: Create Task Details Page**
- Location: `src/app/(dashboard)/tasks/[taskId]/page.tsx`
- Action: Implement task detail view with back button, edit/delete actions
- Components: TaskDetails, Button
- Validation: Shows task details, navigates correctly
- Dependencies: ARCH-006, COMP-012, API-004

---

## 3. Components Implementation

### Spec Reference: `/specs/ui/components.md`

### 3.1 Core UI Components

**Task COMP-001: Create AuthProvider Context**
- Location: `src/contexts/AuthContext.tsx`
- Action: Implement authentication context with login/logout methods
- State: user, loading, isAuthenticated
- Validation: Auth state persists, works across app
- Dependencies: ARCH-004, API-001, API-002

**Task COMP-002: Create Button Component**
- Location: `src/components/Button.tsx`
- Action: Reusable button with variants (primary, secondary, danger, ghost)
- Props: variant, size, disabled, loading, type, onClick
- Validation: All variants render correctly
- Dependencies: ARCH-003

**Task COMP-003: Create Input Component**
- Location: `src/components/Input.tsx`
- Action: Reusable input with label, error, validation styling
- Props: label, placeholder, value, onChange, type, error, required, disabled
- Validation: Input works for text, email, password, textarea
- Dependencies: ARCH-003

**Task COMP-004: Create Select Component**
- Location: `src/components/Select.tsx`
- Action: Dropdown select with label, options, error
- Props: label, value, onChange, options, placeholder, error
- Validation: Dropdown renders, selection works
- Dependencies: ARCH-003

**Task COMP-005: Create Modal Component**
- Location: `src/components/Modal.tsx`
- Action: Modal dialog with backdrop, close on ESC/click
- Props: isOpen, onClose, title, children, size
- Validation: Opens/closes, traps focus, accessible
- Dependencies: ARCH-003

### 3.2 Layout Components

**Task COMP-006: Create Header Component**
- Location: `src/components/Header.tsx`
- Action: App header with logo, user menu, logout button
- Props: user, onLogout
- Responsive: Mobile hamburger menu
- Validation: Displays user info, logout works
- Dependencies: COMP-002, CONTEXT-001

**Task COMP-007: Create Badge Component**
- Location: `src/components/Badge.tsx`
- Action: Status/label badge with color variants
- Props: children, variant (success, warning, danger, info, default)
- Validation: All variants display correctly
- Dependencies: ARCH-003

### 3.3 Task Components

**Task COMP-008: Create TaskItem Component**
- Location: `src/components/TaskItem.tsx`
- Action: Individual task display with checkbox, priority badge, edit/delete buttons
- Props: task, onEdit, onDelete, onToggle
- Display: Title strikethrough when completed
- Validation: All interactions work
- Dependencies: COMP-003, COMP-007, API-003

**Task COMP-009: Create TaskList Component**
- Location: `src/components/TaskList.tsx`
- Action: List display with empty state, loading, TaskItems
- Props: tasks, onTaskUpdate, onTaskDelete, onTaskToggle, loading, emptyMessage
- Validation: Renders list, empty state shows
- Dependencies: COMP-008

**Task COMP-010: Create FilterBar Component**
- Location: `src/components/FilterBar.tsx`
- Action: Filter and sort controls (status, priority, category, search, sort)
- Props: filters, categories, onFiltersChange
- Validation: All filters work, updates filter state
- Dependencies: COMP-003, COMP-004

**Task COMP-011: Create TaskForm Component**
- Location: `src/components/TaskForm.tsx`
- Action: Create/edit task form with title, description, priority, category
- Props: task (optional), onSubmit, onCancel, loading
- Validation: Form validates, submits, edits work
- Dependencies: COMP-003, COMP-004

**Task COMP-012: Create TaskDetails Component**
- Location: `src/components/TaskDetails.tsx`
- Action: Full task view with all fields, edit/delete actions
- Props: task, onClose, onEdit, onDelete
- Validation: Displays all task info
- Dependencies: COMP-007, COMP-002

### 3.4 Notification Components

**Task COMP-013: Create ToastProvider**
- Location: `src/contexts/ToastContext.tsx`
- Action: Notification context with showToast method
- State: notifications array
- Validation: Toast notifications display and dismiss
- Dependencies: ARCH-004

**Task COMP-014: Create Toast Component**
- Location: `src/components/Toast.tsx`
- Action: Individual toast notification with type styling
- Props: message, type, duration, onClose
- Validation: Animates in/out, dismisses correctly
- Dependencies: COMP-013, ARCH-003

---

## 4. State Management Implementation

### Spec Reference: `/specs/skills/frontend-state-management-skill.md`

### 4.1 Authentication State

**Task STATE-001: Design Auth State Structure**
- Output: Auth state specification document
- Content: State shape, actions, selectors, persistence
- Validation: Matches spec requirements
- Dependencies: CONTEXT-001

**Task STATE-002: Implement Auth State**
- Location: `src/contexts/AuthContext.tsx`
- Action: Implement state with user, loading, isAuthenticated
- Actions: login, logout
- Validation: State updates correctly on auth events
- Dependencies: STATE-001, API-001, API-002

### 4.2 Task State

**Task STATE-003: Design Task State Structure**
- Output: Task state specification document
- Content: State shape, actions, selectors, derived state
- Validation: Matches spec requirements
- Dependencies: PAGE-003, API-003

**Task STATE-004: Implement Task State**
- Location: `src/hooks/useTaskState.ts` (or similar)
- Action: Implement task list, filters, loading, error state
- Actions: setTasks, addTask, updateTask, removeTask, setFilters
- Validation: State updates correctly on CRUD operations
- Dependencies: STATE-003, PAGE-003

### 4.3 UI State

**Task STATE-005: Design UI State Structure**
- Output: UI state specification document
- Content: Modal states, form states, selection state
- Validation: Matches spec requirements
- Dependencies: COMP-005, COMP-011

**Task STATE-006: Implement UI State**
- Location: Components manage local UI state
- Action: Modal open/close, form visibility, selections
- Validation: UI state reflects user interactions
- Dependencies: STATE-005

---

## 5. API Client Implementation

### Spec Reference: `/specs/api/frontend-api-client.md`

### 5.1 API Client Core

**Task API-001: Create API Client Module**
- Location: `src/lib/api.ts`
- Action: Implement base configuration, token management, request/response transformation
- Features: JWT attachment, error handling, data transformation
- Validation: All requests go through this module
- Dependencies: TYPES-001, CONTEXT-001

**Task API-002: Implement Auth API Functions**
- Functions: register(), login()
- Location: `src/lib/api/auth.ts`
- Validation: Auth endpoints work correctly
- Dependencies: API-001

**Task API-003: Implement Tasks API Functions**
- Functions: getTasks(), getTask(), createTask(), updateTask(), deleteTask(), toggleTaskComplete()
- Location: `src/lib/api/tasks.ts`
- Validation: CRUD operations work correctly
- Dependencies: API-001

### 5.2 TypeScript Types

**Task TYPES-001: Define Request/Response Types**
- Location: `src/types/api.ts`
- Content: RegisterRequest, LoginRequest, CreateTaskRequest, Task, etc.
- Validation: Types match API contracts
- Dependencies: API-001, API-002, API-003

**Task TYPES-002: Define Error Types**
- Location: `src/types/api.ts`
- Content: ApiError interface with categorization flags
- Validation: Error types support all error scenarios
- Dependencies: API-001

---

## 6. Authentication Flow Implementation

### Spec Reference: `/specs/ui/frontend-auth-flow.md`

### 6.1 Login Flow

**Task AUTH-001: Implement Login Flow**
- Location: `src/app/(auth)/login/page.tsx`
- Action: Form submit → validate → call login API → update auth state → redirect
- Validation: Login works, redirects to dashboard
- Dependencies: PAGE-001, API-002, CONTEXT-001

**Task AUTH-002: Implement Session Auto-Restore**
- Location: `src/contexts/AuthContext.tsx`
- Action: On app mount, check localStorage for token, restore session
- Validation: Returning user is auto-logged in
- Dependencies: CONTEXT-001, API-001

### 6.2 Registration Flow

**Task AUTH-003: Implement Register Flow**
- Location: `src/app/(auth)/register/page.tsx`
- Action: Form submit → validate → call register API → show success → redirect to login
- Validation: Registration works, redirects to login
- Dependencies: PAGE-002, API-002

### 6.3 Logout Flow

**Task AUTH-004: Implement Logout Flow**
- Location: `src/components/Header.tsx` (logout button)
- Action: Clear auth state, remove token, redirect to login
- Validation: User logged out, redirected, no access to protected routes
- Dependencies: COMP-006, CONTEXT-001

### 6.4 Protected Routes

**Task AUTH-005: Implement Route Protection**
- Location: `src/app/(dashboard)/layout.tsx` (or within pages)
- Action: Check auth state, redirect to login if not authenticated
- Validation: Protected routes inaccessible without auth
- Dependencies: CONTEXT-001, PAGE-003, PAGE-004

**Task AUTH-006: Implement 401 Handling**
- Location: `src/lib/api.ts`
- Action: On 401 response, clear token, redirect to login, show error toast
- Validation: Expired tokens redirect to login
- Dependencies: API-001, CONTEXT-001, COMP-013

---

## 7. Error & Loading Implementation

### Spec Reference: `/specs/ui/frontend-error-loading.md`

### 7.1 Error Handling

**Task ERR-001: Implement Error Classification**
- Location: `src/lib/api.ts`
- Action: Categorize errors (network, 4xx, 5xx), generate user-friendly messages
- Validation: All error types handled correctly
- Dependencies: API-001

**Task ERR-002: Implement Form Validation Errors**
- Location: `src/components/Input.tsx`
- Action: Display inline validation errors with styling
- Validation: Errors show below input fields
- Dependencies: COMP-003

**Task ERR-003: Implement Error Toast Display**
- Location: `src/contexts/ToastContext.tsx`
- Action: Show error toasts for API failures
- Validation: Errors display as toasts
- Dependencies: COMP-013, API-001

### 7.2 Loading States

**Task LOAD-001: Implement Page Loading**
- Location: `src/app/loading.tsx`
- Action: Global loading spinner during page transitions
- Validation: Shows during navigation
- Dependencies: ARCH-008

**Task LOAD-002: Implement Button Loading State**
- Location: `src/components/Button.tsx`
- Action: Show spinner inside button when loading
- Validation: Button shows loading state
- Dependencies: COMP-002

**Task LOAD-003: Implement Task List Loading**
- Location: `src/components/TaskList.tsx`
- Action: Show loading state while fetching tasks
- Validation: Loading indicator shows during fetch
- Dependencies: COMP-009, API-003

**Task LOAD-004: Implement Form Submission Loading**
- Location: `src/components/TaskForm.tsx`
- Action: Disable submit button, show loading during submission
- Validation: Form shows loading during submit
- Dependencies: COMP-011

---

## 8. Accessibility Implementation

### Spec Reference: `/specs/ui/frontend-accessibility.md`

### 8.1 Semantic HTML

**Task A11Y-001: Implement Semantic Layout**
- Location: `src/components/Header.tsx`
- Action: Use <header>, <nav>, <main> semantic elements
- Validation: Lighthouse audit passes
- Dependencies: COMP-006

**Task A11Y-002: Implement Heading Hierarchy**
- Location: All pages and components
- Action: Proper h1-h6 hierarchy throughout app
- Validation: Headings follow logical order
- Dependencies: PAGE-001, PAGE-002, PAGE-003, PAGE-004

### 8.2 ARIA Attributes

**Task A11Y-003: Add Form ARIA Labels**
- Location: `src/components/Input.tsx`
- Action: Add aria-label, aria-required, aria-describedby for errors
- Validation: Screen reader announces form fields
- Dependencies: COMP-003

**Task A11Y-004: Add Button ARIA Labels**
- Location: `src/components/Button.tsx`
- Action: Add aria-label for icon-only buttons
- Validation: Buttons have accessible names
- Dependencies: COMP-002

**Task A11Y-005: Add Modal ARIA Attributes**
- Location: `src/components/Modal.tsx`
- Action: Add role="dialog", aria-modal, aria-labelledby
- Validation: Modal is accessible to screen readers
- Dependencies: COMP-005

**Task A11Y-006: Add Toast ARIA Live Region**
- Location: `src/components/Toast.tsx`
- Action: Add aria-live="polite" for notifications
- Validation: Toasts announced to screen readers
- Dependencies: COMP-014

### 8.3 Keyboard Navigation

**Task A11Y-007: Implement Focus Indicators**
- Location: All interactive elements
- Action: Add visible focus styles (ring-2 ring-orange-500)
- Validation: All focusable elements have visible focus
- Dependencies: All component files

**Task A11Y-008: Implement Modal Focus Trap**
- Location: `src/components/Modal.tsx`
- Action: Trap focus within modal when open
- Validation: Tab cycles within modal, ESC closes
- Dependencies: COMP-005

**Task A11Y-009: Implement Skip Link**
- Location: `src/app/layout.tsx`
- Action: Add "Skip to main content" link
- Validation: Skip link appears on tab, skips to main
- Dependencies: ARCH-006

### 8.4 Color Contrast

**Task A11Y-010: Verify Color Contrast**
- Location: `tailwind.config.ts` and components
- Action: Ensure 4.5:1 contrast ratio for text
- Validation: Color contrast passes WCAG AA
- Dependencies: ARCH-003, All styled components

### 8.5 Touch Targets

**Task A11Y-011: Ensure Minimum Touch Targets**
- Location: Mobile styles in all components
- Action: Ensure 44x44 minimum for touch targets
- Validation: Touch targets meet size requirements
- Dependencies: All interactive components

---

## Implementation Order Summary

### Phase 1: Foundation (Tasks 1-16)
1. ARCH-001: Initialize Next.js Project
2. ARCH-002: Configure TypeScript
3. ARCH-003: Configure Tailwind CSS
4. ARCH-004: Create Directory Structure
5. ARCH-005: Create Global Types
6. ARCH-006: Create Root Layout
7. ARCH-007: Create Auth Layout
8. ARCH-008: Create Global Loading State
9. ARCH-009: Create Global Error Boundary
10. ARCH-010: Create 404 Page
11. TYPES-001: Define Request/Response Types
12. TYPES-002: Define Error Types
13. API-001: Create API Client Module
14. CONTEXT-001: Create AuthProvider Context
15. COMP-013: Create ToastProvider
16. COMP-014: Create Toast Component

### Phase 2: Core UI Components (Tasks 17-27)
17. COMP-002: Create Button Component
18. COMP-003: Create Input Component
19. COMP-004: Create Select Component
20. COMP-005: Create Modal Component
21. COMP-007: Create Badge Component
22. COMP-006: Create Header Component
23. A11Y-001: Implement Semantic Layout
24. A11Y-003: Add Form ARIA Labels
25. A11Y-004: Add Button ARIA Labels
26. A11Y-007: Implement Focus Indicators
27. A11Y-010: Verify Color Contrast

### Phase 3: Authentication (Tasks 28-35)
28. AUTH-001: Implement Login Flow
29. AUTH-002: Implement Session Auto-Restore
30. AUTH-003: Implement Register Flow
31. AUTH-004: Implement Logout Flow
32. AUTH-005: Implement Route Protection
33. AUTH-006: Implement 401 Handling
34. PAGE-001: Create Login Page
35. PAGE-002: Create Register Page

### Phase 4: Task Components (Tasks 36-47)
36. COMP-008: Create TaskItem Component
37. COMP-009: Create TaskList Component
38. COMP-010: Create FilterBar Component
39. COMP-011: Create TaskForm Component
40. COMP-012: Create TaskDetails Component
41. API-002: Implement Auth API Functions
42. API-003: Implement Tasks API Functions
43. ERR-001: Implement Error Classification
44. ERR-002: Implement Form Validation Errors
45. ERR-003: Implement Error Toast Display
46. LOAD-001: Implement Page Loading
47. LOAD-002: Implement Button Loading State

### Phase 5: Dashboard & Pages (Tasks 48-54)
48. PAGE-003: Create Dashboard Page
49. PAGE-004: Create Task Details Page
50. LOAD-003: Implement Task List Loading
51. LOAD-004: Implement Form Submission Loading
52. STATE-001: Design Auth State Structure
53. STATE-003: Design Task State Structure
54. STATE-005: Design UI State Structure

### Phase 6: Accessibility Completion (Tasks 55-62)
55. A11Y-002: Implement Heading Hierarchy
56. A11Y-005: Add Modal ARIA Attributes
57. A11Y-006: Add Toast ARIA Live Region
58. A11Y-008: Implement Modal Focus Trap
59. A11Y-009: Implement Skip Link
60. A11Y-011: Ensure Minimum Touch Targets
61. STATE-002: Implement Auth State
62. STATE-004: Implement Task State

---

## Dependencies Graph

```
ARCH-001 ─┬─ ARCH-002 ─┬─ ARCH-003 ─┬─ ARCH-004 ─┬─ ARCH-005
          │            │            │            │
          │            │            │            └─ TYPES-001 ─┬─ API-001
          │            │            │                           │
          │            │            │                           └─ API-002
          │            │            │
          │            │            └─ ARCH-006 ─── CONTEXT-001 ─┬─ COMP-013 ── COMP-014
          │            │                                          │
          │            │                                          └─ PAGE-001 ─┬─ API-002
          │            │                                                            │
          │            │                                                            └─ AUTH-001 ─┬─ AUTH-002
          │            │                                                               │           │
          │            │                                                               │           └─ AUTH-005
          │            │                                                               │
          │            │                                                               └─ PAGE-002 ── AUTH-003
          │            │
          │            └─ ARCH-007 ── PAGE-001, PAGE-002
          │
          └─ ARCH-008, ARCH-009, ARCH-010

COMP-002 ─┬─ COMP-003 ─┬─ COMP-004 ─┬─ COMP-005 ─┬─ COMP-006 ─┬─ COMP-007
          │            │            │            │            │
          │            │            │            │            └─ COMP-008 ── COMP-009 ─┬─ PAGE-003
          │            │            │            │                                   │           │
          │            │            │            │                                   │           └─ PAGE-004
          │            │            │            │                                   │
          │            │            │            │                                   └─ COMP-010 ─┬─ API-003
          │            │            │            │                                                   │
          │            │            │            │                                                   └─ COMP-011
          │            │            │            │
          │            │            │            └─ COMP-012
          │            │            │
          │            │            └─ ERR-002
          │            │
          │            └─ A11Y-003
          │
          └─ A11Y-004, LOAD-002
```

---

## Validation Checklist

### Pre-Implementation
- [ ] All specs read and understood
- [ ] Constitution compliance verified
- [ ] Technology stack confirmed

### Post-Implementation Per Task
- [ ] Code matches spec requirements
- [ ] TypeScript compiles without errors
- [ ] Component renders without errors
- [ ] User interaction works as expected
- [ ] Error handling covers all cases
- [ ] Loading states display correctly
- [ ] Accessibility requirements met

### Final Validation
- [ ] All pages load correctly
- [ ] Authentication flow complete
- [ ] Task CRUD operations work
- [ ] Filtering and sorting work
- [ ] Error messages are user-friendly
- [ ] Mobile responsive design works
- [ ] Accessibility audit passes (WCAG AA)
- [ ] No console errors in browser

---

## Follow-Up Risks

1. **API Integration Dependency**: Frontend implementation requires backend API to be available for full testing. Coordinate with backend team.

2. **Accessibility Testing**: Screen reader testing requires actual assistive technology. May need user testing sessions.

3. **State Complexity**: Dashboard state management could become complex. Consider implementing React Query in Phase III if needed.

4. **Mobile Testing**: Responsive design requires testing on actual mobile devices. Emulators may not catch all issues.

---

**Plan Created:** 2026-01-02
**Plan Author:** Claude Code (Plan Agent)
**Governing Spec:** Constitution (`/specs/constitution.md`)
**Next Step:** Begin implementation with ARCH-001 (Initialize Next.js Project)
