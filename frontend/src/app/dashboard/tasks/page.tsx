'use client';

import { useState, useMemo } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { TaskList, TaskFilters, TaskForm } from '@/components';
import { Task, TaskFilters as ITaskFilters, defaultTaskFilters } from '@/types';
import { AuthProvider, ToastProvider } from '@/contexts';
import { TasksProvider } from '@/contexts/TasksContext';

function TasksPageContent() {
  // Filters state
  const [filters, setFilters] = useState<ITaskFilters>(defaultTaskFilters);
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
    deleteAllTasks,
  } = useTasks();

  const [isDeletingAll, setIsDeletingAll] = useState(false);

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

  const categories = Array.from(new Set(tasks.map(t => t.category).filter(Boolean) as string[]));

  const stats = {
    total: allTasks.length,
    pending: allTasks.filter(t => t.status === 'pending').length,
    completed: allTasks.filter(t => t.status === 'completed').length,
    high: allTasks.filter(t => t.priority === 'high').length,
  };

  // Handlers
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleDeleteAllTasks = async () => {
    if (allTasks.length === 0) {
      return; // No tasks to delete
    }

    // Confirm deletion with user
    if (confirm(`Are you sure you want to delete all ${allTasks.length} tasks? This action cannot be undone.`)) {
      setIsDeletingAll(true);
      try {
        await deleteAllTasks();
      } catch (error) {
        console.error('Error deleting all tasks:', error);
      } finally {
        setIsDeletingAll(false);
      }
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Tasks</h1>
            <p className="mt-2 text-gray-400">
              Manage and organize your tasks efficiently
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleDeleteAllTasks}
              disabled={allTasks.length === 0 || isDeletingAll}
              className={`flex items-center gap-2.5 px-5 py-3 font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                allTasks.length === 0 || isDeletingAll
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800'
              }`}
            >
              {isDeletingAll ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Delete All</span>
                </>
              )}
            </button>
            <button
              onClick={() => { setEditingTask(undefined); setIsFormOpen(true); }}
              className="flex items-center gap-2.5 px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span>New Task</span>
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <section aria-labelledby="stats-heading" className="mb-8">
          <h2 id="stats-heading" className="sr-only">Task Statistics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Tasks */}
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 p-6 group hover:-translate-y-1">
              <div className="flex items-center">
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 flex items-center justify-center transition-all duration-300 shadow-inner">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Total Tasks</p>
                  <p className="text-2xl font-bold text-cyan-400">{stats.total}</p>
                </div>
              </div>
            </div>

            {/* Pending */}
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 p-6 group hover:-translate-y-1">
              <div className="flex items-center">
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 group-hover:from-yellow-500/30 group-hover:to-yellow-600/30 flex items-center justify-center transition-all duration-300 shadow-inner">
                  <svg className="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Pending</p>
                  <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
                </div>
              </div>
            </div>

            {/* Completed */}
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 p-6 group hover:-translate-y-1">
              <div className="flex items-center">
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20 group-hover:from-green-500/30 group-hover:to-green-600/30 flex items-center justify-center transition-all duration-300 shadow-inner">
                  <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Completed</p>
                  <p className="text-2xl font-bold text-green-400">{stats.completed}</p>
                </div>
              </div>
            </div>

            {/* High Priority */}
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 p-6 group hover:-translate-y-1">
              <div className="flex items-center">
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/20 group-hover:from-red-500/30 group-hover:to-red-600/30 flex items-center justify-center transition-all duration-300 shadow-inner">
                  <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">High Priority</p>
                  <p className="text-2xl font-bold text-red-400">{stats.high}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content: Filters and Task List */}
        <section aria-labelledby="tasks-heading">
          <TaskFilters
            filters={filters}
            categories={categories}
            onFiltersChange={setFilters}
          />

          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 p-6">
            <TaskList
              tasks={tasks}
              loading={tasksLoading}
              onTaskToggle={toggleTask}
              onTaskDelete={deleteTask}
              onTaskUpdate={handleEditTask}
            />
          </div>
        </section>

        {/* Task Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-700/50">
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {editingTask ? 'Edit Task' : 'Create New Task'}
                  </h2>
                  <button
                    onClick={() => { setIsFormOpen(false); setEditingTask(undefined); }}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 p-1 rounded-lg hover:bg-gray-700"
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
                  loading={tasksLoading}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TasksPage() {
  return (
    <AuthProvider>
      <ToastProvider>
        <TasksProvider>
          <TasksPageContent />
        </TasksProvider>
      </ToastProvider>
    </AuthProvider>
  );
}