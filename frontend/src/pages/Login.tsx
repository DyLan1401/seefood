//lib
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { loginSchema, type LoginFormData } from "../lib/validations";
import { zodResolver } from "@hookform/resolvers/zod"; // Thêm dòng này

//components
import Header from "../component/Header";
import Footer from "../component/Footer";

//hooks
import { useUserMutations } from "../hooks/user/useUserMutation";
import { useToastStore } from "../store/useToastStore";

//types
import type { AxiosError } from "axios";


export default function Login() {
    const location = useLocation();

    const navigate = useNavigate();
    const showToast = useToastStore((state) => state.show);
    const { login, isLogin } = useUserMutations();

    const { register,
        handleSubmit,
        formState: { errors } } =
        useForm<LoginFormData>({
            resolver: zodResolver(loginSchema),
            defaultValues: {
                email: "",
                password: ""
            }
        });

    const from = (location.state as { from?: string })?.from ?? "/";


    //hàm đăng nhập
    const handleLogin = (data: LoginFormData) => {
        login(data, {
            onSuccess: (res) => {
                showToast("Đăng nhập thành công!", "success");

                //kiểm tra
                const userRole = res?.user?.role || res?.data?.user?.role;

                if (userRole === "admin") {
                    navigate("/admin", { replace: true });
                } else {
                    // redirect về trang trước đó thay vì luôn về "/"
                    navigate(from, { replace: true });
                }

            },
            onError: (error: unknown) => {
                const axiosError = error as AxiosError<{ message: string }>;
                const errorMsg = axiosError?.response?.data?.message || "Sai email hoặc mật khẩu";
                showToast(errorMsg, "error");
            }
        });
    };
    return (

        <>
            <Header />
            {/* Main */}
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">

                    <div className="flex flex-col items-center mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-[#BF4E2C]">Đăng nhập</h1>
                        <p className="text-gray-500 text-sm mt-2">Đăng nhập để trải nghiệm chi tiết hơn !!!</p>
                    </div>
                    {/* Form đăng nhập */}
                    <form
                        onSubmit={handleSubmit(handleLogin)}
                        className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                placeholder="example@gmail.com"
                                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#2C8DE0] focus:border-transparent transition-all"
                                type="email"
                                {...register("email")}
                            />
                            {errors.email && <span className="error">{errors.email.message as string}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                            <input
                                placeholder="••••••••"
                                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#2C8DE0] focus:border-transparent transition-all"
                                type="password"
                                {...register("password")}
                            />
                            {errors.password && <span className="error">{errors.password.message as string}</span>}
                        </div>

                        <button
                            type="submit"
                            disabled={isLogin}
                            className="w-full bg-[#2C8DE0] hover:bg-[#1a6fb8] text-white font-bold py-3 rounded-xl shadow-lg transform transition active:scale-95 mt-2"

                        >
                            {isLogin ? "Đang chuyển trang" : "Đăng nhập"}
                        </button>
                    </form>
                    {/* Chuyển hướng */}
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
        </>
    );
}