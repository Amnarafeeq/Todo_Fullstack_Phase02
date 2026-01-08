# Frontend UI Skill

## Purpose

To design frontend UI components, layouts, and interactions, ensuring responsive, accessible, and API-driven user interfaces for the Todo application. This skill translates feature and UI specifications into structured component hierarchies, page layouts, and interaction patterns using Next.js (App Router), TypeScript, and Tailwind CSS. It serves as the reasoning layer for frontend architecture and design decisions.

## When to Use (Trigger Conditions)

This skill should be invoked when:

- New UI components need to be designed for a feature
- Page layouts require structure and organization
- Component hierarchies need to be defined
- Responsive design patterns need implementation
- User interactions and event handlers require planning
- Form components need validation and error handling design
- Navigation and routing structure is being designed
- Loading states, skeletons, and feedback UIs need design
- Modal, dialog, or overlay components are required
- Lists, tables, or grid layouts need design
- Accessibility features (ARIA, keyboard navigation) need integration
- State management for UI components needs planning
- API integration patterns for frontend require design

**Triggers:**
- UI spec defines new components or pages
- Feature spec introduces new user-facing features
- API spec endpoints need frontend integration
- Responsive design requirements are being addressed
- Accessibility compliance needs implementation

## Inputs

### Required Inputs

1. **UI Specification File**
   - Format: String path relative to `/specs/` directory
   - Examples: `ui/todo-list.md`, `ui/task-form.md`, `ui/dashboard.md`

2. **Feature Specification File**
   - Format: String path relative to `/specs/` directory
   - Examples: `features/todo-crud.md`, `features/user-profile.md`, `features/task-filtering.md`

3. **API Specification File** (Optional but recommended)
   - Format: String path relative to `/specs/` directory
   - Examples: `api/routes/todos.md`, `api/routes/auth.md`
   - Purpose: Define API endpoints for data integration

### Supported Specification Types

| Spec Type | Location Pattern | Purpose |
|-----------|-----------------|---------|
| UI Specs | `/specs/ui/*.md` | Component designs, layouts, interactions, styling |
| Feature Specs | `/specs/features/*.md` | User stories, UX requirements, feature workflows |
| API Specs | `/specs/api/*.md` | Endpoint contracts for API integration |
| Architecture Specs | `/specs/architecture/*.md` | Frontend patterns, component architecture, state management |

### Specification Format Expectations

UI specs MUST include:
- Component descriptions and purposes
- Visual hierarchy and layout structures
- User interaction patterns (clicks, form submissions, etc.)
- Responsive behavior (mobile, tablet, desktop)
- Accessibility requirements (ARIA labels, keyboard navigation)
- Error handling and validation UI
- Loading states and feedback mechanisms
- Styling requirements (colors, spacing, typography)

Feature specs MUST include:
- User workflows and user journeys
- Data display requirements
- Input and action requirements
- Edge cases and error scenarios

## Actions

### Step 1: Component Identification
1. Extract all UI components from specification:
   - Page components (full-screen views)
   - Layout components (wrappers, containers, grids)
   - Functional components (forms, inputs, buttons, cards)
   - Presentational components (badges, tags, icons, avatars)
   - Container components (connect UI to state/API)
2. Classify components by type:
   - Atomic (smallest reusable units: Button, Input, Badge)
   - Molecular (composed of atoms: FormField, CardHeader, SearchBar)
   - Organism (complex UI sections: TaskList, TaskForm, UserProfile)
   - Template (page layouts: DashboardLayout, AuthLayout)
   - Page (complete views: HomePage, TaskPage, SettingsPage)
3. Identify reusable vs one-off components
4. Map components to feature requirements

### Step 2: Component Hierarchy Design
1. Design component composition tree:
   - Root: Page component
   - Level 1: Layout containers (Header, Sidebar, Main, Footer)
   - Level 2: Organisms (TaskList, TaskForm, UserProfile)
   - Level 3: Molecules (TaskItem, FormField, FilterBar)
   - Level 4: Atoms (Button, Input, Icon, Badge)
2. Define parent-child relationships
3. Identify prop flow and data passing
4. Determine which components need state management
5. Identify components requiring API integration

