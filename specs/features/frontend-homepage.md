# Feature: Frontend Homepage

## Overview
A dynamic, responsive homepage for the Todo Application that serves as the entry point for both unauthenticated visitors and logged-in users. It emphasizes modern UI/UX using the Orange, White, and Black theme.

## Behavior
### 1. Unified Routing Logic
- **Unauthenticated Users**: Display the full marketing landing page.
- **Authenticated Users**:
  - On page load, check auth state from the frontend auth store.
  - If a valid token/session exists, redirect immediately to `/dashboard`.
  - Ensure zero flicker (use server-side middleware or layout-level layout logic).

### 2. Branding (Theme)
- **Primary Color**: Orange (e.g., `#FF7A00`) for headers, CTA buttons, and accents.
- **Background**: White (`#FFFFFF`) or light grey for cleanliness.
- **Typography & Accents**: Black (`#000000`) for high-contrast text and borders.

---

## Page Sections

### 1. Hero Section
- **Heading**: "Master Your Day, One Task at a Time."
- **Sub-heading**: "The ultimate full-stack todo application designed to help you stay productive and organized."
- **CTA Buttons**:
  - **Primary**: "Get Started" (Orange background, white text) -> Routes to `/register`.
  - **Secondary**: "Sign In" (Black border, white background) -> Routes to `/login`.
- **Image/Illustration**: High-quality dashboard preview mock-up.

### 2. Features Section
Display key capabilities using cards:
- **Card 1**: "Smart Task Management" - Create, update, and prioritize tasks with ease.
- **Card 2**: "JWT Protected" - Secure authentication ensures your data is only yours.
- **Card 3**: "Fast & Responsive" - Built with Next.js and Tailwind for blazing-fast performance on any device.
- **Card 4**: "Organize by Category" - Group tasks to keep your workspace clutter-free.

### 3. How It Works
Step-by-step 1-2-3 guide:
1. **Create Account**: Securely sign up in seconds.
2. **Add Tasks**: Break down your goals into actionable items.
3. **Stay On Track**: Mark items complete and watch your progress grow.

### 4. Benefits
- **Productivity Boost**: Spend less time planning and more time doing.
- **Device Sync**: Access your tasks anywhere, anytime.
- **Focus**: Minimalist interface designed to reduce cognitive load.

### 5. Call to Action (CTA)
- Located near the bottom of the page.
- **Text**: "Ready to organize your life?"
- **Button**: "Join Now" (Large Orange Button).

### 6. Footer
- **Links**: About Us, Privacy Policy, Terms of Service.
- **Socials**: Github, Twitter, LinkedIn icons.
- **Copyright**: © 2026 Todo App. All rights reserved.

---

## Integration Rules
- **Auth Store Integration**: The page must subscribe to the `authStore` to determine state.
- **API decoupled**: Content is static or fetched from a local config; no direct calls to FastAPI `task` endpoints on the landing page.
- **Middleware**: Use Next.js Middleware to handle the `/` -> `/dashboard` redirect for authenticated users to ensure a smooth UX.

## User Scenarios & Testing

### Scenario: First-time visitor joins
1. **Given** I am an unauthenticated user on `/`.
2. **When** I click "Get Started".
3. **Then** I am redirected to the Registration page.

### Scenario: Returning user is auto-redirected
1. **Given** I have an active session (valid JWT in store).
2. **When** I navigate to `/`.
3. **Then** I am automatically redirected to my Dashboard without seeing the marketing page.

### Scenario: Responsive viewing
1. **Given** I am on a mobile device.
2. **When** I view the Hero section.
3. **Then** The layout adjusts (e.g., column layout, smaller heading) to fit the screen.

## Success Criteria
- [ ] Homepage correctly routes based on auth status.
- [ ] Theme strictly follows Orange/White/Black palette.
- [ ] All sections (Hero, Features, etc.) are implemented and responsive.
- [ ] Navigation CTA buttons route to correct authentication paths.
- [ ] Page load sequence has no layout shift or auth flicker.
