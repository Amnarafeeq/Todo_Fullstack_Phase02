# Frontend Development Guide

## Tech Stack
- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context/useState
- **HTTP Client**: `/lib/api.ts` wrapper

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Home page (task list)
│   │   ├── login/
│   │   │   └── page.tsx        # Login page
│   │   └── register/
│   │       └── page.tsx        # Registration page
│   ├── components/
│   │   ├── TaskList.tsx        # Task list component
│   │   ├── TaskForm.tsx        # Task create/edit form
│   │   ├── TaskItem.tsx        # Individual task display
│   │   └── FilterBar.tsx       # Filter and sort controls
│   ├── lib/
│   │   ├── api.ts              # API client wrapper
│   │   ├── auth.ts             # Authentication utilities
│   │   └── types.ts            # TypeScript types
│   └── hooks/
│       └── useAuth.ts          # Auth state management
├── public/
│   └── ...                     # Static assets
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## Core Patterns

### API Client (`/lib/api.ts`)

All API calls go through this wrapper with automatic JWT token attachment.

### Authentication Flow

Use `/lib/auth.ts` for token management and `/hooks/useAuth.ts` for auth state.

### Component Pattern

Use functional components with hooks. Always use TypeScript types.

### Responsive Design with Tailwind

Mobile-first approach using Tailwind responsive classes.

## TypeScript Types

See `/lib/types.ts` for all TypeScript interfaces:
- User
- Task
- CreateTaskInput
- UpdateTaskInput
- FilterOptions
- SortOptions

## Error Handling

Use try-catch with ApiError class for API errors.

## API Endpoints

All endpoints use the `/{user_id}` prefix.

## Styling Guidelines

Use Tailwind utility classes consistently. See specific guidelines in specs.

## Best Practices

1. Type Safety: Always use TypeScript types
2. Error Boundaries: Wrap components in error boundaries
3. Loading States: Show loading indicators
4. Optimistic Updates: Update UI immediately (optional)
5. Debounce Search: Debounce search input
6. Accessibility: Use semantic HTML and ARIA labels

## Common Components

### Button Component

Variants: primary, secondary, danger, ghost
Sizes: sm, md, lg

### Input Component

Supports text, email, password, and textarea types.

## Running the Application

```bash
npm install
npm run dev  # Development
npm run build  # Production
npm start  # Production server
```

## Environment Variables

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Important Notes

1. Always read specs before implementing
2. Follow TypeScript conventions
3. Use API client wrapper
4. Handle errors gracefully
5. Keep components small
6. Use semantic HTML
7. Test responsive layouts
