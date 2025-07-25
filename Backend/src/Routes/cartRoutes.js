import { Router } from "express";
const router = Router();
import protectRoute from '../Middleware/protectRoute.js';
import { addToCart, clearCart, getCart, removeFromCart } from '../Controller/CartController.js';

// addToCart route
router.post('/addToCart',protectRoute, addToCart);

// getCart route
router.get('/getCart',protectRoute, getCart);

// removeFromCart route
router.delete('/removeFromCart',protectRoute, removeFromCart);

// clearCart route
router.delete('/clearCart', protectRoute, clearCart);

export default router;