### Step 3: Page Layout Planning
1. Design page structure for each view:
   - App shell (global navigation, header, sidebar)
   - Content area (main content)
   - Responsive behavior (mobile-first approach)
2. Define layout patterns:
   - Single-column layout (mobile)
   - Two-column layout (sidebar + content)
   - Grid layout (card-based views)
   - Flexbox layout (lists, rows)
3. Plan responsive breakpoints:
   - Mobile: < 640px (sm)
   - Tablet: 640px - 1024px (md)
   - Desktop: 1024px - 1280px (lg)
   - Large Desktop: > 1280px (xl)
4. Define layout components:
   - Layout wrapper for consistent spacing
   - Container for max-width constraints
   - Grid for card layouts
   - Flex for lists and rows

### Step 4: Interaction Design
1. Define user interactions for each component:
   - Click events (button clicks, card selection, navigation)
   - Form submissions (create, update, delete actions)
   - Input changes (text input, checkbox, select)
   - Keyboard shortcuts (optional)
2. Design state transitions:
   - Loading states → Success/Error states
   - Modal open/close animations
   - Hover/focus states
   - Active/inactive states
3. Define event handling patterns:
   - Direct event handlers (onClick, onChange, onSubmit)
   - Delegated events (list items with common handler)
   - Custom hooks for complex interactions
4. Plan user feedback:
   - Success toasts/notifications
   - Error alerts and inline errors
   - Loading spinners and skeletons
   - Confirmation dialogs for destructive actions

### Step 5: Form Component Design
1. Design form structure:
   - Form container with validation context
   - Form fields (input groups with labels and error messages)
   - Submit/cancel action buttons
   - Progress indicators (multi-step forms)
2. Define form field components:
   - Text input (single-line)
   - Textarea (multi-line)
   - Select/dropdown (options)
   - Checkbox (boolean)
   - Radio buttons (exclusive choices)
   - Date picker (datetime)
   - Tag input (multi-select)
3. Plan validation UI:
   - Real-time validation (on input change)
   - On-blur validation (when field loses focus)
   - On-submit validation (when form submitted)
   - Error message display (inline or below field)
4. Design accessibility features:
   - ARIA labels and descriptions
   - Keyboard navigation (Tab, Enter, Escape)
   - Focus indicators
   - Screen reader support

### Step 6: List and Data Display Design
1. Design list components:
   - Task list (vertical list of task items)
   - Task item (individual task card/row)
   - Empty state (no tasks message)
   - Loading state (skeleton loader)
2. Design data display patterns:
   - Card layout (task cards with metadata)
   - Table layout (task rows with columns)
   - Grid layout (task cards in responsive grid)
3. Define list interactions:
   - Click to view details
   - Checkbox to toggle completion
   - Edit/delete actions
   - Sort/filter controls
4. Design pagination UI:
   - Page number buttons
   - Previous/next buttons
   - "Load more" button (infinite scroll)
5. Design empty states:
   - Illustration or icon
   - Descriptive message
   - Call-to-action button

### Step 7: Navigation and Routing Design
1. Design navigation structure:
   - Main navigation (sidebar or top bar)
   - Breadcrumbs (for nested pages)
   - Tab navigation (for sub-views)
2. Define routing patterns:
   - Route: `/` → Home page
   - Route: `/todos` → Task list page
   - Route: `/todos/[id]` → Task detail page
   - Route: `/todos/new` → Create task page
   - Route: `/profile` → User profile page
   - Route: `/settings` → Settings page
   - Route: `/login` → Login page
   - Route: `/register` → Registration page
3. Design navigation components:
   - Nav links (with active state)
   - Nav buttons (with icons)
   - Breadcrumb items
   - Tab components
4. Plan protected routes:
   - Require authentication (redirect to login)
   - Require specific roles (show error)
   - Require task ownership (404 or error)

### Step 8: Responsive Design Strategy
1. Apply mobile-first approach:
   - Default styles for mobile
   - Media queries for larger screens
   - Progressive enhancement
2. Design responsive patterns:
   - Hamburger menu for mobile navigation
   - Collapsible sidebars
   - Stacked layouts on mobile, side-by-side on desktop
   - Full-width inputs on mobile, constrained on desktop
