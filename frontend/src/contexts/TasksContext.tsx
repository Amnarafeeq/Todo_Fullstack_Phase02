'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Task } from '@/types';
import { api } from '@/lib/api';
import { useAuth } from '@/hooks';
import { useToast } from './ToastContext';

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  stats: {
    total: number;
    completed: number;
    pending: number;
    high: number;
  };
}

type TasksAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: number }
  | { type: 'TOGGLE_TASK'; payload: Task }
  | { type: 'REFRESH_TASKS' };

const initialState: TasksState = {
  tasks: [],
  loading: true,
  error: null,
  stats: {
    total: 0,
    completed: 0,
    pending: 0,
    high: 0,
  },
};

const tasksReducer = (state: TasksState, action: TasksAction): TasksState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_TASKS':
      const newStats = calculateStats(action.payload);
      return { ...state, tasks: action.payload, loading: false, error: null, stats: newStats };
    case 'ADD_TASK':
      const newTasksWithAdd = [action.payload, ...state.tasks];
      const statsAfterAdd = calculateStats(newTasksWithAdd);
      return { ...state, tasks: newTasksWithAdd, stats: statsAfterAdd };
    case 'UPDATE_TASK':
      const updatedTasks = state.tasks.map(task =>
        task.id === action.payload.id ? action.payload : task
      );
      const statsAfterUpdate = calculateStats(updatedTasks);
      return { ...state, tasks: updatedTasks, stats: statsAfterUpdate };
    case 'DELETE_TASK':
      const filteredTasks = state.tasks.filter(task => task.id !== action.payload);
      const statsAfterDelete = calculateStats(filteredTasks);
      return { ...state, tasks: filteredTasks, stats: statsAfterDelete };
    case 'TOGGLE_TASK':
      const toggledTasks = state.tasks.map(task =>
        task.id === action.payload.id ? action.payload : task
      );
      const statsAfterToggle = calculateStats(toggledTasks);
      return { ...state, tasks: toggledTasks, stats: statsAfterToggle };
    case 'REFRESH_TASKS':
      return { ...state, loading: true };
    default:
      return state;
  }
};

const calculateStats = (tasks: Task[]): TasksState['stats'] => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.status === 'completed').length;
  const pending = tasks.filter(task => task.status === 'pending').length;
  const high = tasks.filter(task => task.priority === 'high').length;

  return {
    total,
    completed,
    pending,
    high,
  };
};

interface TasksContextType extends TasksState {
  refreshTasks: () => Promise<void>;
  createTask: (taskData: any) => Promise<void>;
  updateTask: (taskId: number, taskData: any) => Promise<void>;
  deleteTask: (taskId: number) => Promise<void>;
  toggleTask: (taskId: number) => Promise<void>;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, initialState);
  const { user } = useAuth();
  const { showToast } = useToast();

  // Load tasks when user changes
  useEffect(() => {
    if (user) {
      loadTasks();
    } else {
      // Reset state when user logs out
      dispatch({ type: 'SET_TASKS', payload: [] });
    }
  }, [user]);

  const loadTasks = async () => {
    if (!user) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const tasks = await api.getTasks(user.id);
      dispatch({ type: 'SET_TASKS', payload: tasks });
    } catch (error: any) {
      const message = error.message || 'Failed to load tasks';
      dispatch({ type: 'SET_ERROR', payload: message });
      showToast(message, 'error');
    }
  };

  const refreshTasks = async () => {
    if (!user) return;

    try {
      dispatch({ type: 'REFRESH_TASKS' });
      const tasks = await api.getTasks(user.id);
      dispatch({ type: 'SET_TASKS', payload: tasks });
    } catch (error: any) {
      const message = error.message || 'Failed to refresh tasks';
      dispatch({ type: 'SET_ERROR', payload: message });
      showToast(message, 'error');
    }
  };

  const createTask = async (taskData: any) => {
    if (!user) return;

    try {
      const newTask = await api.createTask(user.id, taskData);
      dispatch({ type: 'ADD_TASK', payload: newTask });
      showToast('Task created successfully', 'success');
    } catch (error: any) {
      const message = error.message || 'Failed to create task';
      dispatch({ type: 'SET_ERROR', payload: message });
      showToast(message, 'error');
      throw error;
    }
  };

  const updateTask = async (taskId: number, taskData: any) => {
    if (!user) return;

    try {
      const updatedTask = await api.updateTask(user.id, taskId, taskData);
      dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
      showToast('Task updated successfully', 'success');
    } catch (error: any) {
      const message = error.message || 'Failed to update task';
      dispatch({ type: 'SET_ERROR', payload: message });
      showToast(message, 'error');
      throw error;
    }
  };

  const deleteTask = async (taskId: number) => {
    if (!user) return;

    try {
      await api.deleteTask(user.id, taskId);
      dispatch({ type: 'DELETE_TASK', payload: taskId });
      showToast('Task deleted successfully', 'success');
    } catch (error: any) {
      const message = error.message || 'Failed to delete task';
      dispatch({ type: 'SET_ERROR', payload: message });
      showToast(message, 'error');
    }
  };

  const toggleTask = async (taskId: number) => {
    if (!user) return;

    try {
      const updatedTask = await api.toggleTask(user.id, taskId);
      dispatch({ type: 'TOGGLE_TASK', payload: updatedTask });
    } catch (error: any) {
      const message = error.message || 'Failed to update task status';
      dispatch({ type: 'SET_ERROR', payload: message });
      showToast(message, 'error');
    }
  };

  return (
    <TasksContext.Provider
      value={{
        ...state,
        refreshTasks,
        createTask,
        updateTask,
        deleteTask,
        toggleTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = (): TasksContextType => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
};