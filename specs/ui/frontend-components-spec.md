# Frontend Components Specification
**Todo App – Hackathon II – Phase II**

**Version**: 1.0
**Status**: Effective
**Governing Specs**:
- `.specify/memory/constitution.md` - Supreme authority
- `/specs/ui/frontend-architecture.md` - Frontend architecture patterns
- `/specs/ui/pages.md` - Page structure and routing
- `/specs/ui/components.md` - Component implementation details

---

## 1. Purpose of Frontend Components Specification

This specification defines the structural, behavioral, and responsibility boundaries of all frontend components in Todo App Phase II. It establishes component composition patterns, data flow, and interaction rules that all agents and skills must follow during implementation.

**Primary Objectives:**
- Define component hierarchy and composition patterns
- Establish data flow and state ownership boundaries
- Clarify component responsibilities and interactions
- Ensure alignment with frontend architecture patterns
- Provide foundation for agent-based component generation

**Non-Objectives:**
- This is NOT an implementation guide (use `/specs/ui/components.md` for implementation details)
- This does NOT contain code examples or JSX syntax
- This does NOT define visual design (use `/specs/ui/theme.md`)

---

## 2. Component Architecture Overview

### 2.1 Component Hierarchy

```
Root Layout (src/app/layout.tsx)
├── AuthProvider (Context Layer)
│   ├── State: user, loading, isAuthenticated
│   └── Methods: login, logout
├── Header (Navigation Layer)
│   ├── Logo
│   └── UserMenu
│       ├── UserInfo (when authenticated)
│       └── LogoutButton
└── Main Content Area
    └── Route Groups
        ├── (auth) Group
        │   ├── Auth Layout (Minimal)
        │   ├── LoginPage
        │   └── RegisterPage
        └── (dashboard) Group
            ├── Dashboard Page
            │   ├── FilterBar (Control Layer)
            │   ├── TaskList (Display Layer)
            │   │   └── TaskItem × N (Item Layer)
            │   └── FloatingActionButton (Mobile)
            ├── TaskDetails Page
            │   └── TaskDetails (Modal)
            └── Create/Edit Task Modals
                └── TaskForm (Input Layer)
└── ToastProvider (Notification Layer)
    └── Toast × N (Notification Components)
```

### 2.2 Component Layers

**Context Layer:**
- AuthProvider: Authentication state and methods
- ToastProvider: Notification state and methods

**Navigation Layer:**
- Header: Application-wide navigation and user menu
- Links: Route-based navigation

**Control Layer:**
- FilterBar: Task filtering and sorting controls
- TaskForm: Task creation and editing controls
- Modal: Dialog and overlay management

**Display Layer:**
- TaskList: Task collection display
- TaskItem: Individual task display
- TaskDetails: Complete task information display
- Badge: Status/label indicators

**Input Layer:**
- Input: Text and textarea inputs
- Select: Dropdown selections
- Button: Action buttons

**Notification Layer:**
- Toast: Success/error/info messages

### 2.3 Component Composition Rules

1. **Single Responsibility**: Each component has one clear purpose
2. **Props-Driven Behavior**: Components render based solely on props
3. **Events-Driven Updates**: Parent updates via event callbacks
4. **No Direct State Mutation**: Parent state mutated only via provided callbacks
5. **Reusable and Composable**: Components combine to create complex UIs

---

## 3. Data Flow Patterns

### 3.1 Unidirectional Data Flow

**Principle**: Data flows down, events flow up

**Flow:**
```
Parent Component
  │
  ├─ Props (data down)
  │   └─ Child Component
  │
  └─ Events (actions up)
      └─ Parent Component
```

**Benefits:**
- Predictable state updates
- Clear component boundaries
- Easier debugging and testing
- Prevents circular dependencies

### 3.2 State Propagation

**Global State (AuthContext):**
- Wraps entire application
- Provides user state to all components
- Components access via `useAuth()` hook

**Local State (Component Level):**
- Scoped to individual components
- Managed via React hooks (useState, useReducer)
- Not shared with other components

**Derived State:**
- Computed from other state (useMemo)
- Recalculated only when dependencies change
- Examples: filtered tasks, sorted tasks

### 3.3 Event Propagation

**User Interactions → Component State → Callback → Parent State → API Call → Server**

