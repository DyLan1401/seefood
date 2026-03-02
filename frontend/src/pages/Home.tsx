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
            const res = await api.get("/categories?page=1&limit=4");
            return res.data;
        },
    });

    const { data: product, isLoading: loadingProduct, error: errorProduct } = useQuery<Product[]>({
        queryKey: ["products", 5],
        queryFn: async () => {
            const res = await api.get("/products?page=1&limit=4");
            return res.data;
        },
    });

    if (loadingProduct || loadingCategories) return <div>Loading...</div>
    if (errorCategories || errorProduct) return <div>Lỗi tải Dữ liệu</div>

    return (
        <div className="container mx-auto ">
            <div>
                <Header />
            </div>
            <div>
                <Banner />
            </div>
            <div className="w-full h-full  p-5 ">
                <div className=" text-xl  rounded-t-lg bg-[#BF4E2C] p-3 font-semibold text-start">
                    SẢN PHẨM
                </div>
                <div className="grid grid-cols-2 p-2 bg-[#FFF2E8] justify-center items-center md:grid-cols-4 gap-4">
                    {product?.map((p) => (
                        <Link
                            key={p.id}
                            to={`/product/${p.slug}`}
                            className="w-full flex justify-center">
                            <ProductCard
                                name={p.name}
                                image_url={p.image_url}
                                price={p.price}
                                sale_price={p.sale_price} />
                        </Link>
                    ))}
                </div>
                <Link to="./products"
                    className="flex w-full h-full justify-center p-4">
                    <Button text="Xem Thêm" />
                </Link>

            </div>

            <div className="w-full h-full p-2 ">
                <div className=" text-xl  rounded-t-lg bg-[#BF4E2C] p-3 font-semibold text-start">
                    DANH MỤC
                </div>
                <div className="grid grid-cols-2 p-2 bg-[#FFF2E8] justify-center items-center md:grid-cols-4 gap-4">
                    {category?.map((c) => (
                        <Link
                            key={c.id}
                            to={`/category/${c.slug}`}
                            className="w-full flex justify-center">
                            <CategoryCard
                                name={c.name}
                                image_url={c.image_url}
                                id={c.id}
                                created_at={c.created_at}
                                slug={c.slug} />
                        </Link>
                    ))}
                </div>
                <Link to="./"
                    className="flex w-full h-full justify-center p-4">
                    <Button text="Xem Thêm" />

                </Link>
            </div>

            <div>
                <Footer />
            </div>
        </div>
    )
}