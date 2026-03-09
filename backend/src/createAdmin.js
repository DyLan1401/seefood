import dotenv from "dotenv";
dotenv.config();

//
import bcrypt from "bcrypt";
import pool from "./utils/db.js";

const run = async () => {
    //tạo
    const email = "admin1@gmail.com";
    const password = "1234561";
    const role = "admin";
    //băm password
    const passwordHash = await bcrypt.hash(password, 10);

    //truy vấn
    await pool.query(
        "INSERT INTO users (email,password,role) VALUES (?,?,?)", [email, passwordHash, role]
    );

    process.exit(0);
};
run().catch((err) => {
    //
    console.error(err);
    process.exit(1);
});