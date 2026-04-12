import api from "../api/axios"
import type { User } from "../types/user";

//danh sách người dùng
export const fetchUserList = async (page: number = 1) => {
    const res = await api.get(`/user/all?page=${page}`)
    return res.data;
};

//đăng nhập
export const fetchLogin = async (email: string, password: string) => {
    const { data } = await api.post(`/user/login`, { email, password })
    return data;
};

//đăng kí
export const fetchRegister = async (email: string, password: string) => {
    const { data } = await api.post(`/user/register`, { email, password })
    return data;
};

//cập nhật người dùng
export const fetchUpdateUser = async ({ id, ...data }: User) => {
    const response = await api.put(`/user/update/${id}`, data);
    return response.data;
};

//xóa người dùng
export const fetchDeleteUser = async (id: string) => {
    const { data } = await api.delete(`/user/delete/${id}`)
    return data;
};

//chi tiết người dùng
export const fetchUserDetail = async (id: string) => {
    const { data } = await api.delete(`/user/${id}`)
    return data;
}

