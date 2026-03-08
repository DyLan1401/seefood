import { Router } from 'express';
import { getAllCategory, getCategoryDetail } from '../controllers/categoryController.js';
//
const router = Router();
//
router.get("/all", getAllCategory);
router.get("/:slug", getCategoryDetail);

export default router;