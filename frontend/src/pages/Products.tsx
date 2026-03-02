import Footer from "../component/Footer";
import Header from "../component/Header";
import { useQuery } from "@tanstack/react-query"
import ProductCard from "../component/ProductCard";
import type { Product } from "../types/product";
import api from "../api/axios"
import { Link } from "react-router-dom";

export default function Products() {

    const { data: product, isLoading, error } = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await api.get("/products");
            return res.data;
        },
    });
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Lỗi tải Dữ liệu</div>

    return (
        <div className="container mx-auto">
            <div>
                <Header />
            </div>
            <div className="w-full h-full  p-5 ">
                <div className=" text-xl  rounded-t-lg bg-[#BF4E2C] p-3 font-semibold text-start">
                    SẢN PHẨM
                </div>
                <div className="grid grid-cols-2 p-2 justify-center items-center md:grid-cols-4 gap-4">
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
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}