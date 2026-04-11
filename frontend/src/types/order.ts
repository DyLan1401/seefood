export interface Order {
    id: string;
    customer_name: string;
    phone: string;
    address: string;
    note: string;
    total: number;
    status: string;
    created_at: string;
    total_price: number | null;
}


export interface OrderItem {
    product_id: number;
    product_name: string;
    price: number;
    qty: number;
}

export interface OrderInfo {
    id: number;
    customer_name: string;
    phone: string;
    address: string;
    note: string;
    total: number;
    status: string;
    created_at: string;
}

export interface OrderDetailData {
    order: OrderInfo;
    items: OrderItem[];
}


//sản phẩm trong đơn hàng
export interface CreateOrderItem {
    productId: string | number;
    qty: number;
}

//tạo đơn hàng
export interface CreateOrderPayload {
    userId: string | number;
    customerName: string;
    phone: string;
    address: string;
    note?: string;
    items: CreateOrderItem[];
}


