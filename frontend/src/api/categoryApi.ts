import api from "../api/axios"
import type { Category } from "../types/category";

//danh sách danh mục
export const fetchCategoryList = async () => {
    const res = await api.get(`/category/all`)
    return res.data;
};

//tạo danh mục
export const fetchCreateCategory = async (categoryData: Omit<Category, 'id'>) => {
    const { data } = await api.post("/category/create", categoryData);
    return data;
};

//cập nhật danh mục
export const fetchUpdateCategory = async ({ id, categoryData }: { id: string; categoryData: Partial<Category> }) => {
    const { data } = await api.put(`/category/update/${id}`, categoryData);
    return data;
};

//xóa danh mục
export const fetchDeleteCategory = async (id: string) => {
    const { data } = await api.delete(`/category/delete/${id}`)
    return data;
}

//chi tiết danh mục
export const fetchCategoryDetail = async (id: string) => {
    const { data } = await api.get(`/category/${id}`)
    return data;
}

//upload file
export const uploadCategoryImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file); // Phải đúng  với upload.single('image')
    const { data } = await api.post("/category/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return data;
};

