import express from "express";
import {createOrder, getUserOrderById, getUserOrders, updateOrder} from '../Controller/OrderController.js'
import protectRoute from '../Middleware/protectRoute.js';

const router = express.Router();

router.post("/createOrder", protectRoute, createOrder);
router.get("/getUserOrders", protectRoute, getUserOrders);
router.get("/getUserOrderById/:_id", protectRoute, getUserOrderById);
router.put("/updateOrder/:_id", protectRoute, updateOrder);

export default router;
