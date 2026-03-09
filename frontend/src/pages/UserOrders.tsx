import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import Header from "../component/Header";
import Footer from "../component/Footer";
export default function MyOrders() {

    type Order = {
        id: number
        created_at: string;
        total: number
    }
    const { data: orders, isError, isLoading } = useQuery({
        queryKey: ['my-orders'],
        queryFn: async () => {
            const res = await api.get('/order/my-orders');
            return res.data;
        },
        retry: 0
    });


    // Trạng thái đang tải
    if (isLoading) return <div className="p-10 text-center animate-pulse">Đang tải đơn hàng...</div>;

    // Trạng thái lỗi
    if (isError) return (
        <div className="p-10 text-center text-red-500 bg-red-50 rounded-lg m-4">
            Không thể kết nối với máy chủ. Vui lòng thử lại sau.
        </div>
    );

    // Trạng thái không có dữ liệu
    if (!orders || orders.length === 0) return (
        <div className="p-10 text-center border-2 border-dashed border-gray-200 rounded-xl m-4 text-gray-500">
            Bạn chưa có đơn hàng nào trong lịch sử.
        </div>
    );

    return (
        <div className="mx-auto container">
            <Header />
            <div className="container mx-auto p-4  max-w-4xl">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Lịch sử đơn hàng</h1>

                {/* */}
                <div className="grid grid-cols-1 gap-4">
                    {orders.map((order: Order) => (
                        <div
                            key={order.id}
                            className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                        >
                            <div className="flex items-center gap-4">
                                {/* */}
                                <div className="bg-blue-50 p-3 rounded-lg text-blue-600 font-bold hidden sm:block">
                                    #{order.id}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 sm:text-lg">
                                        Đơn hàng #{order.id}
                                    </h3>
                                    <p className="text-sm text-gray-500 italic">
                                        Ngày đặt: {new Date(order.created_at).toLocaleDateString('vi-VN')}
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center sm:text-right border-t sm:border-none pt-3 sm:pt-0">
                                <span className="sm:hidden text-gray-500 text-sm italic">Tổng tiền:</span>
                                <span className="text-xl font-bold text-orange-600">
                                    {order.total?.toLocaleString() || 0}đ
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            <Footer />

        </div>
    );
}