3. Define Tailwind responsive breakpoints:
   - `sm:` (640px) - small devices
   - `md:` (768px) - medium devices (tablets)
   - `lg:` (1024px) - large devices (laptops)
   - `xl:` (1280px) - extra-large devices
   - `2xl:` (1536px) - 2x-large devices
4. Plan component behavior across breakpoints:
   - Task list: 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop)
   - Sidebar: Hidden (mobile) → Off-canvas (tablet) → Fixed (desktop)
   - Form: Stacked fields (mobile) → Two columns (desktop)

### Step 9: Accessibility Design
1. Apply accessibility standards (WCAG 2.1 AA):
   - Semantic HTML elements
   - ARIA labels and roles
   - Keyboard navigation support
   - Focus management
   - Color contrast requirements
2. Design for screen readers:
   - Descriptive alt text for images
   - ARIA labels for icons without text
   - Announcements for dynamic content changes
3. Design for keyboard users:
   - All interactive elements focusable
   - Logical tab order
   - Visual focus indicators
   - Keyboard shortcuts (optional)
4. Design for different abilities:
   - Sufficient color contrast (4.5:1 for text)
   - Scalable text (user can resize)
   - No reliance on color alone (use icons/labels)
   - Touch target size (minimum 44x44px)

### Step 10: Styling and Theming Strategy
1. Define design tokens:
   - Colors (primary, secondary, success, error, warning, neutral)
   - Spacing (4px base unit)
   - Typography (font sizes, weights, line heights)
   - Border radius (small, medium, large)
   - Shadows (elevation levels)
2. Define Tailwind utility patterns:
   - Spacing: `p-4`, `m-2`, `gap-3`
   - Colors: `bg-primary-500`, `text-gray-900`
   - Typography: `text-lg`, `font-semibold`
   - Layout: `flex`, `grid`, `block`
   - Responsive: `md:flex`, `lg:grid-cols-3`
3. Plan theme support:
   - Light mode (default)
   - Dark mode (toggle)
   - System preference detection
4. Define component styles:
   - Button variants (primary, secondary, ghost, danger)
   - Input variants (default, error, success)
   - Card variants (default, elevated, outlined)
   - Badge variants (info, success, warning, error)

### Step 11: State Management Planning
1. Identify state requirements:
   - Local component state (form inputs, UI toggles)
   - Shared state (user session, authentication)
   - Server state (API data, cache)
2. Determine state management approach:
   - React useState/useReducer for local state
   - Context API for shared state (auth, theme)
   - Server state library for API data (React Query, SWR)
   - URL state for filters and pagination
3. Define state flow:
   - User action → State update → UI re-render
   - API call → Server state update → UI re-render
   - Error state → Error display
4. Plan state persistence:
   - Local storage for user preferences
   - Session storage for temporary data
   - No persistence for sensitive data (auth tokens in httpOnly cookies)

### Step 12: API Integration Planning
1. Map UI components to API endpoints:
   - Task list → GET /api/todos
   - Create task → POST /api/todos
   - Update task → PATCH /api/todos/{id}
   - Delete task → DELETE /api/todos/{id}
   - Complete task → PATCH /api/todos/{id} with status: completed
2. Design data fetching patterns:
   - On mount (initial data load)
   - On user action (create, update, delete)
   - Polling (optional for real-time updates)
3. Design loading states:
   - Skeleton loaders (initial load)
   - Spinner (action in progress)
   - Optimistic updates (immediate UI update, rollback on error)
4. Design error handling:
   - Global error boundary
   - Inline error messages
   - Retry buttons
   - Fallback UIs

### Step 13: Component Documentation
1. Document each component:
   - Component name and purpose
   - Props interface (TypeScript)
   - Usage examples
   - Accessibility notes
2. Document component variants:
   - Visual variants (button sizes, colors)
   - Behavior variants (controlled/uncontrolled inputs)
3. Document interaction patterns:
   - Event handlers and callbacks
   - State requirements
   - API dependencies

## Outputs

### Primary Output: UI Component Specification

