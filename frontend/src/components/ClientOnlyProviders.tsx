'use client';

import { AuthProvider, ToastProvider } from '@/contexts';
import { TasksProvider } from '@/contexts/TasksContext';
import { ReactNode, useEffect, useState } from 'react';

interface ClientOnlyProvidersProps {
  children: ReactNode;
}

export default function ClientOnlyProviders({ children }: ClientOnlyProvidersProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // Ensure we're in the browser environment before setting mounted state
    if (typeof window !== 'undefined') {
      setHasMounted(true);
    }
  }, []);

  if (!hasMounted) {
    // Render a minimal placeholder during SSR or initial client render
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 flex items-center justify-center">
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