**Example Flow: Task Creation**
```
1. User fills TaskForm
2. TaskForm validates input (local state)
3. User submits form
4. TaskForm calls onSubmit callback with form data
5. Dashboard receives form data
6. Dashboard calls API client with task data
7. API client sends request to backend
8. Backend validates and creates task
9. Backend returns created task
10. API client receives task
11. Dashboard updates task list state
12. TaskList re-renders with new task
13. Toast shows success message
```

---

## 4. Component Categories and Responsibilities

### 4.1 Context Components

**AuthProvider** (`/src/contexts/AuthContext.tsx`)

**Purpose:** Centralize authentication state and logic

**Responsibilities:**
- Store current user data
- Store authentication loading state
- Provide login method
- Provide logout method
- Auto-login on app mount (check localStorage for token)
- Clear token and user data on logout

**State:**
- `user: User | null` - Authenticated user object
- `loading: boolean` - Auth check in progress
- `isAuthenticated: boolean` - Computed from user

**Methods:**
- `login(email: string, password: string): Promise<void>` - Authenticate user
- `logout(): void` - Clear authentication

**Usage Scope:** Wraps entire app in root layout

---

**ToastProvider** (`/src/contexts/ToastContext.tsx`)

**Purpose:** Centralize notification state and logic

**Responsibilities:**
- Store active toasts
- Provide methods to show/hide toasts
- Auto-dismiss toasts after duration
- Stack multiple toasts
- Manage toast lifecycle

**State:**
- `toasts: Toast[]` - Array of active toast notifications

**Methods:**
- `showToast(message: string, type: ToastType, duration?: number): void` - Display toast
- `hideToast(toastId: string): void` - Hide specific toast

**Usage Scope:** Wraps entire app in root layout

---

### 4.2 Navigation Components

**Header** (`/src/components/Header.tsx`)

**Purpose:** Application-wide navigation and user menu

**Responsibilities:**
- Display application logo/name
- Display user information (when authenticated)
- Provide logout functionality (when authenticated)
- Provide navigation to login/register (when not authenticated)
- Responsive behavior (full header on desktop, compact on mobile)

**Inputs (Props):**
- `user: User | null` - Current authenticated user
- `onLogout: () => void` - Logout callback

**Outputs (Events):**
- Logout button click → calls `onLogout()`

**Location:** Rendered in root layout

---

### 4.3 Control Components

**FilterBar** (`/src/components/FilterBar.tsx`)

**Purpose:** Control task list filtering and sorting

**Responsibilities:**
- Display search input for text filtering
- Display status filter dropdown (all/pending/completed)
- Display priority filter dropdown (all/high/medium/low)
- Display category filter dropdown
- Display sort by dropdown (priority/title/created_at)
- Display sort order toggle (ascending/descending)
- Debounce search input to prevent excessive updates

**Inputs (Props):**
- `filters: FilterOptions` - Current filter/sort values
- `categories: string[]` - Available categories
- `onFiltersChange: (filters: FilterOptions) => void` - Filter change callback

**State:**
- Search input value (debounced)
- Filter values (mirrors props, with local search state)

**Outputs (Events):**
- Search input change → Debounced → calls `onFiltersChange()`
- Filter selection change → calls `onFiltersChange()`
- Sort selection change → calls `onFiltersChange()`

**Usage Context:** Used by Dashboard to control TaskList display

---

**TaskForm** (`/src/components/TaskForm.tsx`)

**Purpose:** Task creation and editing

**Responsibilities:**
- Display form inputs for task data
- Validate input values
- Show validation errors
- Handle form submission
- Distinguish between create and edit modes

**Inputs (Props):**
- `task?: Task` - Task to edit (undefined = create mode)
- `onSubmit: (data: TaskInput) => Promise<void>` - Form submission callback
- `onCancel: () => void` - Cancel callback
- `loading?: boolean` - Submission in progress

**State:**
- Form field values (title, description, priority, category)
- Validation errors (field-level)
- Submission state (mirrors loading prop)

**Outputs (Events):**
- Form submit → Validates → calls `onSubmit(data)`
- Cancel button click → calls `onCancel()`

**Usage Context:** Used in Modal for create/edit task

---

**Modal** (`/src/components/Modal.tsx`)

**Purpose:** Dialog and overlay management

**Responsibilities:**
- Display dialog content
- Show backdrop overlay
- Handle close on backdrop click
- Handle close on ESC key
- Animate open/close transitions
- Size content based on prop

**Inputs (Props):**
- `isOpen: boolean` - Modal visibility
- `onClose: () => void` - Close callback
- `title?: string` - Modal title
- `children: React.ReactNode` - Modal content
- `size?: 'sm' | 'md' | 'lg' | 'xl'` - Modal size

