import * as categoryService from '../services/categoryService.js';

//lấy tất cả danh mục
export const getAllCategory = async (req, res) => {
    try {
        const { page, limit } = req.query;

        const data = await categoryService.getCategory({
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 10
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

//
export const getCategoryDetail = async (req, res) => {
    try {
        //
        const { slug } = req.params;
        //
        const data = await categoryService.getCategoryDetail({ slug });
        // Kiểm tra nếu không có dữ liệu trả về
        if (!data) {
            return res.status(404).json({ message: "Không tìm thấy danh mục" });
        }
        //
        res.status(200).json(data);
        //
    } catch (error) {
        res.status(500).json({ error: error });
    }
}