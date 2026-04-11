import { Router } from 'express';
import { getAllCategory, getCategoryDetail, AddCategory, UpdateCategory, DeleteCategory, uploadFile } from '../controllers/categoryController.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import multer from 'multer';
//
const router = Router();
const upload = multer({ dest: 'uploads/' });


//router tĩnh
router.get("/all", verifyToken, getAllCategory);

//router action
router.post("/create", verifyToken, AddCategory);
router.post('/upload-image', upload.single('image'), uploadFile);
router.put("/update/:id", verifyToken, UpdateCategory);
router.delete("/delete/:id", verifyToken, DeleteCategory)

//
router.get("/:slug", verifyToken, getCategoryDetail);

export default router;