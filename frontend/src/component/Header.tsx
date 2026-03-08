import { HiUserCircle, HiOutlineShoppingCart, HiMenu } from "react-icons/hi";
import { HiMiniHandThumbUp, HiMiniArrowPath, HiCube, HiMiniTruck } from "react-icons/hi2";
import { GiFishSmoking } from "react-icons/gi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function Header() {
    //
    const navigate = useNavigate();
    //
    const [activeMenu, setActiveMenu] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    //
    const { isAuth, user, logout } = useAuthStore();

    //
    const toggleMenu = (menuName) => {
        setActiveMenu(activeMenu === menuName ? "" : menuName);
    }

    //tìm kiếm
    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/products?search=${searchTerm.trim()}`);
        }
    };

    //hiển thị count trong giỏ hàng
    const items = useCartStore((state) => state.items);
    const displayCount = items.reduce((total, item) => total + item.qty, 0);


    return (
        <div className="container mx-auto px-2">
            <div className="flex flex-col w-full h-full">
                {/*  */}
                <div className="w-full min-h-[40px] md:h-16 flex justify-between md:justify-around items-center bg-[#FFF2E8] font-semibold px-2 text-[10px] md:text-base">
                    <Link to="/">
                        <GiFishSmoking className="w-8 h-8 md:w-10 md:h-10 text-red-600" />
                    </Link>
                    <div className="text-center px-1">
                        <span className="hidden sm:inline">Mua Hàng Online Liên Hệ Ngay </span>
                        Hotline: 0999999999
                    </div>
                    <div className="flex gap-2">
                        <div>GIỚI THIỆU</div>
                        <div className="hidden sm:block">TUYỂN DỤNG</div>
                    </div>
                </div>

                {/* 2.  */}
                <div className="w-full py-4 md:h-32 flex justify-around items-center bg-[#2C8DE0] px-2 gap-2">
                    <Link to="/" className="shrink-0">
                        <GiFishSmoking className="w-10 h-10 md:w-14 md:h-14 text-red-600" />
                    </Link>

                    <div className="flex-1 max-w-xl">
                        <div className="flex items-center justify-center">
                            <div className="flex w-full rounded-3xl overflow-hidden bg-white">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-white pl-4 py-2 text-sm md:text-base font-semibold outline-none"
                                    placeholder="Tìm kiếm..."
                                />
                                <button
                                    onClick={handleSearch}
                                    className="bg-[#FF912F] px-4 py-2 text-white font-semibold hover:bg-blue-800 transition-colors"
                                >
                                    <span className="hidden sm:inline">Search</span>
                                    <span className="sm:hidden">🔍</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* */}
                    <div className="flex items-center gap-3 shrink-0">
                        <div className="relative">
                            <div className="flex items-center gap-1 cursor-pointer group" onClick={() => toggleMenu('auth')}>
                                <HiUserCircle size={32} className="text-white md:text-gray-700 group-hover:text-sky-600 transition-colors" />
                                {isAuth && <span className="hidden lg:inline text-xs text-white max-w-[80px] truncate">Hi, {user?.email}</span>}
                            </div>

                            {activeMenu === 'auth' && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setActiveMenu("")}></div>
                                    <div className="absolute top-10 right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-2">
                                        {isAuth ? (
                                            <>
                                                <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100 italic">
                                                    {user?.email}
                                                </div>
                                                <Link to="/my-orders" className="block px-4 py-2 text-sm hover:bg-red-50 transition" onClick={() => setActiveMenu("")}>Đơn hàng của tôi</Link>
                                                <button onClick={() => { logout(); setActiveMenu(""); }} className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition">Đăng xuất</button>
                                            </>
                                        ) : (
                                            <>
                                                <Link to="/login" onClick={() => setActiveMenu("")} className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 transition">Đăng nhập</Link>
                                                <Link to="/register" onClick={() => setActiveMenu("")} className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 transition">Đăng ký</Link>
                                            </>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="relative">
                            {isAuth && displayCount > 0 && (
                                <div className="flex absolute -right-1 -top-1 z-50 bg-[#FF912F] text-white text-[10px] font-bold rounded-full h-5 w-5 items-center justify-center">{displayCount}</div>
                            )}
                            <Link to="/cart" className="text-white"><HiOutlineShoppingCart size={30} /></Link>
                        </div>

                    </div>
                </div>

                {/* */}
                <div className="grid  md:grid-cols-5 border-t-2 border-amber-50 bg-[#2C8DE0] font-semibold text-[10px] md:text-xs">
                    {/*  */}
                    <div className="relative flex justify-center items-center bg-[#FFF2E8] cursor-pointer py-3" onClick={() => toggleMenu('category')}>
                        <HiMenu size={24} className="mr-1" />
                        Danh Mục
                        {activeMenu === 'category' && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setActiveMenu("")}></div>
                                <div className="absolute w-full h-auto left-0 top-full z-[101] bg-white shadow-lg py-2 border-t border-gray-200">
                                    <Link to="/categories" onClick={() => setActiveMenu("")} className="block px-4 py-3 text-gray-700 hover:bg-sky-50 border-b">Tất cả danh mục</Link>
                                    <Link to="/products" onClick={() => setActiveMenu("")} className="block px-4 py-3 text-gray-700 hover:bg-sky-50">Tất cả sản phẩm</Link>
                                </div>
                            </>
                        )}
                    </div>

                    {/*  */}
                    <div className="hidden md:flex items-center gap-1 p-2 text-white border-l border-blue-400">
                        <HiMiniHandThumbUp size={24} />
                        <div><p>CAM KẾT</p><p>CHẤT LƯỢNG</p></div>
                    </div>
                    <div className="hidden md:flex items-center gap-1 p-2 text-white border-l border-blue-400">
                        <HiMiniArrowPath size={24} />
                        <div><p>1 ĐỔI 1</p><p>TRONG 2H</p></div>
                    </div>
                    <div className="hidden md:flex items-center gap-1 p-2 text-white border-l border-blue-400">
                        <HiCube size={24} />
                        <div><p>CHUẨN</p><p>ĐÓNG GÓI</p></div>
                    </div>
                    <div className="hidden md:flex items-center gap-1 p-2 text-white border-l border-blue-400">
                        <HiMiniTruck size={24} />
                        <div><p>GIAO HÀNG</p><p>FREESHIP</p></div>
                    </div>
                </div>
            </div>
        </div>
    )
}