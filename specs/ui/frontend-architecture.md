# Frontend Architecture Specification
**Todo App – Hackathon II – Phase II**

**Version**: 1.0
**Status**: Effective
**Governing Spec**: `.specify/memory/constitution.md`

---

## 1. Purpose of Frontend Architecture

This specification defines the structural, architectural, and behavioral foundations for the Todo App Phase II frontend. It establishes the framework patterns, data flow paradigms, and component responsibilities that all agents and skills must follow during implementation.

**Primary Objectives:**
- Define clear boundaries between concerns
- Establish deterministic patterns for routing, state, and data fetching
- Enable agent-based code generation with predictable outcomes
- Ensure alignment with the global constitution (spec-driven, no manual coding, multi-user isolation)
- Provide a foundation that scales from Phase II to future phases

**Non-Objectives:**
- This is NOT an implementation guide (use `/specs/ui/components.md` and `/specs/ui/pages.md`)
- This does NOT contain code examples
- This does NOT define visual design details

---

## 2. Architectural Principles

### 2.1 Separation of Concerns

The frontend architecture enforces strict separation between distinct concerns:

**Presentation Layer (UI Components)**
- Responsibility: Render visual elements and handle user interactions
- Boundaries: No direct API calls, no business logic, no complex state management
- Contract: Props in, events out

**State Management Layer (React Context + Hooks)**
- Responsibility: Manage application and component-level state
- Boundaries: No UI rendering, no direct data mutations without validation
- Contract: State accessor functions and state update functions

**Data Access Layer (API Client)**
- Responsibility: All communication with backend services
- Boundaries: No UI logic, no state management
- Contract: Async functions returning typed data or errors

**Routing Layer (Next.js App Router)**
- Responsibility: Navigation and route-level protection
- Boundaries: No data fetching (unless server component), no business logic
- Contract: Route configuration and middleware

### 2.2 Spec-First Discipline

All architectural decisions derive from specifications:

1. **Constitution**: Supreme authority for all rules and principles
2. **Architecture Spec** (`/specs/architecture.md`): System-level design
3. **Frontend Architecture Spec** (this document): Frontend-specific structure
4. **UI Component Spec** (`/specs/ui/components.md`): Component definitions
5. **UI Pages Spec** (`/specs/ui/pages.md`): Page definitions

**Spec-First Requirements:**
- No code generation without spec reference
- All component implementations must map to a defined component spec
- All pages must map to a defined page spec
- Violations between code and spec must be reported by agents

### 2.3 Agent-Based Orchestration

The architecture is designed for agent-based code generation:

**Agent Responsibilities:**
- **Plan Agent**: Determines architecture patterns before implementation
- **Explore Agent**: Analyzes existing patterns to ensure consistency
- **Frontend UI Skill**: Generates React components following architectural patterns
- **Frontend State Management Skill**: Generates state management solutions
- **Frontend API Client Skill**: Generates API client code
- **Frontend Routing Skill**: Generates route configurations and protections
- **Frontend Form Handling Skill**: Generates form components with validation
- **Frontend Notification Skill**: Generates notification systems

**Skill Execution Contract:**
1. Skill receives explicit spec reference
2. Skill validates input against architectural constraints
3. Skill generates code following established patterns
4. Skill reports completion status and any violations

---

