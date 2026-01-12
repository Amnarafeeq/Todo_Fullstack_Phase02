'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks';

// Header Component Props
interface HeaderProps {
  // Future: user prop will be added when auth is implemented
}

/**
 * Application Header Component
 *
 * Displays the app logo, navigation, and user actions.
 * Shows login/register buttons when not authenticated,
 * user info and logout button when authenticated.
 */
export function Header({}: HeaderProps) {
  const { user, isAuthenticated, logout, loading } = useAuth();

  return (
    <header className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/50 sticky top-0 z-40 shadow-sm shadow-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent hover:from-cyan-300 hover:to-blue-300 transition-all duration-300 group"
              aria-label="TaskFlow - Home"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-blue-300">
                Task<span className="text-cyan-400">Flow</span>
              </span>
            </Link>
          </div>

          {/* Navigation and User Actions */}
          <nav className="flex items-center gap-3" aria-label="Main navigation">
            {loading ? (
              // Loading state
              <div className="animate-pulse bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl h-10 w-28 shadow-sm" />
            ) : isAuthenticated && user ? (
              // Authenticated user view
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-semibold shadow-md">
                    {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-300 truncate max-w-[100px]">
                    {user.name || user.email}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-300 transition-all duration-300 border border-cyan-500/30 hover:border-cyan-500/50 shadow-sm hover:shadow-md"
                  aria-label="Log out"
                >
                  Logout
                </button>
              </div>
            ) : (
              // Unauthenticated user view
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-4 py-2.5 rounded-lg text-sm font-medium text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 border border-cyan-500/30 hover:border-cyan-500/50 shadow-sm hover:shadow-md"
                  aria-label="Go to login page"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                  aria-label="Go to registration page"
                >
                  Sign up
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}