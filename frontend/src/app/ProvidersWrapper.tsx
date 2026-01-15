'use client';

import { ReactNode } from 'react';
import AppProviders from '@/components/AppProviders';

interface ProvidersWrapperProps {
  children: ReactNode;
}

export default function ProvidersWrapper({ children }: ProvidersWrapperProps) {
  return <AppProviders>{children}</AppProviders>;
}