**State:**
- Animation state (opening, open, closing, closed)

**Outputs (Events):**
- Backdrop click → calls `onClose()`
- ESC key press → calls `onClose()`

**Usage Context:** Wraps TaskForm and TaskDetails

---

### 4.4 Display Components

**TaskList** (`/src/components/TaskList.tsx`)

**Purpose:** Display collection of tasks

**Responsibilities:**
- Render list of TaskItem components
- Display empty state when no tasks
- Display loading state during data fetch
- Display task count (optional)
- Handle responsive layout (grid on desktop, list on mobile)

**Inputs (Props):**
- `tasks: Task[]` - Tasks to display
- `onTaskUpdate: (task: Task) => void` - Task update callback
- `onTaskDelete: (taskId: number) => void` - Task delete callback
- `onTaskToggle: (taskId: number) => void` - Task toggle callback
- `loading?: boolean` - Loading state
- `emptyMessage?: string` - Empty state message

**State:**
- None (pure display component)

**Outputs (Events):**
- Delegates events from TaskItem children

**Usage Context:** Used by Dashboard to display filtered tasks

---

**TaskItem** (`/src/components/TaskItem.tsx`)

**Purpose:** Display individual task

**Responsibilities:**
- Display task title and description preview
- Display completion status (checkbox)
- Display priority badge (color-coded)
- Display category badge
- Display created date
- Provide edit button
- Provide delete button
- Visually indicate completion (strikethrough)

**Inputs (Props):**
- `task: Task` - Task to display

**State:**
- None (pure display component)

**Outputs (Events):**
- Toggle checkbox → calls parent callback
- Edit button click → calls parent callback with task
- Delete button click → calls parent callback with task ID

**Usage Context:** Used by TaskList to display individual tasks

---

**TaskDetails** (`/src/components/TaskDetails.tsx`)

**Purpose:** Display complete task information

**Responsibilities:**
- Display full task title
- Display full task description
- Display completion status
- Display priority badge
- Display category badge
- Display created and updated timestamps
- Provide edit button
- Provide delete button

**Inputs (Props):**
- `task: Task` - Task to display
- `onClose: () => void` - Close modal callback
- `onEdit: (task: Task) => void` - Edit callback
- `onDelete: (taskId: number) => void` - Delete callback

**State:**
- None (pure display component)

**Outputs (Events):**
- Edit button click → calls `onEdit(task)`
- Delete button click → calls `onDelete(task.id)`
- Close button/click backdrop → calls `onClose()`

**Usage Context:** Used in Modal or TaskDetails page

---

**Badge** (`/src/components/Badge.tsx`)

**Purpose:** Display status/label indicators

**Responsibilities:**
- Display text with variant styling
- Apply color based on variant type

**Inputs (Props):**
- `children: React.ReactNode` - Badge content
- `variant?: 'success' | 'warning' | 'danger' | 'info' | 'default'` - Badge style

**State:**
- None (pure display component)

**Outputs (Events):**
- None (display-only)

**Usage Context:** Used by TaskItem, TaskDetails for priorities, statuses, categories

---

### 4.5 Input Components

**Input** (`/src/components/Input.tsx`)

**Purpose:** Text and textarea input

**Responsibilities:**
- Display labeled input field
- Display placeholder text
- Display validation error (if any)
- Support multiple types (text, email, password, textarea)
- Apply error styling when error present

**Inputs (Props):**
- `label?: string` - Input label
- `placeholder?: string` - Placeholder text
- `value: string` - Input value
- `onChange: (value: string) => void` - Value change callback
- `type?: 'text' | 'email' | 'password' | 'textarea'` - Input type
- `error?: string` - Validation error message
- `required?: boolean` - Required field indicator
- `disabled?: boolean` - Disabled state

**State:**
- None (controlled component via props)

**Outputs (Events):**
- Input change → calls `onChange(value)`

**Usage Context:** Used by forms (login, register, task form)

---

**Select** (`/src/components/Select.tsx`)

**Purpose:** Dropdown selection

**Responsibilities:**
- Display labeled dropdown
- Display options
- Display selected value
- Support placeholder option
- Display validation error (if any)

**Inputs (Props):**
- `label?: string` - Select label
- `value: string` - Selected value
- `onChange: (value: string) => void` - Value change callback
- `options: SelectOption[]` - Available options
- `placeholder?: string` - Placeholder text
- `error?: string` - Validation error message

