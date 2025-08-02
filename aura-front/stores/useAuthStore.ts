import { create } from 'zustand';

export type AuthUser = {
    name: string;
    email: string;
    role: string;
    avatar?: string;
};

type AuthStore = {
    user: AuthUser | null;
    login: (user: AuthUser) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    login: (user) => set({ user }),
    logout: () => set({ user: null }),
}));
