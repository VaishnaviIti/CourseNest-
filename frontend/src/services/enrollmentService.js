import api from './api';

export const enrollmentService = {
  // Enroll in course
  enrollCourse: async (courseId) => {
    const response = await api.post('/enroll', { courseId });
    return response.data;
  },

  // Get user enrollments
  getUserEnrollments: async () => {
    const response = await api.get('/enroll/my-courses');
    return response.data;
  },

  // Update progress
  updateProgress: async (courseId, lessonId, completed) => {
    const response = await api.put('/enroll/progress', {
      courseId,
      lessonId,
      completed,
    });
    return response.data;
  },
};