**State:**
- None (controlled component via props)

**Outputs (Events):**
- Selection change → calls `onChange(value)`

**Usage Context:** Used by FilterBar, TaskForm

---

**Button** (`/src/components/Button.tsx`)

**Purpose:** Action button with variants

**Responsibilities:**
- Display button text/children
- Apply variant styling
- Apply size styling
- Show loading state (spinner)
- Disable when loading or disabled prop true
- Trigger onClick callback on click

**Inputs (Props):**
- `children: React.ReactNode` - Button content
- `variant?: 'primary' | 'secondary' | 'danger' | 'ghost'` - Button style
- `size?: 'sm' | 'md' | 'lg'` - Button size
- `disabled?: boolean` - Disabled state
- `loading?: boolean` - Loading state
- `type?: 'button' | 'submit' | 'reset'` - Button type
- `onClick?: () => void` - Click callback

**State:**
- None (controlled component via props)

**Outputs (Events):**
- Button click → calls `onClick()`

**Usage Context:** Used throughout application (forms, task items, header, etc.)

---

### 4.6 Notification Components

**Toast** (`/src/components/Toast.tsx`)

**Purpose:** Display notification message

**Responsibilities:**
- Display toast message
- Apply variant styling (success/error/info/warning)
- Auto-dismiss after duration
- Allow manual dismiss
- Animate in/out

**Inputs (Props):**
- `message: string` - Notification message
- `type?: 'success' | 'error' | 'info' | 'warning'` - Notification style
- `duration?: number` - Auto-dismiss duration (0 = no auto-dismiss)
- `onClose?: () => void` - Dismiss callback

**State:**
- Animation state (entering, visible, leaving)

**Outputs (Events):**
- Dismiss click → calls `onClose()`
- Duration expires → calls `onClose()`

**Usage Context:** Managed by ToastProvider, triggered via `useToast()` hook

---

## 5. Component Interaction Patterns

### 5.1 Form Interaction Pattern

**Pattern: Controlled Components**

1. Parent component manages form state
2. Form inputs receive value prop
3. User changes input
4. Input calls onChange callback
5. Parent updates state
6. New value passed back to input

**Benefits:**
- Single source of truth (parent state)
- Predictable data flow
- Easier validation management
- Consistent with React best practices

### 5.2 Modal Interaction Pattern

**Pattern: Controlled Visibility**

1. Parent component manages modal open/close state
2. Modal receives isOpen prop
3. User triggers action to open modal
4. Parent sets isOpen = true
5. Modal renders with content
6. User clicks close/ESC/backdrop
7. Modal calls onClose callback
8. Parent sets isOpen = false
9. Modal unmounts

**Benefits:**
- Parent controls modal lifecycle
- Clean state management
- Predictable behavior

### 5.3 List Interaction Pattern

**Pattern: Item Delegation**

1. List component receives items array
2. List component renders item components
3. List component passes item data to each item
4. List component passes event callbacks to each item
5. User interacts with item (e.g., checkbox click)
6. Item component calls callback with item data
7. List component receives callback
8. List component forwards to parent

**Benefits:**
- List doesn't need to know item implementation
- Item doesn't need to know list state
- Clear separation of concerns
- Reusable item components

---

## 6. State Ownership Boundaries

### 6.1 Global State

**Owner:** Context components (AuthProvider, ToastProvider)

**State:**
- Auth state (user, loading, isAuthenticated)
- Notification state (toasts array)

**Access Pattern:**
- Access via custom hooks (`useAuth()`, `useToast()`)
- Available to all components
- Single source of truth

**Mutation Pattern:**
- Mutate only via context methods
- No direct context mutation
- Context methods update internal state

### 6.2 Page-Level State

**Owner:** Page components (LoginPage, RegisterPage, Dashboard)

**State:**
- Login form data (email, password)
- Register form data (email, name, password, confirmPassword)
- Task list (fetched from API)
- Filter/sort state
- Modal open/close state

**Access Pattern:**
- Managed via useState in page component
- Passed down to child components via props

**Mutation Pattern:**
- Mutate only via state setters
- Child components call callbacks
- Parent updates state based on callbacks

### 6.3 Component-Level State

**Owner:** Individual components (TaskForm, FilterBar, etc.)

**State:**
- Form field values (TaskForm)
- Search input value with debounce (FilterBar)
- Animation states (Modal, Toast)