## 3. High-Level Frontend Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Browser Layer                           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Next.js App Router                      │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                   Route Groups                       │    │
│  │  ┌──────────────┐         ┌──────────────────────┐  │    │
│  │  │  (auth)      │         │  (dashboard)         │  │    │
│  │  │  /login      │         │  /                   │  │    │
│  │  │  /register   │         │  /tasks/[taskId]     │  │    │
│  │  └──────────────┘         └──────────────────────┘  │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Root Layout                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  AuthProvider (Context)                              │    │
│  │  ├─ Auth State                                       │    │
│  │  ├─ User Data                                        │    │
│  │  └─ Auth Methods (login, logout)                     │    │
│  └─────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Header Component                                    │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Page Components                           │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  LoginPage / RegisterPage                            │    │
│  │  ├─ Form State (email, password, etc.)               │    │
│  │  ├─ Validation State                                 │    │
│  │  └─ Submit to API Client                             │    │
│  └─────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Dashboard                                           │    │
│  │  ├─ Filter State (status, priority, category)        │    │
│  │  ├─ Task State (list, loading, error)               │    │
│  │  ├─ UI State (modal, form, selection)               │    │
│  │  └─ API Client for CRUD operations                   │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   UI Components Layer                        │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  TaskList, TaskItem, TaskForm                        │    │
│  │  FilterBar, Modal, Button, Input, Select            │    │
│  │  Badge, Toast/Notification                           │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   State Management                           │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Global: AuthContext                                 │    │
│  │  Local: useState, useReducer per component           │    │
│  │  Derived: useMemo for computed values                │    │
│  │  Effects: useEffect for side effects                 │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   API Client Layer                           │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  /lib/api.ts                                         │    │
│  │  ├─ JWT Token Management                            │    │
│  │  ├─ Request Interceptors (attach token)              │    │
│  │  ├─ Response Interceptors (handle 401)               │    │
│  │  ├─ Error Handling                                  │    │
│  │  └─ Typed API Functions                             │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Backend API                             │
│  (FastAPI at http://localhost:8000 or NEXT_PUBLIC_API_URL)   │
└─────────────────────────────────────────────────────────────┘
```

**Key Architectural Characteristics:**
- **Unidirectional Data Flow**: Props flow down, events flow up
- **Single Source of Truth**: API is source for task data, AuthContext for auth state
- **Component Composition**: Complex UIs built from small, reusable components
- **Separate API Client**: All backend communication centralized

---

## 4. Routing Architecture (Next.js App Router)

### 4.1 Route Structure

Next.js App Router uses file-based routing with route groups as defined in `/specs/ui/pages.md`:

```
/                          (root)
├── layout.tsx              # Root layout (global)
├── loading.tsx             # Global loading state
├── not-found.tsx           # 404 page
├── error.tsx               # Error boundary
├── (auth)/                 # Auth route group
│   ├── layout.tsx          # Auth layout (minimal)
│   ├── login/
│   │   └── page.tsx        # /login
│   └── register/
│       └── page.tsx        # /register
└── (dashboard)/            # Dashboard route group
    ├── page.tsx            # / (default route)
    └── tasks/
        └── [taskId]/
            └── page.tsx    # /tasks/:taskId
```

**Note:** Refer to `/specs/ui/pages.md` for complete page specifications and individual page details. This section describes routing architecture and patterns, not page implementations.

### 4.2 Public Routes

**Routes:**
- `/login` - Login page
- `/register` - Registration page

**Characteristics:**
- No authentication required
- Minimal layout (centered, no header)
- Redirect authenticated users to `/`

**Protection Strategy:**
- Route-level check for existing JWT token
- If authenticated, redirect to `/`
- Check occurs in component or layout

### 4.3 Protected Routes

**Routes:**
- `/` - Dashboard (default route)
- `/tasks/:taskId` - Task details

**Characteristics:**
- Authentication required
- JWT token must be present and valid
- 401 responses redirect to `/login`

**Protection Strategy:**
- Component-level authentication check
- Redirect to `/login` if no valid token
- Show loading state during token validation

### 4.4 Auth Guard Strategy (Conceptual)

Authentication guards are enforced through the following mechanisms:

**AuthContext-Based Guard:**
- AuthContext checks for JWT token on mount
- Exposes `isAuthenticated` boolean
- Components check `isAuthenticated` before rendering protected content

**API Client-Based Guard:**
- API client automatically attaches JWT token to requests
- API client intercepts 401 responses
- On 401, clear token and redirect to `/login`

**Navigation-Based Guard:**
- Protected pages check authentication in useEffect
- If not authenticated, redirect using `useRouter().push('/login')`

**Note**: Server-side auth guards (middleware) are NOT used in Phase II. All auth is client-side with JWT.

---

## 5. Layout Hierarchy

### 5.1 Root Layout

**Location:** `/src/app/layout.tsx`

**Purpose:** Application-wide layout wrapping all pages

**Responsibilities:**
- Import global styles (Tailwind CSS)
- Configure fonts
- Wrap app with AuthProvider
- Render Header component
- Define main content area structure
- Define metadata (title, description)

**Scope:** Applies to all routes

**Note:** For complete layout implementation details, refer to `/specs/ui/pages.md`.

### 5.2 Auth Layout

**Location:** `/src/app/(auth)/layout.tsx`

**Purpose:** Layout for authentication pages (login, register)

**Responsibilities:**
- Provide centered container for auth forms
- Minimal styling (no header, no navigation)
- Ensure mobile-responsive layout

**Scope:** Applies to `/login` and `/register`

**Overrides:** Root layout's Header (does NOT render Header)

**Note:** For complete layout implementation details, refer to `/specs/ui/pages.md`.

### 5.3 Dashboard Layout

**Note:** Per `/specs/ui/pages.md`, there is NO separate dashboard layout file. Dashboard uses the root layout directly.

**Dashboard Route Location:** `/src/app/(dashboard)/page.tsx`

**Purpose:** Main task management interface

**Responsibilities:**
- Ensure authentication (redirect to `/login` if not authenticated)
- Provide consistent layout for dashboard pages
- Inherit Header component from root layout

**Scope:** Applies to `/` (default route)

**Note:** Refer to `/specs/ui/pages.md` for complete dashboard page specification.

---

## 6. Authentication Flow (Frontend Perspective)

### 6.1 Login Flow

**User Action:** User enters email and password on `/login`

**Sequence:**
1. User submits form
2. Form validation (email format, password not empty)
3. Component calls `AuthContext.login(email, password)`
4. AuthContext calls API client `POST /api/auth/login`
5. API client sends credentials to backend
6. Backend validates and returns JWT token
7. API client stores token in localStorage
8. AuthContext updates user state
9. Component redirects to `/`

**Error Handling:**
- Invalid credentials: Show error message on form
- Network error: Show error toast
- 500 error: Show error message with retry option

### 6.2 Signup Flow

**User Action:** User enters email, name, password on `/register`

**Sequence:**
1. User submits form
2. Form validation (email format, password length, password match)
3. Component calls API client `POST /api/auth/register`
4. API client sends user data to backend
5. Backend validates uniqueness, hashes password, creates user
6. Backend returns user data
7. Component redirects to `/login` with success message

**Error Handling:**
- Email already exists: Show error message
- Validation errors: Show field-specific errors
- Network error: Show error toast
- 500 error: Show error message with retry option

### 6.3 Session Handling

**Token Storage:**
- JWT token stored in `localStorage.getItem('auth_token')`
- Token retrieved and attached to all API requests
- Token cleared on logout

**Auto-Login:**
- On app mount, AuthContext checks localStorage for token
- If token exists, validate with backend (optional) or decode JWT
- If valid, set user state to authenticated

**Session Expiration:**
- JWT tokens expire after 24 hours (configured on backend)
- On 401 response from backend, clear token and redirect to `/login`
- No automatic token refresh in Phase II

### 6.4 Logout Flow

**User Action:** User clicks logout button in Header

**Sequence:**
1. User clicks logout
2. Component calls `AuthContext.logout()`
3. AuthContext removes token from localStorage
4. AuthContext clears user state
5. Component redirects to `/login`

**Side Effects:**
- Clear all local state
- Cancel any pending API requests
- Redirect to `/login`

---

## 7. Data Fetching Strategy

### 7.1 Server Components vs Client Components

**Server Components (Default in Next.js App Router):**
- Render on the server
- Direct access to backend (no client-side fetch)
- No interactivity (no state, no effects)
- Use for: Static pages, SEO-critical content

**Client Components (with `'use client'` directive):**
- Render on the client
- Require browser APIs (localStorage, window)
- Interactive (state, effects, event handlers)
- Use for: All interactive components in Phase II

**Phase II Strategy:**
- **All components are Client Components** (due to JWT auth, interactivity requirements)
- Server components NOT used in Phase II
- All data fetching done via API client on client side

**Rationale:**
- JWT authentication requires client-side token management
- All pages require interactivity (forms, task CRUD, filtering)
- Simpler mental model for agent-based code generation
- Future phases may introduce server components for static content

### 7.2 When and Why Each is Used

**Client Components (All Phase II):**
- **When:** Whenever the component needs interactivity or browser APIs
- **Why:** Direct `'use client'` directive at top of file
- **Examples:**
  - All pages (`/login`, `/register`, `/dashboard`)
  - All UI components (`TaskList`, `TaskForm`, `FilterBar`)
  - AuthContext

**Server Components (Future Phases):**
- **When:** When content is static or SEO-critical
- **Why:** Default behavior in Next.js (no `'use client'` directive)
- **Examples:**
  - Landing page (Phase III+)
  - Public documentation (Phase III+)
  - Static content pages (Phase III+)

---

## 8. State Ownership Boundaries

### 8.1 Auth State

**Owner:** AuthContext (`/src/contexts/AuthContext.tsx`)

**State:**
- `user: User | null` - Current authenticated user
- `loading: boolean` - Authentication loading state
- `isAuthenticated: boolean` - Computed from user

**Methods:**
- `login(email, password): Promise<void>` - Authenticate user
- `logout(): void` - Clear authentication

**Access Pattern:**
- Use `useAuth()` hook in any component
- AuthContext wraps entire app in root layout
- Global state accessible to all components

**Boundary Rules:**
- No component should directly manage user authentication
- No component should directly access localStorage for auth token
- All auth operations go through AuthContext

### 8.2 Task State

**Owner:** Dashboard component (and child components as needed)

**State:**
- `tasks: Task[]` - List of tasks
- `loading: boolean` - Loading state for API calls
- `error: string | null` - Error message

**State Location:**
- Primary state in Dashboard component
- Local state in child components for UI (modals, forms, selections)

**Access Pattern:**
- Dashboard fetches tasks on mount
- Dashboard passes tasks down to TaskList via props
- TaskList passes individual tasks to TaskItem via props
- TaskForm manages form state locally

**Boundary Rules:**
- No global state for tasks (Phase II)
- All task data fetched via API client
- Task updates require refetch from API
- Optimistic updates optional (future enhancement)

### 8.3 UI State

**Owner:** Individual components

**State Examples:**
- `modalOpen: boolean` - Modal visibility
- `formErrors: Record<string, string>` - Form validation errors
- `filterState: FilterOptions` - Filter and sort options
- `selectedTask: Task | null` - Currently selected task

**Access Pattern:**
- Each component manages its own UI state
- UI state passed to child components via props
- UI state updates trigger re-renders

**Boundary Rules:**
- UI state should not be global (unless shared across many components)
- UI state should not mix with data state
- Form state should be encapsulated in form components

### 8.4 State Ownership Matrix

| State Type | Owner | Scope | Persistence |
|------------|-------|-------|-------------|
| Auth State | AuthContext | Global | localStorage (token) |
| Task Data | Dashboard | Page-level | None (refetch on load) |
| Task UI (modal) | Dashboard | Page-level | None |
| Form State | Form Components | Component-level | None |
| Filter State | Dashboard | Page-level | None |
| Loading State | Component | Component-level | None |
| Error State | Component | Component-level | None |

---

## 9. Error Handling Architecture

### 9.1 Error Boundaries

**Client-Side Error Boundaries:**
- Wrap route groups in error boundaries
- Catch rendering errors in components
- Display user-friendly error page
- Provide retry functionality

**Global Error Boundary:**
- Located in `/src/app/error.tsx`
- Catches errors in entire application
- Provides fallback UI

### 9.2 API Error Handling

**Error Classification:**
- **400 Bad Request**: Invalid input data
- **401 Unauthorized**: Missing or invalid token
- **403 Forbidden**: Access denied (wrong user)
- **404 Not Found**: Resource doesn't exist
- **500 Internal Server Error**: Unexpected server error

**Handling Strategy:**
- 401 errors: Clear token, redirect to `/login`, show error toast
- 400 errors: Show form validation errors
- 403 errors: Show access denied message
- 404 errors: Show resource not found message
- 500 errors: Show generic error message with retry option

**Error Display:**
- Toast notifications for API errors
- Inline errors for form validation
- Error pages for critical failures
- Loading states during API calls

### 9.3 Form Validation Errors

**Client-Side Validation:**
- Zod schemas for form validation
- Real-time validation feedback
- Field-specific error messages

**Server-Side Validation:**
- Backend returns validation errors (400)
- API client maps errors to form fields
- Display errors inline with inputs

### 9.4 Error Recovery

**Retry Logic:**
- User can retry failed API calls via buttons
- Automatic retry for network errors (future enhancement)
- Exponential backoff for retries (future enhancement)

**Graceful Degradation:**
- Show cached data if API fails (future enhancement)
- Allow partial functionality on errors (e.g., view but not edit)
- Clear error messages guide users to resolution

---

## 10. Notification System Architecture

### 10.1 Notification Purpose

Provide non-intrusive feedback to users for:
- Success messages (task created, updated, deleted)
- Error messages (API failures, validation errors)
- Info messages (alerts, reminders)

### 10.2 Notification Types

- **Success**: Green toast, auto-dismiss after 3 seconds
- **Error**: Red toast, auto-dismiss after 5 seconds (or manual dismiss)
- **Info**: Blue toast, auto-dismiss after 3 seconds
- **Warning**: Yellow toast, auto-dismiss after 5 seconds

### 10.3 Notification API

**Hook:** `useToast()`

**Methods:**
- `showToast(message: string, type: 'success' | 'error' | 'info' | 'warning', duration?: number): void`

**Usage Pattern:**
```typescript
const { showToast } = useToast();

// Success
showToast('Task created successfully!', 'success');

// Error
showToast('Failed to create task', 'error', 5000);
```

### 10.4 Notification Display

- Fixed position (top-right or top-center)
- Stacking for multiple notifications
- Animation on appear/disappear
- Click to dismiss
- Auto-dismiss after duration

### 10.5 Toast Component

**Location:** `/src/components/Toast.tsx`

**Responsibilities:**
- Display single toast notification
- Handle auto-dismiss timer
- Handle manual dismiss
- Apply styling based on type

---

## 11. Performance Optimization Strategy

### 11.1 Code Splitting

**Dynamic Imports:**
- Lazy load heavy components (TaskDetails, TaskForm modals)
- Load on route changes (Next.js automatic)
- Reduces initial bundle size

**Implementation:**
- Use Next.js `dynamic()` for client components
- Load components only when needed

### 11.2 Memoization

**React.memo:**
- Wrap expensive components that re-render frequently
- Prevent unnecessary re-renders when props unchanged
- Example: TaskItem component

**useMemo:**
- Cache expensive calculations
- Recalculate only when dependencies change
- Example: Filtered tasks, sorted lists

**useCallback:**
- Cache event handlers
- Prevent child re-renders when handler unchanged
- Example: Task update handlers

### 11.3 Bundle Optimization

**Tree Shaking:**
- Remove unused code from bundle
- Ensure libraries support tree shaking
- Use named imports, not default imports

**Code Minification:**
- Next.js automatically minifies production bundles
- Reduces bundle size for faster loading

**Image Optimization:**
- Use Next.js `<Image>` component for images
- Automatic optimization and lazy loading

### 11.4 Rendering Optimization

**Debouncing:**
- Debounce search input (300ms delay)
- Prevents excessive API calls
- Improved performance on large task lists

**Virtualization (Future):**
- Virtual scrolling for large lists (1000+ tasks)
- Render only visible items
- Improved performance for Phase III+

---

## 12. Accessibility Architecture

### 12.1 Semantic HTML

**Requirements:**
- Use semantic HTML elements (`<button>`, `<input>`, `<form>`)
- Proper heading hierarchy (`<h1>`, `<h2>`, etc.)
- Use `<main>`, `<header>`, `<nav>` where appropriate

**Benefits:**
- Screen reader compatibility
- Keyboard navigation support
- SEO optimization

### 12.2 ARIA Attributes

**Requirements:**
- Labels for all interactive elements
- Descriptive text for icons
- Live regions for dynamic content (toasts)

**Examples:**
```html
<button aria-label="Create new task">+</button>
<input aria-label="Task title" />
<div aria-live="polite">{toastMessage}</div>
```

### 12.3 Keyboard Navigation

**Requirements:**
- All interactive elements focusable
- Logical tab order
- Enter/Space to activate buttons
- Escape to close modals
- Visual focus indicators

**Focus Management:**
- Auto-focus first input in modals
- Return focus to trigger after modal close
- Manage focus in task lists

### 12.4 Screen Reader Support

**Requirements:**
- Alt text for images
- Descriptive link text
- Announce state changes (task completed, error occurred)
- Skip navigation links for accessibility

---

## 13. Responsive Design Architecture

### 13.1 Breakpoint Strategy

**Breakpoints:**
- Mobile: < 640px (`sm`)
- Tablet: 640px - 1024px (`md`, `lg`)
- Desktop: > 1024px (`xl`, `2xl`)

**Implementation:**
- Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`)
- Mobile-first approach (base styles for mobile, override for larger screens)

