import { Router } from 'express';
import { getProducts, getProductDetail, getProductsByCategory } from '../controllers/productController.js';
//
const router = Router();
//
router.get("/all", getProducts);
router.get("/:slug", getProductDetail);
router.get("/category/:slug", getProductsByCategory);
export default router;