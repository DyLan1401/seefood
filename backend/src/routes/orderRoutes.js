import { Router } from 'express';
import { getAllOrders, createOrder, getOrderDetail, updateOrder, getMyOrders } from '../controllers/orderController.js';
import { verifyToken } from '../middleware/auth.middleware.js';
//
const router = Router();
//
router.get("/all", getAllOrders);
router.get('/my-orders', verifyToken, getMyOrders);
router.get("/:id", getOrderDetail);

router.post("/create", verifyToken, createOrder);
router.put("/update", updateOrder);
export default router;      