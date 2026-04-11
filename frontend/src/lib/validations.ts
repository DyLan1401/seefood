import { z } from "zod";

// Schema đăng nhập
export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email không được để trống")
        .email("Email không đúng định dạng"),

    password: z
        .string()
        .min(6, "Mật khẩu tối thiểu 6 ký tự")
        .max(50, "Mật khẩu tối đa 50 ký tự"),
});

// Schema đăng ký
export const registerSchema = z
    .object({
        username: z
            .string()
            .min(2, "Tên tối thiểu 2 ký tự")
            .max(30, "Tên tối đa 30 ký tự"),

        email: z
            .string()
            .min(1, "Email không được để trống")
            .email("Email không đúng định dạng"),

        password: z
            .string()
            .min(6, "Mật khẩu tối thiểu 6 ký tự")
            .max(50, "Mật khẩu tối đa 50 ký tự"),

        confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Mật khẩu xác nhận không khớp",
        path: ["confirmPassword"],
    });

// Schema checkout
export const checkoutSchema = z.object({
    customerName: z
        .string()
        .min(2, "Họ tên tối thiểu 2 ký tự")
        .max(50, "Họ tên tối đa 50 ký tự"),

    phone: z
        .string()
        .regex(
            /^(0[3|5|7|8|9])[0-9]{8}$/,
            "Số điện thoại không đúng định dạng (VD: 0912345678)"
        ),

    address: z
        .string()
        .min(10, "Địa chỉ tối thiểu 10 ký tự")
        .max(200, "Địa chỉ tối đa 200 ký tự"),

    note: z.string().max(300, "Ghi chú tối đa 300 ký tự").optional(),
});

// Export types
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type CheckoutFormData = z.infer<typeof checkoutSchema>;