import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CourseCard from '../components/features/CourseCard';
import NeonButton from '../components/ui/NeonButton';
import GlassCard from '../components/ui/GlassCard';
import { courseService } from '../services/courseService';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFeaturedCourses();
  }, []);

  const loadFeaturedCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await courseService.getFeaturedCourses();
      console.log('Loaded courses:', data);
      setFeaturedCourses(data || []);
    } catch (error) {
      console.error('Error loading featured courses:', error.message);
      setError('Could not load courses. Backend might not be connected.');
      setFeaturedCourses([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full filter blur-3xl floating"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full filter blur-3xl floating" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl floating" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Learn Skills That Shape{' '}
            <span className="gradient-text">The Future</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-8"
          >
            Explore industry-ready programming courses from Python to AI
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/courses">
              <NeonButton className="text-lg px-8 py-4">Explore Courses</NeonButton>
            </Link>
            <Link to="/signup">
              <NeonButton variant="secondary" className="text-lg px-8 py-4">Start Learning</NeonButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <div className="glass-card p-6 text-center">
          <p className="text-yellow-400 text-lg mb-2">⚠️ {error}</p>
          <p className="text-gray-400 text-sm">Make sure the backend server is running on port 5000</p>
        </div>
      )}

      {/* Featured Courses */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured <span className="gradient-text">Courses</span></h2>
          <p className="text-gray-400 text-lg">Discover our most popular courses</p>
        </div>

        {loading ? (
          <LoadingSpinner size="large" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/courses">
            <NeonButton variant="secondary" className="text-lg px-8 py-4">View All Courses</NeonButton>
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Browse by <span className="gradient-text">Category</span></h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {['Programming', 'Web Development', 'Data Science', 'Machine Learning', 'Database', 'DevOps'].map((category) => (
            <GlassCard key={category} className="p-6 text-center cursor-pointer hover:bg-primary/20 transition-colors">
              <h3 className="font-semibold text-lg">{category}</h3>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">What Our <span className="gradient-text">Students Say</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Sarah Johnson', role: 'Software Developer', text: 'CourseNest helped me transition into tech. The Python course was amazing!' },
            { name: 'Michael Chen', role: 'Data Scientist', text: 'The ML and Data Science courses are top-notch. Highly recommended!' },
            { name: 'Emily Rodriguez', role: 'Full Stack Developer', text: 'Best investment for my career. The MERN stack course is comprehensive.' },
          ].map((testimonial, index) => (
            <GlassCard key={index} className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary mr-4"></div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-300">"{testimonial.text}"</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="glass-card p-12 text-center rounded-2xl">
        <h2 className="text-4xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
        <p className="text-xl text-gray-300 mb-8">Join thousands of students already learning on CourseNest</p>
        <Link to="/signup">
          <NeonButton className="text-lg px-8 py-4">Get Started Free</NeonButton>
        </Link>
      </section>
    </div>
  );
};

export default Home;
