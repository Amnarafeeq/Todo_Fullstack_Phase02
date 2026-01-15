'use client';

import { AuthProvider, ToastProvider, TasksProvider } from '@/contexts';
import { ReactNode } from 'react';
import { useIsClient } from '@/hooks';

interface ClientOnlyProvidersProps {
  children: ReactNode;
}

export default function ClientOnlyProviders({ children }: ClientOnlyProvidersProps) {
  const isClient = useIsClient();

  if (!isClient) {
    // Render a loading state during SSR or initial render
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <ToastProvider>
        <TasksProvider>
          {children}
        </TasksProvider>
      </ToastProvider>
    </AuthProvider>
  );
}