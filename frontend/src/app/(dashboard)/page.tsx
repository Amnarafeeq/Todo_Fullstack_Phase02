'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useTasks } from '@/hooks';
import { Task, TaskFilters as ITaskFilters, defaultTaskFilters } from '@/types';
import { TaskList, TaskForm } from '@/components';
import {
  DashboardHeader,
  DashboardHeaderWithBreadcrumbs,
  CreateTaskButton,
  SearchInput,
  UserMenu,
} from '@/components/dashboard/DashboardHeader';

/**
 * Dashboard Page
 *
 * Main task management interface.
 * Protected route - requires authentication.
 */

function DashboardPageContent() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const { tasks, loading: tasksLoading } = useTasks();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  // Calculate task statistics
  const stats = useMemo(() => {
    const total = tasks.length || 1; // Use 1 to prevent division by zero
    const pending = tasks.filter(task => task.status === 'pending').length;
    const completed = tasks.filter(task => task.status === 'completed').length;

    // Calculate completion rate percentage
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Priority distribution
    const highPriority = tasks.filter(task => task.priority === 'high').length;
    const mediumPriority = tasks.filter(task => task.priority === 'medium').length;
    const lowPriority = tasks.filter(task => task.priority === 'low').length;

    return {
      total,
      pending,
      completed,
      completionRate,
      highPriority,
      mediumPriority,
      lowPriority
    };
  }, [tasks]);

  // Show loading while checking auth
  if (loading || tasksLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4" />
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  // Show content if authenticated
  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
          My Tasks
        </h1>
        <p className="text-gray-400">
          Manage and organize your tasks efficiently
        </p>
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
                <p className="text-2xl font-bold text-red-400">{stats.highPriority}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Status Distribution Chart - Completed vs Pending */}
      <section aria-labelledby="status-distribution-heading" className="mb-8">
        <h2 id="status-distribution-heading" className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">Task Distribution (Completed vs Pending)</h2>

        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 p-6">
          {stats.total > 0 ? (
            <div className="space-y-4">
              {/* Completed */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-green-400">Completed</span>
                  <span className="text-sm font-medium text-gray-400">{stats.completed} tasks</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-4 rounded-full transition-all duration-500 ease-out min-w-0"
                    style={{ width: `${(stats.completed / stats.total) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Pending */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-yellow-400">Pending</span>
                  <span className="text-sm font-medium text-gray-400">{stats.pending} tasks</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-4 rounded-full transition-all duration-500 ease-out min-w-0"
                    style={{ width: `${(stats.pending / stats.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-300 mb-1">No tasks yet</h3>
              <p className="text-gray-500 mb-4">
                Create some tasks to see the status distribution
              </p>
              <button
                onClick={() => router.push('/dashboard/tasks')}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
              >
                Create Your First Task
              </button>
            </div>
          )}

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-gray-700/50">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded mr-2"></div>
              <span className="text-sm text-gray-300">Completed</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded mr-2"></div>
              <span className="text-sm text-gray-300">Pending</span>
            </div>
          </div>
        </div>
      </section>

      {/* Priority Distribution Chart */}
      <section aria-labelledby="priority-distribution-heading" className="mb-8">
        <h2 id="priority-distribution-heading" className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">Task Distribution by Priority</h2>

        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 p-6">
          {stats.total > 0 ? (
            <div className="space-y-4">
              {/* High Priority */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-red-400">High Priority</span>
                  <span className="text-sm font-medium text-gray-400">{stats.highPriority} tasks</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-red-500 to-red-600 h-4 rounded-full transition-all duration-500 ease-out min-w-0"
                    style={{ width: `${(stats.highPriority / stats.total) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Medium Priority */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-yellow-400">Medium Priority</span>
                  <span className="text-sm font-medium text-gray-400">{stats.mediumPriority} tasks</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-4 rounded-full transition-all duration-500 ease-out min-w-0"
                    style={{ width: `${(stats.mediumPriority / stats.total) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Low Priority */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-green-400">Low Priority</span>
                  <span className="text-sm font-medium text-gray-400">{stats.lowPriority} tasks</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-500 ease-out min-w-0"
                    style={{ width: `${(stats.lowPriority / stats.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-300 mb-1">No tasks yet</h3>
              <p className="text-gray-500 mb-4">
                Create some tasks to see the priority distribution
              </p>
              <button
                onClick={() => router.push('/dashboard/tasks')}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
              >
                Create Your First Task
              </button>
            </div>
          )}

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-gray-700/50">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-600 rounded mr-2"></div>
              <span className="text-sm text-gray-300">High Priority</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded mr-2"></div>
              <span className="text-sm text-gray-300">Medium Priority</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-green-600 rounded mr-2"></div>
              <span className="text-sm text-gray-300">Low Priority</span>
            </div>
          </div>
        </div>
      </section>

      {/* Completion Rate Visualization */}
      <section aria-labelledby="completion-rate-heading" className="mb-8">
        <h2 id="completion-rate-heading" className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">Overall Progress</h2>

        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-300">Task Completion Rate</h3>
              <p className="text-gray-500 text-sm">Progress toward completing all tasks</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                {stats.completionRate}%
              </div>
              <div className="text-gray-500 text-sm">{stats.completed} of {stats.total}</div>
            </div>
          </div>

          <div className="w-full bg-gray-700 rounded-full h-6">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-6 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2 min-w-0"
              style={{ width: `${stats.total > 0 ? stats.completionRate : 0}%` }}
            >
              {stats.total > 0 && stats.completionRate > 0 && (
                <span className="text-xs font-bold text-white whitespace-nowrap">
                  {stats.completionRate}%
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-between mt-2 text-sm text-gray-400">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>
      </section>

      {/* Recent Tasks */}
      {tasks.length > 0 && (
        <section aria-labelledby="recent-tasks-heading">
          <h2 id="recent-tasks-heading" className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">Recent Tasks</h2>

          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 p-6">
            <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
              {tasks.slice(0, 5).map(task => (
                <div key={task.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg border border-gray-600/50 hover:bg-gray-700/70 transition-colors">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={task.status === 'completed'}
                      readOnly
                      className="h-5 w-5 text-cyan-500 rounded border-gray-600 focus:ring-cyan-500 mt-0.5 bg-gray-700"
                    />
                    <div className="ml-4">
                      <h3 className={`font-medium ${task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                        {task.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">{task.createdAt}</p>
                    </div>
                  </div>

                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    task.priority === 'high' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                    task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                    'bg-green-500/20 text-green-400 border border-green-500/30'
                  }`}>
                    {task.priority} priority
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 text-right">
              <button
                onClick={() => router.push('/dashboard/tasks')}
                className="text-sm text-cyan-400 hover:text-cyan-300 font-medium hover:underline transition-colors"
              >
                View All Tasks →
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default function DashboardPage() {
  return <DashboardPageContent />;
}