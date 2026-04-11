import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types/user";




interface AuthState {
    token: string | null;
    user: User | null;
    isAuth: boolean;
    setLogin: (token: string, user: User) => void;
    logout: () => void;
}


export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            isAuth: false,

            setLogin: (token: string, user: User) =>
                set({ token, user, isAuth: true }),

            logout: () => {

                // 1. Xóa trạng thái Zustand
                set({ token: null, user: null, isAuth: false });

                // 2. Xóa LocalStorage
                localStorage.removeItem("auth-storage");

                window.location.href = "/";
            },
        }),

        {
            name: "auth-storage",
        }
    )
);