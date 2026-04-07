//lib
import { useParams } from "react-router-dom";

//components
import Header from "../component/Header";
import Footer from "../component/Footer";

//hooks
import { useProduct } from "../hooks/useProducts";

//zustand
import { useCartStore } from "../store/cartStore";
import { useToastStore } from "../store/useToastStore";



export default function ProductDetail() {
    //lấy id từ url
    const { slug } = useParams();
    const addItem = useCartStore((s) => s.addItem);
    const showToast = useToastStore((state) => state.show);
    const { productDetail, isLoadingDetail, isErrorDetail } = useProduct(slug);

    //thêm vào giỏ hàng
    const handleAddtoCart = () => {
        if (!productDetail) return;

        addItem({
            productId: productDetail.id,
            name: productDetail.name,
            price: productDetail.sale_price ?? productDetail.price,
            image_url: productDetail.image_url,
        });
        showToast(`Đã thêm ${productDetail.name} vào giỏ hàng!`, "success");
    }

    //loading
    if (isLoadingDetail) return <div className="flex justify-center items-center h-screen font-semibold">Đang tải...</div>;
    //error
    if (isErrorDetail && !productDetail) return <div className="p-4 text-center text-red-500">Không thể tải thông tin sản phẩm</div>;

    return (
        < >
            < Header />
            {/* Main */}
            <div className="container mx-auto py-4 md:py-10">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 p-2">

                    {/*hiển thị chi tiết sản phẩm  */}
                    <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-sm">
                        {productDetail.image_url ? (
                            <img
                                src={productDetail.image_url}
                                alt={productDetail.name}
                                className="w-full h-80 sm:h-96 md:h-125 lg:h-140 object-cover"
                            />
                        ) : (
                            <div className="h-80 md:h-140 flex items-center justify-center text-gray-400">
                                Không có ảnh
                            </div>
                        )}
                    </div>

                    {/* thông tin sản phẩm */}
                    <div className="flex flex-col justify-center space-y-4">
                        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight">
                            {productDetail.name}
                        </h1>

                        <div className="text-xl md:text-2xl">
                            {productDetail.sale_price ? (
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-[#BF4E2C]">
                                        {productDetail.sale_price.toLocaleString()}đ
                                    </span>
                                    <span className="line-through text-gray-400 text-lg">
                                        {productDetail.price.toLocaleString()}đ
                                    </span>
                                </div>
                            ) : (
                                <span className="font-bold text-[#2C8DE0]">
                                    {productDetail.price.toLocaleString()}đ
                                </span>
                            )}
                        </div>

                        {/*  */}
                        <div className="border-t border-gray-100 pt-4">
                            <h3 className="font-semibold mb-2 text-gray-800">Mô tả sản phẩm:</h3>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed whitespace-pre-line max-w-prose">
                                {productDetail.description || "Chưa có mô tả chi tiết cho sản phẩm này."}
                            </p>
                        </div>

                        {/* Thêm vào giỏ hàng */}
                        <button
                            onClick={handleAddtoCart}
                            className="w-full md:w-max mt-4 bg-[#2C8DE0] hover:bg-[#1a6fb8] active:scale-95 transition-all cursor-pointer text-white px-8 py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
                        >
                            <ShoppingCartIcon />
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

// Icon nhỏ cho nút bấm
const ShoppingCartIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);