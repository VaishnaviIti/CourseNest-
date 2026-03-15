import { useState, useEffect } from 'react';
import GlassCard from '../components/ui/GlassCard';
import NeonButton from '../components/ui/NeonButton';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import axios from 'axios';

const Admin = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    instructor: '',
    category: 'Programming',
    price: '',
    thumbnail: '',
    duration: '',
    youtubePlaylistId: '',
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/admin/courses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(response.data);
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/admin/courses', newCourse, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Course added successfully!');
      setShowAddForm(false);
      setNewCourse({
        title: '',
        description: '',
        instructor: '',
        category: 'Programming',
        price: '',
        thumbnail: '',
        duration: '',
        youtubePlaylistId: '',
      });
      loadCourses();
    } catch (error) {
      alert('Failed to add course');
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/admin/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Course deleted successfully!');
      loadCourses();
    } catch (error) {
      alert('Failed to delete course');
    }
  };

  if (loading) return <LoadingSpinner size="large" />;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold gradient-text">Admin Panel</h1>
        <NeonButton onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Cancel' : 'Add New Course'}
        </NeonButton>
      </div>

      {showAddForm && (
        <GlassCard className="p-8">
          <h2 className="text-2xl font-bold mb-6">Add New Course</h2>
          <form onSubmit={handleAddCourse} className="space-y-4">
            <input
              type="text"
              placeholder="Course Title"
              value={newCourse.title}
              onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
              className="input-glass w-full"
              required
            />
            <textarea
              placeholder="Description"
              value={newCourse.description}
              onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
              className="input-glass w-full"
              rows="4"
              required
            />
            <input
              type="text"
              placeholder="Instructor Name"
              value={newCourse.instructor}
              onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
              className="input-glass w-full"
              required
            />
            <div className="grid md:grid-cols-2 gap-4">
              <select
                value={newCourse.category}
                onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                className="input-glass"
              >
                <option value="Programming">Programming</option>
                <option value="Web Development">Web Development</option>
                <option value="Data Science">Data Science</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Database">Database</option>
                <option value="DevOps">DevOps</option>
              </select>
              <input
                type="number"
                placeholder="Price"
                value={newCourse.price}
                onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                className="input-glass"
                required
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Duration (e.g., 20 hours)"
                value={newCourse.duration}
                onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                className="input-glass"
                required
              />
              <input
                type="text"
                placeholder="Thumbnail URL"
                value={newCourse.thumbnail}
                onChange={(e) => setNewCourse({ ...newCourse, thumbnail: e.target.value })}
                className="input-glass"
                required
              />
            </div>
            <input
              type="text"
              placeholder="YouTube Playlist ID"
              value={newCourse.youtubePlaylistId}
              onChange={(e) => setNewCourse({ ...newCourse, youtubePlaylistId: e.target.value })}
              className="input-glass"
            />
            <NeonButton type="submit" className="w-full">Add Course</NeonButton>
          </form>
        </GlassCard>
      )}

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">All Courses</h2>
        {courses.map((course) => (
          <GlassCard key={course._id} className="p-6 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">{course.title}</h3>
              <p className="text-gray-400">{course.instructor} • ${course.price}</p>
              <p className="text-sm text-gray-500">{course.enrolledStudents} students enrolled</p>
            </div>
            <NeonButton 
              variant="accent" 
              onClick={() => handleDeleteCourse(course._id)}
              className="px-6 py-2"
            >
              Delete
            </NeonButton>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default Admin;
