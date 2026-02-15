import dotenv from "dotenv";
dotenv.config();

//
import bcrypt from "bcrypt";
import pool from "./db.js";

const run = async () => {
    //tạo
    const email = "admin1@gmail.com";
    const password = "1234561";
    //băm password
    const passwordHash = await bcrypt.hash(password, 10);

    //truy vấn
    await pool.query(
        "INSERT INTO admins (email,password_hash) VALUES (?,?)", [email, passwordHash]
    );

    //check
    // console.log("Create admin:", { email, passwordHash });
    process.exit(0);
};
run().catch((err) => {
    //
    console.error(err);
    process.exit(1);
});