```yaml
ui_specification:
  meta:
    ui_spec: string
    feature_spec: string
    api_spec: string
    version: string

  pages:
    - name: string
      route: string  # Next.js App Router route
      layout_component: string  # Layout wrapper
      components: [string]  # Component hierarchy
      requires_auth: boolean
      requires_roles: [string]
      accessibility_notes: [string]

      layout:
        structure:
          - type: enum(header|sidebar|main|footer|modal)
            component: string
            responsive_behavior: string

      components:
        - name: string
          type: enum(atomic|molecular|organism|template)
          purpose: string
          props:
            - name: string
              type: string
              required: boolean
              default: any
              description: string
          events:
            - name: string
              type: enum(onClick|onChange|onSubmit|onFocus|onBlur)
              handler: string
          state_requirements:
            - type: enum(local|context|server|url)
            state_name: string
            initial_value: any
          api_endpoints:
            - method: enum(GET|POST|PATCH|DELETE)
              endpoint: string
              trigger: string  # When to call API

  component_hierarchy:
    page_name: string
    tree:
      - component: string
        type: enum(page|template|organism|molecular|atomic)
        children:
          - component: string
            type: enum(organism|molecular|atomic)
            children: [...]

  design_system:
    colors:
      primary:
        50: string  # Hex code
        100: string
        ...
        900: string
      secondary: object
      success: object
      error: object
      warning: object
      neutral: object

    typography:
      fonts:
        sans: string
        mono: string
      font_sizes:
        xs: string
        sm: string
        base: string
        lg: string
        xl: string
        "2xl": string
        "3xl": string
      font_weights:
        normal: int
        medium: int
        semibold: int
        bold: int

    spacing:
      base: int  # 4px
      scale: [int]  # 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24...

    border_radius:
      sm: string
      md: string
      lg: string
      full: string

    shadows:
      sm: string
      md: string
      lg: string
      xl: string

  responsive_breakpoints:
    mobile:
      max_width: "639px"
      layout: string  # Single column
    tablet:
      min_width: "640px"
      max_width: "1023px"
      layout: string  # Two columns, collapsible sidebar
    desktop:
      min_width: "1024px"
      max_width: "1279px"
      layout: string  # Three columns, fixed sidebar
    large_desktop:
      min_width: "1280px"
      layout: string  # Full layout, larger grids

  accessibility:
    keyboard_navigation:
      enabled: boolean
      shortcuts:
        - key: string
          action: string
      tab_order: [string]  # Component focus order

    screen_reader_support:
      enabled: boolean
      aria_labels:
        - component: string
          aria_label: string
          aria_describedby: string

    color_contrast:
      text: string  # WCAG level (AA, AAA)
      interactive_elements: string
      graphics: string

    focus_management:
      focus_traps: [string]  # Modals, dialogs
      focus_restoration: boolean

  state_management:
    local_state:
      - component: string
        state_name: string
        initial_value: any
        setter_name: string

    context_state:
      - context_name: string  # AuthContext, ThemeContext
        consumers: [string]
        providers: [string]

    server_state:
      - query_key: string
        endpoint: string
        cache_duration: int  # seconds
        stale_time: int  # seconds
        refetch_on: [string]  # mount, window_focus, reconnect

    url_state:
      - param: string
        component: string
        type: string

  interaction_patterns:
    forms:
      - component: string
        validation: enum(real_time|on_blur|on_submit)
        error_display: enum(inline|block|toast)
        submit_behavior: string

    lists:
      - component: string
        selection_mode: enum(single|multiple|none)
        actions: [string]
        pagination_type: enum(page_number|load_more|infinite_scroll)

    modals:
      - component: string
        trigger: string
        close_behavior: enum(click_outside|escape_key|both)
        animation: string

    notifications:
      - type: enum(success|error|warning|info)
      position: enum(top_right|top_left|bottom_right|bottom_left)
      duration: int  # seconds
      auto_close: boolean

  api_integration:
    components:
      - component: string
        endpoint: string
        method: enum(GET|POST|PATCH|DELETE)
        trigger: string
        loading_state: string  # Component or prop
        error_handler: string
        optimistic_update: boolean

    data_transformations:
      - api_field: string
        ui_field: string
        transform: string  # Conversion logic

  tailwind_config:
    theme_extension:
      colors: object
      spacing: object
      typography: object
    plugins: [string]  # tailwindcss/forms, tailwindcss/typography
    content:
      - string  # File paths for content scanning

  component_documentation:
    - component: string
      description: string
      props: object  # Full TypeScript interface
      variants:
        - name: string
          props: object
      examples:
        - name: string
          code: string
      accessibility: object
      storybook_ready: boolean
```

