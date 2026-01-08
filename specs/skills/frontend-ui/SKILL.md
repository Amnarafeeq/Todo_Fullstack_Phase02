---
name: frontend-ui
description: |
  Creates production-grade frontend UI components and layouts using Next.js (App Router), React 19, and Tailwind CSS.
  This skill should be used when users ask to build new UI features, design responsive layouts, or implement reusable components.
allowed-tools: Read, Grep, Glob, Edit, Write
---

# Frontend UI Skill

Create modern, responsive, and high-performance UI components and layouts. This skill encodes expertise in Next.js 15+, React 19, and Tailwind CSS v4, focusing on a "Server-First" approach and efficient responsive design.

## Before Implementation

Gather context to ensure successful implementation:

| Source | Gather |
|--------|--------|
| **Codebase** | Existing UI patterns, Tailwind configurations, `theme` settings, and shared component locations (e.g., `src/components`). |
| **Conversation** | User's specific requirements, layout preferences, and targeted devices (desktop/tablet/mobile). |
| **Skill References** | Modern patterns for RSC, Server Actions, and Tailwind responsive utilities from `references/`. |
| **User Guidelines** | Design systems (e.g., Shadcn UI), accessibility requirements, and naming conventions. |

Ensure all required context is gathered before implementing. Only ask the user for THEIR specific requirements (domain expertise is embedded here).

## Workflow (Builder Type)

### 1. Clarification & Discovery
- Identify if the component should be a **Server Component** (default) or a **Client Component** (`'use client'`).
- Determine if the layout is **Static**, **Dynamic**, or a **Layout Wrapper**.
- Verify breakpoints and responsive behavior requirements.

### 2. Output Specification
- Generate accessible HTML5 structure.
- Apply utility-first styling using Tailwind CSS.
- Implement responsive logic (Mobile-First).
- Include Framer Motion or native CSS transitions for interactivity if requested.

### 3. Implementation Patterns

#### A. Layout Configuration
Use the "Holy Grail" or "Sidebar-Content" patterns as a baseline.
- **Reference**: `references/layouts.md`

#### B. Component Scaffolding
- Use functional components with TypeScript interfaces.
- Leverage React 19 features (e.g., `use` hook, specialized metadata).
- **Template**: `assets/components/base-component.tsx`

#### C. Responsive Design
- `w-full md:w-1/2 lg:w-1/3`
- `hidden md:block`
- `flex-col md:flex-row`

### 4. Standards & Checklist

- [ ] **Accessibility**: ARIA labels, semantic tags, keyboard navigation.
- [ ] **Performance**: Image optimization (`next/image`), minimized client-side JavaScript.
- [ ] **Type Safety**: Full TypeScript coverage for props and state.
- [ ] **Responsive**: Verified across mobile, tablet, and desktop breakpoints.
- [ ] **Interactivity**: Smooth transitions and clear loading/error states.

## What This Skill Does

- Scaffolds Next.js layouts and page structures.
- Generates reusable React components with Tailwind styling.
- Implements mobile-first responsive designs.
- Optimizes for Core Web Vitals (LCP, CLS, FID).
- Integrates with standard UI libraries (Shadcn UI, Radix).

## What This Skill Does NOT Do

- Handle complex backend business logic (use `backend-task-logic` agent).
- Manage database schemas or migrations.
- Perform end-to-end testing (use `frontend-testing` agent).
- Create custom SVG icons or complex graphic assets.

---

## Reference Files

| File | Content |
|------|---------|
| `references/nextjs-patterns.md` | RSC vs Client Components, Data Fetching, Server Actions. |
| `references/tailwind-best-practices.md` | Mobile-first utilities, logical properties, custom themes. |
| `references/layouts.md` | Standard responsive layout patterns. |
| `assets/components/` | Reusable component boilerplates. |
| `assets/layouts/` | Responsive layout boilerplates. |
