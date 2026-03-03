import { HiUserCircle, HiOutlineShoppingCart, HiMenu } from "react-icons/hi";
import { HiMiniHandThumbUp, HiMiniArrowPath, HiCube, HiMiniTruck } from "react-icons/hi2";
import { GiFishSmoking } from "react-icons/gi";
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios"
import type { Category } from "../types/category"
import { useQuery } from "@tanstack/react-query"
import { useCartStore } from "../store/cartStore";

export default function Header() {
    const [activeMenu, setActiveMenu] = useState<string>("");
    const { items } = useCartStore();

    const toggleMenu = (menuName: string) => {
        if (activeMenu == menuName) {
            setActiveMenu("");
        } else {
            setActiveMenu(menuName);
        }
    }

    //gọi danh sách category
    const { data } = useQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await api.get("/categories");
            return res.data;
        },
    });

    return (
        <div className="container mx-auto px-2 ">
            <div className="flex flex-col w-full h-full">
                {/* Logo */}
                <div className="w-full h-16 flex justify-around items-center bg-[#FFF2E8] font-semibold">
                    <Link to="/">
                        <GiFishSmoking size={40} color="red" />
                    </Link>
                    <div className="">Mua Hàng Online Liên Hệ  Ngay Hotline : 0999999999</div>
                    <div className="flex  gap-2">
                        <div>GIỚI THIỆU</div>
                        <div>TUYỂN DỤNG</div>
                    </div>
                </div>
                {/* Form tìm kiếm */}
                <div className="w-full h-32 flex justify-around items-center bg-[#2C8DE0]  ">
                    <Link to="/">
                        <GiFishSmoking size={50} color="red" />
                    </Link>                    <div>
                        <div className="flex items-center justify-center p-5">
                            <div className="flex rounded-3xl">
                                <input type="text" className="w-full  bg-white pl-2 rounded-l-2xl text-base font-semibold outline-0" placeholder="" id="" />
                                <input type="button" value="Search" className="bg-[#FF912F] p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors" />
                            </div>
                        </div>
                    </div>
                    {/* Auth */}
                    <div className="flex gap-2">
                        {/*  */}
                        <div className="relative">
                            {/* 2. Gán sự kiện onClick để đảo ngược trạng thái isOpen */}
                            <HiUserCircle
                                size={30}
                                className="cursor-pointer text-gray-700 hover:text-sky-600 transition-colors"
                                onClick={() => toggleMenu('auth')}
                            />

                            {/* 3. Chỉ hiển thị Div khi isOpen là true */}
                            {activeMenu === 'auth' && (
                                <>
                                    {/* Lớp phủ trong suốt để khi nhấn ra ngoài menu sẽ tự đóng */}
                                    {activeMenu && (
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setActiveMenu("")}
                                        ></div>
                                    )}

                                    {/* Menu đăng ký/đăng nhập */}
                                    <div className="absolute top-7 right-0 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-2">
                                        <Link
                                            to="/login"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 transition"
                                        >
                                            Đăng nhập
                                        </Link>

                                        <Link
                                            to="/register"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 transition"
                                        >
                                            Đăng ký
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                        {/*  */}
                        <div className="relative">
                            <div className="flex absolute right-0 -top-2 z-50   bg-[#FF912F] rounded-full px-1">{items.reduce((sum, i) => (sum + i.qty), 0)}</div>
                            <Link to="/cart"><HiOutlineShoppingCart size={30} /></Link>
                        </div>
                    </div>
                </div>
                {/*Navbar*/}
                <div className="grid grid-cols-5  gap-3  border-t-2  border-amber-50 bg-[#2C8DE0]  font-semibold ">
                    <div className=" relative flex justify-center items-center z-100  bg-[#FFF2E8] cursor-pointer   "
                        onClick={() => toggleMenu('category')}>
                        <HiMenu size={30}

                        />
                        {activeMenu === 'category' && (
                            <>
                                {/* Lớp phủ trong suốt để khi nhấn ra ngoài menu sẽ tự đóng */}
                                {activeMenu && (
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setActiveMenu("")}
                                    ></div>
                                )}

                                {/* Menu đăng ký/đăng nhập */}
                                <div className="absolute  w-full h-auto left-0 top-12  z-100 bg-white     shadow-lg py-2">
                                    {data?.map((c) => (
                                        <Link
                                            to={`/category/${c.slug}`}
                                            className="block px-4 py-2  text-gray-700 hover:bg-sky-50 transition"
                                        >
                                            {c.name}
                                        </Link>
                                    ))}
                                </div>
                            </>
                        )}
                        Danh Mục
                    </div>
                    <div className="flex items-center gap-1">
                        <div><HiMiniHandThumbUp size={30} /></div>
                        <div>
                            <p>CAM KẾT CHẤT LƯỢNG</p>
                            <p>AN TOÀN XUẤT XỨ</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <div><HiMiniArrowPath size={30} /></div>
                        <div>
                            <p>1 ĐỔI 1 TRONG 2H</p>
                            <p>NHANH CHÓNG, TẠI NHÀ</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <div><HiCube size={30} /></div>
                        <div>
                            <p>CHUẨN ĐÓNG GÓI</p>
                            <p>SẠCH SẼ, TIỆN LỢI</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <div><HiMiniTruck size={30} /></div>
                        <div>
                            <p>GIAO HÀNG NHANH</p>
                            <p>FREESHIP</p>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}