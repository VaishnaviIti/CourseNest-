import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from '../models/Course.js';
import Lesson from '../models/Lesson.js';
import User from '../models/User.js';
import Enrollment from '../models/Enrollment.js';

dotenv.config();

const courses = [
  {
    title: 'Python Programming - From Beginner to Advanced',
    description: 'Master Python programming with hands-on projects. Learn variables, loops, functions, OOP, and build real-world applications.',
    instructor: 'Dr. Angela Yu',
    category: 'Programming',
    price: 49.99,
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80',
    duration: '22 hours',
    rating: 4.8,
    youtubePlaylistId: 'kqtD5dpn9C8',
    isFeatured: true,
    lessons: [],
  },
  {
    title: 'SQL Mastery - Complete Database Bootcamp',
    description: 'Learn SQL from scratch. Master queries, joins, indexes, normalization, and work with PostgreSQL and MySQL databases.',
    instructor: 'Colt Steele',
    category: 'Database',
    price: 39.99,
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bb4f8a9c2d1e?w=800&q=80',
    duration: '18 hours',
    rating: 4.7,
    youtubePlaylistId: '7S_tz1z_5bA',
    isFeatured: true,
    lessons: [],
  },
  {
    title: 'React Development - Build Modern Web Apps',
    description: 'Build powerful React applications. Learn hooks, context API, Redux, React Router, and integrate with backend APIs.',
    instructor: 'Maximilian Schwarzmüller',
    category: 'Web Development',
    price: 59.99,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    duration: '28 hours',
    rating: 4.9,
    youtubePlaylistId: 'w7ejDZ8SWv8',
    isFeatured: true,
    lessons: [],
  },
  {
    title: 'C Programming Fundamentals',
    description: 'Learn C programming from the ground up. Understand memory management, pointers, data structures, and low-level programming concepts.',
    instructor: 'Tim Buchalka',
    category: 'Programming',
    price: 44.99,
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80',
    duration: '20 hours',
    rating: 4.6,
    youtubePlaylistId: 'KJgsSFOSQv0',
    isFeatured: false,
    lessons: [],
  },
  {
    title: 'Machine Learning Basics - AI for Everyone',
    description: 'Introduction to Machine Learning. Learn supervised/unsupervised learning, neural networks, and implement ML algorithms in Python.',
    instructor: 'Andrew Ng',
    category: 'Machine Learning',
    price: 79.99,
    thumbnail: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80',
    duration: '32 hours',
    rating: 4.9,
    youtubePlaylistId: 'ukzFI9rgwfU',
    isFeatured: true,
    lessons: [],
  },
  {
    title: 'Data Science with Python - Complete Bootcamp',
    description: 'Become a Data Scientist. Learn pandas, NumPy, data visualization, statistical analysis, and machine learning.',
    instructor: 'Jose Portilla',
    category: 'Data Science',
    price: 69.99,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    duration: '26 hours',
    rating: 4.7,
    youtubePlaylistId: 'ua-CiDNNj30E',
    isFeatured: true,
    lessons: [],
  },
  {
    title: 'Docker Essentials - Containerization for Developers',
    description: 'Master Docker and containerization. Learn Docker Compose, Kubernetes, and deploy applications at scale.',
    instructor: 'Bret Fisher',
    category: 'DevOps',
    price: 54.99,
    thumbnail: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80',
    duration: '15 hours',
    rating: 4.8,
    youtubePlaylistId: '3c-iBn73dDE',
    isFeatured: false,
    lessons: [],
  },
  {
    title: 'Full Stack Web Development - MERN Stack',
    description: 'Become a full stack developer. Master MongoDB, Express, React, Node.js, authentication, payments, and deployment.',
    instructor: 'Brad Traversy',
    category: 'Web Development',
    price: 89.99,
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    duration: '40 hours',
    rating: 4.9,
    youtubePlaylistId: 'Rh7VBhHqh0o',
    isFeatured: true,
    lessons: [],
  },
];

