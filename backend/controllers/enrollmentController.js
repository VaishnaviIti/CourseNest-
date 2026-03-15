import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';
import User from '../models/User.js';

// @desc    Enroll in a course
// @route   POST /api/enroll
// @access  Private
export const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user._id;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      userId,
      courseId,
    });

    if (existingEnrollment) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // Create enrollment
    const enrollment = await Enrollment.create({
      userId,
      courseId,
      status: 'active',
      progress: 0,
      completedLessons: [],
    });

    // Update user's enrolled courses
    await User.findByIdAndUpdate(userId, {
      $push: {
        enrolledCourses: {
          courseId,
          enrollmentDate: Date.now(),
          progress: 0,
          status: 'active',
        },
      },
    });

    // Update course enrolled students count
    await Course.findByIdAndUpdate(courseId, {
      $inc: { enrolledStudents: 1 },
    });

    res.status(201).json({
      message: 'Successfully enrolled in course',
      enrollment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's enrolled courses
// @route   GET /api/enroll/my-courses
// @access  Private
export const getUserEnrollments = async (req, res) => {
  try {
    const userId = req.user._id;

    const enrollments = await Enrollment.find({ userId })
      .populate({
        path: 'courseId',
        populate: { path: 'lessons' },
      })
      .populate('completedLessons');

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update lesson progress
// @route   PUT /api/enroll/progress
// @access  Private
export const updateProgress = async (req, res) => {
  try {
    const { courseId, lessonId, completed } = req.body;
    const userId = req.user._id;

    const enrollment = await Enrollment.findOne({ userId, courseId });

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    // Get course to find total lessons
    const course = await Course.findById(courseId);
    const totalLessons = course.lessons.length;

    // Update completed lessons
    if (completed) {
      // Add lesson if not already completed
      if (!enrollment.completedLessons.includes(lessonId)) {
        enrollment.completedLessons.push(lessonId);
      }
    } else {
      // Remove lesson from completed
      enrollment.completedLessons = enrollment.completedLessons.filter(
        (id) => id.toString() !== lessonId
      );
    }

    // Calculate progress
    enrollment.progress = Math.round((enrollment.completedLessons.length / totalLessons) * 100);

    // Mark as completed if all lessons are done
    if (enrollment.completedLessons.length === totalLessons) {
      enrollment.status = 'completed';
    }

    await enrollment.save();

    // Update user's enrolled courses progress
    await User.findOneAndUpdate(
      { _id: userId, 'enrolledCourses.courseId': courseId },
      {
        $set: {
          'enrolledCourses.$.progress': enrollment.progress,
          'enrolledCourses.$.status': enrollment.status,
        },
      }
    );

    res.json({
      message: 'Progress updated successfully',
      progress: enrollment.progress,
      status: enrollment.status,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get enrollment stats
// @route   GET /api/enroll/stats
// @access  Private (Admin)
export const getEnrollmentStats = async (req, res) => {
  try {
    const totalEnrollments = await Enrollment.countDocuments();
    const activeEnrollments = await Enrollment.countDocuments({ status: 'active' });
    const completedEnrollments = await Enrollment.countDocuments({ status: 'completed' });

    const recentEnrollments = await Enrollment.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('userId', 'name email')
      .populate('courseId', 'title');

    res.json({
      totalEnrollments,
      activeEnrollments,
      completedEnrollments,
      recentEnrollments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
