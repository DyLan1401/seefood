import { Router } from 'express';
import { getAllOrders, createOrder, getOrderDetail, updateOrder, getMyOrders, deleteOrder } from '../controllers/orderController.js';
import { verifyToken } from '../middleware/auth.middleware.js';
//
const router = Router();

//router tĩnh
router.get("/all", verifyToken, getAllOrders);
router.get('/my-orders', verifyToken, getMyOrders);

//router action
router.post("/create", verifyToken, createOrder);
router.delete("/delete/:id", verifyToken, deleteOrder);


router.put("/:id/status", verifyToken, updateOrder);
//
router.get("/:id", getOrderDetail);
export default router;      