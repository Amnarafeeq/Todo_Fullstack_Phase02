'use client';

import { useContext } from 'react';
import { AuthContext, AuthContextType } from '@/contexts/AuthContext';

/**
 * Custom hook to use the authentication context.
 * Provides access to the current user, loading state, and auth methods.
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