**Access Pattern:**
- Managed via useState in component
- Not shared with other components

**Mutation Pattern:**
- Mutate only via state setters
- Event callbacks notify parent of changes

### 6.4 State Ownership Matrix

| State | Owner | Access Method | Mutation Method |
|--------|---------|----------------|-----------------|
| Auth state | AuthProvider | useAuth() hook | AuthProvider methods |
| Notification state | ToastProvider | useToast() hook | ToastProvider methods |
| Task list | Dashboard | Props (to TaskList) | Dashboard state setters |
| Form data | Form component | useState | State setters |
| Filter state | FilterBar | Props (from/to Dashboard) | Dashboard state setters via callback |
| Modal state | Parent component | Props (isOpen) | Parent state setters via callback |

---

## 7. Error Handling in Components

### 7.1 Form Validation Errors

**Responsibility:** Component-level

**Display:**
- Show error message below input field
- Apply error styling (red border) to input
- Show inline error text

**Flow:**
1. User submits form
2. Form validates input
3. If validation fails, display errors
4. User corrects input
5. Validation errors clear on next submission attempt

### 7.2 API Errors

**Responsibility:** Page-level or Context-level

**Display:**
- Toast notification with error message
- Inline error messages (forms)
- Global error page (critical errors)

**Flow:**
1. Component calls API client
2. API client returns error
3. Component receives error
4. Component shows toast/notification
5. User acknowledges error

**Error Types:**
- **400**: Invalid input → Show form validation errors
- **401**: Unauthorized → Redirect to login
- **403**: Forbidden → Show access denied message
- **404**: Not found → Show resource not found message
- **500**: Server error → Show generic error message

### 7.3 Loading States

**Responsibility:** Component-level

