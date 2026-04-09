import { Router } from 'express';
import { getProducts, getProductDetail, getProductsByCategory, createProduct, updateProduct, deleteProduct, uploadFile } from '../controllers/productController.js';
import multer from 'multer';
//
const router = Router();
const upload = multer({ dest: 'uploads/' });

//router tĩnh
router.get("/all", getProducts);

//router action
router.post("/create", createProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);
//
router.get("/category/:slug", getProductsByCategory);
router.post('/upload-image', upload.single('image'), uploadFile);

router.get("/:id", getProductDetail);
export default router;