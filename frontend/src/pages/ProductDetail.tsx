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
            const res = await api.get(`/products/${slug}`);
            return res.data;
        }
    })
    if (isLoading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4">Failed to load product</div>;
    if (!data) return <div className="p-4">Not found</div>;

    return (
        <div className="container mx-auto">
            <div>
                <Header />
            </div>
            <div className="w-full h-full">
                <div className="grid md:grid-cols-2 gap-6 p-2">
                    <div className="bg-gray-100 rounded-lg overflow-hidden">
                        {data.image_url ? (
                            <img src={data.image_url} className="w-full h-140 object-cover" />
                        ) : (
                            <div className="h-96" />
                        )}
                    </div>

                    <div className="flex flex-col justify-center">
                        <h1 className="text-4xl font-bold">{data.name}</h1>

                        <div className="mt-2 text-xl">
                            {data.sale_price ? (
                                <>
                                    <span className="font-bold">{data.sale_price}đ</span>{" "}
                                    <span className="line-through text-gray-500">
                                        {data.price}đ
                                    </span>
                                </>
                            ) : (
                                <span className="font-bold">{data.price}đ</span>
                            )}
                        </div>

                        <p className="mt-4 text-gray-700 whitespace-pre-line">
                            {data.description || "Chưa có mô tả"}
                        </p>

                        <button
                            onClick={() => addItem({
                                productId: data.id,
                                name: data.name,
                                price: data.sale_price ?? data.price,
                                image_url: data.image_url,
                            })
                            }
                            className="mt-6 bg-[#2C8DE0] cursor-pointer text-white px-4 py-2 rounded">
                            Thêm vào giỏ
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}