**Display:**
- Show spinner/progress indicator
- Disable interactive elements
- Maintain current state (don't clear data)

**Flow:**
1. User triggers action (submit, fetch, etc.)
2. Component sets loading = true
3. Show loading indicator
4. Disable buttons/inputs
5. Action completes
6. Component sets loading = false
7. Remove loading indicator
8. Enable buttons/inputs

---

## 8. Responsive Design in Components

### 8.1 Breakpoint-Based Behavior

**Breakpoints (Tailwind):**
- Mobile: < 640px (sm)
- Tablet: 640px - 1024px (md, lg)
- Desktop: > 1024px (xl, 2xl)

**Implementation:**
- Use Tailwind responsive prefixes (sm:, md:, lg:, xl:)
- Mobile-first approach (base styles for mobile, override for larger)

### 8.2 Responsive Component Behavior

**TaskList:**
- Mobile: Single column, compact items
- Tablet: 1-2 columns
- Desktop: 2-3 columns

**FilterBar:**
- Mobile: Collapsible, vertical stack, hamburger to expand
- Tablet: Horizontal with scroll for filters
- Desktop: Full horizontal layout, all filters visible

**Header:**
- Mobile: Compact logo, hamburger menu
- Tablet: Full logo, condensed user menu
- Desktop: Full logo, full user menu

**TaskForm:**
- Mobile: Full-width inputs, single column
- Tablet/ Desktop: Two columns (title + description, priority + category)

---

## 9. Accessibility in Components

### 9.1 ARIA Attributes

**Requirements:**
- All interactive elements have aria-label
- Form inputs have aria-describedby linking to error messages
- Loading states have aria-live or aria-busy
- Modals have aria-modal and role="dialog"

**Examples:**
- Button: `aria-label="Create task"`
- Input: `aria-label="Task title"`
- Error: `aria-describedby="task-title-error"`
- Modal: `role="dialog" aria-modal="true" aria-labelledby="modal-title"`

### 9.2 Keyboard Navigation

**Requirements:**
- All interactive elements focusable (tabindex)
- Logical tab order (DOM order)
- Enter/Space to activate buttons
- Escape to close modals
- Focus management in modals (focus first input, return focus on close)

### 9.3 Focus Indicators

**Requirements:**
- Visible focus state on all interactive elements
- Focus ring using Tailwind focus:ring classes
- High contrast for visibility

---

## 10. Performance Optimization in Components

### 10.1 React.memo Usage

**Purpose:** Prevent unnecessary re-renders

**Use Cases:**
- TaskItem: Re-renders only when task data or callbacks change
- Badge: Re-renders only when children or variant change

**Implementation:**
- Wrap component export in React.memo
- Component receives props, re-renders only if props change

### 10.2 useMemo Usage

**Purpose:** Cache expensive calculations

**Use Cases:**
- Filtered tasks in Dashboard
- Sorted tasks in Dashboard
- Derived values (computed from props)

**Implementation:**
- Wrap calculation in useMemo
- Dependencies array determines when to recompute

### 10.3 useCallback Usage

**Purpose:** Cache event handlers

**Use Cases:**
- Task update handlers (passed to TaskItem)
- Filter change handlers (passed to FilterBar)
- Form submit handlers

**Implementation:**
- Wrap handler in useCallback
- Dependencies array determines when to recreate

---

## 11. Component Testing Strategy

### 11.1 Unit Testing Requirements

**Scope:**
- Test individual components in isolation
- Mock child components
- Mock callbacks and state

**Test Cases:**
- Component renders with default props
- Component renders with custom props
- Component handles empty states
- Component handles loading states
- Component handles error states
- Callbacks invoked correctly on user interactions

### 11.2 Integration Testing Requirements

**Scope:**
- Test component interactions
- Test component + child components together
- Test state updates and event propagation

**Test Cases:**
- Form submission with valid data
- Form submission with invalid data
- Modal open/close behavior
- Filter/sort updates parent state
- List item interactions trigger callbacks

---

## 12. Integration with Task Business Logic Skill

### 12.1 Alignment with Business Logic

Per `/specs/skills/task-business-logic-skill.md`, components must:

**Validate Data Before Submission:**
- Title required (1-255 characters)
- Description optional (max 2000 characters)
- Priority must be valid enum (low|medium|high)
- Category optional (max 50 characters)

**Enforce Business Rules:**
- Completed tasks cannot be edited (configurable)
- Task state transitions validated (incomplete → completed)

**Display Validation Errors:**
- Show field-level errors from business logic
- Show business rule violations
- Clear error messages guide user to resolution

**Handle API Errors:**
- 400 Bad Request → Show validation errors
- 403 Forbidden → Show access denied message
- 404 Not Found → Show resource not found

### 12.2 Data Consistency

Components must maintain consistency with business logic:

**Task Ownership:**
- Frontend only requests user's own tasks
- Frontend validates user ID matches authenticated user
- Backend enforces isolation (primary boundary)

**Task Integrity:**
- Frontend displays task data as received from backend
- Frontend does not mutate task data beyond user edits
- Frontend re-fetches after updates for consistency

---

## 13. Component Evolution Path

### 13.1 Phase II Current Scope

**Implemented:**
- Core components (Button, Input, Select, Badge, Modal)
- Task components (TaskList, TaskItem, TaskForm, TaskDetails)
- Filter and control components (FilterBar)
- Context providers (AuthProvider, ToastProvider)
- Navigation components (Header)
- Notification components (Toast)

**Features:**
- Task CRUD operations
- Filtering and sorting
- Multi-user authentication
- Responsive design
- Error handling and validation

### 13.2 Future Enhancements (Phase III+)

**Additional Components:**
- Subtask components (nested tasks)
- Task dependencies visualization
- Rich text editor for descriptions
- File upload components
- Calendar view component
- Kanban board component
- Bulk action components
- Task history/timeline component

**Enhanced Features:**
- Drag-and-drop task reordering
- Keyboard shortcuts
- Advanced filters (date ranges, custom filters)
- Task templates
- Advanced search (fuzzy, semantic)
- Offline indicators
- Real-time updates indicators

---

## 14. Compliance with Governing Specs

This components specification is fully compliant with:

**Constitution (`.specify/memory/constitution.md`):**
- Spec-Driven Development: All components must reference specs
- Zero Manual Coding: Components generated by agents
- Multi-User Isolation: Components enforce user separation
- Security First: Components handle JWT auth, errors properly
- Technology Stack: Next.js, TypeScript, Tailwind CSS

**Frontend Architecture (`/specs/ui/frontend-architecture.md`):**
- Component composition patterns
- Unidirectional data flow
- State ownership boundaries
- Error handling architecture
- Responsive design patterns

**UI Theme (`/specs/ui/theme.md`):**
- Primary color: Orange
- Background: White
- Text: Black
- Applied via Tailwind classes

**Task Business Logic Skill (`/specs/skills/task-business-logic-skill.md`):**
- Validation rules enforced in forms
- Business rules respected
- Error handling aligned with business logic

---

**Version History:**
- **v1.0** (2026-01-02): Initial frontend components specification for Phase II
