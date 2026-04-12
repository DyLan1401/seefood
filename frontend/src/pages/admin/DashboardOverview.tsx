import { useMemo } from 'react';
import {
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line
} from 'recharts';
import { ShoppingBag, Users, Layers, DollarSign, TrendingUp, Loader2 } from 'lucide-react';

// Hooks & Types
import { useProductList } from '../../hooks/product/useProductList';
import { useUserList } from '../../hooks/user/useUserList';
import { useOrderList } from '../../hooks/order/useOrderList';
import { useOrderStats } from '../../hooks/order/useOrderStats';


export default function DashboardOverview() {

    const { products = [], pagination: paginationProducts, isLoading: isLoadingProduct } = useProductList();
    const { users = [], pagination: paginationUsers, isLoading: isLoadingUser } = useUserList();
    const { pagination: paginationOrders, isLoading: isLoadingOrder } = useOrderList();
    const { stats: orderStats, isLoading: isLoadingStats } = useOrderStats();

    const isLoading = isLoadingProduct || isLoadingUser || isLoadingOrder || isLoadingStats;




    const stats = useMemo(() => ({
        revenue: new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(orderStats?.totalRevenue ?? 0),
        ordersCount: orderStats?.totalOrders ?? paginationOrders?.totalItems ?? 0,
        productsCount: paginationProducts?.totalItems ?? products.length,
        usersCount: paginationUsers?.totalItems ?? users.length,
    }), [orderStats, paginationOrders, paginationProducts, paginationUsers, products, users]);


    // Chuyển dailyRevenue từ API thành format cho Recharts
    const revenueData = useMemo(() => {
        if (!orderStats?.dailyRevenue?.length) return [];

        return orderStats.dailyRevenue.map((d: { date: string; revenue: number }) => ({
            name: new Date(d.date).toLocaleDateString("vi-VN", {
                weekday: "short",  // T2, T3...
            }),
            revenue: d.revenue,
        }));
    }, [orderStats]);


    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] text-blue-600">
                <Loader2 className="animate-spin mb-2" size={40} />
                <p className="font-bold animate-pulse">Đang tổng hợp dữ liệu Seafood...</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="mb-8">
                <h1 className="text-2xl font-black text-gray-800 tracking-tight flex items-center gap-2">
                    <TrendingUp className="text-blue-600" /> Hệ thống Seafood Overview
                </h1>
                <p className="text-sm text-gray-500 font-medium">Báo cáo tình hình kinh doanh tổng thể</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard icon={<DollarSign />} label="Doanh thu" value={stats.revenue} color="text-green-600" bg="bg-green-50" />
                <StatCard icon={<ShoppingBag />} label="Đơn hàng" value={stats.ordersCount} color="text-blue-600" bg="bg-blue-50" />
                <StatCard icon={<Layers />} label="Sản phẩm" value={stats.productsCount} color="text-orange-600" bg="bg-orange-50" />
                <StatCard icon={<Users />} label="Người dùng" value={stats.usersCount} color="text-purple-600" bg="bg-purple-50" />
            </div>

            <div className="grid grid-cols-1 gap-8">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 italic">Doanh thu tuần qua</h3>
                    <div className="h-80 w-full">
                        {revenueData.length === 0 ? (
                            // Empty state khi không có data
                            <div className="h-full flex flex-col items-center justify-center text-gray-300">
                                <DollarSign size={48} className="mb-3" />
                                <p className="text-sm font-medium text-gray-400">
                                    Chưa có doanh thu trong 7 ngày qua
                                </p>
                            </div>
                        ) : (<ResponsiveContainer width="100%" height="100%">
                            <LineChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    // Sửa lỗi formatter: kiểm tra value có tồn tại không
                                    formatter={(value) => [value ? `${value.toLocaleString()}đ` : "0đ", "Doanh thu"]}
                                />
                                <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={4} dot={{ r: 6, fill: '#3B82F6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>)}
                    </div>
                </div>
            </div>
        </div>
    );
}

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    color: string;
    bg: string;
}

function StatCard({ icon, label, value, color, bg }: StatCardProps) {
    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 hover:scale-[1.03] transition-all duration-300">
            <div className={`w-14 h-14 ${bg} ${color} flex items-center justify-center rounded-2xl shadow-inner`}>
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] leading-none mb-1.5">{label}</p>
                <p className={`text-xl font-black ${color} tracking-tight`}>{value}</p>
            </div>
        </div>
    );
}