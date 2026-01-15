import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the client-side providers wrapper to avoid SSR issues
const ClientProvidersWrapper = dynamic(() => import('../ClientProvidersWrapper'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4" />
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    </div>
  ),
});

/**
 * Auth Layout Component
 *
 * Layout for authentication pages (login, register) that need providers.
 * Uses dynamic import to avoid SSR issues with client-side providers.
 */
export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ClientProvidersWrapper>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
        {/* Minimal header - Logo only */}
        <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50 py-4">
          <div className="max-w-md mx-auto px-4">
            <a
              href="/"
              className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent hover:from-cyan-300 hover:to-blue-300 transition-colors"
              aria-label="TaskFlow - Home"
            >
              {/* Logo Icon */}
              <svg
                className="w-8 h-8 text-cyan-400"
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
              <span>TaskFlow</span>
            </a>
          </div>
        </header>

        {/* Main Content - Centered Auth Form */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </div>
    </ClientProvidersWrapper>
  );
}