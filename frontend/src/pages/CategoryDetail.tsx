//lib
import { useParams } from "react-router-dom";

//components
import Header from "../component/Header";
import Footer from "../component/Footer";
import ProductCard from "../component/ProductCard";

//hooks
import { useProductByCategory } from "../hooks/product/useProductDetail";

//types
import type { Product } from "../types/product";



export default function CategoryDetail() {
    //lấy slug trên url
    const { slug } = useParams();

    //lấy data từ hook
    const { products, isLoading, isError } = useProductByCategory(slug);

    //kiểm tra data
    const ListProductByCategory = products?.data || [];

    //loading
    if (isLoading) return <div className="flex justify-center items-center h-screen font-semibold text-gray-500">Đang tải sản phẩm...</div>;
    //Error
    if (isError) return <div className="text-center py-20 text-red-500">Lỗi khi tải sản phẩm</div>;

    return (
        <>
            <Header />
            {/* Main */}
            <main className="container mx-auto py-4 md:py-6">

                <div className="text-lg md:text-xl rounded-t-lg bg-[#BF4E2C] p-3 md:p-4 font-semibold text-white uppercase shadow-sm">
                    Danh mục: <span className="font-normal opacity-90">{slug?.replace(/-/g, ' ')}</span>
                </div>

                {/* danh sách product-by-category */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 p-3 md:p-5 bg-[#FFF2E8] rounded-b-lg shadow-inner min-h-100">
                    {ListProductByCategory && ListProductByCategory.length > 0 ? (
                        ListProductByCategory.map((p: Product) => (
                            <div key={p.id} className="flex justify-center">
                                <ProductCard
                                    id={p.id}
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
                            <p>các sản phẩm của danh mục này đã đi phơi nắng  hãy quay lại sau nhé !!!</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
}