import type { CreateOrderPayload } from "../types/order";
import api from "./axios";

//danhh sách đơn hàng
export const fetchOrderList = async (page: number = 1) => {
    const res = await api.get(`/order/all?page=${page}`);
    return res.data;
};

//chi tiết đơn hàng 
export const fetchOrderDetail = async (id: string) => {
    const { data } = await api.get(`/order/${id}`);
    return data;
};

//tạo đơn hàng
export const fetchCreateOrder = async (orderData: CreateOrderPayload) => {
    const { data } = await api.post(`/order/create`, orderData);
    return data;
};

//cập nhật đơn hàng
export const fetchUpdateOrderStatus = async (id: string, status: string) => {
    const { data } = await api.put(`/order/${id}/status`, { status });
    return data;
};

//đơn hàng cá nhân
export const fetchUSerOrder = async () => {
    const { data } = await api.get(`/order/my-orders`);
    return data;
};

//xóa đơn hàng
export const fetchDeleteOrder = async (id: string) => {
    const { data } = await api.delete(`/order/delete/${id}`);
    return data;
};

