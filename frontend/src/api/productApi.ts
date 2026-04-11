import api from "../api/axios"
import type { Product } from "../types/product";

//danh sách sản phẩm
export const fetchProductList = async () => {
    const res = await api.get(`/product/all`)
    return res.data;
};

// tạo sản phẩm
export const fetchCreateProduct = async (productData: Omit<Product, 'id'>) => {
    const { data } = await api.post("/product/create", productData);
    return data;
};

//cập nhật sản phẩm
export const fetchUpdateProduct = async ({ id, productData }: { id: string; productData: Partial<Product> }) => {
    const { data } = await api.put(`/product/update/${id}`, productData);
    return data;
};

//xóa sản phẩm
export const fetchDeleteproduct = async (id: string) => {
    const { data } = await api.delete(`/product/delete/${id}`)
    return data;
};

//sản phẩm cùng danh mục
export const fetchProductByCategory = async (slug: string) => {
    const { data } = await api.get(`/product/category/${slug}`)
    return data;
}

//chi tiết sản phẩm
export const fetchProductDetail = async (id: string) => {
    const { data } = await api.get(`/product/${id}`)
    return data;
};

//upload file
export const fetchUploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file); // 'image' phải đúng với upload.single('image') 
    const { data } = await api.post('/product/upload-image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return data;
};

