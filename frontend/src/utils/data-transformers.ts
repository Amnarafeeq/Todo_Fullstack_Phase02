import { Task } from '@/types';

/**
 * Transforms backend task data to frontend Task interface
 * Maps the 'completed' boolean field to the 'status' string field
 */
export const transformTaskFromBackend = (backendTask: any): Task => {
  // Log the incoming backend task for debugging (in development)
  if (process.env.NODE_ENV === 'development') {
    console.log('Transforming backend task:', backendTask);
  }

  // Ensure we have the completed field before determining status
  const isCompleted = Boolean(backendTask.completed);

  // Construct the transformed task with safe fallbacks
  const transformedTask: Task = {
    id: backendTask.id ?? 0,
    title: backendTask.title ?? '',
    description: backendTask.description ?? undefined,
    status: isCompleted ? 'completed' : 'pending',  // This is the key transformation
    priority: backendTask.priority ?? 'medium',
    category: backendTask.category ?? undefined,
    userId: backendTask.user_id ?? backendTask.userId ?? 0,
    createdAt: backendTask.created_at ?? backendTask.createdAt ?? new Date().toISOString(),
    updatedAt: backendTask.updated_at ?? backendTask.updatedAt ?? new Date().toISOString(),
    completedAt: backendTask.completed_at ?? backendTask.completedAt ?? (isCompleted ? (backendTask.updated_at ?? backendTask.updatedAt) : undefined),
  };

  // Log the transformed task for debugging (in development)
  if (process.env.NODE_ENV === 'development') {
    console.log('Transformed task:', transformedTask);
  }

  return transformedTask;
};

/**
 * Transforms an array of backend tasks to frontend Task interfaces
 */
export const transformTasksFromBackend = (backendTasks: any[]): Task[] => {
  return backendTasks.map(transformTaskFromBackend);
};

/**
 * Transforms frontend TaskUpdateRequest to backend format
 * Maps the 'status' string field to the 'completed' boolean field
 */
export const transformTaskForBackend = (taskData: any) => {
  const { status, ...rest } = taskData;
  return {
    ...rest,
    completed: status === 'completed' ? true : status === 'pending' ? false : undefined
  };
};