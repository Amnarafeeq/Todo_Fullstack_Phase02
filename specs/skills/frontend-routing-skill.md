# Frontend Routing Skill

## Purpose

To manage Next.js App Router page navigation, protect routes based on authentication, and handle routing-related logic including redirects, route guards, and page transitions. This skill serves as the reasoning layer for designing and implementing the application's routing structure, ensuring secure access control and smooth user navigation experiences.

## When to Use (Trigger Conditions)

This skill should be invoked when:

- New pages or routes need to be added to the application
- Authentication protection needs to be applied to routes
- Route guards or middleware need to be implemented
- Redirects need to be configured (after login, logout, etc.)
- Navigation flow between pages needs to be designed
- Dynamic routes (e.g., `/todos/[id]`) need to be implemented
- Route parameters need to be validated or processed
- Page transitions or loading states need to be designed
- Protected routes need to be defined and enforced
- Public vs private routes need to be categorized
- Custom 404, 500, or error pages need to be created

**Triggers:**
- Feature introduces new page or view
- Authentication flow requires redirect logic
- User attempts to access protected route
- Navigation flow design is needed
- Route parameter validation is required
- Page layout or wrapper needs to be applied to routes

## Inputs

### Required Inputs

1. **Feature Specification**
   - Page requirements (which pages needed)
   - Navigation flows (user journeys through app)
   - Protected routes (which routes need auth)
   - Public routes (which routes are accessible to all)
   - Location: `/specs/features/*.md`

2. **Frontend UI Specifications**
   - Page layouts and components
   - Navigation components (sidebar, header, breadcrumbs)
   - Route parameter requirements
   - Location: From Frontend UI Skill output

3. **Authentication Specifications**
   - Authentication status (authenticated vs unauthenticated)
   - User roles and permissions
   - Protected route requirements
   - Redirect destinations (login page, after-login redirect)
   - Location: From Authentication Skill output

### Routing-Specific Inputs

1. **For Route Definition**:
   - Route path (e.g., `/todos`, `/todos/[id]`)
   - Page component to render
   - Layout component (wrapper)
   - Route parameters (dynamic segments)

2. **For Route Protection**:
   - Authentication required (yes/no)
   - Required roles (optional)
   - Required permissions (optional)
   - Redirect destination if unauthorized

3. **For Route Validation**:
   - Parameter validation rules (e.g., UUID format)
   - Query parameter requirements
   - Page access rules

### Supported Route Types

| Route Type | Path Pattern | Purpose |
|------------|--------------|---------|
| Static Routes | `/` , `/about` , `/settings` | Fixed paths, no parameters |
| Dynamic Routes | `/todos/[id]` , `/users/[userId]` | Dynamic segments, URL parameters |
| Catch-All Routes | `/[*catchAll]` | Match all remaining paths (404) |
| Grouped Routes | `/dashboard/*` | Group routes under common prefix |
| API Routes | `/api/*` | API endpoint routes (if needed) |

## Actions

### Step 1: Route Structure Design
1. Identify all pages from feature specs:
   - List all required pages (home, task list, task detail, profile, settings, etc.)
   - Categorize pages by domain (tasks, auth, settings, etc.)
2. Design route hierarchy:
   - Group related routes (e.g., all task routes under `/tasks`)
   - Define parent-child relationships
   - Identify shared layouts and wrappers
3. Define route types:
   - **Public routes**: Accessible without authentication (home, login, register)
   - **Protected routes**: Require authentication (dashboard, task list, profile)
   - **Admin routes**: Require admin role (admin panel, user management)
   - **Dynamic routes**: Include parameters (task detail, user profile, etc.)
4. Design route naming conventions:
   - Use kebab-case for paths: `/task-list` not `/taskList`
   - Use plural for collections: `/todos` not `/todo`
   - Use lowercase: `/user-profile` not `/UserProfile`

### Step 2: Route Definition
1. Define static routes:
   - Root route: `/` - Landing/home page
   - Authentication routes: `/login`, `/register`, `/forgot-password`
   - Dashboard routes: `/dashboard`, `/tasks`, `/profile`, `/settings`
   - Documentation routes: `/about`, `/help`, `/terms`
