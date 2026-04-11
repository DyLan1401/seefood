//lib
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { checkoutSchema, type CheckoutFormData } from "../lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

//components
import Header from "../component/Header";
import Footer from "../component/Footer";

//hooks
import { useOrderMutations } from "../hooks/order/useOrderMutation";

//zustand
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import { useToastStore } from "../store/useToastStore";


//types
import type { AxiosError } from "axios";
import type { CreateOrderPayload, CreateOrderItem } from "../types/order";


export default function Checkout() {

    // lấy id từ user trong store
    const { isAuth, user } = useAuthStore();
    const { items, clearCart } = useCartStore();
    const showToast = useToastStore((state) => state.show);
    const { createOrder, isCreating } = useOrderMutations();
    const navigate = useNavigate();


    const { register, handleSubmit, formState: { errors } } =
        useForm<CheckoutFormData>({
            resolver: zodResolver(checkoutSchema),  // thêm dòng này
            defaultValues: {
                customerName: user?.email || "",
                phone: "",
                address: "",
                note: "",
            },
        });


    useEffect(() => {
        if (!isAuth) {
            navigate("/login", {
                state: { from: "/checkout" },
                replace: true,
            });
        }
    }, [isAuth, navigate]);


    if (!isAuth) return null;


    const handleOrder = async (data: CheckoutFormData) => {
        //kiểm tra số lượng
        if (items.length === 0) return showToast("Giỏ hàng trống!", "error");

        try {
            const orderPayload: CreateOrderPayload = {
                userId: user?.id as string | number,
                ...data,
                items: items.map((i): CreateOrderItem => ({
                    productId: i.productId,
                    qty: i.qty

                }))
            };

            //
            const res = await createOrder(orderPayload);
            showToast("Đặt hàng thành công! Mã đơn: " + (res.id || res.data?.id), "success");
            clearCart();
            setTimeout(() => navigate("/"), 2000);

        } catch (err: unknown) {
            const axiosError = err as AxiosError<{ message: string }>;
            const errorMsg = axiosError?.response?.data?.message || "Có lỗi xảy ra khi đặt hàng";
            showToast(errorMsg, "error");
        }
    };

    return (
        <>
            <Header />
            {/* Main */}
            <div className="container mx-auto p-4 md:py-10">
                <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 border-b pb-4">Thanh toán</h1>

                {/* Form thông tin nhận hàng */}
                <form
                    onSubmit={handleSubmit(handleOrder)}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold mb-4 text-[#BF4E2C]">Thông tin nhận hàng</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-600">Họ và tên *</label>
                                <input
                                    placeholder="Nguyễn Văn A"
                                    className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#2C8DE0] outline-none transition-all"
                                    {...register("customerName")}
                                />
                                {errors.customerName && <span className="error text-red-500">{errors.customerName.message as string}</span>}

                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-600">Số điện thoại *</label>
                                <input
                                    placeholder="09xxx..."
                                    className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#2C8DE0] outline-none transition-all"
                                    {...register("phone")}
                                />
                                {errors.phone && <span className="error text-red-500">{errors.phone.message as string}</span>}

                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-600">Địa chỉ giao hàng *</label>
                            <input
                                placeholder="Số nhà, tên đường, phường/xã..."
                                className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#2C8DE0] outline-none transition-all"
                                {...register("address")}
                            />
                            {errors.address && <span className="error text-red-500">{errors.address.message as string}</span>}

                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-600">Ghi chú đơn hàng</label>
                            <textarea
                                rows={4}
                                placeholder="Lời nhắn cho cửa hàng hoặc tài xế..."
                                className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#2C8DE0] outline-none transition-all"
                                {...register("note")}
                            />
                            {errors.note && <span className="error text-red-500">{errors.note.message as string}</span>}

                        </div>
                    </div>

                    {/* Tóm tắt đơn hàng */}
                    <div className="md:col-span-1">
                        <div className="bg-white p-6 rounded-2xl shadow-md border-2 border-[#2C8DE0] sticky top-4">
                            <h2 className="text-lg font-semibold mb-4">Đơn hàng của bạn</h2>

                            <div className="max-h-60 overflow-y-auto mb-4 border-b pb-4 space-y-2">
                                {items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between text-sm">
                                        <span className="text-gray-600 truncate max-w-37.5">{item.name || "Sản phẩm"}</span>
                                        <span className="font-medium text-gray-900">x{item.qty}</span>
                                    </div>
                                ))}
                                {items.length === 0 && <p className="text-gray-400 italic">Chưa có sản phẩm</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={isCreating}
                                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform active:scale-95 
                                    ${isCreating
                                        ? "bg-gray-300 cursor-not-allowed"
                                        : "bg-[#2C8DE0] text-white hover:bg-white hover:text-[#2C8DE0] border-2 border-[#2C8DE0]"
                                    }`}
                            >
                                {isCreating ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Đang xử lý...
                                    </span>
                                ) : "Xác nhận đặt hàng"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
}