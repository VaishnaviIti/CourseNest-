import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import ProgressBar from '../components/ui/ProgressBar';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { enrollmentService } from '../services/enrollmentService';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEnrollments();
  }, []);

  const loadEnrollments = async () => {
    try {
      const data = await enrollmentService.getUserEnrollments();
      setEnrollments(data);
    } catch (error) {
      console.error('Error loading enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner size="large" />;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
        <p className="text-gray-300">Track your learning progress</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6 text-center">
          <h3 className="text-gray-400 mb-2">Enrolled Courses</h3>
          <p className="text-4xl font-bold gradient-text">{enrollments.length}</p>
        </GlassCard>
        <GlassCard className="p-6 text-center">
          <h3 className="text-gray-400 mb-2">In Progress</h3>
          <p className="text-4xl font-bold gradient-text">
            {enrollments.filter(e => e.status === 'active').length}
          </p>
        </GlassCard>
        <GlassCard className="p-6 text-center">
          <h3 className="text-gray-400 mb-2">Completed</h3>
          <p className="text-4xl font-bold gradient-text">
            {enrollments.filter(e => e.status === 'completed').length}
          </p>
        </GlassCard>
      </div>

      {/* Enrolled Courses */}
      <div>
        <h2 className="text-3xl font-bold mb-6">My Courses</h2>
        {enrollments.length === 0 ? (
          <GlassCard className="p-12 text-center">
            <p className="text-xl text-gray-400 mb-4">You haven't enrolled in any courses yet</p>
            <Link to="/courses" className="neon-button inline-block">Browse Courses</Link>
          </GlassCard>
        ) : (
          <div className="space-y-6">
            {enrollments.map((enrollment) => (
              <GlassCard key={enrollment._id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <img 
                      src={enrollment.courseId.thumbnail} 
                      alt={enrollment.courseId.title}
                      className="w-full md:w-48 h-32 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-bold">{enrollment.courseId.title}</h3>
                    <p className="text-gray-400">{enrollment.courseId.instructor}</p>
                    <ProgressBar progress={enrollment.progress} />
                    <p className="text-sm text-gray-400">
                      {enrollment.completedLessons?.length || 0} of {enrollment.courseId.lessons?.length || 0} lessons completed
                    </p>
                  </div>
                  <div>
                    <Link to={`/course-player/${enrollment.courseId._id}`}>
                      <button className="neon-button">Continue Learning</button>
                    </Link>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
