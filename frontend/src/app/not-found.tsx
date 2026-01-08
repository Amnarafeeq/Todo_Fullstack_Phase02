import Link from 'next/link';

/**
 * 404 Not Found Page
 *
 * Displayed when the user navigates to a non-existent route.
 * Provides navigation back to the home page.
 */
export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon */}
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Page Title */}
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>

        {/* Message */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Page not found
        </h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Navigation */}
        <Link
          href="/"
          className="btn btn-primary"
          aria-label="Go to home page"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
