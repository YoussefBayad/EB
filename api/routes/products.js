import express from 'express';
import { adminAuth, userAuth } from '../middleware/auth.js';
const router = express.Router();

import {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  createProductReview,
} from '../controllers/products.js';

router.get('/', getProducts);
router.post('/', adminAuth, createProduct);
router.get('/:id', getProduct);
router.post('/:id/reviews', userAuth, createProductReview);

router.put('/:id', adminAuth, updateProduct);
router.delete('/:id', adminAuth, deleteProduct);

export default router;
