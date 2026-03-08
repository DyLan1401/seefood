import pool from "../utils/db.js";

//lấy đơn hàng
export const getOrders = async () => {
    const [rows] = await pool.query(
        ` SELECT id,customer_name,phone,address,note,total,status,created_at FROM orders ORDER BY id DESC`
    );
    return rows;
};

//thêm mới đơn hàng
export const addOrder = async ({ userId, customerName, phone, address, note = "", items }) => {
    //
    const conn = await pool.getConnection();
    //
    try {

        // 1. Kiểm tra giỏ hàng
        if (!items || items.length === 0) throw new Error("Giỏ hàng rỗng");
        //
        const productIds = items.map((x) => x.productId);
        const [products] = await pool.query(
            `SELECT id, name, price, sale_price FROM products WHERE id IN (${productIds.map(() => "?").join(",")})`,
            productIds
        );
        //
        if (products.length !== productIds.length) throw new Error("Một số sản phẩm không tồn tại");
        //
        const productMap = new Map(products.map((p) => [p.id, p]));
        let total = 0;
        //
        const orderItems = items.map((it) => {
            const p = productMap.get(it.productId);
            const unitPrice = p.sale_price ?? p.price;
            const qty = Number(it.qty);
            if (!qty || qty <= 0) throw new Error("Số lượng không hợp lệ");
            total += unitPrice * qty;
            return { productId: p.id, productName: p.name, price: unitPrice, qty };
        });
        // 2. Thực hiện Transaction
        await conn.beginTransaction();
        //
        const [orderResult] = await conn.query(
            `INSERT INTO orders (user_id, customer_name, phone, address, note, total, status) VALUES (?,?,?,?,?,?, 'pending')`,
            [userId, customerName, phone, address, note, total]
        );
        //
        const orderId = orderResult.insertId;
        // Lưu danh sách món hàng
        for (const oi of orderItems) {
            await conn.query(
                `INSERT INTO order_items (order_id, product_id, product_name, price, qty) VALUES (?,?,?,?,?)`,
                [orderId, oi.productId, oi.productName, oi.price, oi.qty]
            );
        }
        //
        await conn.commit();
        //
        return { id: orderId, total, status: "pending" }; // Trả về data thuần
    } catch (error) {
        await conn.rollback(); // Nếu lỗi thì hoàn tác
        throw error; // Ném lỗi cho Controller xử lý
    } finally {
        conn.release(); // Giải phóng kết nối
    }
};

//lấy chi tiết đơn hàng
export const getOrderDetail = async ({ id }) => {
    const [orders] = await pool.query(
        "SELECT id,customer_name,phone,address,note,total,status,created_at FROM orders WHERE id = ? LIMIT 1", [id]
    );
    //
    if (orders.length === 0) {
        return res.status(404).json({ error: "không tìm thấy đơn hàng" });
    }
    //
    const [items] = await pool.query(
        "SELECT product_id, product_name,price,qty FROM order_items WHERE order_id = ?", [id]
    );
    //
    return {
        order: orders[0],
        items
    };
};

//cập nhật đơn hàng
export const updateOrder = async ({ id, status }) => {
    //
    const allowed = ["pending", "confirmed", "shipping", "done", "canceled"];
    //
    if (!allowed.includes(status)) {
        return res.status(404).json({ error: "không tìm thấy status" });
    }
    //
    const [reuslt] = await pool.query(
        "UPDATE orders SET status = ? WHERE id = ?", [status, id]
    );
    //
    if (reuslt.affectedRows === 0) {
        return res.status(404).json({ error: "không tìm thấy đơn hàng" });
    }
    //
    return reuslt;
};

//lịch sử đơn hàng
export const getOrdersByUserId = async (userId) => {
    const [rows] = await pool.query(
        'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
        [userId]
    );
    return rows;


};