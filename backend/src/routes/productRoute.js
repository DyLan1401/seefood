import { Router } from 'express';
import { getProducts, getProductDetail, getProductsByCategory, createProduct, updateProduct, deleteProduct, uploadFile } from '../controllers/productController.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import multer from 'multer';
//
const router = Router();
const upload = multer({ dest: 'uploads/' });

//router tĩnh
router.get("/all", getProducts);

//router action
router.post("/create", verifyToken, createProduct);
router.put("/update/:id", verifyToken, updateProduct);
router.delete("/delete/:id", verifyToken, deleteProduct);
//
router.get("/category/:slug", getProductsByCategory);
router.post('/upload-image', upload.single('image'), uploadFile);

router.get("/:id", getProductDetail);
export default router;