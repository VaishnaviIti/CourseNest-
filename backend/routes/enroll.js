import express from 'express';
import {
  enrollCourse,
  getUserEnrollments,
  updateProgress,
  getEnrollmentStats,
} from '../controllers/enrollmentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, enrollCourse);
router.get('/my-courses', protect, getUserEnrollments);
router.put('/progress', protect, updateProgress);
router.get('/stats', protect, getEnrollmentStats);

export default router;
