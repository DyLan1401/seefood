import pool from "../utils/db.js";

//tìm email trong bẳng users
export const findUserByEmail = async (email) => {
    const [rows] = await pool.query(
        `SELECT id, email, password FROM users WHERE email = ? LIMIT 1`,
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
}
