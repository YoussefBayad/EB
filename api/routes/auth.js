import express from 'express';

const router = express.Router();
import {
  login,
  register,
  forgotPassword,
  resetPassword,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
} from '../controllers/auth.js';

import { adminAuth, userAuth } from '../middleware/auth.js';

router.get('/', adminAuth, getUsers);
router.delete('/:id', adminAuth, deleteUser);
router.put('/:id', userAuth, updateUser);

router.post('/register', register);

router.post('/login', login);

router.post('/forgotpassword', forgotPassword);

// router.get('/isTokenValid', protect, getUser);

router.put('/passwordreset/:resetToken', resetPassword);

export default router;
