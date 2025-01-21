import { create } from "zustand";
import { persist } from "zustand/middleware";
import client from "./lib/axios";
import { UserData } from "./lib/types";

interface AuthState {
  isAuthenticated: boolean;
  user: UserData | undefined;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user: UserData | undefined) => void;
  checkAuthStatus: () => Promise<void>;
  signInUser: (email: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: undefined,

      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setUser: (user) => set({ user }),

      checkAuthStatus: async () => {
        try {
          const response = await client.post("/api/auth/check");
          if (response.status === 200) {
            set({ isAuthenticated: true, user: response.data as UserData });
          } else {
            set({ isAuthenticated: false, user: undefined });
          }
        } catch (error) {
          console.error("Failed to check authentication status", error);
          set({ isAuthenticated: false, user: undefined });
        }
      },

      signInUser: async (email, password) => {
        try {
          const response = await client.post("/api/auth/signin", {
            email,
            password,
          });
          if (response.status === 200) {
            await useAuthStore.getState().checkAuthStatus();
          }
        } catch (error) {
          console.error("Sign-in failed", error);
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);
