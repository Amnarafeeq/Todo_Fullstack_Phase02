'use client';

import { useEffect } from 'react';
import Link from 'next/link';

// Error Component Props
interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Global Error Boundary
 *
 * Catches uncaught errors and displays a user-friendly error page.
 * Provides a retry button to attempt recovery.
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to console for debugging
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Error Message */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Something went wrong
        </h1>
        <p className="text-gray-400 mb-6">
          We encountered an unexpected error. Please try again or return to the home page.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            aria-label="Try to recover from error"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-700 text-gray-300 font-medium rounded-xl hover:bg-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-600/50"
            aria-label="Return to home page"
          >
            Go home
          </Link>
        </div>

        {/* Error Details (Development only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-gray-800/50 rounded-lg text-left border border-gray-700/50">
            <p className="text-sm font-medium text-cyan-400 mb-2">Error details:</p>
            <pre className="text-xs text-red-400 overflow-auto max-h-32">
              {error.message}
              {error.digest && `\nDigest: ${error.digest}`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}