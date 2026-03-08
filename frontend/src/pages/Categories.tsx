import Footer from "../component/Footer";
import Header from "../component/Header";
import { useQuery } from "@tanstack/react-query"
import CategoryCard from "../component/CategoryCard";
import type { Category } from "../types/category";
import api from "../api/axios"
import { Link } from "react-router-dom";

export default function Categories() {
    //
    const { data, isLoading, error } = useQuery<Category[]>({
        queryKey: ["category"],
        queryFn: async () => {
            const res = await api.get("/category/all");
            return res.data.items;
        },
    });
    //
    if (isLoading) return (
        <div className="flex justify-center items-center h-screen animate-pulse font-semibold text-gray-500">
            Đang tải danh mục...
        </div>
    );
    //
    if (error) return (
        <div className="text-center py-20 text-red-500 font-bold">
            Lỗi tải dữ liệu, vui lòng thử lại sau!
        </div>
    );

    return (
        <div className="container mx-auto px-2 sm:px-4">
            <Header />
            <main className="w-full h-full p-2 md:p-5">
                {/* */}
                <div className="text-lg md:text-xl rounded-t-lg bg-[#BF4E2C] p-3 font-semibold text-white text-start">
                    Tất cả danh mục
                </div>

                {/*  */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-3 bg-white shadow-sm border-x border-b rounded-b-lg gap-3 md:gap-6 justify-center items-stretch">
                    {data?.map((c) => (
                        <Link
                            key={c.id}
                            to={`/product/category/${c.slug}`}
                            className="w-full flex justify-center transition-transform duration-200 hover:scale-[1.02]"
                        >
                            <CategoryCard
                                name={c.name}
                                image_url={c.image_url}
                                slug={c.slug}
                            />
                        </Link>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    )
}