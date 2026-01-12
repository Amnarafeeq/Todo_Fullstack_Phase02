'use client';

import { AuthProvider, ToastProvider } from '@/contexts';
import { TasksProvider } from '@/contexts/TasksContext';
import { ReactNode } from 'react';

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
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