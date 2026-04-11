import pool from "../utils/db.js";

let categoriesCache = {};

//lấy danh mục
export const getCategory = async ({ page = 1, limit = 10 }) => {
  const cacheKey = `categories_p${page}_l${limit}`;

  // kiểm tra đã có data trong cache chưa
  if (categoriesCache[cacheKey]) {
    return categoriesCache[cacheKey];
  }


  const offset = (page - 1) * limit;

  // 1. Lấy tổng số danh mục để tính tổng số trang
  const countSql = `SELECT COUNT(*) as total FROM categories`;
  const [[{ total }]] = await pool.query(countSql);

  // 2. Lấy dữ liệu danh mục 
  let dataSql = `
        SELECT id, name, slug, image_url, created_at 
        FROM categories 
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

  categoriesCache[cacheKey] = result;

  return result;
};

//chi tiết danh mục
export const getCategoryDetail = async ({ slug }) => {
  const [rows] = await pool.query(
    `SELECT id, name, slug, image_url, created_at FROM categories`
    , [slug]
  );
  return rows[0];
};

//tạo danh mục
export const createCategory = async ({ name, slug, image_url }) => {
  const [rows] = await pool.query(
    `INSERT INTO categories (name,slug,image_url,created_at)  VALUES (?,?,?,NOW()) `
    , [name, slug, image_url]
  )
  return rows;
};

//cập nhật danh mục
export const UpdateCategory = async ({ id, name, slug, image_url }) => {
  const [rows] = await pool.query(
    `UPDATE categories SET
     name = ?,
    slug = ?,
    image_url = ?,
    created_at = now()
    WHERE id = ? `
    , [name, slug, image_url, id]
  );
  return rows;
};

//xóa danh mục
export const DeleteCategory = async ({ id }) => {
  const [rows] = await pool.query(
    `DELETE FROM categories WHERE id = ?`
    , [id]
  );
  return rows;

};
