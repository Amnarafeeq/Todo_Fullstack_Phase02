'use client';

import React, { useState } from 'react';
import { Task } from '@/types';

// Omit auto-generated fields for the form input
export interface TaskInput {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
}

interface TaskFormProps {
  task?: Task; // If provided, we are in edit mode
  onSubmit: (data: TaskInput) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({
  task,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState<TaskInput>({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'medium',
    category: task?.category || '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof TaskInput, string>>>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof TaskInput, string>> = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 255) {
      newErrors.title = 'Title must be less than 255 characters';
    }

    if (formData.description.length > 2000) {
      newErrors.description = 'Description must be less than 2000 characters';
    }

    if (formData.category.length > 50) {
      newErrors.category = 'Category must be less than 50 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null); // Clear previous API errors

    if (validate()) {
      try {
        await onSubmit(formData);
      } catch (error: any) {
        // Handle API errors
        setApiError(error.message || 'An error occurred while saving the task');
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof TaskInput]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* API Error Message Display */}
      {apiError && (
        <div
          className="mb-4 p-4 rounded-xl bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 text-red-300 text-sm shadow-lg"
          role="alert"
          aria-live="assertive"
        >
          {apiError}
        </div>
      )}
      <div className="space-y-6">
        {/* Title Field */}
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-semibold text-cyan-400">
            Task Title *
          </label>
          <div className="relative">
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="What needs to be done?"
              className={`w-full px-4 py-4 rounded-xl border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-300 bg-gray-700/50 hover:border-cyan-500/50 shadow-sm focus:shadow-md text-white placeholder-gray-400 ${
                errors.title
                  ? 'border-red-500/30 focus:ring-red-500/20 focus:border-red-500 bg-red-500/10'
                  : ''
              }`}
              disabled={loading}
              autoFocus
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? "title-error" : undefined}
            />
            {errors.title && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            )}
          </div>
          {errors.title && (
            <p id="title-error" className="text-sm text-red-400 mt-1 flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.title}
            </p>
          )}
        </div>

        {/* Description Field */}
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-semibold text-cyan-400">
            Description
          </label>
          <div className="relative">
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add some details..."
              rows={4}
              className={`w-full px-4 py-4 rounded-xl border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-300 resize-none bg-gray-700/50 hover:border-cyan-500/50 shadow-sm focus:shadow-md text-white placeholder-gray-400 ${
                errors.description
                  ? 'border-red-500/30 focus:ring-red-500/20 focus:border-red-500 bg-red-500/10'
                  : ''
              }`}
              disabled={loading}
              aria-invalid={!!errors.description}
              aria-describedby={errors.description ? "description-error" : undefined}
            />
            {errors.description && (
              <div className="absolute bottom-3 right-3">
                <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            )}
          </div>
          {errors.description && (
            <p id="description-error" className="text-sm text-red-400 mt-1 flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Priority Field */}
          <div className="space-y-2">
            <label htmlFor="priority" className="block text-sm font-semibold text-cyan-400">
              Priority
            </label>
            <div className="relative">
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-4 rounded-xl border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-300 bg-gray-700/50 hover:border-cyan-500/50 appearance-none shadow-sm focus:shadow-md text-white"
                disabled={loading}
                aria-describedby="priority-help"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <p id="priority-help" className="text-sm text-gray-400">
              Select the task priority level
            </p>
          </div>

          {/* Category Field */}
          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm font-semibold text-cyan-400">
              Category
            </label>
            <div className="relative">
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Work, Personal"
                className={`w-full px-4 py-4 rounded-xl border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-300 bg-gray-700/50 hover:border-cyan-500/50 shadow-sm focus:shadow-md text-white placeholder-gray-400 ${
                  errors.category
                    ? 'border-red-500/30 focus:ring-red-500/20 focus:border-red-500 bg-red-500/10'
                    : ''
                }`}
                disabled={loading}
                aria-invalid={!!errors.category}
                aria-describedby={errors.category ? "category-error" : undefined}
              />
              {errors.category && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              )}
            </div>
            {errors.category && (
              <p id="category-error" className="text-sm text-red-400 mt-1 flex items-center gap-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.category}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-700/50">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3.5 rounded-xl border border-gray-600/50 text-gray-300 font-medium hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300 hover:shadow-sm"
          disabled={loading}
          aria-label={task ? "Cancel editing task" : "Cancel creating task"}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-xl hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? (
            <div className="flex items-center gap-2.5">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>{task ? 'Saving...' : 'Creating...'}</span>
            </div>
          ) : (
            task ? 'Save Changes' : 'Create Task'
          )}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;