import { LayoutDashboard, Package, ShoppingCart, Users, FolderTree } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
    { icon: LayoutDashboard, label: "Tổng quan", path: "/admin" },
    { icon: Package, label: "Sản phẩm", path: "/admin/products" },
    { icon: FolderTree, label: "Danh mục", path: "/admin/categories" },
    { icon: ShoppingCart, label: "Đơn hàng", path: "/admin/orders" },
    { icon: Users, label: "Khách hàng", path: "/admin/users" },
];

export default function Sidebar() {
    const { pathname } = useLocation();

    return (
        <div className="p-4 flex flex-col h-full">
            <div className="text-2xl font-bold text-blue-600 mb-8 px-2">SeaFood Admin</div>
            <nav className="space-y-1">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${pathname === item.path
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        <item.icon size={20} />
                        <span className="font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
}