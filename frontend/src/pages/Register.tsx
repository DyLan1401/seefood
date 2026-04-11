//lib
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterFormData } from "../lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";

//components
import Header from "../component/Header";
import Footer from "../component/Footer";

//hooks
import { useUsers } from "../hooks/useUsers";
import { useToastStore } from "../store/useToastStore";

//types
import type { AxiosError } from "axios";

export default function Register() {

    const navigate = useNavigate();
    const showToast = useToastStore((state) => state.show);
    const { Register, isRegistering } = useUsers();



    const { register,
        handleSubmit,
        formState: { errors } } =
        useForm<RegisterFormData>({
            resolver: zodResolver(registerSchema),
            defaultValues: {
                email: "",
                password: ""
            }
        });

    //hàm đăng kí
    const handleRegister = (data: RegisterFormData) => {
        Register(data, {
            //đăng kí thành công
            onSuccess: () => {
                showToast("Đăng kí thành công!", "success");
                navigate("/login")

            },
            //đăng kí thất bại
            onError: (error: unknown) => {
                const axiosError = error as AxiosError<{ message: string }>;
                const errorMsg = axiosError?.response?.data?.message || "Đăng kí thất bại";
                showToast(errorMsg, "error");
            }
        });

    };

    return (

        <>
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
                <div className="w-full max-w-md bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100">

                    <div className="text-center mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-[#BF4E2C]">Đăng kí</h1>
                        <p className="text-gray-500 text-sm mt-2">Tạo tài khoản để trải nghiệm chi tiết hơn</p>
                    </div>
                    {/* Form đăng kí */}
                    <form
                        onSubmit={handleSubmit(handleRegister)}
                        className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                placeholder="example@gmail.com"
                                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#2C8DE0] focus:border-transparent transition-all"
                                {...register("email")}
                            />
                            {errors.email && <span className="error text-red-500">{errors.email.message as string}</span>}

                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                            <input
                                type="password"
                                placeholder="Tối thiểu 6 ký tự"
                                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#2C8DE0] focus:border-transparent transition-all"
                                {...register("password")}
                            />
                            {errors.password && <span className="error text-red-500">{errors.password.message as string}</span>}

                        </div>

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className="w-full bg-[#2C8DE0] hover:bg-[#1a6fb8] text-white font-bold py-3 rounded-xl shadow-lg transform transition active:scale-95 mt-2"
                        >
                            {isRegistering ? "Đăng tạo tài khoản" : "Đăng kí"}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        {/* chuyển hướng */}
                        <p className="text-sm text-gray-600">
                            Đã có tài khoản?
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
        </>
    );
}