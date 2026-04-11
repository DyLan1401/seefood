//lib
import { Link } from "react-router-dom";

//components
import Header from "../component/Header";
import Footer from "../component/Footer";
import ProductCard from "../component/ProductCard";
import CategoryCard from "../component/CategoryCard";
import Banner from "../component/Banner";
import Button from "../component/Button";

//hooks
import { useProduct } from "../hooks/useProducts";
import { useCategory } from "../hooks/useCategory";

//types
import type { Category } from "../types/category"
import type { Product } from "../types/product";

export default function Home() {

    //lấy data từ hook
    const { products, isLoadingProducts, isErrorProducts } = useProduct();
    const { categories, isLoadingCategory, isErrorCategory } = useCategory();

    //báo error và loading
    if (isLoadingProducts || isLoadingCategory) return <div className="flex justify-center items-center h-screen">Loading...</div>
    if (isErrorProducts || isErrorCategory) return <div className="text-center py-10">Lỗi tải Dữ liệu</div>

    return (
        <>
            <Header />
            {/* Main */}
            <main className="container mx-auto px-2 sm:px-4">
                <Banner />
                {/* SẢN PHẨM */}
                <div className="w-full p-2 md:p-5">
                    <div className="text-lg md:text-xl rounded-t-lg bg-[#BF4E2C] p-3 font-semibold text-white">
                        SẢN PHẨM MỚI
                    </div>
                    {/* hiển thị danh sách sản phẩm */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 p-2 md:p-4 bg-[#FFF2E8] rounded-b-lg">
                        {products?.items && products.items.length > 0 ? (
                            products.items.map((p: Product) => (
                                <Link
                                    key={p.id}
                                    to={`/product/${p.id}`}
                                    className="w-full flex justify-center"
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
                            <div>Không tìm thấy sản phẩm</div>
                        )}

                    </div>
                    {/* chuyển hướng */}
                    <Link to="/products" className="flex justify-center p-6">
                        <Button text="Xem Thêm Sản Phẩm" />
                    </Link>
                </div>

                {/* DANH MỤC  */}
                <div className="w-full p-2 md:p-5 mt-8">
                    <div className="text-lg md:text-xl rounded-t-lg bg-[#BF4E2C] p-3 font-semibold text-white">
                        DANH MỤC NỔI BẬT
                    </div>
                    {/* hiển thị danh sách danh mục */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 p-2 md:p-4 bg-[#FFF2E8] rounded-b-lg">
                        {categories?.items && categories.items.length > 0 ? (
                            categories.items.map((c: Category) => (
                                <Link
                                    key={c.id}
                                    to={`/category/${c.slug}`}
                                    className="w-full flex justify-center"
                                >
                                    <CategoryCard
                                        id={c.id}
                                        name={c.name}
                                        image_url={c.image_url}
                                        slug={c.slug}
                                    />
                                </Link>
                            ))
                        ) : (
                            <div>Không tìm thấy danh mục</div>
                        )}
                    </div>
                    {/* chuyển hướng */}
                    <Link to="/categories" className="flex justify-center p-6">
                        <Button text="Tất Cả Danh Mục" />
                    </Link>
                </div>

            </main>
            <Footer />

        </>
    )
}