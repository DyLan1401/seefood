//lib
import { Link, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

//components
import Footer from "../component/Footer";
import Header from "../component/Header";
import ProductCard from "../component/ProductCard";
import { ProductCardSkeleton } from "../component/Skeleton";

//hooks
import { useProductList } from "../hooks/product/useProductList";

//types
import type { Product } from "../types/product";


export default function Products() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const searchQuery = (searchParams.get("search") || "").toLowerCase();
    const { products, isLoading, isError } = useProductList();


    const productList = products?.items || [];
    // const productList = useMemo(() => {
    //     return products?.items || [];
    // }, [products]);

    //tìm kiếm
    const filteredProducts = useMemo(() => {
        return productList.filter((p: Product) =>
            p.name?.toLowerCase().includes(searchQuery)
        );

    }, [productList, searchQuery])


    if (isError) return (
        <div className="text-center py-10 text-red-500">
            Lỗi tải dữ liệu. Vui lòng thử lại.
        </div>
    );

    return (
        /**/
        <>
            <Header />
            {/* Main */}
            <main className="container mx-auto py-4 md:py-6">
                <div className="text-lg md:text-xl rounded-t-lg bg-[#BF4E2C] p-3 md:p-4 font-semibold text-white text-start uppercase">
                    {searchQuery ? `Kết quả tìm kiếm: "${searchQuery}"` : "Tất cả sản phẩm"}
                </div>

                {/* hiển thị sản phẩm */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6 p-2 md:p-4 bg-[#FFF2E8] rounded-b-lg border-x border-b border-[#e5e7eb]">
                    {isLoading ? (
                        Array.from({ length: 8 }).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))
                    ) : filteredProducts.length > 0 ? (
                        filteredProducts.map((p: Product) => (
                            <Link
                                key={p.id}
                                to={`/product/${p.id}`}
                                className="w-full  flex justify-center hover:scale-[1.02] transition-transform"
                            >
                                <ProductCard
                                    id={p.id}
                                    name={p.name}
                                    image_url={p.image_url}
                                    price={p.price}
                                    sale_price={p.sale_price}
                                />
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center text-gray-500 italic">
                            Cá hiện tại đang phơi nắng  mời bạn quay lại sau.
                            <button
                                onClick={() => navigate('/products')}
                                className="text-[#BF4E2C] underline font-medium"
                            >
                                Xem tất cả sản phẩm
                            </button>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    )
}