//lib
import { useState } from 'react';
import { Trash2, SquarePen, ImageIcon, Plus } from 'lucide-react';

//components
import CategoryModal from "../../component/CategoryModal";
import { TableRowSkeleton } from "../../component/Skeleton";

//zustands
import { useToastStore } from "../../store/useToastStore";

//hooks
import { useCategoryList } from "../../hooks/category/useCategoryList";
import { useCategoryMutations } from '../../hooks/category/useCategoryMutation';


//types
import type { Category } from "../../types/category";

export default function AdminCategories() {
    const showToast = useToastStore((state) => state.show);

    // States 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const { categories, isLoading, } = useCategoryList();
    const { deleteCategory, isDeleting, isUpdating } = useCategoryMutations();

    const categoryList = categories?.items || [];

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setSelectedCategory(null);
        setIsModalOpen(true);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-black text-gray-800 tracking-tight">Quản Lý Danh Mục</h1>
                    <p className="text-sm text-gray-500 font-medium">Quản lý các loại sản phẩm Seefood</p>
                </div>
                <button
                    onClick={handleAddNew}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-100"
                >
                    <Plus size={20} /> Thêm danh mục
                </button>
            </div>

            {/* List Section */}
            {isLoading ? (
                <table className="w-full">
                    <tbody>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <TableRowSkeleton key={i} cols={5} />
                        ))}
                    </tbody>
                </table>
            ) : categoryList.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <p className="text-gray-400 font-medium">Chưa có danh mục nào được tạo.</p>
                </div>
            ) : (
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-xs uppercase font-black text-gray-400 tracking-widest">Danh mục</th>
                                <th className="px-6 py-4 text-xs uppercase font-black text-gray-400 tracking-widest">Đường dẫn (Slug)</th>
                                <th className="px-6 py-4 text-xs uppercase font-black text-gray-400 tracking-widest text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {categoryList.map((c: Category) => (
                                <tr key={c.id} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-gray-100 overflow-hidden border border-gray-100 shadow-sm">
                                                {c.image_url ? (
                                                    <img src={c.image_url} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                ) : (
                                                    <ImageIcon className="w-full h-full p-3 text-gray-300" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800">{c.name}</p>
                                                <p className="text-[10px] text-gray-400 font-mono">ID: #{c.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-xs font-mono">{c.slug}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                disabled={isUpdating}
                                                onClick={() => handleEdit(c)}
                                                className="p-2.5 text-blue-600 hover:bg-blue-100 rounded-xl transition-all"
                                            >
                                                <SquarePen size={18} />
                                            </button>
                                            <button
                                                disabled={isDeleting}
                                                onClick={() => {
                                                    if (window.confirm(`Xóa danh mục "${c.name}"?`)) {
                                                        deleteCategory(c.id, {
                                                            onSuccess: () => showToast(`Đã xóa danh mục ${c.name}`, "success"),
                                                            onError: () => showToast(`Đã bị lỗi khi xóa danh mục ${c.name}`, "success")

                                                        });
                                                    }
                                                }}
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
            )}

            {/* Modal  */}
            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialData={selectedCategory}
            />
        </div>
    );
}