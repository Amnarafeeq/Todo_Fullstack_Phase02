# UI Components Specification

## Overview
This specification defines all UI components for the Todo App Phase II frontend using Next.js, TypeScript, and Tailwind CSS.

## Component Architecture

```
App (layout.tsx)
├── AuthProvider
├── Header
│   ├── Logo
│   ├── UserMenu
│   └── LogoutButton
├── Routes
│   ├── LoginPage
│   ├── RegisterPage
│   └── Dashboard
│       ├── FilterBar
│       ├── TaskList
│       │   └── TaskItem × N
│       ├── TaskForm (Modal)
│       └── TaskDetails
└── Toast/Notification
```

---

## Core Components

### 1. AuthProvider

**Purpose:** Provides authentication context to all components

**Location:** `/src/contexts/AuthContext.tsx`

**Props:** None (wrapper component)

**State:**
- `user: User | null` - Current authenticated user
- `loading: boolean` - Authentication loading state

**Methods:**
- `login(email: string, password: string, remember?: boolean): Promise<void>`
- `logout(): void`

**Usage:**
```typescript
<AuthProvider>
  <App />
</AuthProvider>

// Inside component
const { user, login, logout, loading } = useAuth();
```

**Implementation:**
```typescript
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Auto-login check
    const token = localStorage.getItem('auth_token');
    if (token) {
      // Fetch user or decode token
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Login logic
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
```

---

### 2. Button

**Purpose:** Reusable button component with variants

**Location:** `/src/components/Button.tsx`

**Props:**
```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}
```

**Variants:**
- `primary`: Blue background, white text
- `secondary`: Gray background, dark text
- `danger`: Red background, white text
- `ghost`: Transparent with hover effect

**Sizes:**
- `sm`: Small padding, small text
- `md`: Medium padding, medium text (default)
- `lg`: Large padding, large text

**Usage:**
```typescript
<Button variant="primary" size="md" onClick={handleClick}>
  Create Task
</Button>

<Button variant="danger" size="sm" loading={isDeleting}>
  Delete
</Button>
```

---

### 3. Input

**Purpose:** Reusable text input component with validation

**Location:** `/src/components/Input.tsx`

**Props:**
```typescript
interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'textarea';
  error?: string;
  required?: boolean;
  disabled?: boolean;
}
```

**Features:**
- Label above input
- Error message display
- Validation styling (red border on error)
- Support for textarea

**Usage:**
```typescript
<Input
  label="Title"
  placeholder="Enter task title"
  value={title}
  onChange={setTitle}
  error={errors.title}
  required
/>

<Input
  type="textarea"
  label="Description"
  placeholder="Enter description"
  value={description}
  onChange={setDescription}
/>
```

---

### 4. Select

**Purpose:** Dropdown select component

**Location:** `/src/components/Select.tsx`

**Props:**
```typescript
interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
}
```

**Usage:**
```typescript
<Select
  label="Priority"
  value={priority}
  onChange={setPriority}
  options={[
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ]}
/>
```

---

### 5. Modal

**Purpose:** Modal dialog for forms and details

**Location:** `/src/components/Modal.tsx`

**Props:**
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
```

**Features:**
- Backdrop click to close
- ESC key to close
- Animated open/close
- Responsive sizing

**Usage:**
```typescript
<Modal isOpen={isOpen} onClose={onClose} title="Create Task" size="md">
  <TaskForm onSubmit={handleSubmit} />
</Modal>
```

---

### 6. FilterBar

**Purpose:** Filter and sort controls for task list

**Location:** `/src/components/FilterBar.tsx`

**Props:**
```typescript
interface FilterOptions {
  status: 'all' | 'pending' | 'completed';
  priority: 'all' | 'high' | 'medium' | 'low';
  category: string;
  search: string;
  sortBy: 'priority' | 'title' | 'created_at';
  sortOrder: 'asc' | 'desc';
}

interface FilterBarProps {
  filters: FilterOptions;
  categories: string[];
  onFiltersChange: (filters: FilterOptions) => void;
}
```

**Components:**
- Search input
- Status filter dropdown
- Priority filter dropdown
- Category filter dropdown
- Sort by dropdown
- Sort order toggle

**Usage:**
```typescript
<FilterBar
  filters={filters}
  categories={categories}
  onFiltersChange={setFilters}
