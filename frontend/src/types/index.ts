// User type definitions for the Todo App
// These will be expanded as features are implemented

export interface User {
  id: number;
  email: string;
  name: string;
  createdAt?: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  priority: 'high' | 'medium' | 'low';
  category?: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  field?: string;
  status: number;
}

// Auth types
export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
}

// Task types
export interface CreateTaskRequest {
  title: string;
  description?: string;
  priority?: 'high' | 'medium' | 'low';
  category?: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: 'pending' | 'completed';
  priority?: 'high' | 'medium' | 'low';
  category?: string;
}

// Filter and sort options for task queries
export interface TaskFilters {
  status: 'all' | 'pending' | 'completed';
  priority: 'all' | 'high' | 'medium' | 'low';
  category: string;
  search: string;
  sortBy: 'priority' | 'title' | 'createdAt';
  sortOrder: 'asc' | 'desc';
}

// Default filter values
export const defaultTaskFilters: TaskFilters = {
  status: 'all',
  priority: 'all',
  category: '',
  search: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
};
