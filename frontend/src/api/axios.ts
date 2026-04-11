import axios from "axios";

const api = axios.create({
    baseURL: "https://seafood-vyx2.onrender.com/api",
});

api.interceptors.request.use((config) => {
    // 1. Lấy dữ liệu từ LocalStorage
    const authStorage = localStorage.getItem("auth-storage");

    if (authStorage) {
        try {
            // 2.  
            const parsedData = JSON.parse(authStorage);

            // 3. truy cập vào state->token
            const token = parsedData.state?.token;

            if (token) {
                // 4. Gắn vào Header
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error("Lỗi đọc token:", error);
        }
    }
    return config;
});

export default api;