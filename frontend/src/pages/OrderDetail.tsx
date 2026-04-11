//lib
import { useParams, useNavigate } from "react-router-dom";

//components
import Header from "../component/Header";
import Footer from "../component/Footer";

//hooks
import { useOrderDetail } from "../hooks/order/useOrderDetail";

//type
import type { OrderDetailData } from "../types/order";





export default function OrderDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { order: OrderDetail, isLoading, isError } = useOrderDetail(id);

    const data = OrderDetail as OrderDetailData | undefined;
    const order = data?.order;
    const items = data?.items ?? [];



    // const STATUSES = ["pending", "confirmed", "shipping", "done", "canceled"];

    const STATUS_LABEL: Record<string, string> = {
        pending: "Chờ xác nhận",
        confirmed: "Đã xác nhận",
        shipping: "Đang giao",
        done: "Đã giao",
        canceled: "Đã hủy",
    };

    const STATUS_COLOR: Record<string, string> = {
        pending: "bg-yellow-100 text-yellow-700",
        confirmed: "bg-blue-100 text-blue-700",
        shipping: "bg-purple-100 text-purple-700",
        done: "bg-green-100 text-green-700",
        canceled: "bg-red-100 text-red-700",
    };

    // Loading
    if (isLoading) return (
        <>
            <Header />
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center text-gray-400">
                    <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-3" />
                    Đang tải đơn hàng...
                </div>
            </div>
            <Footer />
        </>
    );

    // Error
    if (isError || !order) return (
        <>
            <Header />
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <p className="text-red-500 font-semibold mb-4">Đơn hàng hiện tại đã đi bơi xin vui lòng đợi!!!</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                    >
                        ← Quay lại
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );

    //tổng số lượng
    const totalQty = items.reduce((sum, i) => sum + i.qty, 0);

    return (
        <>
            <Header />
            <main className="bg-gray-50 min-h-screen py-8 px-4">
                <div className=" mx-auto">

                    {/* Header row */}
                    <div className="flex items-center gap-3 mb-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-white transition-colors"
                        >
                            ← Quay lại
                        </button>
                        <div className="flex-1">
                            <h1 className="text-xl font-bold text-gray-800">Đơn hàng #{order.id}</h1>
                            <p className="text-xs text-gray-400 mt-0.5">{(order.created_at)}</p>
                        </div>
                        <div className="text-center">
                            <div className={`${STATUS_COLOR[order.status]} p-2  rounded-lg`}>{STATUS_LABEL[order.status]}</div>
                        </div>
                    </div>

                    {/* 2 cards trên */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

                        {/* Thông tin người đặt */}
                        <div className="bg-white rounded-xl p-5 shadow-sm">
                            <h2 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                                <span>👤</span> Thông tin người đặt
                            </h2>
                            <div className="space-y-3">
                                <InfoRow label="Họ tên" value={order.customer_name} />
                                <InfoRow label="SĐT" value={order.phone} />
                                <InfoRow label="Địa chỉ" value={order.address} />
                                {order.note && <InfoRow label="Ghi chú" value={order.note} />}
                            </div>
                        </div>

                        {/* Tóm tắt */}
                        <div className="bg-white rounded-xl p-5 shadow-sm">
                            <h2 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                                <span>📋</span> Tóm tắt đơn hàng
                            </h2>
                            <div className="space-y-3">
                                <InfoRow label="Số loại SP" value={`${items.length} loại`} />
                                <InfoRow label="Tổng SL" value={`${totalQty} sản phẩm`} />
                            </div>
                            <div className="border-t border-dashed border-gray-200 mt-4 pt-4 flex justify-between items-center">
                                <span className="font-bold text-gray-800 text-sm">Tổng cộng</span>
                                <span className="font-bold text-lg text-red-500">{(order.total).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Danh sách sản phẩm */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-100">
                            <h2 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <span>🛒</span> Sản phẩm trong đơn
                            </h2>
                        </div>

                        {/* Table header */}
                        <div className="grid grid-cols-12 px-5 py-2.5 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                            <div className="col-span-5">Sản phẩm</div>
                            <div className="col-span-3 text-right">Đơn giá</div>
                            <div className="col-span-2 text-center">SL</div>
                            <div className="col-span-2 text-right">Thành tiền</div>
                        </div>

                        {/* Table rows */}
                        <div className="divide-y divide-gray-50">
                            {items.map((item) => (
                                <div
                                    key={item.product_id}
                                    className="grid grid-cols-12 px-5 py-4 items-center hover:bg-blue-50/40 transition-colors"
                                >
                                    <div className="col-span-5 flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-lg shrink-0">
                                            🐟
                                        </div>
                                        <span className="text-sm font-medium text-gray-800 leading-tight">
                                            {item.product_name}
                                        </span>
                                    </div>
                                    <div className="col-span-3 text-right text-sm text-gray-500">
                                        {(item.price).toLocaleString()}
                                    </div>
                                    <div className="col-span-2 flex justify-center">
                                        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                            {item.qty}
                                        </span>
                                    </div>
                                    <div className="col-span-2 text-right text-sm font-semibold text-gray-800">
                                        {(item.price * item.qty).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer tổng */}
                        <div className="grid grid-cols-12 px-5 py-4 bg-red-50 border-t border-red-100">
                            <div className="col-span-10 text-right text-sm font-bold text-gray-700 pr-4">
                                Tổng cộng
                            </div>
                            <div className="col-span-2 text-right text-base font-bold text-red-500">
                                {(order.total).toLocaleString()}
                            </div>
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </>
    );
}

// ─── InfoRow ───────────────────────────────────────────────
const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between items-start gap-3">
        <span className="text-xs text-gray-400 shrink-0">{label}</span>
        <span className="text-sm font-medium text-gray-800 text-right">{value}</span>
    </div>
);