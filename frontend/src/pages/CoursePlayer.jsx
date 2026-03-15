import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import { courseService } from '../services/courseService';
import { enrollmentService } from '../services/enrollmentService';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const CoursePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    loadCourse();
  }, [id]);

  const loadCourse = async () => {
    try {
      const data = await courseService.getCourseById(id);
      setCourse(data);
      
      // Load completed lessons
      const enrollments = await enrollmentService.getUserEnrollments();
      const enrollment = enrollments.find(e => e.courseId._id === id);
      if (enrollment) {
        setCompletedLessons(enrollment.completedLessons || []);
      }
    } catch (error) {
      console.error('Error loading course:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async (lessonId) => {
    try {
      await enrollmentService.updateProgress(id, lessonId, true);
      setCompletedLessons([...completedLessons, lessonId]);
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  if (loading) return <LoadingSpinner size="large" />;
  if (!course) return <div>Course not found</div>;

  const lesson = course.lessons?.[currentLesson];

  return (
    <div className="space-y-6">
      <button onClick={() => navigate('/dashboard')} className="text-primary hover:underline">
        ← Back to Dashboard
      </button>

      {/* Video Player */}
      <div className="aspect-video w-full">
        <iframe
          src={`https://www.youtube.com/embed/${lesson?.youtubeVideoId}`}
          title={lesson?.title}
          className="w-full h-full rounded-xl glow"
          allowFullScreen
        ></iframe>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Lesson Info */}
        <GlassCard className="md:col-span-2 p-6">
          <h1 className="text-3xl font-bold mb-4">{lesson?.title}</h1>
          <p className="text-gray-400 mb-4">Lesson {currentLesson + 1} of {course.lessons?.length}</p>
          
          {!completedLessons.includes(lesson?._id) && (
            <button 
              onClick={() => handleMarkComplete(lesson?._id)}
              className="neon-button"
            >
              Mark as Complete
            </button>
          )}
          {completedLessons.includes(lesson?._id) && (
            <span className="text-green-400">✓ Completed</span>
          )}
        </GlassCard>

        {/* Lesson List */}
        <GlassCard className="p-6 overflow-y-auto max-h-[500px]">
          <h2 className="text-xl font-bold mb-4">Course Content</h2>
          <div className="space-y-2">
            {course.lessons?.map((l, index) => (
              <div
                key={l._id}
                onClick={() => setCurrentLesson(index)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  index === currentLesson ? 'bg-primary/30' : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{index + 1}. {l.title}</span>
                  {completedLessons.includes(l._id) && (
                    <span className="text-green-400 text-xs">✓</span>
                  )}
                </div>
                <span className="text-xs text-gray-400">{l.duration}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default CoursePlayer;
