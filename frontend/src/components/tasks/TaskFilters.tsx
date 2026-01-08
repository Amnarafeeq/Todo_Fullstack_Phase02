'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { TaskFilters as ITaskFilters } from '@/types';

interface TaskFiltersProps {
  filters: ITaskFilters;
  categories: string[];
  onFiltersChange: (filters: ITaskFilters) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({
  filters,
  categories,
  onFiltersChange,
}) => {
  const [localSearch, setLocalSearch] = useState(filters.search);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== filters.search) {
        onFiltersChange({ ...filters, search: localSearch });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch, filters, onFiltersChange]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFiltersChange({ ...filters, [name]: value });
  };

  const toggleSortOrder = () => {
    onFiltersChange({
      ...filters,
      sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc'
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
      {/* Search Input */}
      <div className="relative flex-grow w-full md:w-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          className="dashboard-search-input !w-full"
          placeholder="Search tasks..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          aria-label="Search tasks"
        />
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
        {/* Status Filter */}
        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2 transition-smooth"
          aria-label="Filter by status"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        {/* Priority Filter */}
        <select
          name="priority"
          value={filters.priority}
          onChange={handleChange}
          className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2 transition-smooth"
          aria-label="Filter by priority"
        >
          <option value="all">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        {/* Category Filter */}
        {categories.length > 0 && (
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2 transition-smooth"
            aria-label="Filter by category"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        )}

        {/* Sort Controls */}
        <div className="flex items-center gap-1 ml-auto md:ml-0">
          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleChange}
            className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2 transition-smooth"
            aria-label="Sort by"
          >
            <option value="createdAt">Newest</option>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
          <button
            onClick={toggleSortOrder}
            className="p-2 bg-white border border-gray-300 rounded-lg text-gray-500 hover:text-orange-500 hover:border-orange-500 transition-smooth"
            title={`Sort ${filters.sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
            aria-label={`Toggle sort order, current: ${filters.sortOrder}`}
          >
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${filters.sortOrder === 'desc' ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;
