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
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#42aec9] border-t-transparent rounded-full animate-spin"></div>
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