import express from 'express';

const router = express.Router();

import {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} from '../controllers/products.js';

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
