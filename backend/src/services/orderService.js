import pool from "../utils/db.js";

let ordersCache = {};

export const clearOrdersCache = () => {
    ordersCache = {};
};
//lấy đơn hàng
export const getOrders = async ({ page = 1, limit = 5 }) => {
    const cacheKey = `order_p${page}_l${limit}`;

    const offset = (page - 1) * limit;
    const countSql = `SELECT COUNT(*) as total FROM orders`;
    const [[{ total }]] = await pool.query(countSql);

    const dataSql =
        `SELECT id,customer_name,phone,address,note,total,status,created_at 
        FROM orders
         ORDER BY id DESC
        LIMIT ? OFFSET ?
`;

    const [rows] = await pool.query(dataSql, [limit, offset]);

    // 
    const result = {
        items: rows,
        pagination: {
            totalItems: total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            limit: limit
        }
    };

    ordersCache[cacheKey] = result;


    return result;
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
        clearOrdersCache();
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
        throw new Error("Không tìm thấy đơn hàng");
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
        throw new Error("Trạng thái không hợp lệ");
    }

    //
    const [reuslt] = await pool.query(
        "UPDATE orders SET status = ? WHERE id = ?", [status, id]
    );

    if (reuslt.affectedRows === 0) {
        throw new Error("Không tìm thấy đơn hàng");
    }
    //
    clearOrdersCache();
    return reuslt;
};

//lịch sử đơn hàng
export const getOrdersByUserId = async ({ userId }) => {
    const [rows] = await pool.query(
        'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
        [userId]
    );
    return rows;
};

//xóa đơn hàng
export const deleteOrder = async ({ id }) => {
    const [rows] = await pool.query
        (`DELETE FROM orders where id = ?`
            , [id]
        )
    clearOrdersCache();
    return rows;
};


// Thêm hàm mới cuối file
export const getOrderStats = async () => {
    // Tổng số đơn
    const [[{ totalOrders }]] = await pool.query(
        `SELECT COUNT(*) as totalOrders FROM orders`
    );

    // Doanh thu từ đơn done
    const [[{ totalRevenue }]] = await pool.query(
        `SELECT COALESCE(SUM(total), 0) as totalRevenue 
         FROM orders WHERE status = 'done'`
    );

    // Doanh thu theo từng ngày trong 7 ngày gần nhất
    const [dailyRevenue] = await pool.query(
        `SELECT 
            DATE(created_at) as date,
            COALESCE(SUM(total), 0) as revenue
         FROM orders
         WHERE status = 'done'
           AND created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
         GROUP BY DATE(created_at)
         ORDER BY date ASC`
    );

    return { totalOrders, totalRevenue: Number(totalRevenue), dailyRevenue };
};