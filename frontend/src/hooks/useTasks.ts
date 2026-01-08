'use client';

import { useTasks as useTasksContext } from '@/contexts/TasksContext';

/**
 * Custom hook for task management.
 * Handles fetching, creating, updating, and deleting tasks.
 * This hook uses the centralized TasksContext for state management.
 */
export function useTasks() {
  return useTasksContext();
}
