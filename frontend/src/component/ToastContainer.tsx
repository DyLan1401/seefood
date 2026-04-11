import { useToastStore } from "../store/useToastStore";

export function ToastContainer() {
    const toasts = useToastStore((state) => state.toasts);
    const remove = useToastStore((state) => state.remove);

    return (
        <div className="fixed top-4 right-4 z-9999 flex flex-col gap-2">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    onClick={() => remove(toast.id)}
                    className={`px-5 py-4 rounded-lg text-white text-sm shadow-lg cursor-pointer  animate-fade-in-up
                        ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}
                >
                    {toast.message}
                </div>
            ))}
        </div>
    );
}
