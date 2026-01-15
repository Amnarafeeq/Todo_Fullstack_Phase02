'use client';

import { ReactNode } from 'react';
import { AuthProvider, ToastProvider, TasksProvider } from '@/contexts';

interface ClientLayoutProps {
  children: ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
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