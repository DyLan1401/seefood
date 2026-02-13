import dotenv from "dotenv";
dotenv.config();

//
import express from "express";
import cors from "cors";
import pool from "./db.js";

//
const app = express();
app.use(cors());
app.use(express.json());



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


//lấy ản phẩm chi tiết
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


//test api
app.get("/api/health", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT 1 as ok");
        res.json({ status: "ok", db: rows[0] });
    } catch (err) {
        res.status(500).json({ status: "fail", error: err.message });
    }
});


//lắng nghe PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("API running on port " + PORT));
