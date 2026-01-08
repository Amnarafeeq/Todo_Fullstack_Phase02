'use client';

import { useState, useMemo } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { TaskList, TaskFilters, TaskForm } from '@/components';
import { Task, TaskFilters as ITaskFilters, defaultTaskFilters } from '@/types';

export default function TasksPage() {
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

  const categories = Array.from(new Set(tasks.map(t => t.category).filter(Boolean) as string[]));

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    high: tasks.filter(t => t.priority === 'high').length,
  };

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#2f6978]">Tasks</h1>
          <p className="mt-2 text-gray-600">
            Manage and organize your tasks efficiently
          </p>
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

      {/* Stats Overview */}
      <section aria-labelledby="stats-heading" className="mb-8">
        <h2 id="stats-heading" className="sr-only">Task Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
        </div>
      </section>

      {/* Main Content: Filters and Task List */}
      <section aria-labelledby="tasks-heading">
        <TaskFilters
          filters={filters}
          categories={categories}
          onFiltersChange={setFilters}
        />

        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200/70 shadow-lg hover:shadow-2xl transition-all duration-300 p-6">
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
  );
}