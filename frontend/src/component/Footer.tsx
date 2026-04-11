export default function Footer() {
    return (
        <div className="container mx-auto w-full h-auto min-h-64 mt-5 bg-amber-200">

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 p-5 md:p-10">

                {/* Cột 1 */}
                <div className="flex flex-col items-center md:items-start">
                    <div className="text-lg font-semibold mb-2">GIỚI THIỆU</div>
                    <div className="text-center md:text-left">
                        <p className="text-sm">Thông tin về cửa hàng và sứ mệnh mang đến sản phẩm chất lượng.</p>
                    </div>
                </div>

                {/* Cột 2 */}
                <div className="flex flex-col items-center md:items-start">
                    <div className="text-lg font-semibold mb-2">DANH MỤC</div>
                    <div className="text-center md:text-left space-y-1">
                        <div>Trang chủ</div>
                        <div>Liên hệ</div>
                        <div>Giới thiệu</div>
                        <div>Tuyển dụng</div>
                    </div>
                </div>

                {/* Cột 3 */}
                <div className="flex flex-col items-center md:items-start">
                    <div className="text-lg font-semibold mb-2">CHĂM SÓC KHÁCH HÀNG</div>
                    <div className="text-center md:text-left space-y-1">
                        <div>Chính sách giao hàng</div>
                        <div>Chính sách đổi trả</div>
                        <div>Phương thức thanh toán</div>
                    </div>
                </div>

                {/* Cột 4 */}
                <div className="flex flex-col items-center md:items-start">
                    <div className="text-lg font-semibold mb-2">KẾT NỐI VỚI CHÚNG TÔI</div>
                    <div className="text-center md:text-left">
                        <div className="flex gap-4">
                            <span>Facebook</span>
                            <span>Zalo</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}