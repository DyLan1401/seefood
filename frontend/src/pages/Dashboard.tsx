import { useEffect, useState } from "react";
import api from "../api/axios";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "../component/ToastContainer";
import type { Order } from "../types/order";
import { useAuthStore } from "../store/authStore";

const STATUSES = ["pending", "confirmed", "shipping", "done", "cancelled"];

const STATUS_LABEL: Record<string, string> = {
    pending: "Chờ xác nhận",
    confirmed: "Đã xác nhận",
    shipping: "Đang giao",
    done: "Đã giao",
    cancelled: "Đã hủy",
};

const STATUS_COLOR: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    shipping: "bg-purple-100 text-purple-700",
    done: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
};



export default function Dashboard() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const { toasts, show } = useToast();
    const { user, logout } = useAuthStore();

    const fetchOrders = async () => {
        try {
            const res = await api.get("/order/all");
            setOrders(res.data);
        } catch {
            show("Không thể tải đơn hàng", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id: number, status: string) => {
        try {
            await api.patch(`/order/${id}/status`, { status });
            setOrders((prev) =>
                prev.map((o) => (o.id === id ? { ...o, status } : o))
            );
            show("Cập nhật trạng thái thành công", "success");
        } catch {
            show("Cập nhật thất bại", "error");
        }
    };

    useEffect(() => { fetchOrders(); }, []);

    return (
        <div>

            <div className="w-full h-16 bg-blue-900 text-white text-sm text-right p-4" >
                <div>  Hi, {user?.email}</div>
                <button onClick={() => { logout() }} className=" text-sm cursor-pointer  text-red-600 hover:text-black transition">Đăng xuất</button>

            </div >
            <div className="min-h-screen bg-gray-50 px-6">
                <ToastContainer toasts={toasts} />

                <h1 className="text-2xl font-bold text-[#BF4E2C] mb-6">Quản lý đơn hàng</h1>

                {loading ? (
                    <p className="text-gray-500">Đang tải...</p>
                ) : orders.length === 0 ? (
                    <p className="text-gray-500">Không có đơn hàng nào.</p>
                ) : (
                    <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
                        <table className="w-full text-sm bg-white">
                            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                                <tr>
                                    <th className="px-4 py-3 text-left">ID</th>
                                    <th className="px-4 py-3 text-left">Khách hàng</th>
                                    <th className="px-4 py-3 text-left">SĐT</th>
                                    <th className="px-4 py-3 text-left">Địa chỉ</th>
                                    <th className="px-4 py-3 text-left">Ghi chú</th>
                                    <th className="px-4 py-3 text-left">Tổng tiền</th>
                                    <th className="px-4 py-3 text-left">Trạng thái</th>
                                    <th className="px-4 py-3 text-left">Ngày đặt</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-3 font-medium">#{order.id}</td>
                                        <td className="px-4 py-3">{order.customer_name}</td>
                                        <td className="px-4 py-3">{order.phone}</td>
                                        <td className="px-4 py-3 max-w-[150px] truncate">{order.address}</td>
                                        <td className="px-4 py-3 max-w-[120px] truncate">{order.note || "—"}</td>
                                        <td className="px-4 py-3 font-semibold text-[#BF4E2C]">
                                            {order.total.toLocaleString()}đ
                                        </td>
                                        <td className="px-4 py-3">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                                className={`text-xs font-medium rounded-lg px-2 py-1 border-0 outline-none cursor-pointer ${STATUS_COLOR[order.status]}`}
                                            >
                                                {STATUSES.map((s) => (
                                                    <option key={s} value={s}>{STATUS_LABEL[s]}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-4 py-3 text-gray-500">
                                            {new Date(order.created_at).toLocaleDateString("vi-VN")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}