//lib
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    X, Save,
    DollarSign, Box, ImageUp, ImageIcon,
    Loader2, MapPin, Weight
} from "lucide-react";

//zustand 
import { useToastStore } from "../store/useToastStore";

//hooks
import { useProductMutations } from "../hooks/product/useProductMutation";
import { useCategoryList } from "../hooks/category/useCategoryList";

//types
import type { Product, ProductFormProps } from "../types/product";
import type { Category } from "../types/category";




export default function ProductModal({ isOpen, onClose, initialData }: ProductFormProps) {
    const showToast = useToastStore((state) => state.show);
    const isEdit = !!initialData;

    const { categories } = useCategoryList();

    const categoryList = categories?.items || [];

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const {
        createProduct,
        updateProduct,
        isCreating,
        isUpdating,
        uploadImage,
        isUploadingImage
    } = useProductMutations(initialData?.id?.toString());

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<Product>({
        // Fix lỗi ép kiểu Product 
        values: (initialData || {
            name: "",
            slug: "",
            price: 0,
            sale_price: 0,
            stock: 0,
            image_url: "",
            description: "",
            origin: "",
            weight: "",
            category_id: 0
        }) as Product
    });



    useEffect(() => {
        if (!isOpen) return;

        if (isEdit && initialData?.image_url) {
            setPreviewUrl(initialData.image_url);
        } else {
            setPreviewUrl("");
            setSelectedFile(null);
        }

        // Cleanup function để giải phóng bộ nhớ khi component unmount hoặc deps thay đổi
        return () => {
            if (previewUrl && previewUrl.startsWith("blob:")) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [isOpen, isEdit, initialData?.id]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                showToast("Vui lòng chọn đúng định dạng hình ảnh!", "error");
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                showToast("Ảnh quá nặng (tối đa 5MB)!", "error");
                return;
            }
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (data: Product) => {
        let finalImageUrl = data.image_url;

        if (selectedFile) {
            try {
                const uploadResult = await uploadImage(selectedFile);
                finalImageUrl = uploadResult.imageUrl;
            } catch {
                // Fix lỗi 'error' is defined but never used
                showToast("Lỗi khi tải ảnh lên hệ thống!", "error");
                return;
            }
        }

        const formattedData = {
            ...data,
            image_url: finalImageUrl,
            price: Number(data.price),
            sale_price: data.sale_price ? Number(data.sale_price) : null,
            stock: Number(data.stock),
            category_id: Number(data.category_id)
        };

        if (isEdit && initialData?.id) {
            updateProduct({ id: initialData.id, productData: formattedData }, {
                onSuccess: () => {
                    showToast(`Đã cập nhật ${data.name}`, "success");
                    onClose();
                },
                onError: () => showToast("Lỗi cập nhật sản phẩm", "error")
            });
        } else {
            createProduct(formattedData, {
                onSuccess: () => {
                    showToast(`Đã đăng bán ${data.name}`, "success");
                    reset();
                    onClose();
                },
                onError: () => showToast("Lỗi khi tạo sản phẩm mới", "error")
            });
        }
    };

    if (!isOpen) return null;

    const isLoading = isCreating || isUpdating || isUploadingImage;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[95vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#BF4E2C] rounded-2xl shadow-lg shadow-orange-100">
                        </div>
                        <div>
                            <h2 className="text-xl font-extrabold text-gray-800">
                                {isEdit ? "Chỉnh sửa thông tin" : "Thêm hải sản mới"}
                            </h2>
                            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Hệ thống quản lý Seefood</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="hover:bg-gray-200 p-2 rounded-full transition-all group">
                        <X size={20} className="text-gray-400 group-hover:text-gray-600" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 overflow-y-auto space-y-8">
                    {/* Media Upload */}
                    <div className="space-y-3">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <ImageIcon size={16} className="text-[#BF4E2C]" /> Hình ảnh sản phẩm
                        </label>
                        <div className="flex items-center gap-6 p-6 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/30 hover:border-[#BF4E2C]/40 transition-all group">
                            <div className="w-32 h-32 rounded-2xl bg-white shrink-0 overflow-hidden border border-gray-100 flex items-center justify-center relative shadow-inner">
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-center">
                                        <ImageIcon className="text-gray-200 mx-auto" size={40} />
                                        <p className="text-[10px] text-gray-400 mt-1">Chưa có ảnh</p>
                                    </div>
                                )}
                                {isUploadingImage && (
                                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                                        <Loader2 className="text-[#BF4E2C] animate-spin" size={32} />
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 space-y-3">
                                <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#BF4E2C] text-white text-sm font-bold rounded-xl cursor-pointer hover:bg-[#a33d21] transition-all shadow-md shadow-orange-100">
                                    <ImageUp size={18} />
                                    {selectedFile ? "Đổi ảnh khác" : "Chọn ảnh từ máy"}
                                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                                </label>
                                <div className="text-xs text-gray-400 leading-relaxed">
                                    <p>• Định dạng: .jpg, .png, .webp</p>
                                    <p>• Dung lượng tối đa: 5MB</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* General Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Tên sản phẩm <span className="text-red-500">*</span></label>
                            <input
                                {...register("name", { required: "Tên không được để trống" })}
                                placeholder="VD: Tôm Hùm Alaska"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#BF4E2C]/10 focus:border-[#BF4E2C] outline-none"
                            />
                            {errors.name && <p className="text-red-500 text-xs font-medium italic">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 font-mono">Slug (Đường dẫn)</label>
                            <input
                                {...register("slug", { required: "Slug là bắt buộc" })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 font-mono text-sm outline-none"
                            />
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><DollarSign size={14} /> Giá gốc</label>
                            <input type="number" {...register("price")} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-red-500">Giá KM</label>
                            <input type="number" {...register("sale_price")} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Box size={14} /> Tồn kho</label>
                            <input type="number" {...register("stock")} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none" />
                        </div>
                    </div>

                    {/* Origin & Weight - Fixed TS Error */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><MapPin size={14} /> Xuất xứ</label>
                            <input {...register("origin")} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Weight size={14} /> Trọng lượng</label>
                            <input {...register("weight")} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Danh mục <span className="text-red-500">*</span></label>
                        <select
                            {...register("category_id", { required: "Vui lòng chọn danh mục" })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none"
                        >
                            <option value="">-- Chọn danh mục --</option>
                            {categoryList?.map((cat: Category) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && <p className="text-red-500 text-xs">{errors.category_id.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Mô tả</label>
                        <textarea {...register("description")} rows={4} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none resize-none" />
                    </div>

                    {/* Footer */}
                    <div className="pt-6 border-t flex justify-end gap-4 bg-white sticky bottom-0">
                        <button type="button" onClick={onClose} className="px-8 py-3 border border-gray-200 rounded-2xl font-bold text-gray-500">Hủy</button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-10 py-3 bg-[#BF4E2C] text-white rounded-2xl font-extrabold flex items-center gap-3 disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : <Save />} {isEdit ? "Cập nhật" : "Đăng bán"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}