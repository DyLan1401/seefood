import { useState } from "react";
import { useCartStore } from "../store/cartStore";
import api from "../api/axios"
import { Link, useNavigate } from "react-router-dom";

export default function Checkout() {
    const { items, clearCart } = useCartStore();
    const navigate = useNavigate();

    const [customerName, setCustomerName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (items.length === 0) return alert("Cart is empty");
        if (!customerName || !phone || !address)
            return alert("Missing info");

        try {
            setLoading(true);

            const res = await api.post("/orders", {
                customerName,
                phone,
                address,
                note,
                items: items.map((i) => ({
                    productId: i.productId,
                    qty: i.qty,
                })),
            });

            clearCart();
            navigate("/");

            alert("Đặt hàng thành công. Mã đơn: " + res.data.id);
        } catch (err: unknown) {
            alert(err.response?.data?.error || "Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Checkout</h1>

            <input
                placeholder="Tên"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="border p-2 w-full mb-2"
            />
            <input
                placeholder="SĐT"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border p-2 w-full mb-2"
            />
            <input
                placeholder="Địa chỉ"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border p-2 w-full mb-2"
            />
            <textarea
                placeholder="Ghi chú"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="border p-2 w-full mb-2"
            />

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-[#2C8DE0] hover:text-[#2C8DE0] ease-in-out duration-500 border-2  hover:bg-white rounded-lg text-white w-full py-4"
            >
                {loading ? "Đang xử lý..." : "Tiến hành đặt hàng"}
            </button>

        </div >
    );
}