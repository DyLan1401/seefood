import pool from "../utils/db.js";

let usersCache = {};

//danh sách người dùng
export const userList = async ({ page = 1, limit = 5 }) => {
    const cacheKey = `users_p${page}_l${limit}`;


    // kiểm tra đã có data trong cache chưa
    if (usersCache[cacheKey]) {
        return usersCache[cacheKey];
    }

    const offset = (page - 1) * limit;
    const countSql = `SELECT COUNT(*) as total FROM users`;
    const [[{ total }]] = await pool.query(countSql);

    const dataSql = await pool.query(
        `SELECT *  
        from users
         ORDER BY id DESC
          LIMIT ? OFFSET ?
`
    );

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

    usersCache[cacheKey] = result;


    return result;
};

//chi tiết người dùng
export const userDetail = async ({ id }) => {
    const [rows] = await pool.query(
        `SELECT *  from users where id = ?`
        , [id]
    )
    return rows[0];
};

//xóa người dùng
export const deleteUser = async ({ id }) => {
    const [rows] = await pool.query(
        `DELETE from users where id = ?`
        , [id]
    );
    return rows;
};

//cập nhật người dùng
export const updateUser = async ({ id, email, password, role }) => {
    const [rows] = await pool.query(
        `UPDATE user SET 
        email = ?,
        password = ?,
        role = ?,
        where id = ?
        `
        , [id, email, password, role]
    );
    return rows;
};

//tìm email trong bẳng users
export const findUserByEmail = async (email) => {
    const [rows] = await pool.query(
        `SELECT id, email, password ,role FROM users WHERE email = ? LIMIT 1`,
        [email]
    );
    return rows[0];
};

//thêm mới email//password vào bảng users
export const register = async ({ email, password }) => {
    const [result] = await pool.query(
        `INSERT INTO users (email, password) VALUES (?, ?)`,
        [email, password]
    );
    return result;
};
