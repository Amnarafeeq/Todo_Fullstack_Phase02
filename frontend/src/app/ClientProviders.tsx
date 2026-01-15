'use client';

import { ReactNode } from 'react';
import { Providers } from './providers';

interface ClientProvidersProps {
  children: ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return <Providers>{children}</Providers>;
}