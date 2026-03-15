import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import NeonButton from '../components/ui/NeonButton';
import { courseService } from '../services/courseService';
import { enrollmentService } from '../services/enrollmentService';
import { paymentService } from '../services/paymentService';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadCourse();
  }, [id]);

  const loadCourse = async () => {
    try {
      const data = await courseService.getCourseById(id);
      setCourse(data);
      
      // Check if already enrolled
      if (isAuthenticated) {
        const enrollments = await enrollmentService.getUserEnrollments();
        const isEnrolled = enrollments.some(enrollment => enrollment.courseId._id === id);
        setEnrolled(isEnrolled);
      }
    } catch (error) {
      console.error('Error loading course:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setProcessing(true);
    try {
      // Process dummy payment
      await paymentService.processPayment({
        courseId: id,
        paymentMethod: 'credit_card',
      });

      // Enroll in course
      await enrollmentService.enrollCourse(id);
      
      alert('Payment Successful! Course Unlocked.');
      navigate('/dashboard');
    } catch (error) {
      alert(error.response?.data?.message || 'Enrollment failed');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <LoadingSpinner size="large" />;
  if (!course) return <div>Course not found</div>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img src={course.thumbnail} alt={course.title} className="w-full rounded-xl glow" />
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{course.title}</h1>
          <p className="text-gray-300 text-lg">{course.description}</p>
          
          <div className="flex items-center space-x-4 text-gray-400">
            <span>Instructor: <strong className="text-white">{course.instructor}</strong></span>
            <span>Duration: <strong className="text-white">{course.duration}</strong></span>
            <span>Students: <strong className="text-white">{course.enrolledStudents}</strong></span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold gradient-text">${course.price}</span>
          </div>

          {enrolled ? (
            <NeonButton className="w-full py-4 text-lg" onClick={() => navigate('/dashboard')}>
              Go to Dashboard
            </NeonButton>
          ) : (
            <NeonButton 
              className="w-full py-4 text-lg" 
              onClick={handleEnroll}
              disabled={processing}
            >
              {processing ? 'Processing...' : 'Enroll Now'}
            </NeonButton>
          )}
        </div>
      </div>

      {/* Lessons */}
      <GlassCard className="p-8">
        <h2 className="text-3xl font-bold mb-6">Course Content</h2>
        <div className="space-y-4">
          {course.lessons?.map((lesson, index) => (
            <motion.div
              key={lesson._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold">{lesson.title}</h3>
                  <p className="text-sm text-gray-400">{lesson.duration}</p>
                </div>
              </div>
              {lesson.isFree && (
                <span className="text-green-400 text-sm">Free Preview</span>
              )}
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default CourseDetail;
