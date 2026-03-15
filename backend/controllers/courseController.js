import Course from '../models/Course.js';
import Lesson from '../models/Lesson.js';

// @desc    Get all courses with filtering, search, and pagination
// @route   GET /api/courses
// @access  Public
export const getAllCourses = async (req, res) => {
  try {
    const { category, search, sort } = req.query;

    // Build query
    let query = {};

    // Filter by category
    if (category && category !== 'All') {
      query.category = category;
    }

    // Search by title or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Sort options
    let sortOption = {};
    if (sort === 'price-low') {
      sortOption.price = 1;
    } else if (sort === 'price-high') {
      sortOption.price = -1;
    } else if (sort === 'rating') {
      sortOption.rating = -1;
    } else if (sort === 'students') {
      sortOption.enrolledStudents = -1;
    }

    const courses = await Course.find(query)
      .populate('lessons')
      .sort(sortOption);

    res.json({
      count: courses.length,
      courses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single course by ID
// @route   GET /api/courses/:id
// @access  Public
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('lessons')
      .populate({
        path: 'lessons',
        options: { sort: { order: 1 } },
      });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get featured courses
// @route   GET /api/courses/featured/list
// @access  Public
export const getFeaturedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isFeatured: true })
      .limit(6)
      .populate('lessons');

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get categories
// @route   GET /api/courses/categories
// @access  Public
export const getCategories = async (req, res) => {
  try {
    const categories = await Course.distinct('category');
    res.json(['All', ...categories]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
