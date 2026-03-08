import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="text-center max-w-md w-full">
                <h1 className="text-9xl font-extrabold text-blue-600 tracking-widest">404</h1>
                <div className="bg-orange-500 px-2 text-sm rounded rotate-12 absolute translate-x-1/2 -translate-y-12 inline-block text-white font-bold">
                    KHÔNG TÌM THẤY TRANG
                </div>

                <p className="text-gray-600 mt-8 mb-8 text-lg">
                    Có vẻ như bạn đã đi lạc đường. Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition-colors"
                    >
                        Quay lại
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-lg transition-all"
                    >
                        Về trang chủ
                    </button>
                </div>
            </div>
        </div>
    );
}