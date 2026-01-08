# Frontend State Management Skill

## Purpose

To manage tasks, filters, and authentication state in frontend using React Context, Zustand, or Redux Toolkit. This skill serves as the reasoning layer for designing, structuring, and managing application state across components, ensuring data consistency, efficient updates, and proper state synchronization with the backend.

## When to Use (Trigger Conditions)

This skill should be invoked when:

- New state needs to be added to the application (tasks, user, filters)
- Existing state structure needs to be refactored
- State synchronization with backend needs to be designed
- Component state needs to be lifted to global state
- State persistence (localStorage, sessionStorage) needs implementation
- Optimistic updates need to be managed
- State selectors and derived state need to be defined
- State actions (setters, updaters) need to be designed
- State middleware (logging, persistence, devtools) needs configuration
- Multiple components need to share the same data
- Complex state logic (reducers, selectors) needs to be designed

**Triggers:**
- Feature requires global state (tasks, authentication, settings)
- Multiple components need access to same data
- State needs to be synchronized with backend
- Component prop drilling is becoming complex
- Optimistic updates or caching is needed
- State persistence is required

## Inputs

### Required Inputs

1. **Feature Specification**
   - State requirements (what data needs to be stored)
   - State relationships (dependencies between state pieces)
   - State mutation requirements (actions, updates)
   - Derived state needs (computed values)
   - Location: `/specs/features/*.md`

2. **UI Component Specifications**
   - Components that consume state
   - Components that modify state
   - State dependencies between components
   - Location: From Frontend UI Skill output

3. **API Client Specifications**
   - API functions that need to update state
   - Data structures returned from API
   - Optimistic update requirements
   - Location: From Frontend API Client Skill output

### State Management Inputs

1. **For Authentication State**:
   - User data (user_id, email, roles, permissions)
   - Authentication status (authenticated, loading, unauthenticated)
   - JWT token (access token, refresh token)
   - Session metadata (expires_at, login_time)

2. **For Task State**:
   - Task list (array of task objects)
   - Selected task (for task detail view)
   - Task filters (status, priority, due_date range, tags)
   - Task sorting (field, direction)
   - Pagination (page, limit, total)
   - Loading states (initial, loading, error)

3. **For UI State**:
   - Sidebar open/close state
   - Modal open/close states
   - Theme (light/dark)
   - Notification state (notifications list, unread count)
   - Toast notifications (messages queue)

### Supported State Management Libraries

| Library | Use Case | Purpose |
|---------|-----------|---------|
| React Context | Global state, simple state sharing | Built-in, no dependencies |
| Zustand | Global state with simple API | Lightweight, minimal boilerplate |
| Redux Toolkit | Complex state, time-travel debugging | Robust ecosystem, devtools |
| SWR/React Query | Server state, caching, synchronization | Automatic data fetching |
| Jotai | Similar to Zustand, atomic state | Alternative to Zustand |

## Actions

### Step 1: State Requirements Analysis
1. Identify state from feature specs:
   - List all data that needs to be stored globally
   - Identify state that's used by multiple components
   - Identify state that persists across page navigations
   - Identify state that needs to be synchronized with backend
2. Categorize state types:
   - **Server State**: Data from API (tasks, user profile, etc.)
   - **Client State**: UI-only state (sidebar, modals, theme)
   - **Form State**: Temporary form data
   - **Shared State**: Data shared across unrelated components
   - **Local State**: State used by single component (keep local)
3. Identify state relationships:
   - Dependencies between state pieces
   - Derived state computed from other state
   - State that updates together (related state)
4. Determine persistence needs:
   - No persistence (ephemeral, cleared on refresh)
   - Session storage (cleared on browser close)
   - Local storage (persists across sessions)
   - Cookie storage (httpOnly for sensitive data)

### Step 2: State Architecture Design
1. Choose state management approach:
   - **Single Store**: One global store (Zustand, Redux)
   - **Multiple Contexts**: Separate contexts per domain (AuthContext, TaskContext, etc.)
   - **Hybrid**: Server state (React Query) + Client state (Context/Zustand)
   - **URL State**: Query parameters for filters/pagination
