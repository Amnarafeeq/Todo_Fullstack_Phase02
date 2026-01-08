'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Dashboard Page
 *
 * Main task management interface.
 * Protected route - requires authentication.
 */
export default function DashboardPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show placeholder content if authenticated
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          My Tasks
        </h1>
        <p className="text-gray-600">
          Manage and organize your tasks efficiently
        </p>
      </div>

      {/* Placeholder for Task Management UI */}
      <div className="card p-12 text-center">
        <div className="max-w-md mx-auto">
          {/* Icon */}
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-primary-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Task Management Coming Soon
          </h2>
          <p className="text-gray-600 mb-6">
            The task management interface will be implemented in future tasks.
            For now, you can explore the authentication flow.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              className="btn btn-primary"
              disabled
            >
              Create Task
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              disabled
            >
              View All Tasks
            </button>
          </div>
        </div>
      </div>

      {/* Stats Placeholder */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-gray-900 mb-1">0</div>
          <div className="text-sm text-gray-500">Total Tasks</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-yellow-600 mb-1">0</div>
          <div className="text-sm text-gray-500">Pending</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-1">0</div>
          <div className="text-sm text-gray-500">Completed</div>
        </div>
      </div>
    </div>
  );
}
