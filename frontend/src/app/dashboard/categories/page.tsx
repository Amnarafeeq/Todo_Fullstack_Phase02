'use client';

import { useState, useEffect } from 'react';
import { useTasks } from '@/hooks';
import { Task } from '@/types';

export default function CategoriesPage() {
  const { tasks, loading } = useTasks();
  const [categories, setCategories] = useState<{ name: string; count: number; tasks: Task[] }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && tasks.length > 0) {
      const categoryMap: Record<string, Task[]> = {};

      tasks.forEach(task => {
        const category = task.category || 'Uncategorized';
        if (!categoryMap[category]) {
          categoryMap[category] = [];
        }
        categoryMap[category].push(task);
      });

      const categoryList = Object.entries(categoryMap).map(([name, tasks]) => ({
        name,
        count: tasks.length,
        tasks
      }));

      setCategories(categoryList);
    }
  }, [tasks, loading]);

  const filteredTasks = selectedCategory
    ? categories.find(cat => cat.name === selectedCategory)?.tasks || []
    : [];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
        <p className="mt-2 text-gray-600">
          Organize your tasks by category
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`border rounded-lg p-6 cursor-pointer transition-all duration-200 ${
              selectedCategory === category.name
                ? 'border-orange-500 bg-orange-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setSelectedCategory(
              selectedCategory === category.name ? null : category.name
            )}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                {category.count} {category.count === 1 ? 'task' : 'tasks'}
              </span>
            </div>
          </div>
        ))}

        {categories.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No categories yet</h3>
            <p className="text-gray-500">
              Tasks you create can be organized into categories.
            </p>
          </div>
        )}
      </div>

      {selectedCategory && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Tasks in "{selectedCategory}"
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <div key={task.id} className="p-6 flex items-start">
                  <input
                    type="checkbox"
                    checked={task.status === 'completed'}
                    readOnly
                    className="h-5 w-5 text-orange-500 rounded border-gray-300 focus:ring-orange-500 mt-0.5"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className={`font-medium ${task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className="mt-1 text-sm text-gray-500">
                        {task.description}
                      </p>
                    )}
                    <div className="mt-2 flex items-center gap-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        task.priority === 'high' ? 'bg-red-100 text-red-800' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.priority} priority
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {task.createdAt}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <p className="text-gray-500">No tasks in this category</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}