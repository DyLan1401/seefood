import * as authService from '../services/authService.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//đăng nhập
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authService.findUserByEmail(email);

        // 1. Phải check tồn tại TRƯỚC khi log hoặc so sánh pass
        if (!user) {
            return res.status(401).json({ error: "Tài khoản không tồn tại" });
        }

        // 2. Bây giờ admin đã chắc chắn tồn tại, mới log được
        console.log("Mật khẩu từ DB:", user.password);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Mật khẩu không chính xác" });
        }

        // Tạo token (Phần này bạn làm đúng rồi, có chứa id)
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            message: "Đăng nhập thành công",
            token,
            user: { id: user.id, email: user.email, role: user.role },
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ error: error.message });
    }
};



//đăng kí
export const Register = async (req, res) => {
    try {
        const { email, password } = req.body;


        // 1. Kiểm tra đầu vào cơ bản
        if (!email || !password) {
            return res.status(400).json({ message: "Vui lòng nhập đủ email và mật khẩu" });
        }

        //check email bằng bằng Login 
        const existingUser = await authService.findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: "Email này đã được sử dụng" });
        }

        //băm mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        //
        const data = await authService.register({ email, password: hashedPassword });

        //
        return res.status(201).json({
            message: "Đăng ký thành công",
            userId: data.insertId
        });

    } catch (error) {
        console.error("Register Error:", error);
        return res.status(500).json({ message: "Lỗi hệ thống khi đăng ký" });
    }
};