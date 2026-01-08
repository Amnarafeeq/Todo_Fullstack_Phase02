# Implementation Plan: Frontend Homepage Integration

## Technical Context
- **Frontend Stack**: Next.js 16+ (App Router), Tailwind CSS, React Context.
- **Auth Strategy**: `AuthContext` provides global state via `useAuth` hook. Token stored in `localStorage` via `authUtils`.
- **Target Feature**: Transform the root page (`/`) into a marketing landing page while preserving access to the task app for authenticated users via `/dashboard`.

### Redirection Strategy
- **Client-Side (useAuth)**: In `page.tsx`, use `isAuthenticated` to trigger `router.push('/dashboard')`.
- **Server-Side (Middleware)**: Implement/Update `middleware.ts` to check for auth cookies for a faster, flicker-free experience.

## Constitution Check
- **Authority**: Use `useAuth` hook as the single source of truth for auth state.
- **Simplicity**: Favor standard Tailwind utilities for the marketing UI.
- **Security**: Ensure sensitive app routes remain protected by the same auth mechanism.

## Phase 0: Outline & Research
- [x] Research existing `AuthContext` and `api.ts`.
- [ ] Research Next.js 16 Middleware patterns for cookie-based auth.
- [ ] Determine best component structure for marketing sections (Hero, Features, etc.).

## Phase 1: Design & Contracts
### Internal Contracts
- **Auth Store**: No changes required.
- **Routing**:
  - `/` -> Marketing Homepage (for guests) or Dashboard (for users).
  - `/dashboard` -> New route for the Task Application UI.
- **Components**:
  - `MarketingHero`
  - `MarketingFeatures`
  - `MarketingCTA`
  - `MarketingFooter`

### Data Model
- No new backend entities. Homepage is static/informational.

## Phase 2: Implementation Steps

### 1. Refactor Current Root Layout/Page
- Move existing task-related logic from `src/app/page.tsx` to `src/app/dashboard/page.tsx`.
- Update navigation links across the app to reflect new routes.

### 2. Implement Marketing Components
- Create `src/components/marketing/` directory.
- Build responsive components using the Orange/White/Black theme.
- Use `next/image` for performance.

### 3. Implement Auth Redirection
- Update `src/app/page.tsx` with a `RedirectManager` component that uses `useAuth`.
- Implement `middleware.ts` (if not present) to detect auth cookies and handle server-side redirects to `/dashboard`.

### 4. Styling & Theme Integration
- Ensure `tailwind.config.ts` includes the primary orange color.
- Applied high-contrast black/white styling for the marketing copy.

## Success Criteria Checklist
- [ ] Guests see the marketing homepage on `/`.
- [ ] Authenticated users are redirected to `/dashboard` automatically.
- [ ] The theme matches the Orange/White/Black specification.
- [ ] Mobile responsive layout is verified for all marketing sections.
- [ ] No task data is fetched when a guest is on the homepage.
