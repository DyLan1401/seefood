import { useState } from "react";
import api from "../api/axios"
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/Footer";

export default function Register() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        // Logic kiểm tra đầu vào giữ nguyên
        if (!email || !password) {
            alert("Vui lòng nhập đầy đủ Email và Mật khẩu!");
            return;
        }

        try {
            // Logic gửi API giữ nguyên
            const res = await api.post("/admin/register", {
                email,
                password
            });

            alert("Tạo tài khoản thành công!");
            navigate("/login");
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Lỗi đăng ký!";
            alert(errorMessage);
        }
    };

    return (

        <div>
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
                <div className="w-full max-w-md bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100">

                    <div className="text-center mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-[#BF4E2C]">Register</h1>
                        <p className="text-gray-500 text-sm mt-2">Tạo tài khoản để trải nghiệm chi tiết hơn</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                placeholder="example@gmail.com"
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#2C8DE0] focus:border-transparent transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                            <input
                                type="password"
                                placeholder="Tối thiểu 6 ký tự"
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#2C8DE0] focus:border-transparent transition-all"
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full bg-[#2C8DE0] hover:bg-[#1a6fb8] text-white font-bold py-3 rounded-xl shadow-lg transform transition active:scale-95 mt-2"
                        >
                            Đăng Ký Tài Khoản
                        </button>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <p className="text-sm text-gray-600">
                            Đã có tài khoản?{" "}
                            <button
                                onClick={() => navigate("/login")}
                                className="font-bold text-[#2C8DE0] hover:underline"
                            >
                                Đăng nhập ngay
                            </button>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}