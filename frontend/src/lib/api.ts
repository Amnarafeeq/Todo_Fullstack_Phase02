import { authUtils } from './auth';
import {
  Task,
  User,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskFilters
} from '@/types';
import { transformTaskFromBackend, transformTasksFromBackend, transformTaskForBackend } from '@/utils/data-transformers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';


class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = authUtils.getToken();
    const headers = new Headers(options.headers);

    headers.set('Content-Type', 'application/json');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (response.status === 401) {
      authUtils.removeToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    if (!response.ok) {
      let error;
      try {
        error = await response.json();
      } catch {
        // If response is not JSON (e.g., network error), create a generic error
        error = { message: `HTTP Error: ${response.status} ${response.statusText}` };
      }
      throw { ...error, status: response.status };
    }

    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  // Auth Endpoints
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Task Endpoints
  async getTasks(userId: number, filters?: TaskFilters): Promise<Task[]> {
    const query = new URLSearchParams();
    if (filters) {
      if (filters.status !== 'all') query.append('status', filters.status);
      if (filters.priority !== 'all') query.append('priority', filters.priority);
      if (filters.category) query.append('category', filters.category);
      if (filters.search) query.append('search', filters.search);
      query.append('sort_by', filters.sortBy);
      query.append('sort_order', filters.sortOrder);
    }

    const queryString = query.toString();
    const backendTasks = await this.request<any[]>(`/api/${userId}/tasks${queryString ? `?${queryString}` : ''}`);
    return transformTasksFromBackend(backendTasks);
  }

  async createTask(userId: number, task: CreateTaskRequest): Promise<Task> {
    const backendTask = await this.request<any>(`/api/${userId}/tasks`, {
      method: 'POST',
      body: JSON.stringify(task),
    });
    return transformTaskFromBackend(backendTask);
  }

  async updateTask(userId: number, taskId: number, task: UpdateTaskRequest): Promise<Task> {
    const transformedTask = transformTaskForBackend(task);
    const backendTask = await this.request<any>(`/api/${userId}/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(transformedTask),
    });
    return transformTaskFromBackend(backendTask);
  }

  async deleteTask(userId: number, taskId: number): Promise<void> {
    return this.request<void>(`/api/${userId}/tasks/${taskId}`, {
      method: 'DELETE',
    });
  }

  async toggleTask(userId: number, taskId: number): Promise<any> {
    // Toggle the task status and return the response from the toggle endpoint
    const response = await this.request<any>(`/api/${userId}/tasks/${taskId}/complete`, {
      method: 'PATCH',
    });

    // The backend returns the updated status info, we'll use this to update our task
    return response;
  }
}

export const api = new ApiClient();
