'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks';
import { useTasks } from '@/hooks/useTasks';
import { Sidebar } from '@/components/dashboard/Sidebar';
import {
  DashboardHeader,
  DashboardHeaderWithBreadcrumbs,
} from '@/components/dashboard/DashboardHeader';
import { TaskList, TaskForm } from '@/components';
import { Task, TaskFilters as ITaskFilters, defaultTaskFilters } from '@/types';

export default function DashboardPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filters state - default to show only pending tasks on dashboard
  const [filters, setFilters] = useState<ITaskFilters>({
    ...defaultTaskFilters,
    status: 'pending'
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  // Tasks hook
  const {
    tasks: allTasks,
    loading: tasksLoading,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
  } = useTasks();

  // Apply filters to tasks
  const tasks = useMemo(() => {
    return allTasks.filter(task => {
      if (filters.status && task.status !== filters.status) return false;
      if (filters.priority && task.priority !== filters.priority) return false;
      if (filters.category && task.category !== filters.category) return false;
      if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    });
  }, [allTasks, filters]);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (mounted && !authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [mounted, authLoading, isAuthenticated, router]);

  const categories = useMemo(() => {
    const cats = new Set(tasks.map(t => t.category).filter(Boolean) as string[]);
    return Array.from(cats);
  }, [tasks]);

  const stats = useMemo(() => ({
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    high: tasks.filter(t => t.priority === 'high').length,
    overdue: tasks.filter(t => t.status === 'pending').length, // Simplified - in real app would check due dates
  }), [tasks]);

  // Handlers
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (data: any) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, data);
      } else {
        await createTask(data);
      }
      setIsFormOpen(false);
      setEditingTask(undefined);
    } catch (error) {
      // Error handled by hook/toast
    }
  };

  // Show loading while checking auth
  if (authLoading || !mounted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#42aec9] mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated (redirect will happen)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        pathname="/dashboard"
      />

      <div>
        <div className="w-full pb-12 px-4 sm:px-6 lg:px-8">
          {/* Mobile header with menu button */}
          <div className="flex items-center gap-4 mb-8 lg:hidden sticky top-0 bg-white z-10 pt-2 pb-4 -mx-4 px-4 border-b border-gray-100">
            <button
              type="button"
              className="p-2 rounded-lg text-[#2f6978] hover:bg-[#42aec9]/10 focus:outline-none focus:ring-2 focus:ring-[#42aec9]"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-[#2f6978]">Dashboard</h1>
          </div>

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#2f6978]">Dashboard</h1>
              <p className="mt-2 text-gray-600">Your personalized overview and insights</p>
            </div>
            <button
              onClick={() => { setEditingTask(undefined); setIsFormOpen(true); }}
              className="flex items-center gap-2.5 px-5 py-3 bg-gradient-to-r from-[#42aec9] to-[#2f6978] text-white font-medium rounded-xl hover:from-[#2f6978] hover:to-[#1f4a58] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span>New Task</span>
            </button>
          </div>

          {/* Stats Overview - Enhanced modern layout with new color palette */}
          <section aria-labelledby="stats-heading" className="mb-8">
            <h2 id="stats-heading" className="sr-only">Task Statistics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {/* Total Tasks */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200/70 shadow-lg hover:shadow-2xl transition-all duration-300 p-6 group hover:-translate-y-1">
                <div className="flex items-center">
                  <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#42aec9]/20 to-[#2f6978]/20 group-hover:from-[#42aec9]/30 group-hover:to-[#2f6978]/30 flex items-center justify-center transition-all duration-300 shadow-inner">
                    <svg className="w-6 h-6 text-[#2f6978]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Tasks</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                </div>
              </div>

              {/* Pending */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200/70 shadow-lg hover:shadow-2xl transition-all duration-300 p-6 group hover:-translate-y-1">
                <div className="flex items-center">
                  <div className="p-3.5 rounded-xl bg-gradient-to-br from-yellow-100/80 to-yellow-200/80 group-hover:from-yellow-100 group-hover:to-yellow-200 flex items-center justify-center transition-all duration-300 shadow-inner">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                  </div>
                </div>
              </div>

              {/* Completed */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200/70 shadow-lg hover:shadow-2xl transition-all duration-300 p-6 group hover:-translate-y-1">
                <div className="flex items-center">
                  <div className="p-3.5 rounded-xl bg-gradient-to-br from-green-100/80 to-green-200/80 group-hover:from-green-100 group-hover:to-green-200 flex items-center justify-center transition-all duration-300 shadow-inner">
                    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Completed</p>
                    <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                  </div>
                </div>
              </div>

              {/* High Priority */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200/70 shadow-lg hover:shadow-2xl transition-all duration-300 p-6 group hover:-translate-y-1">
                <div className="flex items-center">
                  <div className="p-3.5 rounded-xl bg-gradient-to-br from-red-100/80 to-red-200/80 group-hover:from-red-100 group-hover:to-red-200 flex items-center justify-center transition-all duration-300 shadow-inner">
                    <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">High Priority</p>
                    <p className="text-2xl font-bold text-red-600">{stats.high}</p>
                  </div>
                </div>
              </div>

              {/* Productivity Score - Unique dashboard metric */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200/70 shadow-lg hover:shadow-2xl transition-all duration-300 p-6 group hover:-translate-y-1">
                <div className="flex items-center">
                  <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#2f6978]/20 to-[#1f4a58]/20 group-hover:from-[#2f6978]/30 group-hover:to-[#1f4a58]/30 flex items-center justify-center transition-all duration-300 shadow-inner">
                    <svg className="w-6 h-6 text-[#2f6978]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Productivity</p>
                    <p className="text-2xl font-bold text-[#2f6978]">
                      {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Overview Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Recent Tasks */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200/70 shadow-lg hover:shadow-2xl transition-all duration-300 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#2f6978]">Recent Tasks</h3>
                <button
                  onClick={() => router.push('/dashboard/tasks')}
                  className="text-sm text-[#42aec9] hover:text-[#2f6978] font-medium transition-colors duration-200 hover:underline"
                >
                  View all →
                </button>
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {tasks.slice(0, 5).map(task => (
                  <div key={task.id} className="flex items-center justify-between p-4 bg-white/80 rounded-xl hover:bg-[#42aec9]/5 transition-colors border border-gray-100/50 group shadow-sm hover:shadow-md">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <input
                        type="checkbox"
                        checked={task.status === 'completed'}
                        onChange={() => toggleTask(task.id)}
                        className="h-5 w-5 text-[#42aec9] rounded border-gray-300 focus:ring-[#42aec9] focus:ring-2 cursor-pointer"
                      />
                      <span className={`truncate ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {task.title}
                      </span>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                ))}
                {tasks.length === 0 && (
                  <div className="text-center py-10">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h3 className="mt-4 text-sm font-medium text-gray-900">No tasks yet</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by creating a new task.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Task Distribution */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200/70 shadow-lg hover:shadow-2xl transition-all duration-300 p-6">
              <h3 className="text-lg font-semibold text-[#2f6978] mb-4">Task Distribution</h3>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">High Priority</span>
                    <span className="text-sm font-medium text-gray-700">{stats.high}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                    <div
                      className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
                      style={{ width: `${tasks.length > 0 ? Math.min((stats.high / tasks.length) * 100, 100) : 0}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Medium Priority</span>
                    <span className="text-sm font-medium text-gray-700">{tasks.filter(t => t.priority === 'medium').length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                    <div
                      className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
                      style={{ width: `${tasks.length > 0 ? Math.min((tasks.filter(t => t.priority === 'medium').length / tasks.length) * 100, 100) : 0}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Low Priority</span>
                    <span className="text-sm font-medium text-gray-700">{tasks.filter(t => t.priority === 'low').length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
                      style={{ width: `${tasks.length > 0 ? Math.min((tasks.filter(t => t.priority === 'low').length / tasks.length) * 100, 100) : 0}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-5 border-t border-gray-200">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Completion Rate</span>
                    <span className="text-sm font-medium text-gray-700">
                      {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                    <div
                      className="bg-gradient-to-r from-[#42aec9] to-[#2f6978] h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
                      style={{ width: `${stats.total > 0 ? Math.min((stats.completed / stats.total) * 100, 100) : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Task Form Modal */}
          {isFormOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-200/70">
                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-[#2f6978]">
                      {editingTask ? 'Edit Task' : 'Create New Task'}
                    </h2>
                    <button
                      onClick={() => { setIsFormOpen(false); setEditingTask(undefined); }}
                      className="text-gray-500 hover:text-[#2f6978] transition-colors duration-200 p-1 rounded-lg hover:bg-gray-100"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <TaskForm
                    task={editingTask}
                    onSubmit={handleFormSubmit}
                    onCancel={() => { setIsFormOpen(false); setEditingTask(undefined); }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
