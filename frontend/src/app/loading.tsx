/**
 * Global Loading State
 *
 * Displayed during page transitions and data fetching.
 * Uses a simple spinner design with accessibility support.
 */
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center" role="status" aria-live="polite">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4" />

        {/* Loading Text */}
        <p className="text-gray-600">Loading...</p>

        {/* Screen Reader Only */}
        <span className="sr-only">Page is loading</span>
      </div>
    </div>
  );
}
