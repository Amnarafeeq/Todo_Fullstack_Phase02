// Component exports for easy imports
export { Header } from './Header';

// Dashboard components
export {
  Sidebar,
} from './dashboard/Sidebar';

// Task components
export { default as TaskList } from './tasks/TaskList';
export { default as TaskItem } from './tasks/TaskItem';
export { default as TaskForm } from './tasks/TaskForm';
export { default as TaskFilters } from './tasks/TaskFilters';

export {
  DashboardHeader,
  DashboardHeaderWithBreadcrumbs,
  CreateTaskButton,
  SearchInput,
  UserMenu,
} from './dashboard/DashboardHeader';
