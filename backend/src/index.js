import dotenv from "dotenv";
dotenv.config();

//
import express from "express";
import cors from "cors";
import pool from "./db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//
const app = express();
app.use(cors());
app.use(express.json());


//middleware
const requireAdmin = (req, res, next) => {
    try {

        const header = req.headers.authorization;
        if (!header || !header.startsWith("Bearer")) {
            return res.status(401).json({ error: err.message })

        }
        const token = header.split(" ")[1];

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = payload;
        next();
    } catch (err) {
        res.status(401).json({ error: err.message })
    }
};


//lấy danh sách đơn hàng
app.get("/api/orders", requireAdmin, async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT id,customer_name,phone,address,note,total,status,created_at FROM orders ORDER BY id DESC"
        );
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

//chi tiết đơn hàng
app.get("/api/orders/:id", requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        const [orders] = await pool.query(
            "SELECT id,customer_name,phone,address,note,total,status,created_at FROM orders WHERE id = ? LIMIT 1", [id]
        );
        if (orders.length === 0) {
            return res.status(404).json({ error: "không tìm thấy đơn hàng" });
        }

        const [items] = await pool.query(
            "SELECT product_id, product_name,price,qty FROM order_items WHERE order_id = ?", [id]
        );
        res.json({ order: orders[0], items })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


//cập nhật status đơn hàng
app.put("/api/orders/:id/status", requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const allowed = ["pending", "confirmed", "shipping", "done", "canceled"];
        if (!allowed.includes(status)) {
            return res.status(404).json({ error: "không tìm thấy status" });
        }
        const [reuslt] = await pool.query(
            "UPDATE orders SET status = ? WHERE id = ?", [status, id]
        );
        if (reuslt.affectedRows === 0) {
            return res.status(404).json({ error: "không tìm thấy đơn hàng" });
        }


        res.json({ id: Number(id), status })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


//thêm đơn hàng
app.post("/api/orders", async (req, res) => {
    const conn = await pool.getConnection();
    try {

        const { customerName, phone, address, note = "", items } = req.body;

        if (!customerName || !phone || !address) {
            return res.status(500).json({ error: "Quên thông tin Khách hàng" });
        }

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: "Giỏ hàng rỗng" });
        }

        const productIds = items.map((x) => x.productId);

        const [products] = await pool.query(
            `SELECT id,name,price,sale_price FROM products WHERE id IN 
            (${productIds.map(() => " ? ").join(",")})`, productIds);

        if (products.length !== productIds.length) {
            return res.status(400).json({ error: "không tìm thấy 1 số sản phẩm" });
        }

        const productMap = new Map(products.map((p) => [p.id, p]));

        let total = 0;

        const orderItems = items.map((it) => {
            const p = productMap.get(it.productId);
            const unitPrice = p.sale_price ?? p.price;
            const qty = Number(it.qty);

            if (!qty || qty <= 0) {
                throw new Error("số lượng không hợp lệ ");
            }

            total += unitPrice * qty;
            return {
                productId: p.id,
                productName: p.name,
                price: unitPrice,
                qty,
            };
        });

        await conn.beginTransaction();

        const [orderResult] = await conn.query(
            `INSERT INTO orders (customer_name,phone,address,note,total,status) VALUES (?,?,?,?,?,'pending')`,
            [customerName, phone, address, note, total]
        );

        const orderId = orderResult.insertId;

        for (const oi of orderItems) {
            await conn.query(
                `INSERT INTO order_items (order_id,product_id,product_name,price,qty) VALUES (?,?,?,?,?) `,
                [orderId, oi.productId, oi.productName, oi.price, oi.qty]
            );
        }

        await conn.commit();

        res.status(201).json({
            id: orderId,
            total,
            status: "pending",
        });
    } catch (error) {
        await conn.rollback();
        res.status(500).json({ error: error.message });
    } finally {
        conn.release();
    };
});


//đăng nhập
app.post("/api/admin/login", async (req, res) => {

    try {
        //lấy dữ liệu từ request
        const { email, password_hash } = req.body;

        //check
        if (!email || !password_hash) {
            return res.status(400).json({ error: "Sai mật khẩu hoặc tài khoản" });
        }

        //truy vấn
        const [rows] = await pool.query(
            "SELECT id, email , password_hash FROM admins WHERE email = ? LIMIT 1", [email]
        );

        //kiểm tra rỗng 
        if (rows.length === 0) {
            return res.status(401).json({ error: "Sai mật khẩu hoặc tài khoản" })
        }
        // gắn admin cho truy vấn đầu tiền thành công
        const admin = rows[0];

        //so sánh mặt khẩu chưa băm và đã băm
        const ok = await bcrypt.compare(password_hash, admin.password_hash);
        if (!ok) {
            return res.status(401).json({ error: "mật khẩu không đúng" });
        }

        //tạo token tồn tại trong 7 ngày
        const token = jwt.sign(
            { admin: admin.id, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        //
        res.json({
            token, admin: { id: admin.id, email: admin.email },
        });
        //lỗi
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});


//lấy danh mục
app.get("/api/categories", async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT id, name, slug, image_url, created_at FROM categories ORDER BY id DESC"
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//lấy danh sách sản phẩm
app.get("/api/products", async (req, res) => {
    try {
        // const { search = "", category = "" } = req.query;

        let sql = `
      SELECT
        p.id, p.name, p.slug, p.price, p.sale_price, p.stock,
        p.image_url, p.origin, p.weight,
        c.name as category_name, c.slug as category_slug
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `;
        const params = [];

        // if (search) {
        //     sql += ` AND p.name LIKE ? `;
        //     params.push(`%${search}%`);
        // }

        // if (category) {
        //     sql += ` AND c.slug = ? `;
        //     params.push(category);
        // }

        sql += ` ORDER BY p.id DESC `;

        const [rows] = await pool.query(sql, params);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//lấy sản phẩm chi tiết
app.get("/api/products/:slug", async (req, res) => {
    try {
        const { slug } = req.params;

        const [rows] = await pool.query(
            `
      SELECT
        p.id, p.name, p.slug, p.price, p.sale_price, p.stock,
        p.image_url, p.description, p.origin, p.weight,
        c.id as category_id, c.name as category_name, c.slug as category_slug
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.slug = ?
      LIMIT 1
      `,
            [slug]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



//danh sách admins
app.get("/api/admins", async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM admins"
        )
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//test api
app.get("/api/health", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT 1 as ok");
        res.json({ status: "ok", db: rows[0] });
    } catch (err) {
        res.status(500).json({ status: "fail", error: err.message });
    }
});

//test
app.get("/api/admin/me", requireAdmin, (req, res) => {
    res.json({ admin: req.admin });
});








//lắng nghe PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("API running on port " + PORT));
