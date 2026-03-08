import { useQuery } from "@tanstack/react-query"
import type { Product } from "../types/product";
import api from "../api/axios"
import { useParams } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { useCartStore } from "../store/cartStore";

export default function ProductDetail() {
    const addItem = useCartStore((s) => s.addItem);
    const { slug } = useParams();

    const { data, isLoading, error } = useQuery<Product>({
        queryKey: ["product", slug],
        enabled: !!slug,
        queryFn: async () => {
            const res = await api.get(`/product/${slug}`);
            return res.data;
        }
    })

    if (isLoading) return <div className="flex justify-center items-center h-screen font-semibold">Đang tải...</div>;
    if (error) return <div className="p-4 text-center text-red-500">Không thể tải thông tin sản phẩm</div>;
    if (!data) return <div className="p-4 text-center">Không tìm thấy sản phẩm</div>;

    return (
        <div className="container mx-auto px-2 md:px-4">
            <Header />

            <div className="w-full min-h-[60vh] py-4 md:py-10">
                {/* */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 p-2">

                    {/*  */}
                    <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-sm">
                        {data.image_url ? (
                            <img
                                src={data.image_url}
                                alt={data.name}
                                className="w-full h-80 sm:h-96 md:h-[500px] lg:h-140 object-cover"
                            />
                        ) : (
                            <div className="h-80 md:h-140 flex items-center justify-center text-gray-400">
                                Không có ảnh
                            </div>
                        )}
                    </div>

                    {/*  */}
                    <div className="flex flex-col justify-center space-y-4">
                        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight">
                            {data.name}
                        </h1>

                        <div className="text-xl md:text-2xl">
                            {data.sale_price ? (
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-[#BF4E2C]">
                                        {data.sale_price.toLocaleString()}đ
                                    </span>
                                    <span className="line-through text-gray-400 text-lg">
                                        {data.price.toLocaleString()}đ
                                    </span>
                                </div>
                            ) : (
                                <span className="font-bold text-[#2C8DE0]">
                                    {data.price.toLocaleString()}đ
                                </span>
                            )}
                        </div>

                        {/*  */}
                        <div className="border-t border-gray-100 pt-4">
                            <h3 className="font-semibold mb-2 text-gray-800">Mô tả sản phẩm:</h3>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed whitespace-pre-line max-w-prose">
                                {data.description || "Chưa có mô tả chi tiết cho sản phẩm này."}
                            </p>
                        </div>

                        {/*  */}
                        <button
                            onClick={() => addItem({
                                productId: data.id,
                                name: data.name,
                                price: data.sale_price ?? data.price,
                                image_url: data.image_url,
                            })}
                            className="w-full md:w-max mt-4 bg-[#2C8DE0] hover:bg-[#1a6fb8] active:scale-95 transition-all cursor-pointer text-white px-8 py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}