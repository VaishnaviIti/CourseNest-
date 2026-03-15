import express from 'express';
import { processPayment, verifyPayment } from '../controllers/paymentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/process', protect, processPayment);
router.get('/verify/:transactionId', protect, verifyPayment);

export default router;
