import express from 'express';
import { adminAuth } from '../middleware/auth.js';
const router = express.Router();

import {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} from '../controllers/products.js';

router.get('/', getProducts);
router.post('/', adminAuth, createProduct);
router.get('/:id', getProduct);
router.put('/:id', adminAuth, updateProduct);
router.delete('/:id', adminAuth, deleteProduct);

export default router;
