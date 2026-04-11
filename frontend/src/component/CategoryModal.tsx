//lib
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { X, Save, ImageIcon, Loader2, Tag, Upload } from "lucide-react";

//zustand
import { useToastStore } from "../store/useToastStore";

//hooks
import { useCategoryMutations } from "../hooks/category/useCategoryMutation";

//types
import type { Category, CategoryModalProps } from "../types/category";



export default function CategoryModal({ isOpen, onClose, initialData }: CategoryModalProps) {
    const showToast = useToastStore((state) => state.show);
    const isEdit = !!initialData;

    //state
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");



    //custom hook
    const {
        createCategory,
        updateCategory,
        uploadImage,
        isCreating,
        isUpdating,
        isUploadingImage
    } = useCategoryMutations(initialData?.id);

    //react hook form
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Category>({
        values: (initialData || { name: "", slug: "", image_url: "" }) as Category
    });


    //
    useEffect(() => {
        if (isOpen) {
            setPreviewUrl(initialData?.image_url || "");
            setSelectedFile(null);
        }
    }, [isOpen, initialData]);

    //
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    //xử lí tạo
    const onSubmit = async (data: Category) => {
        let finalImageUrl = initialData?.image_url || "";

        if (selectedFile) {
            try {
                // Sử dụng mutateAsync từ hook để đợi lấy URL ảnh trả về
                const res = await uploadImage(selectedFile);
                finalImageUrl = res.imageUrl;
            } catch (err) {
                console.log(err);
                showToast("Không thể tải ảnh lên hệ thống", "error");
                return;
            }
        }
        const payload = { ...data, image_url: finalImageUrl };

        if (isEdit && initialData?.id) {
            updateCategory({ id: initialData.id, categoryData: payload }, {
                onSuccess: () => { showToast("Cập nhật thành công", "success"); onClose(); }
            });
        } else {
            createCategory(payload, {
                onSuccess: () => { showToast("Thêm mới thành công", "success"); reset(); onClose(); }
            });
        }
    };

    if (!isOpen) return null;

    const isGlobalLoading = isCreating || isUpdating || isUploadingImage;

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
                <div className="p-6 border-b flex justify-between items-center bg-gray-50/80">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-600 rounded-lg text-white"><Tag size={20} /></div>
                        <h2 className="text-xl font-bold text-gray-800">{isEdit ? "Sửa danh mục" : "Thêm danh mục"}</h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full"><X size={20} /></button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
                    {/* Upload ảnh */}
                    <div className="flex flex-col items-center gap-4 p-4 border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50">
                        <div className="w-24 h-24 rounded-2xl bg-white border shadow-sm overflow-hidden flex items-center justify-center relative">
                            {previewUrl ? (
                                <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                            ) : (
                                <ImageIcon className="text-gray-300" size={40} />
                            )}
                            {isUploadingImage && <div className="absolute inset-0 bg-white/70 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" /></div>}
                        </div>
                        <label className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-all shadow-sm">
                            <Upload size={16} /> Chọn ảnh đại diện
                            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                        </label>
                    </div>


                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-700">Tên danh mục</label>
                            <input {...register("name", { required: true })} placeholder="VD: Cá Tươi" className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 transition-all" />
                        </div>
                        {errors.name && <span className="error">{errors.name.message as string}</span>}

                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-700">Slug</label>
                            <input {...register("slug", { required: true })} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 font-mono text-sm" />
                        </div>
                        {errors.slug && <span className="error">{errors.slug.message as string}</span>}
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 py-3 font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-all">Hủy</button>
                        <button disabled={isGlobalLoading} type="submit" className="flex-2 py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-100">
                            {isGlobalLoading ? <Loader2 className="animate-spin" /> : <Save size={18} />}
                            {isEdit ? "Lưu thay đổi" : "Tạo danh mục"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}