2. Design state structure:
   - Organize state by domain (auth, tasks, ui, etc.)
   - Define state shape (objects, arrays, primitives)
   - Define initial values
   - Define optional vs required state
3. Design state slices (if using multiple stores):
   - **Auth Slice**: Authentication state, user data, session
   - **Tasks Slice**: Task list, filters, sorting, pagination
   - **UI Slice**: UI state (modals, sidebar, theme)
   - **Notifications Slice**: Toast messages, browser notifications
4. Design selectors:
   - Selectors for raw state
   - Derived selectors (computed values)
   - Memoized selectors for performance

### Step 3: Authentication State Design
1. Define authentication state structure:
   ```typescript
   interface AuthState {
     // Authentication status
     isAuthenticated: boolean;
     isLoading: boolean;
     error: string | null;

     // User data
     user: User | null;
     userId: string | null;
     roles: string[];
     permissions: string[];

     // Token management
     accessToken: string | null;
     refreshToken: string | null;
     tokenExpiresAt: number | null;
   }
   ```
2. Define authentication actions:
   - `login(credentials)`: Authenticate user, set tokens
   - `logout()`: Clear auth state, tokens
   - `refreshToken()`: Refresh access token
   - `updateUser(userData)`: Update user profile
   - `clearError()`: Clear authentication error
3. Define authentication selectors:
   - `isAuthenticated`: Boolean for conditional rendering
   - `hasRole(role)`: Check if user has specific role
   - `hasPermission(permission)`: Check if user has permission
   - `isTokenExpired`: Check if access token is expired
4. Design authentication persistence:
   - Store tokens in httpOnly cookie (preferred)
   - Or store in localStorage with security flags
   - Persist user data (optional)
   - Clear auth state on logout

### Step 4: Task State Design
1. Define task state structure:
   ```typescript
   interface TaskState {
     // Task list
     tasks: Task[];
     selectedTaskId: string | null;

     // Filtering
     filters: {
       status: 'all' | 'incomplete' | 'completed';
       priority: 'all' | 'low' | 'medium' | 'high' | 'critical';
       dueDateRange: { from: Date; to: Date } | null;
       tags: string[];
       searchQuery: string;
     };

     // Sorting
     sorting: {
       field: 'dueDate' | 'createdAt' | 'priority' | 'title';
       direction: 'asc' | 'desc';
     };

     // Pagination
     pagination: {
       page: number;
       limit: number;
       total: number;
       pages: number;
     };

     // Loading states
     isLoading: boolean;
     isCreating: boolean;
     isUpdating: boolean;
     isDeleting: boolean;
     error: string | null;
   }
   ```
2. Define task actions:
   - `setTasks(tasks)`: Set entire task list
   - `addTask(task)`: Add new task (optimistic)
   - `updateTask(taskId, updates)`: Update existing task (optimistic)
   - `removeTask(taskId)`: Remove task (optimistic)
   - `selectTask(taskId)`: Set selected task
   - `setFilters(filters)`: Update task filters
   - `setSorting(field, direction)`: Update sorting
   - `setPagination(page, limit)`: Update pagination
   - `clearTasks()`: Clear task list (logout)
3. Define task selectors:
   - `filteredTasks`: Tasks filtered by current filters
   - `sortedTasks`: Tasks sorted by current sort
   - `paginatedTasks`: Tasks for current page
   - `selectedTask`: Get selected task object
   - `taskCount`: Count of tasks matching filters
   - `incompleteCount`: Count of incomplete tasks
   - `completedCount`: Count of completed tasks
4. Design task persistence:
   - Persist filters and sorting (localStorage)
   - Persist selected task (URL param or localStorage)
   - Don't persist task list (fetch from API)
   - Persist pagination state (optional)

### Step 5: UI State Design
1. Define UI state structure:
   ```typescript
   interface UIState {
     // Sidebar
     sidebarOpen: boolean;

     // Modals
     modals: {
       createTaskModal: boolean;
       editTaskModal: boolean;
       deleteTaskModal: boolean;
       settingsModal: boolean;
     };

     // Theme
     theme: 'light' | 'dark' | 'system';
     systemTheme: 'light' | 'dark';

     // Notifications
     notifications: ToastNotification[];
     unreadCount: number;

     // Loading overlays
     globalLoading: boolean;
   }
   ```
