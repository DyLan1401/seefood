//lib
import { Link } from "react-router-dom";

//components
import Footer from "../component/Footer";
import Header from "../component/Header";
import CategoryCard from "../component/CategoryCard";

//hooks
import { useCategoryList } from "../hooks/category/useCategoryList";

//types
import type { Category } from "../types/category";


export default function Categories() {

    // gọi biến từ hook
    const { categories, isLoading: isLoadingCategories, isError: isErrorCategories } = useCategoryList();
    //

    //kiểm tra data
    const categoryList = categories?.items || [];

    //loading
    if (isLoadingCategories) return (
        <div className="flex justify-center items-center h-screen animate-pulse font-semibold text-gray-500">
            Đang tải danh mục...
        </div>
    );

    //error
    if (isErrorCategories) return (
        <div className="text-center py-20 text-red-500 font-bold">
            Lỗi tải dữ liệu, vui lòng thử lại sau!
        </div>
    );

    return (
        <>
            <Header />
            {/* Main */}
            <main className="container mx-auto p-2 md:p-5">
                <div className="text-lg md:text-xl rounded-t-lg bg-[#BF4E2C] p-3 font-semibold text-white text-start">
                    Tất cả danh mục
                </div>

                {/* danh sách danh mục  */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-3 bg-white shadow-sm border-x border-b rounded-b-lg gap-3 md:gap-6 justify-center items-stretch">
                    {categoryList?.map((c: Category) => (
                        <Link
                            key={c.id}
                            // link chuyển hướng
                            to={`/product/category/${c.slug}`}
                            className="w-full flex justify-center transition-transform duration-200 hover:scale-[1.02]"
                        >
                            <CategoryCard
                                id={c.id}
                                name={c.name}
                                image_url={c.image_url}
                                slug={c.slug}
                            />
                        </Link>
                    ))}
                </div>
            </main>
            <Footer />
        </>
    )
}