### 13.2 Responsive Components

**TaskList:**
- Mobile: Single column, compact items
- Tablet: 1-2 columns
- Desktop: 2-3 columns (optional)

**FilterBar:**
- Mobile: Collapsible, vertical stack
- Tablet: Horizontal layout with scroll
- Desktop: Full horizontal layout, all filters visible

**Header:**
- Mobile: Compact logo, hamburger menu
- Tablet/ Desktop: Full logo, full user menu

**Forms:**
- Mobile: Full-width inputs, single column
- Tablet/ Desktop: Two columns where appropriate

### 13.3 Adaptive UI

**Floating Action Button (FAB):**
- Only visible on mobile
- Fixed position (bottom-right)
- Opens create task modal

**Hamburger Menu:**
- Only visible on mobile
- Opens mobile navigation drawer

**Responsive Typography:**
- Smaller fonts on mobile
- Larger fonts on desktop
- Line-height adjustments for readability

---

## 14. Security Architecture (Frontend Perspective)

### 14.1 JWT Token Security

**Token Storage:**
- Stored in `localStorage` (Phase II)
- Note: `localStorage` is vulnerable to XSS attacks
- Future: Consider `httpOnly` cookies for enhanced security

**Token Transmission:**
- Sent in `Authorization: Bearer <token>` header
- Never sent in URL or body
- HTTPS required in production (SSL/TLS)

