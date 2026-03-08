import { useState } from "react";
import { useCartStore } from "../store/cartStore";
import api from "../api/axios"
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Checkout() {
    const { items, clearCart } = useCartStore();
    const navigate = useNavigate();
    const { isAuth, user } = useAuthStore();
    const [customerName, setCustomerName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!isAuth) {
            alert("Vui lòng đăng nhập để đặt hàng!");
            return;
        }
        if (items.length === 0) return alert("Giỏ hàng đang trống");
        if (!customerName || !phone || !address) return alert("Vui lòng điền đủ thông tin bắt buộc");

        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const res = await api.post("/order/create", {
                userId: user.id,
                customerName,
                phone,
                address,
                note,
                items: items.map((i) => ({
                    productId: i.productId,
                    qty: i.qty,
                })),
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            clearCart();
            alert("Đặt hàng thành công. Mã đơn: " + res.data.id);
            navigate("/");
        } catch (err: unknown) {
            alert(err.response?.data?.error || "Lỗi hệ thống");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto p-4 md:py-10">
                <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 border-b pb-4">Thanh toán</h1>

                {/*  */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* */}
                    <div className="md:col-span-2 space-y-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold mb-4 text-[#BF4E2C]">Thông tin nhận hàng</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-600">Họ và tên *</label>
                                <input
                                    placeholder="Nguyễn Văn A"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#2C8DE0] outline-none transition-all"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-600">Số điện thoại *</label>
                                <input
                                    placeholder="09xxx..."
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#2C8DE0] outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-600">Địa chỉ giao hàng *</label>
                            <input
                                placeholder="Số nhà, tên đường, phường/xã..."
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#2C8DE0] outline-none transition-all"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-600">Ghi chú đơn hàng</label>
                            <textarea
                                rows={4}
                                placeholder="Lời nhắn cho cửa hàng hoặc tài xế..."
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#2C8DE0] outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* */}
                    <div className="md:col-span-1">
                        <div className="bg-white p-6 rounded-2xl shadow-md border-2 border-[#2C8DE0] sticky top-4">
                            <h2 className="text-lg font-semibold mb-4">Đơn hàng của bạn</h2>

                            {/* */}
                            <div className="max-h-60 overflow-y-auto mb-4 border-b pb-4 space-y-2">
                                {items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between text-sm">
                                        <span className="text-gray-600 truncate max-w-[150px]">{item.name || "Sản phẩm"}</span>
                                        <span className="font-medium text-gray-900">x{item.qty}</span>
                                    </div>
                                ))}
                                {items.length === 0 && <p className="text-gray-400 italic">Chưa có sản phẩm</p>}
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform active:scale-95 
                                    ${loading
                                        ? "bg-gray-300 cursor-not-allowed"
                                        : "bg-[#2C8DE0] text-white hover:bg-white hover:text-[#2C8DE0] border-2 border-[#2C8DE0]"
                                    }`}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Đang xử lý...
                                    </span>
                                ) : "Xác nhận đặt hàng"}
                            </button>

                            <p className="text-xs text-center text-gray-400 mt-4">
                                Bằng cách đặt hàng, bạn đồng ý với các điều khoản của chúng tôi.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}