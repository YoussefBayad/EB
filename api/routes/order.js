import express from 'express';

const router = express.Router();
import { addOrder } from '../controllers/order.js';
import { userAuth } from '../middleware/auth.js';

router.post('/', userAuth, addOrder);
router.get('/:id', userAuth, getOrder);

export default router;
