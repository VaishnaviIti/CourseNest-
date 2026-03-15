import api from './api';

export const courseService = {
  // Get all courses
  getAllCourses: async (params = {}) => {
    const response = await api.get('/courses', { params });
    return response.data;
  },

  // Get featured courses
  getFeaturedCourses: async () => {
    const response = await api.get('/courses/featured/list');
    return response.data;
  },

  // Get categories
  getCategories: async () => {
    const response = await api.get('/courses/categories');
    return response.data;
  },

  // Get course by ID
  getCourseById: async (id) => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },
};
