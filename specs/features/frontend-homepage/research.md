# Research: Frontend Auth Redirection Strategy

## Decision: Dual-Layer Redirection (Middleware + Client Hook)

### Rationale
To ensure the best user experience (UX) and prevent "auth flickering" (where a user briefly sees the marketing page before being redirected):
1. **Middleware (Server-Side)**: Checks for an `auth-token` cookie. If present, it redirects `/` to `/dashboard` before the page even reaches the client.
2. **Hook (Client-Side)**: For reliability and cases where cookies might be out of sync with the frontend state (e.g., after logout), the `useAuth` hook in the Page component handles the logic.

### Requirement Change: Cookie-based Token Storage
Currently, the app uses `localStorage`. To support Middleware, we must update `authUtils` to sync the token to a cookie (`js-cookie` library or native `document.cookie`).

## Component Structure Research

### Marketing UI Assets
- **Layout**: Full-width sections with container-restricted content.
- **Interactivity**: Minimal. Favor standard CSS/Tailwind transitions over heavy libraries like Framer Motion for the landing page performance.

## Alternatives Considered

### 1. Pure Client-Side Redirect
- **Pros**: Easy to implement.
- **Cons**: Suboptimal UX. Users see the landing page for 100-500ms before redirecting.

### 2. Pure Server-Side (RSC)
- **Pros**: Fastest.
- **Cons**: Difficult to integrate with current `AuthContext` because Context is client-side only.

### 3. Middleware + Token Validation
- **Refined Choice**: Middleware merely checks for *existence* of the token to redirect. Actual *validation* happens when the client fetches data on the Dashboard.
