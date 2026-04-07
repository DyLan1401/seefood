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
        res.status(500).json({
            message: "Đã xảy ra lỗi hệ thống",
            error: error.message
        })
    }
};

//lấy chi tiết sản phẩm
export const getProductDetail = async (req, res) => {
    try {
        //
        const { id } = req.params;
        //
        const data = await productService.getProductDetail({ id });
        // Kiểm tra nếu không có dữ liệu trả về
        if (!data) {
            return res.status(404).json({ message: `Không tìm thấy sản phẩm id: ${id}` });
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
            return res.status(404).json({ message: "Không tìm thấy sản phẩm trong danh mục" });
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
}

//tạo sản phẩm
export const createProduct = async (req, res) => {
    try {
        const { name, slug, price, sale_price, stock, image_url, description, origin, weight, category_id } = req.body;

        const data = await productService.addProduct({ name, slug, price, sale_price, stock, image_url, description, origin, weight, category_id });

        if (!data.affectedRows === 0) {
            return res.status(404).json({
                message: "Không thể thêm sản phẩm",
            });
        }
        res.status(201).json({
            message: "Đã tạo thành công sản phẩm",
            id: data.insertId
        });

    } catch (error) {
        res.status(500).json({
            message: "Đã xảy ra lỗi hệ thống",
            error: error.message
        })
    }
};

//cập nhập sản phẩm
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, slug, price, sale_price, stock, image_url, description, origin, weight, category_id } = req.body;

        const data = await productService.updateProduct({ id, name, slug, price, sale_price, stock, image_url, description, origin, weight, category_id });

        if (!data) {
            return res.status(404).json({
                message: `Không thể cập nhật sản phẩm id: ${id} `,
            });
        }
        res.status(200).json({
            message: `Đã cập nhật sản phẩm id: ${id} `,
        });

    } catch (error) {
        res.status(500).json({
            message: "Đã xảy ra lỗi hệ thống",
            error: error.message
        })
    }
};

//xóa sản phẩm
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await productService.deleteProduct({ id });

        if (!data) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm để xóa sản phẩm",
            });
        }

        res.status(200).json({
            message: `Đã xóa thành công sản phẩm id: ${id}`,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Đã xảy ra lỗi hệ thống",
            error: error.message
        })
    }
}
