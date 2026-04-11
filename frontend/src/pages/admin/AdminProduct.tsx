//lib
import { useState } from 'react';
import { Trash2, SquarePen, ImageIcon, Plus, PackageOpen } from 'lucide-react';

//components
import ProductModal from "../../component/ProductModal";

//zustand
import { useToastStore } from "../../store/useToastStore";

//hooks
import { useProductList } from "../../hooks/product/useProductList";
import { useProductMutations } from "../../hooks/product/useProductMutation";
import { useCategoryList } from "../../hooks/category/useCategoryList";

//skeleton
import { TableRowSkeleton } from "../../component/Skeleton";

//types
import type { Product } from "../../types/product";
import type { Category } from '../../types/category';

export default function AdminProducts() {
    const showToast = useToastStore((state) => state.show);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const { products, isLoading: isLoadingProducts } = useProductList();
    const { deleteProduct, isDeleting } = useProductMutations();

    // thêm danh mục
    const { categories } = useCategoryList();

    // tạo map { id -> name } để lookup O(1) thay vì find() mỗi lần render
    const categoryMap = new Map(
        categories?.items?.map((c: Category) => [c.id, c.name]) ?? []
    );

    const productList = products?.items || [];

    const handleAddClick = () => {
        setSelectedProduct(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-black text-gray-800 tracking-tight">
                        Quản Lý Sản Phẩm
                    </h1>
                    <p className="text-sm text-gray-500 font-medium">
                        Danh sách các mặt hàng hải sản trên hệ thống
                    </p>
                </div>
                <button
                    onClick={handleAddClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-100"
                >
                    <Plus size={20} /> Thêm sản phẩm
                </button>
            </div>

            {/* Content */}
            {isLoadingProducts ? (
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <tbody>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <TableRowSkeleton key={i} cols={5} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : productList.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <PackageOpen size={48} className="mx-auto text-gray-200 mb-4" />
                    <p className="text-gray-400 font-medium">
                        Chưa có sản phẩm nào trong kho hàng.
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs uppercase font-black text-gray-400 tracking-widest">
                                        Sản phẩm
                                    </th>
                                    <th className="px-6 py-4 text-xs uppercase font-black text-gray-400 tracking-widest">
                                        Giá bán
                                    </th>
                                    <th className="px-6 py-4 text-xs uppercase font-black text-gray-400 tracking-widest">
                                        Danh mục
                                    </th>
                                    <th className="px-6 py-4 text-xs uppercase font-black text-gray-400 tracking-widest hidden md:table-cell">
                                        Mô tả
                                    </th>
                                    <th className="px-6 py-4 text-xs uppercase font-black text-gray-400 tracking-widest text-center">
                                        Hành động
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {productList.map((p: Product) => (
                                    <tr
                                        key={p.id}
                                        className="hover:bg-blue-50/30 transition-colors group"
                                    >
                                        {/* Tên & ảnh */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-2xl bg-gray-100 overflow-hidden border border-gray-100 shadow-sm shrink-0">
                                                    {p.image_url ? (
                                                        <img
                                                            src={p.image_url}
                                                            alt={p.name}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                    ) : (
                                                        <ImageIcon className="w-full h-full p-3 text-gray-300" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-800 line-clamp-1">
                                                        {p.name}
                                                    </p>
                                                    <p className="text-[10px] text-gray-400 font-mono tracking-tighter">
                                                        SLUG: {p.slug}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Giá */}
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                {p.sale_price ? (
                                                    <>
                                                        <span className="text-red-600 font-black text-sm">
                                                            {p.sale_price.toLocaleString()}đ
                                                        </span>
                                                        <span className="text-gray-400 line-through text-[10px] font-bold">
                                                            {p.price.toLocaleString()}đ
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="text-blue-600 font-black text-sm">
                                                        {p.price.toLocaleString()}đ
                                                    </span>
                                                )}
                                            </div>
                                        </td>

                                        {/* Danh mục — hiển thị tên thay vì ID */}
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold">
                                                {String(categoryMap.get(p.category_id as number) ?? "Chưa phân loại")}
                                            </span>
                                        </td>
                                        {/* Mô tả */}
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <p className="max-w-45 text-gray-400 text-xs italic truncate">
                                                {p.description || "Chưa có mô tả..."}
                                            </p>
                                        </td>

                                        {/* Hành động */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleEditClick(p)}
                                                    title="Sửa sản phẩm"
                                                    className="p-2.5 text-blue-600 hover:bg-blue-100 rounded-xl transition-all"
                                                >
                                                    <SquarePen size={18} />
                                                </button>
                                                <button
                                                    disabled={isDeleting}
                                                    onClick={() => {
                                                        if (window.confirm(`Xác nhận xóa: ${p.name}?`)) {
                                                            deleteProduct(p.id, {
                                                                onSuccess: () =>
                                                                    showToast(`Đã xóa ${p.name}`, "success"),
                                                                onError: () =>
                                                                    showToast("Lỗi khi xóa sản phẩm", "error"),
                                                            });
                                                        }
                                                    }}
                                                    title="Xóa sản phẩm"
                                                    className="p-2.5 text-red-500 hover:bg-red-100 rounded-xl transition-all"
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

            {/* Modal */}
            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialData={selectedProduct}
            />
        </div>
    );
}