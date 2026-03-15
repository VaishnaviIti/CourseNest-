import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="glass-card sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold gradient-text">
          CourseNest
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/courses" className="hover:text-primary transition-colors">
            Courses
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="hover:text-primary transition-colors">
                Dashboard
              </Link>
              {user.isAdmin && (
                <Link to="/admin" className="hover:text-primary transition-colors">
                  Admin
                </Link>
              )}
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-300">Hi, {user.name}</span>
                <button onClick={handleLogout} className="neon-button">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <button className="neon-button">Login</button>
              </Link>
              <Link to="/signup">
                <button className="neon-button bg-transparent border-2 border-primary hover:bg-primary/20">
                  Signup
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-4 space-y-4"
        >
          <Link to="/" className="block hover:text-primary">Home</Link>
          <Link to="/courses" className="block hover:text-primary">Courses</Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="block hover:text-primary">Dashboard</Link>
              {user.isAdmin && (
                <Link to="/admin" className="block hover:text-primary">Admin</Link>
              )}
              <button onClick={handleLogout} className="block w-full text-left neon-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block neon-button">Login</Link>
              <Link to="/signup" className="block neon-button">Signup</Link>
            </>
          )}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
