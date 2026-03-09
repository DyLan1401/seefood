import dotenv from "dotenv";
dotenv.config();

//
import mysql from "mysql2/promise";

//
const isSSL = process.env.DB_SSL === "true";

//  
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    connectTimeout: 30000,
    acquireTimeout: 30000,
    timeout: 30000,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: false
    }
});

export default pool;