const lessonsData = {
  'Python Programming - From Beginner to Advanced': [
    { title: 'Introduction to Python', youtubeVideoId: 'kqtD5dpn9C8', duration: '10:25', order: 1, isFree: true },
    { title: 'Variables and Data Types', youtubeVideoId: 'ZDa-ZhJzLYQ', duration: '15:30', order: 2, isFree: true },
    { title: 'Control Flow - If Statements', youtubeVideoId: 'SzPu8VyTjXc', duration: '12:45', order: 3 },
    { title: 'Loops - For and While', youtubeVideoId: '6iF8Xb7Z3wQ', duration: '18:20', order: 4 },
    { title: 'Functions and Modules', youtubeVideoId: '9Os0o3wzS_I', duration: '20:15', order: 5 },
    { title: 'Lists and Dictionaries', youtubeVideoId: 'W8KRzm-HUcc', duration: '22:30', order: 6 },
    { title: 'Object-Oriented Programming', youtubeVideoId: 'Ej_02ICOIgs', duration: '25:40', order: 7 },
    { title: 'File Handling', youtubeVideoId: 'Uh2ebFW8OYM', duration: '14:50', order: 8 },
    { title: 'Exception Handling', youtubeVideoId: 'NIWwJbo-9_8', duration: '16:25', order: 9 },
    { title: 'Working with APIs', youtubeVideoId: 'tbFuTF7xDRA', duration: '19:35', order: 10 },
  ],
  'SQL Mastery - Complete Database Bootcamp': [
    { title: 'Introduction to Databases', youtubeVideoId: '7S_tz1z_5bA', duration: '12:15', order: 1, isFree: true },
    { title: 'Basic SQL Queries', youtubeVideoId: 'HXV3zeQKqGY', duration: '18:40', order: 2, isFree: true },
    { title: 'Filtering and Sorting', youtubeVideoId: '2aw9u5AKtJE', duration: '15:25', order: 3 },
    { title: 'Joins - INNER, LEFT, RIGHT', youtubeVideoId: '9pQ1_41thXA', duration: '22:50', order: 4 },
    { title: 'Aggregation Functions', youtubeVideoId: 'qdFK_z8eP7I', duration: '17:30', order: 5 },
    { title: 'Subqueries', youtubeVideoId: 'CrINzOFWIF0', duration: '20:15', order: 6 },
    { title: 'Indexes and Performance', youtubeVideoId: 'j1UrubPgScA', duration: '16:45', order: 7 },
    { title: 'Database Design', youtubeVideoId: 'ztHopE5Wnpc', duration: '24:20', order: 8 },
  ],
  'React Development - Build Modern Web Apps': [
    { title: 'React Introduction', youtubeVideoId: 'w7ejDZ8SWv8', duration: '11:30', order: 1, isFree: true },
    { title: 'JSX and Components', youtubeVideoId: 'Ke90Tje7VS0', duration: '19:45', order: 2, isFree: true },
    { title: 'Props and State', youtubeVideoId: 'O6P86uwfdR0', duration: '17:20', order: 3 },
    { title: 'Hooks - useState, useEffect', youtubeVideoId: 'O6P86uwfdR0', duration: '23:15', order: 4 },
    { title: 'Event Handling', youtubeVideoId: 'uHKph1L6YgU', duration: '14:50', order: 5 },
    { title: 'Forms in React', youtubeVideoId: 'sCvWvTT75rY', duration: '21:30', order: 6 },
    { title: 'React Router', youtubeVideoId: 'Law7wgdg7z4', duration: '25:40', order: 7 },
    { title: 'Context API', youtubeVideoId: '35lXWvCuMko', duration: '18:25', order: 8 },
    { title: 'Redux Toolkit', youtubeVideoId: '9zySeP5vH9c', duration: '28:50', order: 9 },
    { title: 'Building Projects', youtubeVideoId: 'RGKi6LSPmlU', duration: '32:15', order: 10 },
  ],
  'C Programming Fundamentals': [
    { title: 'Introduction to C', youtubeVideoId: 'KJgsSFOSQv0', duration: '10:45', order: 1, isFree: true },
    { title: 'Variables and Constants', youtubeVideoId: 'BcJCkn8x8EE', duration: '16:30', order: 2, isFree: true },
    { title: 'Operators in C', youtubeVideoId: 'tDyFA4ewfsI', duration: '14:20', order: 3 },
    { title: 'Control Structures', youtubeVideoId: 'SNR7rxif4ZU', duration: '19:45', order: 4 },
    { title: 'Functions', youtubeVideoId: '24cysyFOFHw', duration: '22:15', order: 5 },
    { title: 'Arrays and Strings', youtubeVideoId: '2sp0nBKPrac', duration: '20:30', order: 6 },
    { title: 'Pointers Basics', youtubeVideoId: '_lfXYrRQLvo', duration: '25:40', order: 7 },
    { title: 'Memory Management', youtubeVideoId: 'TDmcAoMqEHc', duration: '23:50', order: 8 },
  ],
  'Machine Learning Basics - AI for Everyone': [
    { title: 'What is Machine Learning?', youtubeVideoId: 'ukzFI9rgwfU', duration: '13:20', order: 1, isFree: true },
    { title: 'Supervised Learning', youtubeVideoId: '4qJaSmVhP1U', duration: '18:45', order: 2, isFree: true },
    { title: 'Unsupervised Learning', youtubeVideoId: 'GwIo9gDZCVQ', duration: '16:30', order: 3 },
    { title: 'Linear Regression', youtubeVideoId: '1LmUDReu1aU', duration: '21:15', order: 4 },
    { title: 'Logistic Regression', youtubeVideoId: 'VCJdgFrYBbQ', duration: '19:50', order: 5 },
    { title: 'Neural Networks', youtubeVideoId: 'aircAruvnKk', duration: '24:30', order: 6 },
    { title: 'Deep Learning', youtubeVideoId: 'VyWAvY2CF9c', duration: '22:40', order: 7 },
    { title: 'ML Projects', youtubeVideoId: 'i_LwzRVP7bg', duration: '28:15', order: 8 },
  ],
  'Data Science with Python - Complete Bootcamp': [
    { title: 'Data Science Overview', youtubeVideoId: 'ua-CiDNNj30E', duration: '12:30', order: 1, isFree: true },
    { title: 'Python for Data Science', youtubeVideoId: 'LHBE6Q9XlzI', duration: '17:45', order: 2, isFree: true },
    { title: 'NumPy Essentials', youtubeVideoId: 'QUT1VHiLmmI', duration: '20:20', order: 3 },
    { title: 'Pandas Library', youtubeVideoId: 'vmEHCJofslg', duration: '23:15', order: 4 },
    { title: 'Data Visualization', youtubeVideoId: 'DAQcZ2HvGWw', duration: '19:50', order: 5 },
    { title: 'Statistical Analysis', youtubeVideoId: 'xxpc-HPKN28', duration: '21:30', order: 6 },
    { title: 'Machine Learning Integration', youtubeVideoId: '7eh4d6sabA0', duration: '25:40', order: 7 },
  ],
  'Docker Essentials - Containerization for Developers': [
    { title: 'Docker Introduction', youtubeVideoId: '3c-iBn73dDE', duration: '11:15', order: 1, isFree: true },
    { title: 'Docker Images', youtubeVideoId: 'pTFZFjq4hOI', duration: '16:30', order: 2, isFree: true },
    { title: 'Docker Containers', youtubeVideoId: 'ZVw3bm9DoQA', duration: '18:45', order: 3 },
    { title: 'Dockerfile Creation', youtubeVideoId: 'YNgPmeTG7qs', duration: '20:20', order: 4 },
    { title: 'Docker Compose', youtubeVideoId: 'DM6q_JnkwCE', duration: '22:15', order: 5 },
    { title: 'Kubernetes Basics', youtubeVideoId: 'X48VuDVv0do', duration: '24:30', order: 6 },
  ],
  'Full Stack Web Development - MERN Stack': [
    { title: 'MERN Stack Introduction', youtubeVideoId: 'Rh7VBhHqh0o', duration: '14:30', order: 1, isFree: true },
    { title: 'MongoDB Setup', youtubeVideoId: 'ofme2o29ngU', duration: '17:45', order: 2, isFree: true },
    { title: 'Express Backend', youtubeVideoId: 'L7hjiOC02Nw', duration: '21:20', order: 3 },
    { title: 'React Frontend', youtubeVideoId: 'SqcY0GlETPk', duration: '24:15', order: 4 },
    { title: 'Node.js API', youtubeVideoId: 'Oe421EPjeBE', duration: '22:30', order: 5 },
    { title: 'Authentication', youtubeVideoId: 'UB1O30fR-EE', duration: '26:40', order: 6 },
    { title: 'Payment Integration', youtubeVideoId: 'u9eGBzMRx0M', duration: '23:50', order: 7 },
    { title: 'Deployment', youtubeVideoId: '4AOcKWyh8sI', duration: '28:15', order: 8 },
  ],
};

const seedDatabase = async () => {
  try {
    // Connect to DB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');

    // Remove existing data
    await Course.deleteMany();
    await Lesson.deleteMany();
    await User.deleteMany();
    await Enrollment.deleteMany();
    console.log('Collections cleared...');

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@coursenest.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log('Admin user created...');

    // Create courses with lessons
    for (const courseData of courses) {
      const course = await Course.create(courseData);
      console.log(`Created course: ${course.title}`);

      // Create lessons for this course
      const courseLessons = lessonsData[courseData.title] || [];
      for (const lessonData of courseLessons) {
        const lesson = await Lesson.create({
          ...lessonData,
          courseId: course._id,
        });
        course.lessons.push(lesson._id);
      }

      await course.save();
      console.log(`Added ${courseLessons.length} lessons to ${course.title}`);
    }

    console.log('\n✅ Database seeded successfully!');
    console.log('\nAdmin credentials:');
    console.log('Email: admin@coursenest.com');
    console.log('Password: admin123');
    console.log('\nStudent test account (create via signup):');
    console.log('You can signup with any email/password');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