2. Define UI actions:
   - `toggleSidebar()`: Open/close sidebar
   - `openModal(modalName)`: Open specific modal
   - `closeModal(modalName)`: Close specific modal
   - `setTheme(theme)`: Set theme (light/dark/system)
   - `addNotification(notification)`: Add toast notification
   - `removeNotification(notificationId)`: Remove toast notification
   - `clearNotifications()`: Clear all notifications
   - `setGlobalLoading(isLoading)`: Show/hide global loading
3. Define UI selectors:
   - `isSidebarOpen`: Boolean for sidebar visibility
   - `isModalOpen(modalName)`: Check if modal is open
   - `notifications`: Get all notifications
   - `unreadCount`: Get unread notification count

### Step 6: Optimistic Update Strategy
1. Identify updateable operations:
   - Create: Add task optimistically, revert on error
   - Update: Update task optimistically, revert on error
   - Delete: Remove task optimistically, revert on error
   - Complete: Update task status optimistically, revert on error
2. Design optimistic update flow:
   - Generate temporary ID for optimistic update (e.g., `temp-${Date.now()}`)
   - Update state immediately with optimistic data
   - Make API call in background
   - On success: Replace optimistic data with real data
   - On error: Revert optimistic update, show error
3. Design rollback logic:
   - Store previous state before optimistic update
   - Revert to previous state on error
   - Show error notification on rollback
4. Handle concurrent updates:
   - Use unique IDs for optimistic updates
   - Track pending operations
   - Handle race conditions (last write wins)

### Step 7: Server State Management (React Query/SWR)
1. Define server state queries:
   - `useTasks()`: Fetch task list
   - `useTask(taskId)`: Fetch single task
   - `useUser()`: Fetch user profile
   - `useAuth()`: Fetch authentication status
2. Define server state mutations:
   - `useCreateTask()`: Create task with optimistic update
   - `useUpdateTask()`: Update task with optimistic update
   - `useDeleteTask()`: Delete task with optimistic update
   - `useCompleteTask()`: Complete task with optimistic update
3. Configure caching:
   - Stale time: Time data is considered fresh
   - Cache time: Time data is kept in cache
   - Revalidation: When to refetch (onMount, onWindowFocus, onReconnect)
   - Garbage collection: When to remove from cache
4. Configure invalidation:
   - Invalidate tasks on create/update/delete
   - Invalidate user on profile update
   - Invalidate auth on login/logout

### Step 8: State Persistence Strategy
1. Determine persistence mechanism:
   - **No persistence**: State cleared on refresh (UI state, modals)
   - **SessionStorage**: Cleared on browser close (filters, sorting)
   - **LocalStorage**: Persists across sessions (theme, user preferences)
   - **Cookies**: For sensitive data (tokens - use httpOnly)
2. Design state hydration:
   - Load persisted state on app initialization
   - Validate persisted state (if needed)
   - Merge with default state
   - Clear invalid/corrupted persisted state
3. Design state serialization:
   - Convert state to JSON for storage
   - Handle non-serializable data (Date, Map, Set)
   - Use replacer function for Date objects
4. Design state deserialization:
   - Parse JSON from storage
   - Convert strings to Dates
   - Validate state structure
   - Handle missing keys gracefully

### Step 9: Performance Optimization
1. Identify expensive computations:
   - Derived selectors that filter large arrays
   - Sorting large task lists
   - Complex state transformations
2. Apply memoization:
   - Use `useMemo` for expensive computations
   - Use `useCallback` for event handlers
   - Use reselect (Redux) or zustand selectors for derived state
3. Optimize re-renders:
   - Use shallow comparison for objects/arrays
   - Only subscribe to needed state slices
   - Use React.memo for components that don't need updates
4. Implement debouncing/throttling:
   - Debounce filter changes (wait for user to stop typing)
   - Throttle scroll events (performance)
   - Debounce search queries

### Step 10: State Middleware Design
1. Logging middleware:
   - Log all state changes
   - Log action types and payloads
   - Use in development only
2. Persistence middleware:
   - Save state to localStorage on change
   - Restore state on initialization
   - Filter state to only persist needed parts
