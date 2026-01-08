# Tasks: Frontend Homepage Implementation

## Implementation Strategy
We will follow an incremental approach:
1.  **Refactor Routing**: Move the app to `/dashboard` so we can use `/` for marketing.
2.  **Enable Redirection**: Implement the low-flicker redirect strategy (Middleware + Hook).
3.  **Build UI**: Componentize the marketing sections using the Orange/White/Black theme.
4.  **Polish**: Add smooth transitions and responsive verification.

---

## Phase 1: Setup & Foundations
*Goal: Prepare the folder structure and routing prerequisites.*

- [ ] T001 Create `src/app/dashboard` directory for the task application logic
- [ ] T002 Move existing root page logic from `src/app/page.tsx` to `src/app/dashboard/page.tsx`
- [ ] T003 Create `src/components/marketing` directory for new homepage components
- [ ] T004 Install `js-cookie` and its types for cookie-based token storage support

---

## Phase 2: [US1] Redirection & Auth Integration
*Goal: Ensure users see the correct page based on login status.*

- [ ] T005 [P] [US1] Update `src/lib/auth.ts` to sync the JWT token to a cookie named `auth-token`
- [ ] T006 [P] [US1] Update `src/contexts/AuthContext.tsx` to ensure `isAuthenticated` is correctly derived on mount
- [ ] T007 [US1] Create `src/middleware.ts` to handle server-side redirects from `/` to `/dashboard` if `auth-token` exists
- [ ] T008 [US1] Implement a `ClientRedirectManager` in `src/app/page.tsx` as a fallback using the `useAuth` hook
- [ ] T009 [US1] Update all references to `/` (e.g. Logo, Home links) to point to `/dashboard` when authenticated

---

## Phase 3: [US2] Marketing UI Componentization
*Goal: Build the Guest-only homepage sections per specification.*

- [ ] T010 [P] [US2] Create responsive `MarketingHero` in `src/components/marketing/Hero.tsx` with Orange CTA buttons
- [ ] T011 [P] [US2] Create `MarketingFeatures` in `src/components/marketing/Features.tsx` with high-contrast card grid
- [ ] T012 [P] [US2] Create `MarketingWorkflow` in `src/components/marketing/HowItWorks.tsx` showing the 1-2-3 guide
- [ ] T013 [P] [US2] Create `MarketingBenefit` in `src/components/marketing/Benefits.tsx` highlighting productivity and sync
- [ ] T014 [P] [US2] Create `MarketingFooter` in `src/components/marketing/Footer.tsx` with links and legal info
- [ ] T015 [US2] Assemble all components in `src/app/page.tsx` for unauthenticated views

---

## Phase 4: [US3] Interactivity & API Client usage
*Goal: Connect the UI to the existing auth flow without direct backend calls on home.*

- [ ] T016 [US3] Connect "Get Started" and "Join Now" buttons to `/register` route
- [ ] T017 [US3] Connect "Sign In" buttons to `/login` route
- [ ] T018 [US3] Ensure the Homepage layout uses `AuthContext` to avoid loading flickering during state hydrating
- [ ] T019 [US3] Implement smooth scroll for "How It Works" anchors if applicable

---

## Phase 5: Polish & Cross-Cutting Concerns
*Goal: Final verification of responsive design and accessibility.*

- [ ] T020 [P] Audit all Marketing components for accessibility (ARIA labels, semantic tags) in `src/components/marketing/`
- [ ] T021 [P] Verify responsive breakpoints (Mobile/Tablet/Desktop) for the Homepage grid in `src/app/page.tsx`
- [ ] T022 Optimize Image assets in `public/` and use `next/image` in `Hero.tsx` for optimal LCP
- [ ] T023 Final verify: Redirection logic works correctly without "marketing flicker" for logged-in users.

---

## Parallel Execution Examples
- **Story US2**: T010, T011, T012, T013 can be worked on simultaneously as they are independent components.
- **Foundations**: T005 and T006 can be implemented in parallel within the `lib` and `contexts` layers.

## Dependencies Graph
`Phase 1` -> `Phase 2` -> `Phase 3` -> `Phase 4` -> `Phase 5`
US1 (Auth Redirect) is the foundation for a seamless Guest experience.
US2 (UI) depends on US1 handling the authenticated state check.