**Token Validation:**
- Backend validates token on every request
- Frontend does NOT validate token (trusts backend)
- Frontend only checks token presence for auth guard

### 14.2 XSS Prevention

**Input Sanitization:**
- React auto-escapes JSX (built-in XSS protection)
- Never use `dangerouslySetInnerHTML` (unless absolutely necessary)
- Sanitize user input before rendering

**Content Security Policy (CSP):**
- Future: Implement CSP headers
- Restrict script sources
- Prevent inline scripts

### 14.3 Data Exposure Prevention

**No Hardcoded Secrets:**
- No API keys in client code
- No secrets in environment variables exposed to client
- Use `NEXT_PUBLIC_` prefix only for non-sensitive config

**Multi-User Isolation:**
- Frontend never requests other users' data
- Frontend validates user ID matches authenticated user (sanity check)
- Backend enforces isolation (primary security boundary)

### 14.4 HTTPS Requirement

**Development:** HTTP allowed (localhost)
**Production:** HTTPS required
- SSL/TLS encryption for all API calls
- Prevents man-in-the-middle attacks
- Required for secure token transmission

---

## 15. Testing Strategy (Frontend Perspective)

### 15.1 Test Types

**Unit Tests:**
- Test individual functions and hooks
- Test component logic (not rendering)
- Use Jest + React Testing Library

