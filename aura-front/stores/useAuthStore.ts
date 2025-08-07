import { create } from 'zustand';

// Define the shape of the authenticated user
export type AuthUser = {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
};

// Define the shape of the auth store
type AuthStore = {
    user: AuthUser | null;
    login: (user: AuthUser) => void;
    logout: () => void;
};

// Create the Zustand store
export const useAuthStore = create<AuthStore>((set) => ({
    user: null,

    login: (user: AuthUser) => set({ user }),

    logout: () => set({ user: null }),
}));
