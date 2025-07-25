import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../Controller/ProductController.js'
const router = Router();

// createProduct route
router.post('/createProduct', createProduct);

// getAllProducts route
router.get('/getAllProducts', getAllProducts);

// getProductById route
router.get('/getProduct/:id', getProductById);

// updateProduct route
router.put('/updateProduct/:id', updateProduct);

// deleteProduct route
router.delete('/deleteProduct/:id', deleteProduct);

export default router;