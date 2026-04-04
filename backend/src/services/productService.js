import pool from "../utils/db.js";

//
export const getAllProducts = async ({ page = 1, limit = 10, search = "", category = "" }) => {
  const offset = (page - 1) * limit;
  const params = [];
  let whereClause = " WHERE 1=1 ";
  //
  if (search) {
    whereClause += ` AND p.name LIKE ? `;
    params.push(`%${search}%`);
  }
  //
  if (category) {
    whereClause += ` AND c.slug = ? `;
    params.push(category);
  }
  // 1. Câu lệnh đếm tổng số lượng (dùng để tính tổng số trang ở Frontend)
  const countSql = `SELECT COUNT(*) as total FROM products p JOIN categories c ON p.category_id = c.id ${whereClause}`;
  const [[{ total }]] = await pool.query(countSql, params);
  // 2. Câu lệnh lấy dữ liệu có phân trang
  let dataSql = `
      SELECT p.id, p.name, p.slug, p.price, p.sale_price, p.stock,
             p.image_url, p.description, p.origin, p.weight,
             c.name as category_name, c.slug as category_slug
      FROM products p
      JOIN categories c ON p.category_id = c.id
      ${whereClause}
      ORDER BY p.id DESC
      LIMIT ? OFFSET ?
    `;
  //
  const [rows] = await pool.query(dataSql, [...params, limit, offset]);
  //
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

//
export const getProductDetail = async ({ id }) => {
  const [rows] = await pool.query(
    `
      SELECT
        p.id, p.name, p.slug, p.price, p.sale_price, p.stock,
        p.image_url, p.description, p.origin, p.weight,
        c.id as category_id, c.name as category_name, c.slug as category_slug
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
      LIMIT 1
      `,
    [id]
  );
  return rows[0];
};

//lấy sản phẩm thuộc danh mục
export const getProductsByCategory = async ({ slug }) => {
  const [rows] = await pool.query(
    `SELECT p.* FROM products p 
             JOIN categories c ON p.category_id = c.id 
             WHERE c.slug = ?`,
    [slug]
  );
  return rows;
};


export const addProduct = async ({ name, slug, price, sale_price, stock, image_url, description, origin, weight, category_id }) => {
  const [rows] = await pool.query(
    `INSERT INTO products(name,slug,price,sale_price,stock,image_url,description,origin,weight,category_id,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,NOW())`
    , [name, slug, price, sale_price, stock, image_url, description, origin, weight, category_id]
  );
  return rows;
};

export const updateProduct = async ({ id, name, slug, price, sale_price, stock, image_url, description, origin, weight, category_id }) => {
  const [rows] = await pool.query(
    `UPDATE products SET
    name = ?,
    slug = ?,
    price = ?,
    sale_price = ?,
    stock = ?,
    image_url = ?,
    description = ?,
    origin = ?,
    weight = ?,
    category_id = ?,
    created_at = NOW()
    WHERE id = ?
    `
    , [name, slug, price, sale_price, stock, image_url, description, origin, weight, category_id, id]
  );
  return rows;
}

export const deleteProduct = async ({ id }) => {
  const [rows] = await pool.query
    (`DELETE FROM products WHERE id = ?`,
      [id]
    )
  return rows;
}






