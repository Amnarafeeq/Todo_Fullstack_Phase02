import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the client-side providers wrapper to avoid SSR issues
const ClientProviders = dynamic(() => import('../ClientProviders'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4" />
        <p className="text-gray-300">Loading...</p>
      </div>
    </div>
  ),
});

// Layout for authenticated routes that need providers
export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ClientProviders>
      <main className="flex-1">
        {children}
      </main>
    </ClientProviders>
  );
}