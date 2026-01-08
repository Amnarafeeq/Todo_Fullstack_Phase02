# Frontend Master Tasks

**Project:** Todo App - Hackathon II (Phase II - Full-Stack Web Application)
**Phase:** Frontend Implementation
**Document Version:** 1.0
**Created:** 2026-01-02
**Governing Document:** Constitution (`/specs/constitution.md`)
**Plan Reference:** `/sp.plan/frontend-plan.md`

---

## Overview

This document defines all frontend tasks required to build the complete Phase II frontend from scratch. Each task is a spec-driven execution unit that:

- References governing specifications
- Uses existing Skills for code generation
- Follows Agent orchestration patterns
- Includes clear validation criteria

**Technology Stack:**
- Framework: Next.js 14+ (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- State: React Context + Hooks
- HTTP: Native Fetch API
- Theme: Orange / White / Black

**Skills Available:**
- `/specs/skills/frontend-ui-skill.md`
- `/specs/skills/frontend-state-management-skill.md`
- `/specs/skills/frontend-api-client-skill.md`
- `/specs/skills/frontend-form-handling-skill.md`
- `/specs/skills/frontend-notification-skill.md`
- `/specs/skills/frontend-routing-skill.md`
- `/specs/skills/error-handling-skill.md`

**Agents Available:**
- `frontend-ui-agent`
- `frontend-state-sync`
- `frontend-form-handler`
- `frontend-notification`
- `frontend-notification-manager`
- `frontend-routing-manager`
- `frontend-api-integrator`
- `frontend-accessibility-ux`
- `frontend-styling-theming`

---

## Task 1: App Shell & Layout

**Task Goal:** Create the foundational Next.js project structure, configuration files, and root layout with global providers.

### Files Involved
```
frontend/
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
├── next-env.d.ts
├── .gitignore
└── src/
    ├── app/
    │   ├── layout.tsx (Root layout with providers)
    │   ├── globals.css (Tailwind + custom styles)
    │   ├── loading.tsx (Global loading spinner)
    │   ├── error.tsx (Error boundary)
    │   └── not-found.tsx (404 page)
    ├── components/
    │   ├── Header.tsx
    │   └── index.ts
    ├── contexts/
    │   ├── AuthContext.tsx
    │   ├── ToastContext.tsx
    │   └── index.ts
    └── types/
        └── index.ts
```

### Skills Used
1. **frontend-ui-skill** - Layout structure, component composition
2. **frontend-state-management-skill** - Context provider structure

### Agents Responsible
- `frontend-styling-theming` - Tailwind configuration, theme setup
- `frontend-ui-agent` - Component creation, layout structure

### Dependencies
- None (foundational task)

### Sub-Tasks
| ID | Sub-Task | Spec Reference | Validation |
|----|----------|----------------|------------|
| 1.1 | Initialize Next.js project | `/specs/ui/frontend-architecture.md` | npm install succeeds |
| 1.2 | Configure TypeScript | `/specs/ui/frontend-architecture.md` | tsc --noEmit passes |
| 1.3 | Configure Tailwind CSS | `/specs/ui/frontend-architecture.md` | Build passes, orange theme works |
| 1.4 | Create directory structure | `/specs/ui/frontend-architecture.md` | All directories exist |
| 1.5 | Create global types | `/specs/ui/frontend-architecture.md` | Types compile without errors |
| 1.6 | Create AuthContext (placeholder) | `/specs/ui/frontend-auth-flow.md` | Context exports work |
| 1.7 | Create ToastContext | `/specs/ui/frontend-error-loading.md` | Toast notifications work |
| 1.8 | Create Header component | `/specs/ui/components.md` | Header renders, responsive |
| 1.9 | Create Root layout | `/specs/ui/pages.md` | Providers wrap app |
| 1.10 | Create loading/error/404 pages | `/specs/ui/pages.md` | States display correctly |

### Validation Criteria
- [ ] Next.js dev server runs without errors
- [ ] TypeScript compiles strictly
- [ ] Orange/white/black theme applies
- [ ] Header displays on all pages
- [ ] Providers wrap application correctly
- [ ] Loading/error/404 pages function

---

## Task 2: Authentication Pages UI

**Task Goal:** Build complete login and registration page UIs with forms, validation states, and responsive design.

### Files Involved
```
frontend/src/app/
└── (auth)/
    ├── layout.tsx (Minimal centered layout)
    ├── login/
    │   └── page.tsx (Login form)
    └── register/
        └── page.tsx (Registration form)
```

### Skills Used
1. **frontend-ui-skill** - Page layout, form structure
2. **frontend-form-handling-skill** - Form validation patterns
3. **frontend-state-management-skill** - Form state management

### Agents Responsible
- `frontend-ui-agent` - Page and form rendering
- `frontend-form-handler` - Form validation logic
- `frontend-styling-theming` - Consistent styling

### Dependencies
- Task 1 (App Shell & Layout) complete

### Sub-Tasks
| ID | Sub-Task | Spec Reference | Validation |
|----|----------|----------------|------------|
| 2.1 | Create Auth layout | `/specs/ui/pages.md` | Centered, minimal layout |
| 2.2 | Build Login page | `/specs/ui/pages.md`, `/specs/ui/components.md` | Form renders, accessible |
| 2.3 | Build Register page | `/specs/ui/pages.md`, `/specs/ui/components.md` | Form renders, accessible |
| 2.4 | Add form Input components | `/specs/ui/components.md` | Reusable Input with validation |
| 2.5 | Add Button components | `/specs/ui/components.md` | Variants work correctly |
| 2.6 | Add form state management | `/specs/ui/components.md` | Form data managed locally |
| 2.7 | Add client-side validation | `/specs/ui/frontend-auth-flow.md` | Validation errors display |
| 2.8 | Add loading states | `/specs/ui/frontend-error-loading.md` | Button loading works |

### Validation Criteria
- [ ] Login form displays with email/password fields
- [ ] Register form displays with name/email/password/confirm fields
- [ ] Forms are responsive (mobile-first)
- [ ] Client-side validation works (email format, password length)
- [ ] Loading states display on form submission
- [ ] Error messages display inline
- [ ] ARIA labels and accessibility verified
- [ ] Link navigation between pages works

---

## Task 3: Dashboard Layout & Navigation

**Task Goal:** Create the main dashboard page layout with task management placeholder, navigation structure, and responsive design.

### Files Involved
```
frontend/src/app/
└── (dashboard)/
    ├── page.tsx (Main dashboard)
    └── tasks/
        └── [taskId]/
            └── page.tsx (Task details page)
```

### Skills Used
1. **frontend-ui-skill** - Dashboard layout, page structure
2. **frontend-routing-skill** - Route protection, navigation
3. **frontend-state-management-skill** - Page-level state

### Agents Responsible
- `frontend-ui-agent` - Dashboard rendering
- `frontend-routing-manager` - Route protection logic
- `frontend-accessibility-ux` - Navigation accessibility

### Dependencies
- Task 1 (App Shell & Layout) complete
- Task 2 (Authentication Pages UI) complete (for auth check pattern)

### Sub-Tasks
| ID | Sub-Task | Spec Reference | Validation |
|----|----------|----------------|------------|
| 3.1 | Create Dashboard page | `/specs/ui/pages.md` | Page renders with header |
| 3.2 | Create Task Details page | `/specs/ui/pages.md` | Dynamic route works |
| 3.3 | Add route protection | `/specs/ui/frontend-auth-flow.md` | Redirects if not auth |
| 3.4 | Build dashboard header | `/specs/ui/pages.md` | Title, breadcrumbs |
| 3.5 | Add task stats placeholder | `/specs/ui/components.md` | Stats cards display |
| 3.6 | Add task list placeholder | `/specs/ui/components.md` | Empty state displays |
| 3.7 | Add create button | `/specs/ui/components.md` | FAB on mobile, button on desktop |
| 3.8 | Add navigation sidebar (optional) | `/specs/ui/components.md` | Responsive nav |

### Validation Criteria
- [ ] Dashboard page loads with proper layout
- [ ] Route protection redirects to /login when unauthenticated
- [ ] Page title and breadcrumbs display correctly
- [ ] Task stats placeholder shows (0 tasks, 0 pending, 0 completed)
- [ ] Task list placeholder displays with illustration
- [ ] Create Task button/FAB works (opens modal placeholder)
- [ ] Task Details page loads with task ID from URL
- [ ] Back navigation works

---

## Task 4: Task Management UI

**Task Goal:** Build complete task management components including TaskList, TaskItem, TaskForm, TaskDetails, and FilterBar.

### Files Involved
```
frontend/src/components/
├── task/
│   ├── TaskList.tsx
│   ├── TaskItem.tsx
│   ├── TaskForm.tsx
│   ├── TaskDetails.tsx
│   └── FilterBar.tsx
└── ui/
    ├── Modal.tsx
    ├── Badge.tsx
    └── index.ts
```

### Skills Used
1. **frontend-ui-skill** - Component design, hierarchy
2. **frontend-form-handling-skill** - Task form validation
3. **frontend-notification-skill** - Success/error feedback

### Agents Responsible
- `frontend-ui-agent` - Task component rendering
- `frontend-form-handler` - Task form handling
- `frontend-notification-manager` - Task operation feedback

### Dependencies
- Task 1 (App Shell & Layout) complete
- Task 3 (Dashboard Layout & Navigation) complete

### Sub-Tasks
| ID | Sub-Task | Spec Reference | Validation |
|----|----------|----------------|------------|
| 4.1 | Create Modal component | `/specs/ui/components.md` | Opens/closes, accessible |
| 4.2 | Create Badge component | `/specs/ui/components.md` | Color variants work |
| 4.3 | Create TaskItem component | `/specs/ui/components.md` | Displays task, interactive |
| 4.4 | Create TaskList component | `/specs/ui/components.md` | Renders task items, empty state |
| 4.5 | Create FilterBar component | `/specs/ui/components.md` | Filters render, work |
| 4.6 | Create TaskForm component | `/specs/ui/components.md` | Create/edit form works |
| 4.7 | Create TaskDetails component | `/specs/ui/components.md` | Full task details display |
| 4.8 | Add priority badges | `/specs/ui/components.md` | High/medium/low colors |
| 4.9 | Add category display | `/specs/ui/components.md` | Category shows on tasks |
| 4.10 | Add checkbox toggle | `/specs/ui/components.md` | Completion toggle works |

### Validation Criteria
- [ ] Modal opens on button click, closes on ESC/click-outside
- [ ] Badge displays with correct color for priority/status
- [ ] TaskItem shows title, description preview, priority, category, date
- [ ] TaskItem checkbox toggles completion state
- [ ] TaskList displays empty state when no tasks
- [ ] TaskList renders multiple TaskItems
- [ ] FilterBar shows all filter options (status, priority, category, search)
- [ ] FilterBar sort controls work
- [ ] TaskForm validates required fields
- [ ] TaskForm priority selector works
- [ ] TaskDetails shows all task fields
- [ ] TaskDetails edit/delete buttons display

---

## Task 5: Shared UI Components

**Task Goal:** Build reusable atomic components (Button, Input, Select) used across the application.

### Files Involved
```
frontend/src/components/ui/
├── Button.tsx
├── Input.tsx
├── Select.tsx
├── Checkbox.tsx
└── index.ts
```

### Skills Used
1. **frontend-ui-skill** - Atomic component design
2. **frontend-form-handling-skill** - Form input patterns
3. **frontend-accessibility-ux** - Accessibility compliance

### Agents Responsible
- `frontend-ui-agent` - Component creation
- `frontend-accessibility-ux` - A11y verification

### Dependencies
- Task 1 (App Shell & Layout) complete

### Sub-Tasks
| ID | Sub-Task | Spec Reference | Validation |
|----|----------|----------------|------------|
| 5.1 | Create Button component | `/specs/ui/components.md` | All variants work |
| 5.2 | Create Input component | `/specs/ui/components.md` | Label, error, disabled states |
| 5.3 | Create Select component | `/specs/ui/components.md` | Dropdown works |
| 5.4 | Create Checkbox component | `/specs/ui/components.md` | Checkbox accessible |
| 5.5 | Add icon components | `/specs/ui/components.md` | Icons display correctly |
| 5.6 | Add focus states | `/specs/ui/frontend-accessibility.md` | Keyboard focus visible |
| 5.7 | Add loading spinner | `/specs/ui/components.md` | Spinner component works |

### Validation Criteria
- [ ] Button has primary, secondary, ghost, danger variants
- [ ] Button has sm, md, lg sizes
- [ ] Button disabled state works
- [ ] Button loading state shows spinner
- [ ] Input has label, placeholder, value, onChange
- [ ] Input error state shows red border and message
- [ ] Input required attribute works
- [ ] Input textarea variant works
- [ ] Select shows options, selected value works
- [ ] Select error state displays
- [ ] Checkbox is keyboard accessible
- [ ] All components have proper ARIA labels
- [ ] Focus indicators visible on all interactive elements

---

## Task 6: State Management Setup

**Task Goal:** Implement comprehensive state management for authentication, tasks, filters, and UI state using React Context.

### Files Involved
```
frontend/src/
├── contexts/
│   ├── AuthContext.tsx (enhanced)
│   └── ToastContext.tsx (enhanced)
├── hooks/
│   ├── useAuth.ts
│   ├── useTasks.ts
│   └── useFilters.ts
└── lib/
    └── store.ts (optional store pattern)
```

### Skills Used
1. **frontend-state-management-skill** - State architecture design
2. **frontend-ui-skill** - State-driven UI patterns

### Agents Responsible
- `frontend-state-sync` - State management implementation
- `frontend-ui-agent` - State integration

### Dependencies
- Task 1 (App Shell & Layout) complete
- Task 4 (Task Management UI) complete (for state needs)

### Sub-Tasks
| ID | Sub-Task | Spec Reference | Validation |
|----|----------|----------------|------------|
| 6.1 | Enhance AuthContext | `/specs/ui/frontend-auth-flow.md` | Login/logout methods work |
| 6.2 | Add session persistence | `/specs/ui/frontend-auth-flow.md` | Token stored in localStorage |
| 6.3 | Create useTasks hook | `/specs/ui/state-management.md` | Task CRUD state works |
| 6.4 | Create useFilters hook | `/specs/ui/state-management.md` | Filter state persists |
| 6.5 | Add optimistic updates | `/specs/ui/state-management.md` | UI updates immediately |
| 6.6 | Add loading states | `/specs/ui/frontend-error-loading.md` | Loading tracked per operation |
| 6.7 | Add error states | `/specs/ui/frontend-error-loading.md` | Errors tracked, displayed |
| 6.8 | Create state selectors | `/specs/ui/state-management.md` | Selectors work correctly |

### Validation Criteria
- [ ] AuthContext provides user, loading, isAuthenticated
- [ ] Login updates user state
- [ ] Logout clears user state
- [ ] Session persists on page refresh
- [ ] useTasks hook provides tasks array
- [ ] useTasks hook provides CRUD methods
- [ ] useFilters hook manages filter state
- [ ] Optimistic updates work for task operations
- [ ] Loading states tracked per async operation
- [ ] Error states captured and cleared appropriately

---

## Task 7: API Integration Layer

**Task Goal:** Build the complete API client module with typed functions, JWT token handling, error handling, and data transformation.

### Files Involved
```
frontend/src/lib/
├── api/
│   ├── index.ts
│   ├── auth.ts
│   └── tasks.ts
├── api-client.ts
└── utils/
    ├── transform.ts
    └── errors.ts
```

### Skills Used
1. **frontend-api-client-skill** - API client architecture
2. **error-handling-skill** - Error classification

### Agents Responsible
- `frontend-api-integrator` - API client implementation
- `frontend-notification` - Error notifications

### Dependencies
- Task 1 (App Shell & Layout) complete
- Task 6 (State Management Setup) complete (for state integration)

### Sub-Tasks
| ID | Sub-Task | Spec Reference | Validation |
|----|----------|----------------|------------|
| 7.1 | Create base API client | `/specs/api/frontend-api-client.md` | fetch wrapper works |
| 7.2 | Add JWT token handling | `/specs/api/frontend-api-client.md` | Token attached to requests |
| 7.3 | Handle 401 responses | `/specs/api/frontend-api-client.md` | Redirect to login on 401 |
| 7.4 | Create auth API functions | `/specs/api/frontend-api-client.md` | register(), login() work |
| 7.5 | Create tasks API functions | `/specs/api/frontend-api-client.md` | CRUD functions work |
| 7.6 | Add request transformation | `/specs/api/frontend-api-client.md` | camelCase → snake_case |
| 7.7 | Add response transformation | `/specs/api/frontend-api-client.md` | snake_case → camelCase |
| 7.8 | Implement error handling | `/specs/ui/frontend-error-loading.md` | Errors classified correctly |
| 7.9 | Add retry logic | `/specs/ui/frontend-error-loading.md` | Retry on network error |
| 7.10 | Add timeout handling | `/specs/api/frontend-api-client.md` | Requests timeout properly |

### Validation Criteria
- [ ] API client makes requests to correct endpoints
- [ ] JWT token attached to Authorization header
- [ ] 401 response clears token and redirects to /login
- [ ] Register API call works
- [ ] Login API call works
- [ ] GetTasks API call works with filters
- [ ] GetTask API call works
- [ ] CreateTask API call works
- [ ] UpdateTask API call works
- [ ] DeleteTask API call works
- [ ] ToggleComplete API call works
- [ ] Request data transformed correctly
- [ ] Response data transformed correctly
- [ ] Network errors show retry option
- [ ] Validation errors display inline

---

## Task 8: Auth Flow Integration

**Task Goal:** Connect authentication UI to API client, implement complete login/register flows with proper state management.

### Files Involved
```
frontend/src/
├── app/
│   └── (auth)/
│       ├── login/page.tsx (integrated)
│       └── register/page.tsx (integrated)
└── contexts/
    └── AuthContext.tsx (integrated)
```

### Skills Used
1. **frontend-form-handling-skill** - Form submission flow
2. **frontend-state-management-skill** - Auth state integration
3. **frontend-api-client-skill** - API integration

### Agents Responsible
- `frontend-form-handler` - Form submission handling
- `frontend-state-sync` - State integration
- `frontend-notification-manager` - Auth notifications

### Dependencies
- Task 2 (Authentication Pages UI) complete
- Task 6 (State Management Setup) complete
- Task 7 (API Integration Layer) complete

### Sub-Tasks
| ID | Sub-Task | Spec Reference | Validation |
|----|----------|----------------|------------|
| 8.1 | Integrate login form with API | `/specs/ui/frontend-auth-flow.md` | Login calls API |
| 8.2 | Integrate register form with API | `/specs/ui/frontend-auth-flow.md` | Register calls API |
| 8.3 | Store JWT on login success | `/specs/ui/frontend-auth-flow.md` | Token saved to localStorage |
| 8.4 | Update auth state on login | `/specs/ui/frontend-auth-flow.md` | User state set correctly |
| 8.5 | Redirect on login success | `/specs/ui/frontend-auth-flow.md` | Redirects to dashboard |
| 8.6 | Handle login errors | `/specs/ui/frontend-auth-flow.md` | Error messages display |
| 8.7 | Handle register success | `/specs/ui/frontend-auth-flow.md` | Redirects to login |
| 8.8 | Implement logout flow | `/specs/ui/frontend-auth-flow.md` | Clears state and token |
| 8.9 | Implement session restore | `/specs/ui/frontend-auth-flow.md` | Auto-login on refresh |
| 8.10 | Add "remember me" option | `/specs/ui/frontend-auth-flow.md` | Session persists |

### Validation Criteria
- [ ] Login with valid credentials succeeds, redirects to dashboard
- [ ] Login with invalid credentials shows error message
- [ ] Login with network error shows retry option
- [ ] Register with valid data succeeds, redirects to login
- [ ] Register with existing email shows error
- [ ] JWT token stored in localStorage after login
- [ ] AuthContext user state updated after login
- [ ] Logout clears token and user, redirects to login
- [ ] Page refresh maintains authenticated state
- [ ] Loading state displays during API call
- [ ] Toast notifications show success/error

---

## Task 9: Error & Loading States

**Task Goal:** Implement comprehensive loading and error states throughout the application with proper user feedback.

### Files Involved
```
frontend/src/
├── app/
│   ├── loading.tsx (enhanced)
│   └── error.tsx (enhanced)
├── components/
│   └── ui/
│       ├── Skeleton.tsx
│       └── Spinner.tsx
└── contexts/
    └── ToastContext.tsx (enhanced)
```

### Skills Used
1. **frontend-notification-skill** - Toast notifications
2. **error-handling-skill** - Error classification and display
3. **frontend-ui-skill** - Loading UI components

### Agents Responsible
- `frontend-notification-manager` - Notification system
- `frontend-ui-agent` - Loading component rendering
- `frontend-accessibility-ux` - A11y for states

### Dependencies
- Task 1 (App Shell & Layout) complete
- Task 7 (API Integration Layer) complete

### Sub-Tasks
| ID | Sub-Task | Spec Reference | Validation |
|----|----------|----------------|------------|
| 9.1 | Enhance global loading | `/specs/ui/frontend-error-loading.md` | Spinner displays |
| 9.2 | Create Skeleton component | `/specs/ui/frontend-error-loading.md` | Skeleton loads display |
| 9.3 | Create Spinner component | `/specs/ui/frontend-error-loading.md` | Inline spinner works |
| 9.4 | Add loading to TaskList | `/specs/ui/frontend-error-loading.md` | Loading state while fetching |
| 9.5 | Add loading to TaskForm | `/specs/ui/frontend-error-loading.md` | Button loading on submit |
| 9.6 | Enhance error boundary | `/specs/ui/frontend-error-loading.md` | Error displays with retry |
| 9.7 | Implement error toasts | `/specs/ui/frontend-error-loading.md` | Errors show as toasts |
| 9.8 | Add inline form errors | `/specs/ui/frontend-error-loading.md` | Field errors display |
| 9.9 | Add empty states | `/specs/ui/frontend-error-loading.md` | Empty task list displays |
| 9.10 | Add network error handling | `/specs/ui/frontend-error-loading.md` | Offline state displays |

### Validation Criteria
- [ ] Global loading spinner shows on page transitions
- [ ] TaskList shows skeleton while loading tasks
- [ ] TaskForm button shows spinner during submission
- [ ] Error boundary catches and displays errors
- [ ] Retry button on error page works
- [ ] API errors display as toast notifications
- [ ] Form validation errors display inline
- [ ] Empty task list shows empty state with illustration
- [ ] Network errors show retry option
- [ ] Loading states are accessible (aria-busy)

---

## Task 10: Responsive & Accessibility Pass

**Task Goal:** Ensure full responsive design across all breakpoints and WCAG 2.1 AA accessibility compliance.

### Files Involved
```
All frontend components and pages
- Specifically:
frontend/src/
├── app/ (all pages)
├── components/ (all components)
└── contexts/ (all providers)
```

### Skills Used
1. **frontend-ui-skill** - Responsive design patterns
2. **frontend-accessibility-ux** - Accessibility compliance

### Agents Responsible
- `frontend-styling-theming` - Responsive design
- `frontend-accessibility-ux` - Accessibility audit

### Dependencies
- Task 4 (Task Management UI) complete
- Task 5 (Shared UI Components) complete

### Sub-Tasks
| ID | Sub-Task | Spec Reference | Validation |
|----|----------|----------------|------------|
| 10.1 | Mobile-first styles | `/specs/ui/frontend-architecture.md` | Mobile styles base |
| 10.2 | Tablet breakpoints | `/specs/ui/frontend-architecture.md` | md/lg breakpoints work |
| 10.3 | Desktop styles | `/specs/ui/frontend-architecture.md` | xl/2xl breakpoints work |
| 10.4 | Mobile navigation | `/specs/ui/components.md` | Hamburger menu works |
| 10.5 | Mobile task list | `/specs/ui/components.md` | Single column on mobile |
| 10.6 | Touch target sizes | `/specs/ui/frontend-accessibility.md` | 44x44px minimum |
| 10.7 | ARIA labels audit | `/specs/ui/frontend-accessibility.md` | All interactive labeled |
| 10.8 | Keyboard navigation | `/specs/ui/frontend-accessibility.md` | Tab order logical |
| 10.9 | Focus management | `/specs/ui/frontend-accessibility.md` | Focus visible, not lost |
| 10.10 | Screen reader support | `/specs/ui/frontend-accessibility.md` | Live regions work |
| 10.11 | Color contrast check | `/specs/ui/frontend-accessibility.md` | 4.5:1 ratio passes |
| 10.12 | Skip link | `/specs/ui/frontend-accessibility.md` | Skip to main works |

### Validation Criteria
- [ ] Mobile (<640px): Single column layout, hamburger menu
- [ ] Tablet (640-1024px): Two columns for task list
- [ ] Desktop (>1024px): Full layout, all filters visible
- [ ] Touch targets minimum 44x44px
- [ ] All buttons have aria-label if icon-only
- [ ] All inputs have labels
- [ ] All forms have error associations (aria-describedby)
- [ ] Modal has role="dialog" and aria-modal
- [ ] Tab order follows visual layout
- [ ] Focus indicator visible on all interactive elements
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Skip link appears on tab, skips to main
- [ ] Toast notifications use aria-live
- [ ] Dynamic content announced to screen readers

---

## Task 11: Final UI Polish

**Task Goal:** Apply final styling polish, animations, and theme consistency across the application.

### Files Involved
```
frontend/src/
├── app/
│   └── globals.css (enhanced)
├── tailwind.config.js (enhanced)
└── components/
    └── (all components)
```

### Skills Used
1. **frontend-ui-skill** - Visual polish, animations
2. **frontend-styling-theming** - Theme consistency

### Agents Responsible
- `frontend-styling-theming` - Theme application
- `frontend-ui-agent` - Component polish

### Dependencies
- All previous tasks complete

### Sub-Tasks
| ID | Sub-Task | Spec Reference | Validation |
|----|----------|----------------|------------|
| 11.1 | Button hover states | `/specs/ui/components.md` | Smooth transitions |
| 11.2 | Button active states | `/specs/ui/components.md` | Press effect |
| 11.3 | Input focus states | `/specs/ui/components.md` | Ring animation |
| 11.4 | Card hover effects | `/specs/ui/components.md` | Shadow increase |
| 11.5 | Modal animations | `/specs/ui/components.md` | Fade in/out |
| 11.6 | Toast animations | `/specs/ui/components.md` | Slide in right |
| 11.7 | Task item animations | `/specs/ui/components.md` | Staggered list |
| 11.8 | Loading skeleton animation | `/specs/ui/components.md` | Shimmer effect |
| 11.9 | Theme color consistency | `/specs/ui/frontend-architecture.md` | Orange used consistently |
| 11.10 | Spacing consistency | `/specs/ui/frontend-architecture.md` | 4px grid system |
| 11.11 | Typography consistency | `/specs/ui/frontend-architecture.md` | Inter font, hierarchy |
| 11.12 | Border radius consistency | `/specs/ui/frontend-architecture.md` | Rounded-lg/XL/2XL |

### Validation Criteria
- [ ] All buttons have smooth hover/active transitions
- [ ] Focus states have orange ring
- [ ] Cards lift on hover with shadow increase
- [ ] Modals fade in with scale effect
- [ ] Toasts slide in from right
- [ ] Task items animate on list changes
- [ ] Loading skeletons shimmer
- [ ] Orange accent color used consistently
- [ ] Spacing follows consistent scale
- [ ] Typography hierarchy clear (h1 > h2 > h3 > body)
- [ ] Border radius consistent (lg, xl, 2xl)
- [ ] No visual inconsistencies across pages
- [ ] Dark mode not required (white background specified)

---

## Task Dependency Graph

```
                           ┌─────────────────┐
                           │  Task 1         │
                           │ App Shell       │
                           └────────┬────────┘
                                    │
           ┌────────────────────────┼────────────────────────┐
           │                        │                        │
           ▼                        ▼                        ▼
    ┌─────────────┐         ┌─────────────┐         ┌─────────────┐
    │ Task 2      │         │ Task 5      │         │ Task 6      │
    │ Auth Pages  │         │ UI Components│        │ State Mgmt  │
    └──────┬──────┘         └──────┬──────┘         └──────┬──────┘
           │                        │                        │
           │                        └───────────┬────────────┘
           │                                    │
           ▼                                    ▼
    ┌─────────────┐                    ┌─────────────┐
    │ Task 3      │                    │ Task 7      │
    │ Dashboard   │                    │ API Layer   │
    └──────┬──────┘                    └──────┬──────┘
           │                                   │
           │         ┌─────────────────────────┘
           │         │
           ▼         ▼
    ┌─────────────┐
    │ Task 4      │
    │ Task UI     │
    └──────┬──────┘
           │
           ▼
    ┌─────────────┐
    │ Task 8      │
    │ Auth Flow   │◄─────────────┐
    └──────┬──────┘              │
           │                     │
           ▼                     │
    ┌─────────────┐              │
    │ Task 9      │              │
    │ Error/Load  │              │
    └──────┬──────┘              │
           │                     │
           └──────────┬──────────┘
                      │
                      ▼
           ┌──────────────────┐
           │ Task 10          │
           │ Responsive/A11y  │
           └────────┬─────────┘
                    │
                    ▼
           ┌──────────────────┐
           │ Task 11          │
           │ Final Polish     │
           └──────────────────┘
```

---

## Execution Order Summary

| Phase | Task | Name | Estimated Order |
|-------|------|------|-----------------|
| 1 | Task 1 | App Shell & Layout | 1 |
| 1 | Task 5 | Shared UI Components | 2-3 |
| 2 | Task 2 | Authentication Pages UI | 4 |
| 2 | Task 3 | Dashboard Layout & Navigation | 5 |
| 3 | Task 4 | Task Management UI | 6 |
| 3 | Task 6 | State Management Setup | 7 |
| 4 | Task 7 | API Integration Layer | 8 |
| 4 | Task 8 | Auth Flow Integration | 9 |
| 5 | Task 9 | Error & Loading States | 10 |
| 6 | Task 10 | Responsive & Accessibility Pass | 11 |
| 6 | Task 11 | Final UI Polish | 12 |

---

## Skills Reference Matrix

| Task | Primary Skills | Secondary Skills |
|------|----------------|------------------|
| 1. App Shell | frontend-ui-skill, frontend-state-management-skill | frontend-styling-theming |
| 2. Auth Pages | frontend-ui-skill, frontend-form-handling-skill | frontend-state-management-skill |
| 3. Dashboard | frontend-ui-skill, frontend-routing-skill | frontend-state-management-skill |
| 4. Task UI | frontend-ui-skill, frontend-form-handling-skill | frontend-notification-skill |
| 5. UI Components | frontend-ui-skill, frontend-form-handling-skill | frontend-accessibility-ux |
| 6. State Mgmt | frontend-state-management-skill | frontend-ui-skill |
| 7. API Layer | frontend-api-client-skill | error-handling-skill |
| 8. Auth Flow | frontend-form-handling-skill, frontend-state-management-skill | frontend-api-client-skill |
| 9. Error/Load | frontend-notification-skill, error-handling-skill | frontend-ui-skill |
| 10. Responsive | frontend-ui-skill | frontend-accessibility-ux |
| 11. Polish | frontend-ui-skill | frontend-styling-theming |

---

## Agents Reference Matrix

| Task | Primary Agents | Supporting Agents |
|------|----------------|-------------------|
| 1. App Shell | frontend-styling-theming, frontend-ui-agent | - |
| 2. Auth Pages | frontend-ui-agent, frontend-form-handler | frontend-styling-theming |
| 3. Dashboard | frontend-ui-agent, frontend-routing-manager | frontend-accessibility-ux |
| 4. Task UI | frontend-ui-agent, frontend-form-handler | frontend-notification-manager |
| 5. UI Components | frontend-ui-agent | frontend-accessibility-ux |
| 6. State Mgmt | frontend-state-sync | frontend-ui-agent |
| 7. API Layer | frontend-api-integrator | frontend-notification |
| 8. Auth Flow | frontend-form-handler, frontend-state-sync | frontend-notification-manager |
| 9. Error/Load | frontend-notification-manager, frontend-ui-agent | frontend-accessibility-ux |
| 10. Responsive | frontend-styling-theming, frontend-accessibility-ux | frontend-ui-agent |
| 11. Polish | frontend-styling-theming, frontend-ui-agent | - |

---

## Validation Checklist (All Tasks)

### Pre-Implementation
- [ ] All specs read and understood
- [ ] Constitution compliance verified
- [ ] Technology stack confirmed
- [ ] Skills identified for task
- [ ] Agents identified for task

### Per Task
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

**Document Version:** 1.0
**Last Updated:** 2026-01-02
**Next Action:** Begin Task 1 (App Shell & Layout)
