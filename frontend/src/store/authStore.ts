import { create } from "zustand";
import { persist } from "zustand/middleware";


export type User = {
    id: number | string;
    email: string

};
export const useAuthStore = create()(
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

                window.location.href = "/login";
            },
        }),

        {
            name: "auth-storage",
        }
    )
);