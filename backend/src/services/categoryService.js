import pool from "../utils/db.js";

//lấy danh mục
export const getCategory = async ({ page = 1, limit = 10 }) => {
  const offset = (page - 1) * limit;

  // 1. Lấy tổng số danh mục để tính tổng số trang
  const countSql = `SELECT COUNT(*) as total FROM categories`;
  const [[{ total }]] = await pool.query(countSql);

  // 2. Lấy dữ liệu danh mục (Đã xóa dấu phẩy thừa ở mảng params)
  let dataSql = `
        SELECT id, name, slug, image_url, created_at 
        FROM categories 
        ORDER BY id DESC 
        LIMIT ? OFFSET ?
    `;
  const [rows] = await pool.query(dataSql, [limit, offset]); // Bỏ dấu phẩy thừa ở đây

  // Trả về theo cấu trúc thống nhất để Frontend dễ xử lý
  return {
    items: rows,
    pagination: {
      totalItems: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      limit: limit
    }
  };
};

export const getCategoryDetail = async ({ slug }) => {
  const [rows] = await pool.query(
    `SELECT id, name, slug, image_url, created_at FROM categories`
    , [slug]
  );
  return rows[0];
};

export const createCategory = async ({ name, slug, image_url }) => {
  const [rows] = await pool.query(
    `INSERT INTO categories (name,slug,image_url,created_at)  VALUES (?,?,?,NOW()) `
    , [name, slug, image_url]
  )
  return rows;
}

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
}

export const DeleteCategory = async ({ id }) => {
  const [rows] = await pool.query(
    `DELETE FROM categories WHERE id = ?`
    , [id]
  );
  return rows;

}
