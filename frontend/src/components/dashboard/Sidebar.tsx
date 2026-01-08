'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/navigation';

/**
 * Dashboard Sidebar Component
 *
 * Responsive sidebar navigation for the dashboard.
 * Features:
 * - Fixed position on desktop (always visible)
 * - Slide-in panel on mobile
 * - Active state highlighting
 * - Smooth transitions
 * - Accessible keyboard navigation
 */
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

// Navigation items for the dashboard
const navigationItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    name: 'Tasks',
    href: '/dashboard/tasks',
    icon: (
      <svg
        className="w-5 h-5"
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
    ),
  },
  {
    name: 'Categories',
    href: '/dashboard/categories',
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
        />
      </svg>
    ),
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
];

export function Sidebar({ isOpen, onClose, pathname }: SidebarProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard' || pathname === '/dashboard/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Sidebar - Slide-in */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out lg:hidden
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        aria-label="Sidebar navigation"
      >
        {/* Mobile Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-lg font-bold text-gray-900"
            onClick={onClose}
            aria-label="Todo App - Dashboard"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-[#42aec9] to-[#2f6978] rounded-xl flex items-center justify-center shadow-lg">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="font-bold text-[#2f6978]">Todo<span className="text-[#42aec9]">Pro</span></span>
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
            aria-label="Close sidebar"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1" aria-label="Dashboard navigation">
          {navigationItems.map((item) => {
            const active = isActive(item.href);
            return (
              <div
                key={item.name}
                onClick={() => {
                  router.push(item.href);
                  onClose();
                }}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg font-medium
                  transition-all duration-200 cursor-pointer
                  ${
                    active
                      ? 'bg-[#42aec9]/10 text-[#2f6978]'
                      : 'text-gray-600 hover:bg-[#42aec9]/5 hover:text-[#2f6978]'
                  }
                  focus:outline-none focus:ring-2 focus:ring-[#42aec9]
                `}
                aria-current={active ? 'page' : undefined}
              >
                <span className={active ? 'text-[#42aec9]' : 'text-gray-400'}>
                  {item.icon}
                </span>
                {item.name}
              </div>
            );
          })}
        </nav>

        {/* Mobile User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-[#42aec9]/10 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-[#42aec9]"
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
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
            </div>
            <button
              onClick={logout}
              className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
              title="Logout"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Desktop Sidebar - Fixed */}
      <aside
        className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-64 lg:bg-white lg:border-r lg:border-gray-200 lg:flex lg:flex-col"
        aria-label="Sidebar navigation"
      >
        {/* Desktop Sidebar Header */}
        <div className="flex items-center h-16 px-6 border-b border-gray-200">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xl font-bold text-gray-900"
            aria-label="Todo App - Dashboard"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#42aec9] to-[#2f6978] rounded-xl flex items-center justify-center shadow-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="font-bold text-[#2f6978]">Todo<span className="text-[#42aec9]">Pro</span></span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1" aria-label="Dashboard navigation">
          {navigationItems.map((item) => {
            const active = isActive(item.href);
            return (
              <div
                key={item.name}
                onClick={() => {
                  router.push(item.href);
                }}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg font-medium
                  transition-all duration-200 cursor-pointer
                  ${
                    active
                      ? 'bg-[#42aec9]/10 text-[#2f6978]'
                      : 'text-gray-600 hover:bg-[#42aec9]/5 hover:text-[#2f6978]'
                  }
                  focus:outline-none focus:ring-2 focus:ring-[#42aec9]
                `}
                aria-current={active ? 'page' : undefined}
              >
                <span className={active ? 'text-[#42aec9]' : 'text-gray-400'}>
                  {item.icon}
                </span>
                {item.name}
              </div>
            );
          })}
        </nav>

        {/* Desktop User Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="w-10 h-10 rounded-full bg-[#42aec9]/10 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-[#42aec9]"
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
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
            </div>
            <button
              onClick={logout}
              className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
              title="Logout"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