### Secondary Outputs

1. **Component Tree Diagram**: Visual hierarchy of components
2. **Responsive Layout Mockups**: Layout behavior across breakpoints
3. **Interaction Flow Diagrams**: User interaction flows
4. **Accessibility Checklist**: WCAG compliance items
5. **TypeScript Type Definitions**: Component prop interfaces

## Scope & Boundaries

### This Skill MUST:

- Design UI components (atomic, molecular, organism, template, page)
- Create page layouts and component hierarchies
- Plan responsive design strategies
- Design interaction patterns and user flows
- Define form components and validation UI
- Design list components and data displays
- Plan navigation and routing structure
- Apply accessibility standards (WCAG, ARIA, keyboard navigation)
- Define styling and theming strategies (Tailwind CSS)
- Plan state management for UI components
- Design API integration patterns for frontend
- Document component interfaces and usage

### This Skill MUST NOT:

- Generate backend code or API endpoints
- Implement authentication logic (JWT validation, token issuance)
- Define database schemas or models
- Create database queries or migrations
- Implement server-side business logic
- Generate HTML/CSS/JavaScript code (only design/spec)
- Configure Next.js server-side features (middleware, API routes)
- Implement caching or performance optimization on backend
- Manage user sessions or token refresh on server
- Store or retrieve data from database
- Implement actual React component code (only design/spec)

### Boundary Examples

**In Scope:**
- Design TaskList component with loading skeleton and empty state
- Create responsive layout: single column (mobile) → 3 columns (desktop)
- Define TaskForm with inline validation error messages
- Design modal for task deletion with confirmation dialog
- Plan navigation: /todos → /todos/[id] → /todos/new
- Apply ARIA labels to buttons and inputs for accessibility
- Define Tailwind utility classes for component styling (e.g., `p-4`, `bg-blue-500`)
- Design loading spinner for API calls
- Plan state: TaskList uses server state (React Query), TaskForm uses local state

**Out of Scope:**
- Write FastAPI route: @app.get("/api/todos")
- Validate JWT token or implement authentication
- Create SQLModel class: class Todo(SQLModel, table=True): ...
- Write database query: SELECT * FROM todos WHERE user_id = ...
- Implement authentication middleware for Next.js
- Generate actual React code: `function TaskList() { ... }`
- Configure Next.js middleware: `export function middleware(request) { ... }`
- Implement actual CSS/HTML: `<div className="p-4 bg-blue-500">...</div>`
- Write API client: `fetch('/api/todos', ...)`
- Implement token refresh logic
- Store user session in database

## Dependencies

### Required Dependencies

1. **Spec-Kit Plus Schema**
   - Location: `/specs/.spec-kit/schema.md`
   - Purpose: Defines specification file structure

2. **Project Configuration**
   - Location: `/specs/.spec-kit/config.md`
   - Purpose: Provides frontend stack details (Next.js, TypeScript, Tailwind)

### Specification Dependencies

1. **UI Specs**
   - Location: `/specs/ui/*.md`
   - Purpose: Define component designs, layouts, interactions, styling

2. **Feature Specs**
   - Location: `/specs/features/*.md`
   - Purpose: Define user stories, UX requirements, feature workflows

3. **API Specs**
   - Location: `/specs/api/*.md`
   - Purpose: Define API endpoints for frontend integration

4. **Architecture Specs**
   - Location: `/specs/architecture/*.md`
   - Purpose: Define frontend patterns, component architecture, state management

### Skill Dependencies

1. **Spec Interpretation Skill**
   - Purpose: Parse and understand UI and feature specifications
   - Used to extract component requirements, interaction patterns, and UX needs

### Optional Dependencies

1. **API Construction Skill**
   - Purpose: Understand API endpoint contracts
   - Used to map UI components to API endpoints

2. **Authentication Skill**
   - Purpose: Understand auth token structure for protected routes
   - Used to plan auth-aware UI components (login form, protected pages)

