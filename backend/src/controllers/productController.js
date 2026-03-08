import * as productService from '../services/productService.js';

//lấy tất cả sản phẩm
export const getProducts = async (req, res) => {
    try {
        //
        const { search, category, page, limit } = req.query;
        //
        const data = await productService.getAllProducts({
            search: search || "",
            category: category || "",
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 10
        });
        //
        res.status(200).json(data);
        //
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

//lấy chi tiết sản phẩm
export const getProductDetail = async (req, res) => {
    try {
        //
        const { slug } = req.params;
        //
        const data = await productService.getProductDetail({ slug });
        // Kiểm tra nếu không có dữ liệu trả về
        if (!data) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
        }
        //
        res.status(200).json(data);
        //
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

//sản phâm thuộc danh mục
export const getProductsByCategory = async (req, res) => {
    try {
        //
        const { slug } = req.params;
        //
        const data = await productService.getProductsByCategory({ slug });
        // Kiểm tra nếu không có dữ liệu trả về
        if (!data) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
        }
        //
        res.status(200).json(data);
        //
    } catch (error) {
        res.status(500).json({ error: error });
    }
}