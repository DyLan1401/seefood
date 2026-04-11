import * as categoryService from '../services/categoryService.js';
import cloudinary from '../config/cloudinary.js';

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
        res.status(500).json({
            message: "Đã xảy ra lỗi hệ thống",
            error: error.message
        })
    }
};

//chi tiết danh mục
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
        res.status(500).json({
            message: "Đã xảy ra lỗi hệ thống",
            error: error.message
        })
    }
};

//thêm danh mục
export const AddCategory = async (req, res) => {
    try {
        const { name, slug, image_url } = req.body;

        const data = await categoryService.createCategory({ name, slug, image_url });

        if (!data.affectedRows === 0) {
            return res.status(404).json({
                message: "Không thể thêm danh mục",
            });
        }
        res.status(201).json({
            message: "Đã tạo thành công danh mục",
            id: data.insertId
        });

    } catch (error) {
        res.status(500).json({
            message: "Đã xảy ra lỗi hệ thống",
            error: error.message
        })
    }
};

//cập nhật danh mục
export const UpdateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, slug, image_url } = req.body;

        const data = await categoryService.UpdateCategory({ id, name, slug, image_url });

        if (!data) {
            res.status(404).json(`không thể tìm thấy danh mục ${id}`);
        };

        res.status(200).json(`Đã cập nhật thành công danh mục ${id}`)

    } catch (error) {
        res.status(500).json({
            message: "Đã xảy ra lỗi hệ thống",
            error: error.message
        })
    }
};

//xóa danh mục
export const DeleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await categoryService.DeleteCategory({ id });

        if (!data) {
            res.status(404).json(`Không thể tìm thấy danh mục ${id}`);
        };

        res.status(200).json(`Đã xóa thành công danh mục ${id}`)

    } catch (error) {
        res.status(500).json({
            message: "Đã xảy ra lỗi hệ thống",
            error: error.message
        })
    }
};

//upload file
export const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Không có file nào được chọn' });
        }

        // Tải file lên Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'seafood_categories', // Thư mục lưu ảnh trên Cloudinary
        });

        // Trả về URL thật của ảnh
        res.status(200).json({
            imageUrl: result.secure_url
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi upload ảnh', error: error.message });
    }
};