3. Devtools middleware:
   - Enable Redux DevTools or Zustand DevTools
   - Enable time-travel debugging
   - Use in development only
4. Analytics middleware:
   - Track state changes for analytics
   - Track user actions (task created, completed, etc.)
   - Anonymize sensitive data

### Step 11: State Testing Strategy
1. Design testable state:
   - Export state selectors for testing
   - Export actions for testing
   - Provide test utilities for setting state
2. Design state mocking:
   - Provide ways to mock state in tests
   - Provide test fixtures for initial state
   - Support state snapshots
3. Test state transitions:
   - Test action dispatches update state correctly
   - Test selectors return correct values
   - Test derived state is computed correctly

## Outputs

### Primary Output: State Management Specification

```yaml
state_management_specification:
  meta:
    feature_spec: string
    ui_spec: string
    api_client_spec: string
    library: enum(context|zustand|redux_toolkit|swr|hybrid)
    generated_at: datetime
    version: string

  architecture:
    approach: enum(single_store|multiple_contexts|hybrid)
    store_count: int
    server_state_library: enum(react_query|swr|none)
    client_state_library: enum(context|zustand|redux_toolkit)

  state_slices:
    - name: string
      domain: string  # e.g., auth, tasks, ui
      persistence: enum(none|session|local|cookie)

      state:
        - key: string
          type: string
          initial_value: any
          required: boolean
          description: string

      actions:
        - name: string
          description: string
          parameters: [string]
          optimistic: boolean
          api_call: string  # Connects to API client

      selectors:
        - name: string
          description: string
          memoized: boolean
          dependencies: [string]
          derived: boolean
          computation: string

      persistence_config:
        enabled: boolean
        storage_type: enum(session|local|cookie)
        storage_key: string
        hydrate_on_init: boolean

  authentication_state:
    state:
      isAuthenticated: boolean
      isLoading: boolean
      user: object
      userId: string
      roles: [string]
      permissions: [string]
      accessToken: string
      refreshToken: string
      tokenExpiresAt: number

    actions:
      - login
      - logout
      - refreshToken
      - updateUser
      - clearError

    selectors:
      - isAuthenticated
      - hasRole
      - hasPermission
      - isTokenExpired

    persistence:
      accessToken: enum(cookie|local|none)
      refreshToken: enum(cookie|local|none)
      userData: enum(local|none)

  task_state:
    state:
      tasks: [object]
      selectedTaskId: string
      filters: object
      sorting: object
      pagination: object
      isLoading: boolean
      isCreating: boolean
      isUpdating: boolean
      isDeleting: boolean
      error: string

    actions:
      - setTasks
      - addTask
      - updateTask
      - removeTask
      - selectTask
      - setFilters
      - setSorting
      - setPagination
      - clearTasks

    selectors:
      - filteredTasks
      - sortedTasks
      - paginatedTasks
      - selectedTask
      - taskCount
      - incompleteCount
      - completedCount

    persistence:
      filters: enum(local|session|none)
      sorting: enum(local|session|none)
      pagination: enum(local|session|none)
      tasks: enum(none|session|local)

    optimistic_updates:
      create: boolean
      update: boolean
      delete: boolean
      rollback_on_error: boolean

  ui_state:
    state:
      sidebarOpen: boolean
      modals: object
      theme: string
      systemTheme: string
      notifications: [object]
      unreadCount: int
      globalLoading: boolean

    actions:
      - toggleSidebar
      - openModal
      - closeModal
      - setTheme
      - addNotification
      - removeNotification
      - clearNotifications
      - setGlobalLoading

    selectors:
      - isSidebarOpen
      - isModalOpen
      - notifications
      - unreadCount

    persistence:
      theme: enum(local|none)
      sidebarOpen: enum(local|none)

  server_state:
    queries:
      - name: string
        key: string  # React Query key
        endpoint: string
        cache_duration: int
        stale_time: int
        refetch_on: [string]

    mutations:
      - name: string
        endpoint: string
        optimistic: boolean
        invalidate_queries: [string]

  performance:
    memoized_selectors: [string]
    memoized_handlers: [string]
    debounced_inputs: [string]
    throttled_events: [string]

  middleware:
    - name: string
      enabled: boolean
      description: string
      config: object

  testing:
    export_state_for_testing: boolean
    export_actions_for_testing: boolean
    export_selectors_for_testing: boolean
    test_utilities: [string]
```