**Integration Tests:**
- Test component interactions
- Test component + API client integration
- Use Jest + React Testing Library

**End-to-End Tests:**
- Test complete user flows
- Test authentication, task CRUD, filtering
- Use Playwright or Cypress (future enhancement)

### 15.2 Test Coverage Requirements

**Minimum Coverage: 80%**
- Critical paths: 100% (auth, task CRUD)
- UI components: >= 70%
- Business logic: 90%+

### 15.3 Testing Tools

**Jest:** Test runner
**React Testing Library:** Component testing utilities
**Playwright/Cypress:** E2E testing (future)
**MSW (Mock Service Worker):** API mocking for tests

### 15.4 Test Organization

```
/src/
├── components/
│   ├── Button.tsx
│   └── Button.test.tsx
├── contexts/
│   ├── AuthContext.tsx
│   └── AuthContext.test.tsx
├── lib/
│   ├── api.ts
│   └── api.test.tsx
```

---

## 16. Agent & Skill Integration Points

### 16.1 Required Skills for Frontend Architecture

**Frontend UI Skill:**
- Generates React components
- Follows component architecture patterns
- Implements responsive design

**Frontend State Management Skill:**
- Generates React Context providers
- Implements state management patterns
- Follows state ownership boundaries

**Frontend API Client Skill:**
- Generates API client code
- Implements JWT token management
- Handles error responses