2. Define dynamic routes:
   - Task detail: `/todos/[id]`
   - Task edit: `/todos/[id]/edit`
   - User profile: `/users/[userId]`
   - Admin pages: `/admin/[page]/[id]`
3. Define catch-all routes:
   - 404 Not Found: `/not-found`
   - 500 Server Error: `/error`
   - Catch-all: `/[...catchAll]`
4. Define API routes (if using Next.js API routes):
   - `/api/auth/*` - Authentication endpoints
   - `/api/todos/*` - Task CRUD endpoints
   - `/api/users/*` - User endpoints

### Step 3: Route Protection Strategy
1. Identify protected routes:
   - Dashboard routes: `/dashboard`, `/tasks`, `/todos/*`
   - Profile routes: `/profile`, `/settings`
   - Admin routes: `/admin/*`
2. Identify public routes:
   - Authentication routes: `/login`, `/register`
   - Landing pages: `/` , `/about`, `/help`
   - Error pages: `/not-found`, `/error`
3. Define access rules:
   - **Authentication Required**: Must be logged in
   - **Not Authenticated Only**: Must NOT be logged in (login, register)
   - **Role Required**: Must have specific role (admin)
   - **Permission Required**: Must have specific permission
4. Define redirect behavior:
   - Unauthorized (not logged in): Redirect to `/login`
   - Already authenticated (on login page): Redirect to `/dashboard` or `/todos`
   - Unauthorized (no role): Redirect to `/403` or `/dashboard`
   - Redirect with return URL: Store intended destination, redirect after login

### Step 4: Route Guard Implementation Design
1. Design middleware pattern:
   - Use Next.js middleware (`middleware.ts`)
   - Check authentication before page renders
   - Apply access rules per route
2. Design page-level guards:
   - Check auth status in page component
   - Redirect if access denied
   - Show loading state while checking
3. Design layout-level guards:
   - Wrap routes with auth check in layout
   - Show unauthorized page if access denied
4. Design role-based guards:
   - Check user roles and permissions
   - Render appropriate page or redirect

### Step 5: Route Parameter Validation
1. Identify parameters to validate:
   - UUID parameters: `/todos/[id]`
   - Numeric IDs: `/users/[userId]`
   - Enum values: `/tasks/[status]`
   - Date parameters: `/tasks/[date]`
