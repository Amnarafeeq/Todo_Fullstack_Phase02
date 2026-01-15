'use client';

import { ReactNode, useEffect, useState } from 'react';
import { AuthProvider, ToastProvider } from '@/contexts';
import { TasksProvider } from '@/contexts/TasksContext';

interface HydratedProvidersProps {
  children: ReactNode;
}

export default function HydratedProviders({ children }: HydratedProvidersProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    // Render a minimal loading state during SSR and initial hydration
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