import jwt from 'jsonwebtoken';

//xác thực
export const verifyToken = (req, res, next) => {
    try {
        const header = req.headers.authorization;

        // 1. Kiểm tra sự tồn tại của header
        if (!header || !header.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Vui lòng đăng nhập để tiếp tục!" });
        }

        // 2. Lấy token
        const token = header.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Token không hợp lệ!" });
        }

        // 3. Xác thực token
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Lưu thông tin vào request để controller sử dụng
        req.user = payload;

        next();
    } catch (err) {
        console.error("Lỗi xác thực Token:", err.message);
        // Trả về lỗi chi tiết hơn để debug (như 'jwt expired' nếu hết hạn)
        res.status(401).json({ error: "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!" });
    }
};