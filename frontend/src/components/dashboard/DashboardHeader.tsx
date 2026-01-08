'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

/**
 * Dashboard Header Component
 *
 * Page-level header for dashboard content areas.
 * Features:
 * - Page title and description
 * - Breadcrumb navigation
 * - Create task button (placeholder)
 * - Search input (placeholder)
 * - User menu (placeholder)
 */
interface DashboardHeaderProps {
  title: string;
  description?: string;
}

/**
 * Dashboard Breadcrumb Item
 */
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface DashboardHeaderWithBreadcrumbsProps extends DashboardHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
}

export function DashboardHeader({ title, description }: DashboardHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
        {title}
      </h1>
      {description && (
        <p className="text-gray-600">{description}</p>
      )}
    </div>
  );
}

/**
 * Dashboard Header with Breadcrumbs
 *
 * Extended header with breadcrumb navigation.
 */
export function DashboardHeaderWithBreadcrumbs({
  title,
  description,
  breadcrumbs = [],
}: DashboardHeaderWithBreadcrumbsProps) {
  return (
    <div className="mb-6 lg:mb-8">
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <nav className="mb-4" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <a
                href="/dashboard"
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                Dashboard
              </a>
            </li>
            {breadcrumbs.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="text-gray-900 font-medium">
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Title and Description */}
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
        {title}
      </h1>
      {description && (
        <p className="text-gray-600">{description}</p>
      )}
    </div>
  );
}

/**
 * Create Task Button Component
 *
 * Prominent CTA button for creating new tasks.
 */
export function CreateTaskButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    // Placeholder: Will open create task modal in Task 4
    setTimeout(() => {
      setIsLoading(false);
      console.log('Create task modal will open in Task 4');
    }, 500);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="dashboard-create-button"
      aria-busy={isLoading}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Opening...
        </>
      ) : (
        <>
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create Task
        </>
      )}
    </button>
  );
}

/**
 * Search Input Component
 *
 * Search field for filtering tasks.
 */
export function SearchInput() {
  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="search"
        placeholder="Search tasks..."
        className="dashboard-search-input"
        aria-label="Search tasks"
      />
    </div>
  );
}

/**
 * User Menu Component
 *
 * Dropdown-style user menu for dashboard.
 */
export function UserMenu() {
  const { user } = useAuth();

  return (
    <button
      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
      aria-label="User menu"
      aria-expanded="false"
    >
      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
        <svg
          className="w-4 h-4 text-orange-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </div>
      <div className="hidden md:block text-left">
        <p className="text-sm font-medium text-gray-900">
          {user?.name || 'User'}
        </p>
        <p className="text-xs text-gray-500 truncate max-w-[120px]">
          {user?.email || 'user@example.com'}
        </p>
      </div>
      <svg
        className="w-4 h-4 text-gray-400 hidden md:block"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
  );
}