/>
```

---

### 7. TaskList

**Purpose:** Display list of tasks

**Location:** `/src/components/TaskList.tsx`

**Props:**
```typescript
interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: (task: Task) => void;
  onTaskDelete: (taskId: number) => void;
  onTaskToggle: (taskId: number) => void;
  loading?: boolean;
  emptyMessage?: string;
}
```

**Features:**
- Empty state display
- Loading state
- List of TaskItem components
- Responsive grid layout

**Usage:**
```typescript
<TaskList
  tasks={tasks}
  onTaskUpdate={handleUpdate}
  onTaskDelete={handleDelete}
  onTaskToggle={handleToggle}
  loading={loading}
  emptyMessage="No tasks found"
/>
```

---

### 8. TaskItem

**Purpose:** Individual task display

**Location:** `/src/components/TaskItem.tsx`

**Props:**
```typescript
interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
  onToggle: (taskId: number) => void;
}
```

**Display:**
- Checkbox for completion status
- Title (strikethrough when completed)
- Description preview (truncated)
- Priority badge (color-coded)
- Category badge
- Created date
- Edit button
- Delete button

**Priority Colors:**
- High: Red badge
- Medium: Yellow badge
- Low: Green badge

**Usage:**
```typescript
<TaskItem
  task={task}
  onEdit={openEditModal}
  onDelete={deleteTask}
  onToggle={toggleCompletion}
/>
```

---

### 9. TaskForm

**Purpose:** Create/edit task form

**Location:** `/src/components/TaskForm.tsx`

**Props:**
```typescript
interface TaskFormProps {
  task?: Task; // If provided, it's edit mode
  onSubmit: (data: CreateTaskInput | UpdateTaskInput) => void;
  onCancel: () => void;
  loading?: boolean;
}
```

**Fields:**
- Title (required)
- Description (textarea, optional)
- Priority (radio buttons or select)
- Category (optional)

**Usage:**
```typescript
<TaskForm
  task={editingTask}
  onSubmit={handleSubmit}
  onCancel={onClose}
  loading={isSubmitting}
/>
```

---

### 10. Badge

**Purpose:** Small status/label badge

**Location:** `/src/components/Badge.tsx`

**Props:**
```typescript
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default';
}
```

**Variants:**
- `success`: Green (completed, low priority)
- `warning`: Yellow (medium priority)
- `danger`: Red (high priority)
- `info`: Blue (info)
- `default`: Gray (default)

**Usage:**
```typescript
<Badge variant="danger">High Priority</Badge>
<Badge variant="success">Completed</Badge>
```

---

### 11. Header

**Purpose:** Application header with navigation

**Location:** `/src/components/Header.tsx`

**Props:**
```typescript
interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}
```

**Display:**
- Logo/app name
- User menu (when logged in)
  - User name/email
  - Logout button
- Login/Register buttons (when logged out)

**Responsive Behavior:**
- Desktop: Full header with all elements
- Mobile: Compact header with hamburger menu

---

### 12. Toast/Notification

**Purpose:** Display success/error messages

**Location:** `/src/components/Toast.tsx`

**Props:**
```typescript
interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number; // Auto-dismiss after ms (0 = no auto-dismiss)
  onClose?: () => void;
}
```

**Usage:**
```typescript
// Typically used via hook
const { showToast } = useToast();

