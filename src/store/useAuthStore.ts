import { create } from "zustand";

interface UserInfo {
  uid: string;
  email: string;
  displayName?: string;
  role: "customer" | "admin" | "superadmin";
}

interface AuthStore {
  user: UserInfo | null;
  loading: boolean;
  setUser: (user: UserInfo | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}));
