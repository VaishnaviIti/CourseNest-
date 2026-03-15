import { useState, useEffect } from 'react';
import CourseCard from '../components/features/CourseCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { courseService } from '../services/courseService';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCourses();
    loadCategories();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [searchTerm, selectedCategory]);

  const loadCourses = async () => {
    try {
      const data = await courseService.getAllCourses();
      setCourses(data.courses);
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await courseService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const filterCourses = async () => {
    setLoading(true);
    try {
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (selectedCategory && selectedCategory !== 'All') params.category = selectedCategory;
      
      const data = await courseService.getAllCourses(params);
      setCourses(data.courses);
    } catch (error) {
      console.error('Error filtering courses:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4 gradient-text">Explore Courses</h1>
        <p className="text-xl text-gray-300">Find the perfect course to boost your skills</p>
      </div>

      {/* Search and Filter */}
      <div className="glass-card p-6 space-y-4 md:space-y-0 md:flex md:gap-4">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-glass flex-1"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="input-glass md:w-64"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Course Grid */}
      {loading ? (
        <LoadingSpinner size="large" />
      ) : courses.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-400">No courses found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