### Secondary Outputs

1. **State Interface Definitions**:
   ```typescript
   // TypeScript interfaces for all state
   interface AuthState { ... }
   interface TaskState { ... }
   interface UIState { ... }
   interface RootState { ... }
   ```

2. **Action Type Definitions**:
   ```typescript
   // Action types
   type AuthAction =
     | { type: 'LOGIN_REQUEST' }
     | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
     | { type: 'LOGIN_FAILURE'; error: string }
     | { type: 'LOGOUT' };
   ```

3. **Selector Implementations**:
   ```typescript
   // Memoized selectors
   const selectFilteredTasks = createSelector(
     [selectTasks, selectFilters],
     (tasks, filters) => {
       return tasks.filter(/* filter logic */);
     }
   );
   ```

4. **Persistence Configuration**:
   ```typescript
   // Persistence middleware config
   const persistenceConfig = {
     keys: ['auth', 'tasks.filters', 'ui.theme'],
     storage: localStorage,
   };
   ```

## Scope & Boundaries

### This Skill MUST:

- Design state architecture and structure
- Define state slices and organization
- Design actions (setters, updaters)
- Design selectors (raw, derived, memoized)
- Design optimistic update strategies
- Design state persistence (hydration, serialization)
- Design performance optimizations (memoization, debouncing)
- Design state middleware (logging, persistence, devtools)
- Define server state management (React Query/SWR)
- Define state synchronization with backend
- Design state testing utilities

### This Skill MUST NOT:

- Implement actual React Context/Zustand/Redux code
- Create UI components that consume state
- Implement API calls (only design state updates)
- Create API client functions
- Implement actual persistence logic (only design strategy)
- Write actual memoization code (only design selectors)
- Implement authentication logic (only design auth state)
- Implement business logic for tasks (only design task state)
- Create UI state for notifications (only design state structure)
- Generate TypeScript code (only design interfaces)

### Boundary Examples

**In Scope:**
- Define auth state structure: `{ isAuthenticated, user, accessToken }`
- Design task actions: `addTask(task)`, `updateTask(taskId, updates)`, `removeTask(taskId)`
- Design selector: `filteredTasks` that filters tasks by status, priority, and search query
- Design optimistic update: Add task to state optimistically, revert on API error
- Design persistence: Store filters in localStorage, hydrate on app init
- Design middleware: Log all state changes in development
- Design React Query: `useTasks()` with cache duration 5 minutes

**Out of Scope:**
- Implement: `createContext(AuthContext)` React context
- Implement: `const useStore = create((set) => ({ ... }))` Zustand store
- Implement: `const { tasks, addTask } = useTaskStore()` Hook
- Write: `useMemo(() => tasks.filter(...), [tasks, filters])` Memoization code
- Implement: `localStorage.setItem('tasks.filters', JSON.stringify(filters))` Persistence code
- Implement: `useQuery(['tasks'], fetchTasks)` React Query hook
- Create: `<TaskList tasks={filteredTasks} />` UI component
- Implement: API call `fetch('/api/todos')` in action
- Write actual test code for state

## Dependencies

### Required Dependencies

1. **Spec-Kit Plus Schema**
   - Location: `/specs/.spec-kit/schema.md`
   - Purpose: Defines specification file structure

2. **Project Configuration**
   - Location: `/specs/.spec-kit/config.md`
   - Purpose: Provides state management library choice

### Specification Dependencies

1. **Feature Specs**
   - Location: `/specs/features/*.md`
   - Purpose: Define state requirements and business rules

2. **UI Specs**
   - Location: `/specs/ui/*.md`
   - Purpose: Define component state needs

3. **API Specs**
   - Location: `/specs/api/*.md`
   - Purpose: Define API contracts for state synchronization

4. **Architecture Specs**
   - Location: `/specs/architecture/*.md`
   - Purpose: Define state management architecture and patterns

### Skill Dependencies

1. **Frontend UI Skill**
   - Purpose: Understand components that consume state
   - Used to design state structure for components

