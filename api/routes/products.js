import express from 'express';
import { protect } from '../middleware/auth.js';
const router = express.Router();

import {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} from '../controllers/products.js';

router.get('/', getProducts);
router.post('/', protect, createProduct);
router.get('/:id', getProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

export default router;
