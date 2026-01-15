'use client';

import { ReactNode } from 'react';
import ClientOnlyProviders from './ClientOnlyProviders';

interface ClientWrapperProps {
  children: ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <ClientOnlyProviders>
      {children}
    </ClientOnlyProviders>
  );
}