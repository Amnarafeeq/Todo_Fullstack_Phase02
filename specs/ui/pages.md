# UI Pages Specification

## Overview
This specification defines all pages in Todo App Phase II frontend using Next.js 16+ App Router.

## Page Structure

```
/
├── (auth)/                    # Auth route group
│   ├── login/
│   │   └── page.tsx
│   └── register/
│       └── page.tsx
├── (dashboard)/               # Dashboard route group
│   ├── page.tsx               # Main dashboard (default route /)
│   └── tasks/
│       └── [taskId]/
│           └── page.tsx       # Task details page
├── layout.tsx                 # Root layout
└── loading.tsx                # Global loading state
```

---

## Root Layout

**Location:** `/src/app/layout.tsx`

**Purpose:** Application-wide layout and providers

**Structure:**

```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Todo App - Phase II',
  description: 'Full-stack Todo Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
```

**Features:**
- Global CSS import
- Font configuration (Inter)
- AuthProvider wrapper
- Header component
- Main content area

---

## Auth Route Group

**Location:** `/src/app/(auth)/`

**Purpose:** Group authentication-related pages

**Layout:** Minimal layout without header (optional)

**Layout File:** `/src/app/(auth)/layout.tsx`

```typescript
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full">
        {children}
      </div>
    </div>
  );
}
```

---

## Login Page

**Location:** `/src/app/(auth)/login/page.tsx`

**Route:** `/login`

**Purpose:** Authenticate existing users

**Components:**
- Login form
- Link to registration page

**Key Features:**
- Email and password inputs
- Client-side validation
- Loading state during API call
- Error message display
- Redirect to dashboard on success
- Link to registration page

---

## Register Page

**Location:** `/src/app/(auth)/register/page.tsx`

**Route:** `/register`

**Purpose:** Register new users

**Components:**
- Registration form
- Link to login page

**Key Features:**
- Email, name, password, confirm password inputs
- Client-side validation (email format, password length, password match)
- Loading state during API call
- Error message display
- Redirect to login page on success

---

## Dashboard

**Location:** `/src/app/page.tsx`

**Route:** `/` (default route)

**Purpose:** Main task management interface

**Components:**
- Header (from root layout)
- FilterBar
- TaskList
- Create Task modal

**Key Features:**
- Redirects to login if not authenticated
- Fetches user's tasks on load
- Filters and sorts tasks based on user selection
- Creates, updates, deletes, and toggles tasks
- Shows loading states
- Displays empty state when no tasks

---

## Task Details Page

**Location:** `/src/app/(dashboard)/tasks/[taskId]/page.tsx`

**Route:** `/tasks/:taskId`

**Purpose:** View complete task details

**Components:**
- Task details display
- Back button
- Edit/Delete buttons

**Key Features:**
- Fetches task details by ID
- Shows complete task information
- Provides navigation back to dashboard
- Allows editing and deletion

---

## Loading State

**Location:** `/src/app/loading.tsx`

**Purpose:** Global loading state

```typescript
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}
```

---

## Error Handling

### 404 Not Found

**Location:** `/src/app/not-found.tsx`

Shows 404 error page with link to home.

### Error Page

**Location:** `/src/app/error.tsx`

Shows error details with retry button.

---

## Route Protection

All dashboard routes require authentication:
- Check for JWT token
- Redirect to `/login` if not authenticated
- Show loading state during auth check

---

## Navigation

- Use `next/link` for declarative navigation
- Use `useRouter` for programmatic navigation

---

## SEO and Metadata

Each page can define specific metadata for search engine optimization.

---

## Responsive Design

All pages are responsive:
- Mobile-first approach
- Tailwind responsive classes
- Mobile-specific UI adaptations (e.g., FAB for creating tasks)

---

## Page Transitions (Future)

Consider page transitions for smoother UX in future phases.
