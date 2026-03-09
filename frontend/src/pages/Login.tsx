import { useState } from "react";
import api from "../api/axios";
import { useAuthStore } from "../store/authStore"; // Import store
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "../component/ToastContainer";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { toasts, show } = useToast();

    const setLogin = useAuthStore((state) => state.setLogin);

    const handleLogin = async () => {
        try {
            const res = await api.post("/user/login", { email, password });
            console.log(res.data.user); // 👈 kiểm tra role có trả về không

            // Lưu Token và thông tin Admin vào Zustand
            setLogin(res.data.token, res.data.user);
            show("Đăng nhập thành công!", "success");

            if (res.data.user.role === "admin") {
                navigate("/dashboard");
            } else {
                navigate("/");
            }
        } catch (err: unknown) {
            show("Sai tài khoản hoặc mật khẩu", "error");
        }
    };

    return (

        <div>
            <ToastContainer toasts={toasts} />
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">

                    <div className="flex flex-col items-center mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-[#BF4E2C]">Đăng nhập</h1>
                        <p className="text-gray-500 text-sm mt-2">Đăng nhập để trải nghiệm chi tiết hơn !!!</p>
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
                                placeholder="••••••••"
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#2C8DE0] focus:border-transparent transition-all"
                            />
                        </div>

                        <button
                            onClick={handleLogin}
                            className="w-full bg-[#2C8DE0] hover:bg-[#1a6fb8] text-white font-bold py-3 rounded-xl shadow-lg transform transition active:scale-95 mt-2"

                        >
                            Đăng Nhập
                        </button>
                    </div>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => navigate("/")}
                            className="text-sm text-gray-500 hover:text-[#BF4E2C] transition"
                        >
                            ← Quay lại trang chủ
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}