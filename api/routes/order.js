import express from 'express';

const router = express.Router();
import { addOrder } from '../controllers/order.js';
import { userAuth } from '../middleware/auth.js';

router.post('/', userAuth, addOrder);

export default router;
