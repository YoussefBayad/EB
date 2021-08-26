import express from 'express';

const router = express.Router();
import {
  addOrder,
  getOrder,
  getOrders,
  deleteOrder,
  getUserOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
} from '../controllers/order.js';
import { adminAuth, userAuth } from '../middleware/auth.js';

router.get('/:id', userAuth, getOrder);
router.get('/', adminAuth, getOrders);
router.post('/', userAuth, addOrder);
router.delete('/:id', adminAuth, deleteOrder);
// router.get('/', userAuth, getUserOrder);
router.put('/:id/delivered', updateOrderToDelivered);
router.put('/:id/pay', userAuth, updateOrderToPaid);

export default router;
