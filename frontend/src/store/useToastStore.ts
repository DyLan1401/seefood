import { create } from 'zustand';
import * as toast from "../types/toast"

export const useToastStore = create<toast.ToastState>((set) => ({
    toasts: [],
    show: (message, type) => {
        const id = Date.now();
        set((state) => ({
            toasts: [...state.toasts, { id, message, type }]
        }));

        // 
        setTimeout(() => {
            set((state) => ({
                toasts: state.toasts.filter((t) => t.id !== id)
            }));
        }, 3000);
    },
    remove: (id) => set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id)
    })),
}));