2. **Frontend API Client Skill**
   - Purpose: Understand API contracts for state updates
   - Used to design state synchronization with backend

3. **Authentication Skill**
   - Purpose: Understand auth token structure
   - Used to design authentication state

4. **Spec Interpretation Skill**
   - Purpose: Parse and understand feature and UI specifications
   - Used to extract state requirements

### Optional Dependencies

1. **Task Business Logic Skill**
   - Purpose: Understand task business rules
   - Used to design derived state selectors

2. **Frontend Notification Skill**
   - Purpose: Understand notification state needs
   - Used to design notification state structure

## Used By Agents

### Primary Consumers

1. **General-Purpose Agents**
   - When designing state for new features
   - When refactoring existing state
   - When designing optimistic updates
   - When implementing state persistence

2. **Frontend Implementation Agents**
   - When implementing React Context/Zustand/Redux stores
   - When creating state actions and selectors
   - When implementing state persistence
   - When integrating React Query

3. **UI/UX Agents**
   - When designing state structure for components
   - When designing derived state selectors
   - When optimizing state performance

4. **Plan Agents (Software Architect)**
   - When designing state management architecture
   - When choosing state management library
   - When planning state synchronization strategy

### Secondary Consumers

1. **Test Generation Agents**
   - When creating state tests
   - When mocking state for component tests
   - When testing state transitions

2. **Frontend API Client Agents**
   - When integrating API calls with state updates
   - When designing optimistic updates

3. **Documentation Agents**
   - When documenting state architecture
   - When creating state management guides

## Integration Notes

### Calling Convention

```yaml
skill: "frontend-state-management"
inputs:
  feature_spec: "features/todo-crud.md"
  ui_spec: string  # From Frontend UI Skill
  api_client_spec: string  # From Frontend API Client Skill
  state_library: enum(context|zustand|redux_toolkit|swr|hybrid)
  state_requirements:
    - name: string
      type: enum(server_state|client_state|shared_state|form_state)
      persistence: enum(none|session|local|cookie)
      used_by_components: [string]
  output_format: "state_management_specification"
```

### State Management Library Comparison

| Library | Pros | Cons | Best For |
|---------|------|------|----------|
| React Context | Built-in, simple API | Prop drilling, no devtools | Small apps, simple state |
| Zustand | Lightweight, simple API, small bundle | Smaller ecosystem | Medium apps, minimal boilerplate |
| Redux Toolkit | Robust ecosystem, devtools, time-travel | Verbose, learning curve | Large apps, complex state |
| SWR/React Query | Automatic caching, refetching, optimistic updates | Server state only | API-heavy apps, server state |

### State Organization Patterns

**Single Store (Redux/Zustand)**:
```javascript
store = {
  auth: { ... },
  tasks: { ... },
  ui: { ... }
}
```

**Multiple Contexts**:
```javascript
<AuthProvider>
  <TaskProvider>
    <UIProvider>
      {children}
    </UIProvider>
  </TaskProvider>
</AuthProvider>
```

**Hybrid (React Query + Zustand)**:
- Server state: React Query (tasks, user, etc.)
- Client state: Zustand (modals, theme, sidebar)
- Separation of concerns

### Optimistic Update Best Practices

1. Generate temporary IDs for optimistic updates
2. Show loading state during optimistic update
3. Revert to previous state on error
4. Show error notification on failure
5. Track pending operations to handle race conditions
6. Use optimistic updates for frequently updated data
7. Avoid optimistic updates for critical operations

### Persistence Best Practices

1. Don't persist server state (fetch fresh data)
2. Persist user preferences (theme, filters, sorting)
3. Use httpOnly cookies for sensitive data (tokens)
4. Validate persisted state on hydration
5. Clear persisted state on logout
6. Handle corrupted persisted state gracefully

### Performance Best Practices

1. Memoize expensive computations
2. Memoize event handlers with useCallback
3. Use shallow comparison for state updates
4. Subscribe to minimal state in components
5. Debounce/throttle frequent updates
6. Use React.memo for expensive components
7. Lazy load state slices if needed

---

**Version:** 1.0.0
**Last Updated:** 2026-01-01
**Maintainer:** Spec-Kit Plus AI Agent System
