import express from 'express';

const router = express.Router();
import {
  addOrder,
  getOrder,
  getOrders,
  getUserOrder,
  updateOrderToPaid,
} from '../controllers/order.js';
import { adminAuth, userAuth } from '../middleware/auth.js';

router.get('/:id', userAuth, getOrder);
router.get('/', adminAuth, getOrders);
// router.get('/', userAuth, getUserOrder);
router.post('/', userAuth, addOrder);

router.put('/:id/pay', userAuth, updateOrderToPaid);

export default router;