**Frontend Routing Skill:**
- Generates route configurations
- Implements route protections
- Manages navigation

**Frontend Form Handling Skill:**
- Generates form components
- Implements validation (Zod schemas)
- Handles form submissions

**Frontend Notification Skill:**
- Generates toast/notification components
- Implements notification hooks
- Manages notification lifecycle

### 16.2 Skill Execution Workflow

**When generating code, skills must:**
1. Read governing spec (constitution, architecture, component spec)
2. Validate architectural constraints
3. Generate code following defined patterns
4. Report any violations or conflicts

**Pattern:**
```
Spec → Plan Agent → Explore Agent → Frontend UI Skill → Generated Code → Validation Agent
```

---

## 17. Compliance with Constitution

This frontend architecture specification is fully compliant with the Project Constitution (`.specify/memory/constitution.md`):

- **Spec-Driven Development**: All code must reference specs
- **Zero Manual Coding**: No manual coding, all agent-based
- **Multi-User Isolation**: Frontend enforces data separation (client-side check)
- **Security First**: JWT authentication, token management, HTTPS required
- **Deterministic Rules**: Clear, enforceable architectural patterns
- **Test-First**: 80% minimum coverage requirement
- **Technology Stack Mandates**: Next.js 16+, TypeScript, Tailwind CSS

---

## 18. Evolution Path (Phase II → Phase III+)

### 18.1 Current Limitations (Phase II)

- Client-side rendering only (no server components)
- No state management library (React Context only)
- No data caching (refetch on every navigation)
- No offline support
- Basic error handling
- No advanced optimizations

### 18.2 Future Enhancements (Phase III+)

**Server Components:**
- Introduce server components for static content
- Reduce client bundle size
- Improve initial page load

**State Management:**
- Introduce Zustand or Redux for complex state
- Implement optimistic updates
- Add undo/redo functionality

**Data Caching:**
- Integrate React Query or SWR
- Cache API responses
- Implement background refetching

**Offline Support:**
- Implement service workers
- Cache static assets
- Offline-first architecture

**Advanced Optimizations:**
- Virtual scrolling for large lists
- Code splitting by route
- Advanced memoization strategies

---

## Appendix: Architecture Decision Records

No ADRs recorded yet. Future architectural decisions that significantly impact the frontend should be documented as ADRs.

---

**Version History:**
- **v1.0** (2026-01-02): Initial frontend architecture specification for Phase II
