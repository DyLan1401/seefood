import type { CreateOrderPayload } from "../types/order";
import api from "./axios";

export const fetchOrderList = async () => {
    const res = await api.get(`/order/all`);
    return res.data;
};

export const fetchOrderDetail = async (id: string) => {
    const { data } = await api.get(`/order/${id}`);
    return data;
};

export const fetchCreateOrder = async (orderData: CreateOrderPayload) => {
    const { data } = await api.post(`/order/create`, orderData);
    return data;
};

export const fetchUpdateOrderStatus = async (id: string, status: string) => {
    const { data } = await api.put(`/order/${id}/status`, { status });
    return data;
};

export const fetchUSerOrder = async () => {
    const { data } = await api.get(`/order/my-orders`);
    return data;
}

export const fetchDeleteOrder = async (id: string) => {
    const { data } = await api.delete(`/order/${id}`);
    return data;
};