3. **Design System Specs**
   - Location: `/specs/design/*.md`
   - Purpose: Define design tokens, component library, brand guidelines

## Used By Agents

### Primary Consumers

1. **General-Purpose Agents**
   - When implementing new UI components
   - When creating page layouts
   - When applying responsive design
   - When integrating API endpoints into UI

2. **Frontend Implementation Agents**
   - When writing React components in Next.js
   - When implementing Tailwind CSS styling
   - When creating TypeScript interfaces for props
   - When integrating API clients (React Query, SWR)

3. **UI/UX Agents**
   - When designing component hierarchies
   - When planning user interactions and flows
   - When ensuring accessibility compliance
   - When applying design system standards

4. **Plan Agents (Software Architect)**
   - When designing frontend architecture
   - When planning component organization and structure
   - When designing state management strategy
   - When planning responsive design approach

### Secondary Consumers

1. **Test Generation Agents**
   - When creating UI component tests
   - When generating accessibility tests
   - When testing responsive layouts
   - When mocking API calls in UI tests

2. **Documentation Agents**
   - When documenting component APIs
   - When creating Storybook stories
   - When writing component usage guides
   - When documenting design patterns

3. **Design Agents**
   - When translating designs to component specs
   - When creating design system documentation
   - When generating Figma to code mappings

## Integration Notes

### Calling Convention

```yaml
skill: "frontend-ui"
inputs:
  ui_spec: "ui/todo-list.md"
  feature_spec: "features/todo-crud.md"
  api_spec: "api/routes/todos.md"
  component_type: enum(atomic|molecular|organism|template|page)
  responsive_requirements:
    mobile_first: boolean
    breakpoints: [string]
  accessibility_level: enum(WCAG_A|WCAG_AA|WCAG_AAA)
  output_format: "ui_component_specification"
```

### Error Handling

- **Missing UI Specs**: Return error with available spec locations
- **Ambiguous Component Requirements**: Flag ambiguous specs and request clarification
- **Inconsistent API Contracts**: Identify mismatches between UI and API specs
- **Accessibility Violations**: Flag accessibility issues and suggest improvements

### Next.js + TypeScript + Tailwind Specifics

- Use Next.js App Router (app directory)
- Use TypeScript for type safety
- Use Tailwind CSS for styling
- Leverage Next.js built-in components: Link, Image, Font
- Use Server Components by default, Client Components when needed
- Use React Server Actions for mutations (optional)
- Implement TypeScript interfaces for component props
- Use Tailwind utility classes for styling
- Configure Tailwind theme in tailwind.config.ts
- Use ESLint and Prettier for code quality

### Component Naming Conventions

- PascalCase for component names: `TaskList`, `TaskForm`, `Button`
- kebab-case for file names: `task-list.tsx`, `task-form.tsx`
- camelCase for prop names: `onSubmit`, `isLoading`, `className`
- Descriptive names that indicate purpose: `CreateTaskForm`, `TaskListItem`, `DeleteTaskButton`

### Accessibility Best Practices

- Use semantic HTML elements (nav, main, section, article, etc.)
- Add ARIA labels to interactive elements without visible text
- Ensure all interactive elements are keyboard focusable
- Implement logical tab order
- Provide visible focus indicators
- Use sufficient color contrast (4.5:1 for text)
- Add alt text to images
- Use headings correctly (h1 → h2 → h3)
- Test with screen readers

### Responsive Design Best Practices

- Mobile-first approach (default styles for mobile)
- Use Tailwind responsive prefixes (sm:, md:, lg:, xl:, 2xl:)
- Test on actual devices or browser dev tools
- Ensure touch targets are at least 44x44px
- Avoid horizontal scrolling on mobile
- Use fluid typography and spacing
- Test layout at all breakpoints

### State Management Best Practices

- Use local state (useState) for component-specific state
- Use Context API for global state (auth, theme)
- Use server state library (React Query, SWR) for API data
- Keep state as close to where it's used as possible
- Avoid prop drilling (use Context for deep passing)
- Use URL state for filters and pagination

---

**Version:** 1.0.0
**Last Updated:** 2026-01-01
**Maintainer:** Spec-Kit Plus AI Agent System
