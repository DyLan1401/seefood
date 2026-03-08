import { useQuery } from "@tanstack/react-query"
import type { Category } from "../types/category"
import api from "../api/axios"
import Header from "../component/Header";
import Footer from "../component/Footer";
import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import ProductCard from "../component/ProductCard";
import CategoryCard from "../component/CategoryCard";
import Banner from "../component/Banner";
import Button from "../component/Button";

export default function Home() {
    const { data: category, isLoading: loadingCategories, error: errorCategories } = useQuery<Category[]>({
        queryKey: ["categories", 5],
        queryFn: async () => {
            const res = await api.get("/category/all?page=1&limit=4");
            return res.data.items;
        },
    });

    const { data: product, isLoading: loadingProduct, error: errorProduct } = useQuery<Product[]>({
        queryKey: ["products", 5],
        queryFn: async () => {
            const res = await api.get("/product/all?page=1&limit=4");
            return res.data.items;
        },
    });

    if (loadingProduct || loadingCategories) return <div className="flex justify-center items-center h-screen">Loading...</div>
    if (errorCategories || errorProduct) return <div className="text-center py-10">Lỗi tải Dữ liệu</div>

    return (
        <div className="container mx-auto px-2 sm:px-4">
            {/*  */}
            <div className="w-full">
                <Header />
            </div>

            {/* */}
            <div className="w-full my-2 md:my-4">
                <Banner />
            </div>

            {/*  */}
            <div className="w-full p-2 md:p-5">
                <div className="text-lg md:text-xl rounded-t-lg bg-[#BF4E2C] p-3 font-semibold text-white">
                    SẢN PHẨM MỚI
                </div>
                {/*  */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 p-2 md:p-4 bg-[#FFF2E8] rounded-b-lg">
                    {product?.map((p) => (
                        <Link
                            key={p.id}
                            to={`/product/${p.slug}`}
                            className="w-full flex justify-center"
                        >
                            <ProductCard
                                name={p.name}
                                image_url={p.image_url}
                                price={p.price}
                                sale_price={p.sale_price}
                            />
                        </Link>
                    ))}
                </div>
                <Link to="/products" className="flex justify-center p-6">
                    <Button text="Xem Thêm Sản Phẩm" />
                </Link>
            </div>

            {/*  */}
            <div className="w-full p-2 md:p-5 mt-4">
                <div className="text-lg md:text-xl rounded-t-lg bg-[#BF4E2C] p-3 font-semibold text-white">
                    DANH MỤC NỔI BẬT
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 p-2 md:p-4 bg-[#FFF2E8] rounded-b-lg">
                    {category?.map((c) => (
                        <Link
                            key={c.id}
                            to={`/category/${c.slug}`}
                            className="w-full flex justify-center"
                        >
                            <CategoryCard
                                name={c.name}
                                image_url={c.image_url}
                                slug={c.slug}
                            />
                        </Link>
                    ))}
                </div>
                <Link to="/categories" className="flex justify-center p-6">
                    <Button text="Tất Cả Danh Mục" />
                </Link>
            </div>

            {/* Footer Section */}
            <div className="mt-8">
                <Footer />
            </div>
        </div>
    )
}