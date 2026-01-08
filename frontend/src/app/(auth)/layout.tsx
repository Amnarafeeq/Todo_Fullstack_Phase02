import { ReactNode } from 'react';

/**
 * Auth Layout Component
 *
 * Minimal layout for authentication pages (login, register).
 * Removes the header and provides a centered, focused experience.
 */
export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Minimal header - Logo only */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-md mx-auto px-4">
          <a
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-gray-900 hover:text-primary-600 transition-colors"
            aria-label="Todo App - Home"
          >
            {/* Logo Icon */}
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Todo App</span>
          </a>
        </div>
      </header>

      {/* Main Content - Centered Auth Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>

      {/* Simple Footer */}
      <footer className="py-4">
        <p className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Todo App. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
