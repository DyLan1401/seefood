import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export function RequireAuth() {
    const { isAuth } = useAuthStore();
    if (!isAuth) return <Navigate to="/login" replace />;
    return <Outlet />;
}

export function RequireAdmin() {
    const { isAuth, user } = useAuthStore();
    if (!isAuth || user?.role !== "admin") return <Navigate to="/" replace />;
    return <Outlet />;
}