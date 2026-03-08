import Footer from "../component/Footer";
import Header from "../component/Header";
import { useQuery } from "@tanstack/react-query"
import ProductCard from "../component/ProductCard";
import type { Product } from "../types/product";
import api from "../api/axios"
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function Products() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";

    const { data: product, isLoading, error } = useQuery<Product[]>({
        queryKey: ["products", searchQuery],
        queryFn: async () => {
            const res = await api.get("/product/all", {
                params: {
                    search: searchQuery,
                    limit: 20
                }
            });
            return res.data.items;
        },
    });

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-[400px] font-medium text-gray-500">
            Đang tải sản phẩm...
        </div>
    );

    if (error) return (
        <div className="text-center py-10 text-red-500">
            Lỗi tải dữ liệu. Vui lòng thử lại.
        </div>
    );

    return (
        /**/
        <div className="container mx-auto px-2 sm:px-4">
            <Header />
            <main className="w-full h-full py-4 md:py-6">
                {/*  */}
                <div className="text-lg md:text-xl rounded-t-lg bg-[#BF4E2C] p-3 md:p-4 font-semibold text-white text-start uppercase">
                    {searchQuery ? `Kết quả tìm kiếm: "${searchQuery}"` : "Tất cả sản phẩm"}
                </div>

                {/*  */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6 p-2 md:p-4 bg-[#FFF2E8] rounded-b-lg border-x border-b border-[#e5e7eb]">
                    {product && product.length > 0 ? (
                        product.map((p) => (
                            <Link
                                key={p.id}
                                to={`/product/${p.slug}`}
                                className="w-full flex justify-center hover:scale-[1.02] transition-transform"
                            >
                                <ProductCard
                                    name={p.name}
                                    image_url={p.image_url}
                                    price={p.price}
                                    sale_price={p.sale_price}
                                />
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center text-gray-500 italic">
                            Không tìm thấy sản phẩm nào phù hợp.
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}