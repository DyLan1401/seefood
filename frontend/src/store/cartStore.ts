import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
    productId: number;
    name: string;
    price: number;
    image_url: string | null;
    qty: number;
};

type CartState = {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "qty">) => void;
    removeItem: (productId: number) => void;
    increaseQty: (productId: number) => void;
    decreaseQty: (productId: number) => void;
    clearCart: () => void;
    getTotal: () => number;
    getTotalItems: () => number;

};

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (item) => {
                const extsting = get().items.find(
                    (i) => i.productId === item.productId
                );
                if (extsting) {
                    set({
                        items: get().items.map((i) => i.productId === item.productId
                            ? { ...i, qty: i.qty + 1 }
                            : i
                        ),
                    });
                } else {
                    set({
                        items: [...get().items, { ...item, qty: 1 }],
                    });
                }
            },

            removeItem: (productId) =>
                set({
                    items: get().items.filter((i) => i.productId !== productId),
                }),


            increaseQty: (productId) =>
                set({
                    items: get().items.map((i) => i.productId === productId
                        ? { ...i, qty: i.qty + 1 }
                        : i
                    ),
                }),
            decreaseQty: (productId) => set({
                items: get().items.map((i) => (i.productId === productId
                    ? { ...i, qty: i.qty - 1 }
                    : i)).filter((i) => i.qty > 0),

            }),
            clearCart: () => { set({ items: [] }) },

            getTotal: () =>
                get().items.reduce((sum, i) => sum + i.price * i.qty, 0),


            getTotalItems: () =>
                get().items.reduce((sum, i) => sum + i.qty, 0),

        }),



        {
            name: "cart-storage",

        }
    )
)