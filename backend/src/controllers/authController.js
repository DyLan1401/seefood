import * as authService from '../services/authService.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//danh sách người dùng
export const userList = async (req, res) => {
    try {

        const data = await authService.userList();

        if (!data.affectedRows === 0) {
            return res.status(401).json({ error: "user đang trống" });
        }

        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({
            message: "đã xảy ra lỗi hệ thống",
            error: error.message
        })
    }
};

//chi tiết người dùng
export const userDetail = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await authService.userDetail({ id });

        if (!data === 0) {
            return res.status(401).json({ error: "không tìm thấy user" });
        }

        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({
            message: "đã xảy ra lỗi hệ thống",
            error: error.message
        })
    }
}

//xóa người dùng
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await authService.deleteUser({ id });
        if (!data) {
            return res.status(404).json({ message: `không tìm thấy user có id: ${id}` });
        }

        res.status(200).json({
            message: `Đã xóa thành công user có id: ${id}`
        });

    } catch (error) {
        res.status(500).json({
            message: "đã xảy ra lỗi hệ thống",
            error: error.message
        })
    }
};

//chỉnh sửa người dùng
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, password, role } = req.body;

        const data = await authService.updateUser({ id, email, password, role });

        if (!data) {
            return res.status(401).json({ error: "không tìm thấy user có id:" + { id } });
        }


        res.status(200).json({
            message: "Đã cập nhật thành công user có id:" + { id }
        });
    } catch (error) {
        res.status(500).json({
            message: "đã xảy ra lỗi hệ thống",
            error: error.message
        })
    }
};

//đăng nhập
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authService.findUserByEmail(email);

        if (!user) {
            return res.status(401).json({ error: "Tài khoản không tồn tại" });
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Mật khẩu không chính xác" });
        }

        // Tạo token
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
        return res.status(500).json({
            message: "đã xảy ra lỗi hệ thống",
            error: error.message
        });
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
        res.status(500).json({
            message: "Đã xảy ra lỗi hệ thống",
            error: error.message
        })
    }
};