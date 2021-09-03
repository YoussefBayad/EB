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
  setUserAsAdmin,
} from '../controllers/auth.js';

import { adminAuth, userAuth } from '../middleware/auth.js';

router.get('/', adminAuth, getUsers);
router.delete('/:id', adminAuth, deleteUser);
router.put('/', userAuth, updateUser);
router.put('/:id/setAsAdmin', adminAuth, setUserAsAdmin);

router.post('/register', register);

router.post('/login', login);

router.post('/forgotpassword', forgotPassword);

// router.get('/isTokenValid', protect, getUser);

router.put('/passwordreset/:resetToken', resetPassword);

export default router;