showToast('Task created successfully!', 'success');
showToast('Failed to create task', 'error', 5000);
```

---

## Page Components

### 1. LoginPage

**Location:** `/src/app/login/page.tsx`

**Purpose:** User authentication

**Components:**
- Logo/title
- Email input
- Password input
- Remember me checkbox
- Login button
- "Forgot password" link (future)
- "Create account" link to RegisterPage

**Validation:**
- Email format validation
- Password required
- Show error message on failed login

---

### 2. RegisterPage

**Location:** `/src/app/register/page.tsx`

**Purpose:** New user registration

**Components:**
- Logo/title
- Email input
- Name input
- Password input
- Confirm password input
- Create account button
- "Already have account" link to LoginPage

**Validation:**
- Email format validation
- Password minimum length (8 characters)
- Password confirmation match
- Unique email check (via API)

---

### 3. Dashboard

**Location:** `/src/app/page.tsx`

**Purpose:** Main task management interface

**Components:**
- Header
- FilterBar
- TaskList
- Create Task button (opens modal)
- TaskForm modal (create/edit)
- TaskDetails modal

**Layout:**
- Header at top (fixed)
- FilterBar below header
- TaskList in main content
- Floating action button for mobile (FAB)

---

### 4. TaskDetails

**Location:** `/src/components/TaskDetails.tsx`

**Purpose:** View complete task details

**Props:**
```typescript
interface TaskDetailsProps {
  task: Task;
  onClose: () => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
}
```

**Display:**
- Title (large)
- Description (full)
- Status (completed/pending)
- Priority badge
- Category badge
- Created/updated timestamps
- Edit button
- Delete button

---

## Responsive Design

### Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl, 2xl)

### Mobile Adaptations

#### TaskList
- Single column layout
- Compact task items
- Floating action button (FAB) for creating tasks

#### Header
- Compact logo
- Hamburger menu for user options

#### Filters
- Collapsible filter section
- Vertical stack of filters

#### Forms
- Full-width inputs
- Single column layout

### Desktop Layout

#### TaskList
- Grid layout (2-3 columns optional)
- Full task item display

#### Filters
- Horizontal layout
- All filters visible

---

## Styling Guidelines

### Tailwind Configuration

```typescript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Primary blue
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        priority: {
          high: '#ef4444',    // Red
          medium: '#f59e0b',  // Amber
          low: '#22c55e',    // Green
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
};
```

### Common Classes

#### Buttons
- Primary: `bg-blue-600 text-white hover:bg-blue-700 rounded-md px-4 py-2 font-medium`
- Secondary: `bg-gray-200 text-gray-900 hover:bg-gray-300 rounded-md px-4 py-2 font-medium`
- Danger: `bg-red-600 text-white hover:bg-red-700 rounded-md px-4 py-2 font-medium`

#### Inputs
- Normal: `border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`
- Error: `border-red-500 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500`

#### Cards
- `bg-white rounded-lg shadow-sm border border-gray-200`

#### Badges
- Success: `bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium`
- Warning: `bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium`
- Danger: `bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium`

---

## Accessibility

### ARIA Labels

All interactive elements should have proper ARIA labels:

```typescript
<button aria-label="Create new task">+</button>
<input aria-label="Task title" placeholder="Enter title" />
```

### Keyboard Navigation

- All interactive elements are keyboard accessible
- Tab order follows logical flow
- Enter/Space to activate buttons
- Escape to close modals

### Focus States

All interactive elements have visible focus states:

```css
focus:outline-none focus:ring-2 focus:ring-blue-500
```

### Screen Reader Support

- Use semantic HTML
- Proper heading hierarchy
- Live regions for dynamic content (toasts)

---

## State Management

### Local State
- Use `useState` for component-level state
- Form inputs
- Modal open/close states

### Global State
- AuthContext for authentication
- Task state managed via API calls (no global state for tasks in Phase II)

### Future Enhancements
- Consider Redux/Zustand for complex state (Phase III+)
- React Query for server state caching (Phase III+)

---

## Performance

### Code Splitting

```typescript
// Lazy load heavy components
const TaskDetails = dynamic(() => import('@/components/TaskDetails'));
```

### Memoization

```typescript
// Use React.memo for expensive components
export default React.memo(TaskItem);

// Use useMemo for expensive calculations
const filteredTasks = useMemo(() => {
  return tasks.filter(filterFn);
}, [tasks, filterFn]);
```

### Lazy Loading Images

```typescript
import Image from 'next/image';

<Image
  src="/logo.png"
  alt="Logo"
  width={200}
  height={50}
  loading="lazy"
/>
```

---

## Testing

### Component Tests

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from './TaskItem';

describe('TaskItem', () => {
  it('displays task title', () => {
    render(<TaskItem task={mockTask} onEdit={jest.fn()} onDelete={jest.fn()} onToggle={jest.fn()} />);
    expect(screen.getByText('Task Title')).toBeInTheDocument();
  });

  it('calls onToggle when checkbox is clicked', () => {
    const onToggle = jest.fn();
    render(<TaskItem task={mockTask} onEdit={jest.fn()} onDelete={jest.fn()} onToggle={onToggle} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledWith(mockTask.id);
  });
});
```

---

## Future Enhancements (Phase III+)

### Additional Components
- Drag-and-drop task reordering
- Subtasks/checkboxes within tasks
- Rich text editor for descriptions
- File upload for attachments
- Calendar view for tasks
- Kanban board view
- Task dependency visualization

### Advanced Features
- Dark mode toggle
- Theme customization
- Keyboard shortcuts
- Batch operations (select multiple tasks)
- Export tasks (CSV, PDF)
- Email reminders
- Collaborative features (shared tasks)
