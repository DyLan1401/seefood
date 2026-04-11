//lib
import { Trash2, ClipboardList, User2, MapPin, Calendar, Hash } from 'lucide-react';

//zustands
import { useToastStore } from "../../store/useToastStore";

//hooks
import { useOrderList } from "../../hooks/order/useOrderList";
import { useOrderMutations } from "../../hooks/order/useOrderMutation";

//types
import type { Order } from "../../types/order";
import { TableRowSkeleton } from '../../component/Skeleton';
const STATUS_LABEL: Record<string, string> = {
    pending: "Chờ xác nhận", confirmed: "Đã xác nhận", shipping: "Đang giao", done: "Đã giao", canceled: "Đã hủy",
};

const STATUS_COLOR: Record<string, string> = {
    pending: "bg-yellow-50 text-yellow-600 border-yellow-100",
    confirmed: "bg-blue-50 text-blue-600 border-blue-100",
    shipping: "bg-purple-50 text-purple-600 border-purple-100",
    done: "bg-green-50 text-green-600 border-green-100",
    canceled: "bg-red-50 text-red-600 border-red-100",
};

export default function AdminOrders() {
    const showToast = useToastStore((state) => state.show);

    const { orders, isLoading } = useOrderList();
    const {
        updateOrder,
        deleteOrder,
        isUpdating,
        isDeleting
    } = useOrderMutations();

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header  */}
            <div className="mb-8">
                <h1 className="text-2xl font-black text-gray-800 tracking-tight">Quản Lý Đơn Hàng</h1>
                <p className="text-sm text-gray-500 font-medium">Theo dõi doanh thu và tiến độ xử lý đơn hàng Seefood</p>
            </div>

            {isLoading ? (
                <table className="w-full">
                    <tbody>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <TableRowSkeleton key={i} cols={5} />
                        ))}
                    </tbody>
                </table>
            ) : orders.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <ClipboardList size={48} className="mx-auto text-gray-200 mb-4" />
                    <p className="text-gray-400 font-medium">Hiện tại chưa có đơn hàng nào.</p>
                </div>
            ) : (
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs uppercase font-black text-gray-400 tracking-widest">Mã đơn</th>
                                    <th className="px-6 py-4 text-xs uppercase font-black text-gray-400 tracking-widest">Khách hàng</th>
                                    <th className="px-6 py-4 text-xs uppercase font-black text-gray-400 tracking-widest text-center">Thanh toán</th>
                                    <th className="px-6 py-4 text-xs uppercase font-black text-gray-400 tracking-widest text-center">Trạng thái</th>
                                    <th className="px-6 py-4 text-xs uppercase font-black text-gray-400 tracking-widest text-center">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {orders.map((order: Order) => (
                                    <tr key={order.id} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 font-black text-blue-600">
                                                <Hash size={14} />
                                                <span>{order.id}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-800 flex items-center gap-2">
                                                    <User2 size={12} className="text-gray-400" /> {order.customer_name}
                                                </span>
                                                <span className="text-[10px] text-gray-400 flex items-center gap-2 mt-1 italic">
                                                    <MapPin size={10} /> {order.address}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex flex-col items-center">
                                                <span className="font-black text-blue-600">{order.total.toLocaleString()}đ</span>
                                                <span className="text-[9px] text-gray-400 flex items-center gap-1 uppercase font-bold tracking-tighter">
                                                    <Calendar size={10} /> {new Date(order.created_at).toLocaleDateString("vi-VN")}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center">
                                                <select
                                                    value={order.status}
                                                    disabled={isUpdating}
                                                    onChange={(e) => updateOrder({ id: order.id, status: e.target.value })}
                                                    className={`text-[10px] font-black rounded-xl px-4 py-2 border outline-none cursor-pointer transition-all uppercase tracking-widest ${STATUS_COLOR[order.status]}`}
                                                >
                                                    {Object.keys(STATUS_LABEL).map((s) => (
                                                        <option key={s} value={s} className="bg-white text-gray-800 font-medium uppercase italic">{STATUS_LABEL[s]}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center">
                                                <button
                                                    disabled={isDeleting}
                                                    onClick={() => {
                                                        if (["done", "canceled"].includes(order.status)) {
                                                            if (window.confirm(`Xóa đơn hàng #${order.id}?`)) deleteOrder(order.id);
                                                        } else {
                                                            showToast("Chỉ xóa được đơn Đã giao/Đã hủy", "error");
                                                        }
                                                    }}
                                                    className={`p-2.5 rounded-xl transition-all ${["done", "canceled"].includes(order.status) ? "text-red-500 hover:bg-red-100" : "text-gray-200 cursor-not-allowed"}`}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}