2. Define validation rules:
   - UUID: Must match UUID format (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
   - Numeric: Must be positive integer
   - Enum: Must be one of allowed values
   - Date: Must be valid date format
3. Design validation flow:
   - Extract parameter from URL
   - Validate parameter format
   - On valid: Render page
   - On invalid: Redirect to 404 or show error
   - Show validation error in UI

### Step 6: Query Parameter Handling
1. Identify query parameters used:
   - Pagination: `?page=1&limit=10`
   - Filters: `?status=completed&priority=high`
   - Sorting: `?sort=dueDate&order=asc`
   - Search: `?q=search+term`
   - Return URL: `?return=/todos/123`
2. Design query parameter synchronization:
   - Sync query params with state (filters, pagination, sorting)
   - Update URL when state changes
   - Update state when URL changes
3. Design query parameter validation:
   - Validate pagination parameters (page must be >= 1)
   - Validate filter values (must be in allowed set)
   - Validate sort fields (must be whitelisted)
4. Handle missing or invalid query parameters:
   - Use defaults for missing parameters
   - Redirect or use defaults for invalid parameters
   - Show error for invalid parameters

### Step 7: Navigation Flow Design
1. Design user navigation journeys:
   - **Login Flow**: Login → Redirect to `/dashboard` or intended page
   - **Logout Flow**: Logout → Redirect to `/login`
   - **Task Creation Flow**: Click "New Task" → Open modal or navigate to `/todos/new`
   - **Task Detail Flow**: Click task → Navigate to `/todos/[id]`
   - **Task Edit Flow**: Click edit → Navigate to `/todos/[id]/edit`
2. Design programmatic navigation:
   - Use Next.js `router.push()` for navigation
   - Use `router.replace()` for redirects (don't add to history)
   - Use `router.back()` for back navigation
   - Use `router.refresh()` for revalidation
3. Design navigation guards:
   - Confirm before navigation (unsaved changes)
   - Show loading state during navigation
   - Handle navigation cancellation

### Step 8: Page Layout Design
1. Identify shared layouts:
   - **App Layout**: Main app shell (header, sidebar, main)
   - **Auth Layout**: Simplified layout for auth pages (centered, no sidebar)
   - **Dashboard Layout**: Layout with sidebar for dashboard pages
   - **Public Layout**: Layout for public pages
2. Design layout composition:
   - Nest layouts: App Layout → Dashboard Layout → Page
   - Define where layouts are applied (route groups)
   - Define layout overrides (some pages use different layout)
3. Design layout state:
   - Layout-level state (sidebar open/close)
   - Pass state to children
   - Handle layout-specific logic

### Step 9: Loading States and Transitions
1. Design page loading states:
   - Show skeleton loader while page is loading
   - Show loading spinner for async data
   - Show progressive loading (load content as it's ready)
2. Design page transitions:
   - Fade in/out transitions between pages
   - Slide transitions for mobile navigation
   - Smooth transitions for better UX
3. Design error states:
   - Show error page for route errors (404, 403, 500)
   - Show inline error for page errors
   - Provide recovery options (retry, go back, go home)

### Step 10: Redirect Configuration
1. Define authentication redirects:
   - **Protected Route + Not Authenticated**: Redirect to `/login?return={currentUrl}`
   - **Auth Route + Already Authenticated**: Redirect to `/dashboard` or `/todos`
   - **After Login**: Redirect to `return` param or `/dashboard`
   - **After Logout**: Redirect to `/login`
2. Define role-based redirects:
   - **Admin Route + Not Admin**: Redirect to `/403` or `/dashboard`
   - **Insufficient Permissions**: Redirect to `/403`
3. Define error redirects:
   - **404 Not Found**: Redirect to `/not-found`
   - **500 Server Error**: Redirect to `/error`
4. Define custom redirects:
   - **Old Routes**: Redirect old routes to new routes (SEO, backwards compatibility)
   - **Short URLs**: Redirect short URLs to full URLs

### Step 11: Browser Navigation Integration
1. Integrate browser navigation:
   - Handle browser back/forward buttons
   - Update browser URL on navigation
   - Update browser history
2. Handle browser refresh:
   - Preserve route state on refresh
   - Reload page data if needed
   - Show loading state on refresh
3. Handle deep linking:
   - Support direct navigation to any route
   - Validate route access on deep link
   - Redirect to login if required, with return URL

### Step 12: Route Organization and File Structure
1. Design file structure:
   ```
   app/
     layout.tsx          # Root layout
     page.tsx            # Home page
     login/
       page.tsx          # Login page
     todos/
       page.tsx          # Task list page
       [id]/
         page.tsx          # Task detail page
         edit/
           page.tsx      # Task edit page
     not-found.tsx        # 404 page
     error.tsx            # 500 page
     middleware.ts        # Route protection middleware
   ```
2. Organize routes by domain:
   - Group related routes in folders
   - Use clear naming conventions
   - Co-locate route-specific components

## Outputs

### Primary Output: Routing Specification

```yaml
routing_specification:
  meta:
    feature_spec: string
    ui_spec: string
    auth_spec: string
    generated_at: datetime
    version: string

  routes:
    - path: string
      type: enum(static|dynamic|catch_all|api)
      page: string  # Page component file
      layout: string  # Layout component
      category: enum(public|protected|admin)

      protection:
        authentication_required: boolean
        roles_required: [string]
        permissions_required: [string]
        redirect_if_unauthorized: string
        redirect_if_authorized: string

      parameters:
        - name: string
          type: enum(uuid|string|number|enum|date)
          required: boolean
          validation_rules: object
          default_value: any

      query_parameters:
        - name: string
          type: string
          required: boolean
          allowed_values: [string]
          default_value: any

      meta:
        title: string  # Page title
        description: string  # Page description (SEO)
        keywords: [string]  # SEO keywords
        cache_policy: string

  route_groups:
    - name: string
      prefix: string
      layout: string
      routes: [string]  # Route paths
      middleware: [string]  # Middleware functions

  middleware:
    - name: string
      type: enum(auth|role|permission|validation|redirect)
      applied_to: [string]  # Route patterns
      configuration: object
      priority: int

  protection_rules:
    - route_pattern: string
      requires:
        authentication: boolean
        roles: [string]
        permissions: [string]
      redirect:
        unauthorized: string
        forbidden: string
      allow_unauthenticated: boolean

  redirects:
    - from: string
      to: string
      type: enum(permanent|temporary|auth_required|auth_forbidden)
      condition: string
      status_code: int

  layouts:
    - name: string
      path: string
      applies_to: [string]  # Route patterns
      components: [string]  # Components included in layout
      state: object  # Layout state management

  page_transitions:
    - transition_name: string
      type: enum(fade|slide|scale|none)
      duration_ms: int
      applies_to: [string]  # Route patterns

  loading_states:
    - route_pattern: string
      skeleton_component: string
      loading_component: string
      show_progress_bar: boolean

  error_pages:
    - status_code: int
      route: string
      component: string
      custom_content: boolean
      recovery_actions: [string]

  navigation_flows:
    - name: string
      steps:
        - from: string
          to: string
          condition: string
          action: enum(navigate|redirect|replace|back)
          transition: string

  seo:
    - route: string
      title: string
      description: string
      keywords: [string]
      canonical_url: string
      open_graph: object
      twitter_card: object
```

### Secondary Outputs

1. **Route File Structure**:
   ```typescript
   // Example: Route definitions
   // File: app/todos/[id]/page.tsx
   ```
   Tree structure showing all route files and locations

2. **Middleware Configuration**:
   ```typescript
   // File: middleware.ts
   export function middleware(request) {
     // Auth check, role check, redirect logic
   }
   ```

3. **Route Guard Implementation**:
   ```typescript
   // Example: Route guard component
   <AuthGuard
     requiresAuth={true}
     redirect="/login"
   >
     <Page />
   </AuthGuard>
   ```

4. **Navigation Helper Functions**:
   ```typescript
   // Navigation utilities
   export function navigateToLogin(returnUrl?: string): void
   export function navigateToDashboard(): void
   export function navigateToTaskDetail(taskId: string): void
   ```

## Scope & Boundaries

### This Skill MUST:

- Design application route structure and hierarchy
- Define route protection rules (authentication, roles, permissions)
- Design route guards and middleware
- Design redirect logic for authentication flows
- Validate route parameters and query parameters
- Design navigation flows and journeys
- Design page layouts and wrappers
- Design loading states and page transitions
- Define error pages (404, 403, 500)
- Sync query parameters with application state
- Handle browser navigation (back, forward, refresh)
- Organize route file structure

### This Skill MUST NOT:

- Implement actual route files or page components
- Create UI components or layouts (only design structure)
- Implement authentication logic (only check auth status)
- Implement actual redirects (only design redirect logic)
- Create middleware implementation code (only design strategy)
- Generate TypeScript interfaces for route parameters
- Implement page transition animations
- Create navigation components (only design navigation flows)
- Implement actual navigation calls (`router.push()`)
- Implement parameter validation code (only design rules)

### Boundary Examples

**In Scope:**
- Design route structure: `/todos`, `/todos/[id]`, `/login`, `/dashboard`
- Define protection rule: `/todos/*` requires authentication, redirect to `/login` if not
- Design parameter validation: Validate `/todos/[id]` parameter is valid UUID
- Design navigation flow: After login, redirect to `/dashboard` or return URL
- Define query parameter sync: Sync `?status=completed` with task filters state
- Design page layout: Use DashboardLayout for `/todos/*` routes
- Design loading state: Show TaskListSkeleton while `/todos` page loads
- Define error pages: `/not-found` page for 404 errors
- Design middleware: Check auth status in middleware.ts, redirect if unauthorized

**Out of Scope:**
- Implement: `export default function Page({ params }: { params: { id: string } }) { ... }`
- Create: `<AuthGuard requiresAuth={true} redirect="/login">` component
- Implement: `const router = useRouter()` and `router.push('/todos')` navigation
- Create: `<DashboardLayout><Page /></DashboardLayout>` layout component
- Implement: `export function middleware(request: NextRequest) { ... }` middleware
- Validate: `if (!isValidUUID(params.id)) { notFound() }` validation code
- Create: `<TaskListSkeleton />` loading component
- Implement: `redirect('/login')` redirect call
- Create: `<Sidebar />` navigation component

## Dependencies

### Required Dependencies

1. **Spec-Kit Plus Schema**
   - Location: `/specs/.spec-kit/schema.md`
   - Purpose: Defines specification file structure

2. **Project Configuration**
   - Location: `/specs/.spec-kit/config.md`
   - Purpose: Provides Next.js routing details

### Specification Dependencies

1. **Feature Specs**
   - Location: `/specs/features/*.md`
   - Purpose: Define page requirements and navigation flows

2. **UI Specs**
   - Location: `/specs/ui/*.md`
   - Purpose: Define page layouts and navigation components

3. **Auth Specs**
   - Location: `/specs/auth/*.md`
   - Purpose: Define protected route requirements

### Skill Dependencies

1. **Frontend UI Skill**
   - Purpose: Understand page components and layouts
   - Used to design route composition with layouts

2. **Authentication Skill**
   - Purpose: Understand authentication status and requirements
   - Used to design route protection rules

3. **Spec Interpretation Skill**
   - Purpose: Parse and understand feature and UI specifications
   - Used to extract routing requirements

### Optional Dependencies

1. **Frontend State Management Skill**
   - Purpose: Understand query parameter sync needs
   - Used to design query parameter state synchronization

2. **Security / Permissions Skill**
   - Purpose: Understand authorization requirements
   - Used to design role-based route guards

## Used By Agents

### Primary Consumers

1. **General-Purpose Agents**
   - When adding new pages or routes
   - When applying route protection
   - When designing navigation flows
   - When configuring redirects

2. **Frontend Implementation Agents**
   - When implementing route files and page components
   - When implementing middleware for route protection
   - When implementing navigation logic
   - When creating page layouts

3. **UI/UX Agents**
   - When designing navigation structure
   - When designing user journeys
   - When optimizing page transitions
   - When designing loading states

4. **Plan Agents (Software Architect)**
   - When designing routing architecture
   - When planning route organization
   - When designing protection strategy
   - When planning navigation flows

### Secondary Consumers

1. **Test Generation Agents**
   - When creating routing tests
   - When testing route protection
   - When testing navigation flows
   - When testing parameter validation

2. **SEO Agents**
   - When optimizing page titles and metadata
   - When designing canonical URLs
   - When implementing structured data

3. **Documentation Agents**
   - When documenting route structure
   - When creating navigation guides
   - When documenting API routes

## Integration Notes

### Calling Convention

```yaml
skill: "frontend-routing"
inputs:
  feature_spec: "features/todo-crud.md"
  ui_spec: string  # From Frontend UI Skill
  auth_spec: "auth/user-auth.md"
  route_requirements:
    - name: string
      type: enum(page|redirect|guard)
      path: string
      protection: enum(public|protected|admin)
  output_format: "routing_specification"
```

### Next.js App Router Specifics

- Use `app/` directory for routes
- `page.tsx` files define routes
- `layout.tsx` files define layouts
- `middleware.ts` in app root for global middleware
- `[id]` brackets for dynamic segments
- `[...slug]` catch-all segments
- `not-found.tsx` for custom 404
- `error.tsx` for custom error pages

### Route Protection Patterns

**Middleware-based Protection**:
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  if (!token && request.nextUrl.pathname.startsWith('/protected')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}
```

**Page-based Protection**:
```typescript
// page.tsx
export default async function Page() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }
  return <PageContent />;
}
```

### Navigation Best Practices

- Use `router.push()` for normal navigation
- Use `router.replace()` for redirects (don't add to history)
- Use `router.back()` for back navigation
- Use `router.refresh()` for revalidation
- Use `<Link>` for client-side navigation (prefetching)
- Use shallow routing when appropriate

### URL Structure Best Practices

- Use kebab-case for URLs: `/user-profile` not `/userProfile`
- Use plural for collections: `/todos` not `/todo`
- Use lowercase: `/tasks` not `/Tasks`
- Avoid special characters: Use hyphens not underscores
- Keep URLs short and descriptive
- Use meaningful paths: `/tasks/completed` not `/tasks?status=completed` (if appropriate)

---

**Version:** 1.0.0
**Last Updated:** 2026-01-01
**Maintainer:** Spec-Kit Plus AI Agent System
