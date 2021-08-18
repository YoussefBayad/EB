import express from 'express';

const router = express.Router();
import { addOrder, getOrder, updateOrderToPaid } from '../controllers/order.js';
import { userAuth } from '../middleware/auth.js';

router.post('/', userAuth, addOrder);
router.get('/:id', userAuth, getOrder);
router.put('/:id/pay', userAuth, updateOrderToPaid);

export default router;
