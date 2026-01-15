'use client';

import { ReactNode } from 'react';
import { Providers } from './providers';

interface ClientProvidersWrapperProps {
  children: ReactNode;
}

export default function ClientProvidersWrapper({ children }: ClientProvidersWrapperProps) {
  return <Providers>{children}</Providers>;
}