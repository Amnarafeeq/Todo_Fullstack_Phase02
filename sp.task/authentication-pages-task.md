# Task: Authentication Pages UI

**Parent Task:** Frontend Master Tasks (`/sp.task/frontend-master-tasks.md`)
**Phase:** Phase II - Full-Stack Web Application
**Task Version:** 1.0
**Status:** Pending Implementation
**Governing Document:** Constitution (`/specs/constitution.md`)
**Plan Reference:** `/sp.plan/frontend-plan.md` (Task 2)

---

## 1. Task Description

This task defines the design and implementation of modern, professional authentication UI for Login and Signup pages. The implementation will create centered, elegant authentication forms using Tailwind CSS with the orange/white/black theme.

### Scope Overview

| Page | Route | Purpose |
|------|-------|---------|
| Login | `/login` | User authentication entry point |
| Signup | `/signup` | New user registration entry point |

### Design Philosophy

- **Centered Card Layout**: Clean, focused authentication experience
- **Orange Accent**: Primary CTA buttons use orange (#f97316)
- **Minimal Distractions**: No header/footer on auth pages (focus on form)
- **Responsive First**: Works on mobile, tablet, and desktop
- **Accessible**: Proper ARIA labels, keyboard navigation, focus states
- **Professional SaaS Style**: Rounded corners, subtle shadows, generous spacing

---

## 2. Task Boundaries

### IN SCOPE (MUST Implement)

**Login Page:**
- [ ] Email input field with label
- [ ] Password input field with label
- [ ] "Forgot password?" link (visual only)
- [ ] Primary "Sign in" button (orange)
- [ ] "Don't have an account? Sign up" link
- [ ] Error message display area (placeholder)
- [ ] Loading state for button

**Signup Page:**
- [ ] Full name input field with label
- [ ] Email input field with label
- [ ] Password input field with label
- [ ] Confirm password input field with label
- [ ] Password requirements hint (visual only)
- [ ] Primary "Create account" button (orange)
- [ ] "Already have an account? Sign in" link
- [ ] Error message display area (placeholder)
- [ ] Loading state for button

**Shared Requirements:**
- [ ] Centered card layout on all screen sizes
- [ ] Orange primary buttons with hover/active states
- [ ] Input focus states with orange ring
- [ ] Form labels (uppercase, small, bold)
- [ ] Placeholder text in inputs
- [ ] Disabled button state during loading
- [ ] Smooth transitions on hover
- [ ] Mobile-responsive (stack on small screens)
- [ ] Keyboard navigation support
- [ ] Focus indicators visible
- [ ] Screen reader announcements for errors

### OUT OF SCOPE (MUST NOT Implement)

- ❌ API calls of any kind
- ❌ Form validation logic
- ❌ Authentication state management
- ❌ JWT token handling
- ❌ Session persistence
- ❌ Backend integration
- ❌ "Remember me" checkbox
- ❌ Social login buttons
- ❌ Password strength meter
- ❌ Email verification flow
- ❌ Real-time validation feedback
- ❌ Form field icons (unless decorative only)

### Input Data (Future)

These will be connected in Task 8 (Auth Flow Integration):
- `useAuth` hook from `AuthContext`
- `api.login()` function from API client
- `api.register()` function from API client
- `useToast` hook from `ToastContext`

---

## 3. Files Involved

### Primary Implementation Files

```
frontend/src/app/
└── (auth)/
    ├── layout.tsx
    │   └── Purpose: Minimal layout wrapper (already exists from Task 1)
    │
    ├── login/
    │   └── page.tsx
    │       └── Purpose: Login page component
    │
    └── signup/
        └── page.tsx
            └── Purpose: Signup page component
```

### Component Files (if needed)

```
frontend/src/components/
└── auth/
    ├── AuthCard.tsx (optional shared wrapper)
    ├── FormField.tsx (optional shared input)
    └── AuthLayout.tsx (if refactoring layout)
```

### Related Files (Reference Only)

```
frontend/src/
├── app/
│   ├── globals.css (Tailwind styles)
│   └── layout.tsx (Root layout - reference)
├── contexts/
│   ├── AuthContext.tsx (for future integration)
│   └── ToastContext.tsx (for future integration)
└── types/
    └── index.ts (existing type definitions)
```

### Files NOT to Modify

- `frontend/src/contexts/AuthContext.tsx`
- `frontend/src/lib/api/*`
- Any backend files

---

## 4. Skills Used

### Primary Skills

| Skill | File | Purpose |
|-------|------|---------|
| **Frontend UI Skill** | `/specs/skills/frontend-ui-skill.md` | Component design, page layout, responsive patterns |
| **Frontend Form Handling Skill** | `/specs/skills/frontend-form-handling-skill.md` | Form structure, input patterns, button variants |

### Secondary Skills (for reference)

| Skill | File | Usage |
|-------|------|-------|
| **Frontend State Management Skill** | `/specs/skills/frontend-state-management-skill.md` | Understanding form state patterns |
| **Frontend Accessibility UX** | Agent skill | Ensuring WCAG compliance |
| **Frontend Styling Theming** | Agent skill | Theme consistency |

### Skill Application

**Frontend UI Skill - Step 1: Component Identification**
- Extract UI components from spec: Login form, Signup form, Input fields, Buttons
- Classify: Atoms (Button, Input), Molecules (FormField), Organism (AuthCard)

**Frontend UI Skill - Step 2: Component Hierarchy**
- Root: AuthLayout → AuthCard → [Form content]
- Level 1: Logo, Title, Description
- Level 2: Form fields, Submit button
- Level 3: Input components, Button component

**Frontend UI Skill - Step 4: Responsive Design**
- Mobile: Full width, stacked, padding
- Tablet: Constrained width, centered
- Desktop: Max-width card, consistent padding

**Frontend Form Handling Skill - Input Design**
- Input labels: uppercase, 12px, bold, gray-700
- Input fields: full width, rounded-lg, border-gray-300
- Focus state: ring-2 ring-orange-500
- Error state: border-red-500, error message below

---

## 5. Agents Responsible

### Primary Agent

| Agent | File | Responsibility |
|-------|------|----------------|
| **frontend-ui-agent** | `/specs/agents/frontend-ui-agent.md` | Page rendering, component creation, layout implementation |

### Supporting Agents

| Agent | Responsibility |
|-------|----------------|
| **frontend-form-handler** | Form structure, input patterns (consulted) |
| **frontend-styling-theming** | Tailwind classes, color application, responsive design |
| **frontend-accessibility-ux** | ARIA labels, keyboard navigation, focus states |

### Agent Orchestration

```
User Request: Implement authentication pages UI
    │
    ▼
frontend-ui-agent (Primary)
    │
    ├──→ frontend-styling-theming (Styling support)
    │       └──→ Apply orange theme, responsive classes
    │
    ├──→ frontend-accessibility-ux (A11y support)
    │       └──→ Verify ARIA labels, keyboard support
    │
    └──→ frontend-form-handler (Form patterns)
            └──→ Review form structure (if needed)
```

### Agent Constraints

**frontend-ui-agent MUST:**
- Render login and signup pages using Next.js + TypeScript + Tailwind CSS
- Apply orange/white/black theme consistently
- Ensure responsive design across breakpoints
- Use semantic HTML structure
- Add proper ARIA labels for accessibility

**frontend-ui-agent MUST NOT:**
- Call any API functions
- Implement form validation logic
- Modify authentication state
- Create backend connections

---

## 6. Dependencies

### Prerequisites (Must Complete First)

| Task | Name | Status | Reason |
|------|------|--------|--------|
| Task 1 | App Shell & Layout | Required | Provides root layout, globals.css, context providers |
| Task 5 | Shared UI Components | Optional | If reusing Button/Input components |

### File Dependencies

| File | Provided By | Purpose |
|------|-------------|---------|
| `src/app/globals.css` | Task 1 | Tailwind base styles, custom components |
| `src/app/(auth)/layout.tsx` | Task 1 | Auth layout wrapper |
| `src/types/index.ts` | Task 1 | TypeScript types (for future) |

### External Dependencies

| Dependency | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.x | React framework |
| React | 18.x | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.x | Styling |

### What This Task Provides for Future Tasks

| Output | Used By |
|--------|---------|
| Login page structure | Task 8 (Auth Flow Integration) |
| Signup page structure | Task 8 (Auth Flow Integration) |
| Form component patterns | Task 4 (Task Management UI) |

---

## 7. Completion Criteria

### UI Requirements

| Criterion | Verification Method |
|-----------|---------------------|
| Login page renders at `/login` | Visual inspection, browser dev tools |
| Signup page renders at `/signup` | Visual inspection, browser dev tools |
| Centered card layout on all screens | Responsive test (mobile, tablet, desktop) |
| Orange primary buttons | Color code check (#f97316) |
| White background | Visual check |
| Black/dark gray text | Color check (gray-900) |
| Rounded corners (8px/12px) | Border radius check |
| Subtle shadows | Box-shadow check |
| Clean spacing (16px/24px/32px) | Layout inspection |

### Component Requirements

| Component | Present | Verified |
|-----------|---------|----------|
| Email input with label | [ ] | [ ] |
| Password input with label | [ ] | [ ] |
| Full name input (signup) | [ ] | [ ] |
| Confirm password (signup) | [ ] | [ ] |
| Primary CTA button | [ ] | [ ] |
| Secondary navigation link | [ ] | [ ] |
| Error message placeholder | [ ] | [ ] |
| Loading state on button | [ ] | [ ] |

### Accessibility Requirements

| Requirement | Verification |
|-------------|--------------|
| All inputs have associated labels | Check HTML output |
| Buttons have accessible names | Check aria-label/icon-only cases |
| Focus indicators visible | Tab through page |
| Keyboard navigation works | Test without mouse |
| Color contrast meets 4.5:1 | Lighthouse audit |
| ARIA labels where needed | Code review |

### Responsive Requirements

| Breakpoint | Layout | Verified |
|------------|--------|----------|
| Mobile (<640px) | Full width, stacked | [ ] |
| Tablet (640-1024px) | Constrained width | [ ] |
| Desktop (>1024px) | Max-width card (400-480px) | [ ] |

### Code Quality Requirements

| Criterion | Verification |
|-----------|--------------|
| TypeScript compiles without errors | Run `npm run build` |
| No console errors in browser | Open browser console |
| Components use props typing | TypeScript check |
| Tailwind classes valid | Build succeeds |
| File structure matches spec | File tree check |

### Explicit Non-Requirements (Not Tested)

- Form submission behavior
- Validation error display
- API call success/failure
- Loading state behavior
- Authentication state changes
- Redirect logic
- Toast notifications

---

## 8. Design Specifications

### Color Palette

| Element | Color | Tailwind Class |
|---------|-------|----------------|
| Primary button | Orange-500 | `bg-primary-500` / `bg-orange-500` |
| Primary button hover | Orange-600 | `hover:bg-orange-600` |
| Text primary | Gray-900 | `text-gray-900` |
| Text secondary | Gray-600 | `text-gray-600` |
| Text muted | Gray-500 | `text-gray-500` |
| Border | Gray-300 | `border-gray-300` |
| Background | White | `bg-white` |
| Error text | Red-600 | `text-red-600` |

### Typography

| Element | Size | Weight | Tailwind |
|---------|------|--------|----------|
| Page title | 24px / 1.5rem | Bold (700) | `text-2xl font-bold` |
| Section title | 18px / 1.125rem | Semi-bold (600) | `text-lg font-semibold` |
| Body text | 16px / 1rem | Normal (400) | `text-base` |
| Label text | 12px / 0.75rem | Medium (500) | `text-xs font-medium` |
| Link text | 14px / 0.875rem | Medium (500) | `text-sm font-medium` |

### Spacing Scale

| Context | Padding/Margin | Tailwind |
|---------|----------------|----------|
| Card padding | 32px / 2rem | `p-8` |
| Form field gap | 20px / 1.25rem | `space-y-5` |
| Button padding | 12px 16px / 0.75rem 1rem | `px-4 py-3` |
| Input padding | 12px 16px / 0.75rem 1rem | `px-4 py-3` |
| Between elements | 24px / 1.5rem | `mb-6` |

### Border Radius

| Element | Radius | Tailwind |
|---------|--------|----------|
| Card | 12px / 0.75rem | `rounded-xl` |
| Input | 8px / 0.5rem | `rounded-lg` |
| Button | 8px / 0.5rem | `rounded-lg` |

### Shadows

| Element | Shadow | Tailwind |
|---------|--------|----------|
| Card | Subtle | `shadow-subtle` / `shadow-sm` |
| Button hover | Soft | `shadow-md` on hover |

### Interactive States

| State | Button | Input |
|-------|--------|-------|
| Default | Gray border on secondary | Gray border |
| Hover | Slightly darker background | Same border |
| Focus | Orange ring | Orange ring |
| Active | Even darker background | Same border |
| Disabled | Reduced opacity (50%) | Reduced opacity |

---

## 9. Page Layouts

### Login Page Layout

```
┌─────────────────────────────────────┐
│  Logo                               │
├─────────────────────────────────────┤
│                                     │
│  Welcome back                       │ ← Title
│  Sign in to continue                 │ ← Description
│                                     │
├─────────────────────────────────────┤
│                                     │
│  Email address                      │ ← Label
│  [ you@example.com            ]     │ ← Input
│                                     │
│  Password                           │ ← Label
│  [ ****************            ]     │ ← Input
│                                     │
│  [Forgot password?]                 │ ← Link (right align)
│                                     │
│  [        Sign in           ]       │ ← Primary Button
│                                     │
├─────────────────────────────────────┤
│                                     │
│  Don't have an account? [Sign up]   │ ← Navigation link
│                                     │
└─────────────────────────────────────┘
```

### Signup Page Layout

```
┌─────────────────────────────────────┐
│  Logo                               │
├─────────────────────────────────────┤
│                                     │
│  Create an account                   │ ← Title
│  Get started with Todo App today     │ ← Description
│                                     │
├─────────────────────────────────────┤
│                                     │
│  Full name                          │ ← Label
│  [ John Doe                    ]     │ ← Input
│                                     │
│  Email address                      │ ← Label
│  [ you@example.com            ]     │ ← Input
│                                     │
│  Password                           │ ← Label
│  [ ****************            ]     │ ← Input
│  [Must be at least 8 characters]    │ ← Hint
│                                     │
│  Confirm password                   │ ← Label
│  [ ****************            ]     │ ← Input
│                                     │
│  [       Create account      ]       │ ← Primary Button
│                                     │
├─────────────────────────────────────┤
│                                     │
│  Already have an account? [Sign in] │ ← Navigation link
│                                     │
└─────────────────────────────────────┘
```

### Mobile Layout

```
┌────────────────────┐
│ Logo               │
├────────────────────┤
│                    │
│  Welcome back      │
│  Sign in...        │
│                    │
│  Email             │
│  [            ]    │
│                    │
│  Password          │
│  [            ]    │
│                    │
│  [Forgot?]         │
│                    │
│  [ Sign in   ]     │
│                    │
│  No account? [Sign]│
│                    │
└────────────────────┘
```

---

## 10. Implementation Steps

### Step 1: Login Page Component

**File:** `src/app/(auth)/login/page.tsx`

**Structure:**
```tsx
export default function LoginPage() {
  return (
    <div className="card p-8">
      {/* Header */}
      <h1>Welcome back</h1>
      <p>Sign in to your account</p>

      {/* Form */}
      <form>
        {/* Email field */}
        {/* Password field */}
        {/* Forgot password link */}
        {/* Submit button */}
      </form>

      {/* Footer */}
      <p>Don't have an account? <Link href="/signup">Sign up</Link></p>
    </div>
  );
}
```

**Key Elements:**
- Card container with shadow and rounded corners
- Centered heading and description
- Email input with label
- Password input with label
- "Forgot password?" link (right-aligned)
- Primary orange button
- Navigation link to signup

### Step 2: Signup Page Component

**File:** `src/app/(auth)/signup/page.tsx`

**Structure:**
```tsx
export default function SignupPage() {
  return (
    <div className="card p-8">
      {/* Header */}
      <h1>Create an account</h1>
      <p>Get started with Todo App today</p>

      {/* Form */}
      <form>
        {/* Name field */}
        {/* Email field */}
        {/* Password field */}
        {/* Password hint */}
        {/* Confirm password field */}
        {/* Submit button */}
      </form>

      {/* Footer */}
      <p>Already have an account? <Link href="/login">Sign in</Link></p>
    </div>
  );
}
```

**Key Elements:**
- Card container with shadow and rounded corners
- Centered heading and description
- Name input with label
- Email input with label
- Password input with label
- Password requirements hint (gray text, small)
- Confirm password input with label
- Primary orange button
- Navigation link to login

### Step 3: Shared Styling (if needed)

**File:** `src/app/globals.css` (already has styles from Task 1)

Add if needed:
```css
/* Auth page specific styles */
.auth-card {
  @apply bg-white rounded-xl shadow-sm border border-gray-100 p-8;
}

.auth-title {
  @apply text-2xl font-bold text-gray-900 mb-2 text-center;
}

.auth-description {
  @apply text-gray-600 text-center mb-8;
}

.auth-footer {
  @apply text-center mt-6 text-sm text-gray-600;
}

.auth-link {
  @apply text-primary-600 hover:text-primary-700 font-medium;
}
```

---

## 11. Validation Commands

### Build Validation

```bash
cd frontend
npm run build
```

Expected: Build succeeds without TypeScript errors

### Linting

```bash
cd frontend
npm run lint
```

Expected: No errors or warnings

### Type Checking

```bash
cd frontend
npx tsc --noEmit
```

Expected: No type errors

### Manual Testing Checklist

- [ ] Open `/login` in browser
- [ ] Page displays centered card
- [ ] All form fields visible with labels
- [ ] Button has orange background
- [ ] Hover effects on button
- [ ] Focus state on inputs (orange ring)
- [ ] Navigate to `/signup` via link
- [ ] Signup page displays correctly
- [ ] Navigate back to `/login`
- [ ] Resize browser to mobile width
- [ ] Layout adjusts to full width
- [ ] Check console for errors

---

## 12. Follow-Up Tasks

This task enables the following future tasks:

| Task | Name | Dependency |
|------|------|------------|
| Task 5 | Shared UI Components | May create reusable Input/Button |
| Task 6 | State Management Setup | AuthContext for login state |
| Task 7 | API Integration Layer | API client for auth endpoints |
| Task 8 | Auth Flow Integration | Connect forms to API |

---

## 13. Notes

### Design Decisions

1. **No Icons in Inputs**: Keeping inputs clean, placeholder text provides context
2. **No Password Toggle**: Password visibility toggle to be added in Task 8
3. **Simple Navigation Links**: No dropdowns or complex navigation on auth pages
4. **Minimal Footer**: Only copyright, no links (reduces cognitive load)

### Future Enhancements (Not in Scope)

- Password visibility toggle
- Social login buttons (Google, GitHub)
- "Remember me" checkbox
- Password strength indicator
- Real-time validation
- Form auto-focus on page load
- Animated transitions between pages

### Accessibility Considerations

- Labels explicitly associated with inputs via `htmlFor`
- Button has clear text content
- Links have descriptive text
- Focus order follows visual order
- Error placeholders ready for `aria-describedby`

---

## 14. Change Log

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-01-02 | Initial task definition |

---

**Task Status:** Ready for Implementation
**Next Action:** Run `/sp.implement` with this task reference
