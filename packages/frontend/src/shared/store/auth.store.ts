import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { authService } from '../service/auth.service';
import { UserReturnType } from '../types';

type AuthStateType = {
  user: UserReturnType | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
  setAuthenticated: (value: boolean) => void;
}

export const useAuthStore = create<AuthStateType>()(
  persist((set) => ({
    user: undefined,
    isAuthenticated: false,
    isLoading: true,
    refreshUser: async () => {
      try {
        const res = await authService.refresh()

        if (res.id) {
          set({ isAuthenticated: true, user: res })
        } else {
          set({ isAuthenticated: false, user: undefined });
        }
      } catch (e) {
        console.log(e);
        set({ isAuthenticated: false, user: undefined });
      } finally {
        set({ isLoading: false });
      }
    },
    setAuthenticated: (value) => set({ isAuthenticated: value }),
  }),
    {
      name: 'auth-storage',
      skipHydration: true,
    }
  )
)
