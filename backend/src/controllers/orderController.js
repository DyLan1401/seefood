import * as orderService from '../services/orderService.js';

//lấy đơn hàng
export const getAllOrders = async (req, res) => {
    try {
        //
        const data = await orderService.getOrders();
        //check 
        if (!data) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng!!!" });
        }
        //
        res.status(200).json(data);
        //
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

//thêm đơn hàng mới
export const createOrder = async (req, res) => {
    try {
        console.log("Dữ liệu Body:", req.body);
        console.log("Dữ liệu Admin từ Token:", req.user);
        const { userId, customerName, phone, address, note, items } = req.body;
        //
        // Kiểm tra thông tin khách hàng ở đây 
        if (!customerName || !phone || !address) {
            return res.status(400).json({ message: "Thiếu thông tin giao hàng" });
        }
        //
        const newOrder = await orderService.addOrder({ userId, customerName, phone, address, note, items });
        //
        res.status(201).json(newOrder);
        //
    } catch (error) {
        console.error("Order Error:", error);
        res.status(400).json({ error: error || "Lỗi khi tạo đơn hàng" });
    }
};

//lấy chi tiết đơn hàng
export const getOrderDetail = async (req, res) => {
    try {
        const { id } = req.params;
        //
        const data = await orderService.getOrderDetail({ id });
        //// Kiểm tra nếu không có dữ liệu trả về
        if (!data) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
        };
        //
        res.status(200).json(data);
        //
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy dữ liệu" });
    }
};

//cập nhật đơn hàng
export const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        //
        const data = await orderService.updateOrder(id, status);
        //Kiểm tra nếu không có dữ liệu trả về
        if (!data) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng để cập nhật" });
        }
        //
        res.status(200).json(data);
        //
    } catch (error) {
        res.status(500).json({ error: error });
    }
};


//lịch sử đơn hàng
export const getMyOrders = async (req, res) => {
    try {
        const userId = req.user?.id;
        console.log("req.user đầy đủ:", req.user); // Xem toàn bộ object
        console.log("userId:", userId);

        if (!userId) {
            return res.status(401).json({ message: "Không tìm thấy thông tin người dùng" });
        }

        const data = await orderService.getOrdersByUserId(userId);
        console.log("Kết quả query:", data);
        res.status(200).json(data || []);
    } catch (error) {
        // Log toàn bộ error object, không chỉ message
        console.error("Lỗi Controller đầy đủ:", error);
        res.status(500).json({ message: "Lỗi hệ thống", detail: error.message });
    }
};