import { Router } from 'express';
import { getProducts, getProductDetail, getProductsByCategory, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
//
const router = Router();
//
router.get("/all", getProducts);
router.post("/create", createProduct);

router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

router.get("/category/:slug", getProductsByCategory);
router.get("/:id", getProductDetail);
export default router;