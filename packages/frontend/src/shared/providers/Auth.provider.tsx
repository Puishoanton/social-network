'use client';

import { useEffect } from 'react';
import { useAuthStore } from '../store';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const refreshUser = useAuthStore((state) => state.refreshUser)

  useEffect(() => {
    refreshUser()
  }, [refreshUser])

  return <>{children}</>
};
