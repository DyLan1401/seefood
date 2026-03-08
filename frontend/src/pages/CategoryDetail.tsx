import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import { useParams } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/Footer";
import ProductCard from "../component/ProductCard";
import type { Product } from "../types/product";

export default function CategoryDetail() {
    const { slug } = useParams();

    const { data: products, isLoading, error } = useQuery<Product[]>({
        queryKey: ["products-by-category", slug],
        enabled: !!slug,
        queryFn: async () => {
            const res = await api.get(`/product/category/${slug}`);
            // Logic cũ: Đảm bảo dữ liệu luôn là mảng
            return Array.isArray(res.data) ? res.data : [res.data];
        }
    });

    if (isLoading) return <div className="flex justify-center items-center h-screen font-semibold text-gray-500">Đang tải sản phẩm...</div>;
    if (error) return <div className="text-center py-20 text-red-500">Lỗi khi tải sản phẩm</div>;

    return (
        <div className="container mx-auto px-2 sm:px-4">
            <Header />

            <main className="w-full py-4 md:py-6">
                {/*  */}
                <div className="text-lg md:text-xl rounded-t-lg bg-[#BF4E2C] p-3 md:p-4 font-semibold text-white uppercase shadow-sm">
                    Danh mục: <span className="font-normal opacity-90">{slug?.replace(/-/g, ' ')}</span>
                </div>

                {/* */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 p-3 md:p-5 bg-[#FFF2E8] rounded-b-lg shadow-inner min-h-[400px]">
                    {products && products.length > 0 ? (
                        products.map((p: Product) => (
                            <div key={p.id} className="flex justify-center">
                                <ProductCard
                                    name={p.name}
                                    image_url={p.image_url}
                                    price={p.price}
                                    sale_price={p.sale_price}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center p-16 text-gray-500 italic">
                            <p className="text-4xl mb-4">📦</p>
                            <p>Không có sản phẩm nào trong danh mục này.</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}