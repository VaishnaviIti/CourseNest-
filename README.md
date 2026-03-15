# 🎓 CourseNest - Learning Management System

A modern, full-stack Learning Management System (LMS) built with React, Node.js, Express, and MongoDB. Features a beautiful glassmorphism UI with YouTube video integration and dummy payment system.

![CourseNest LMS](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

### 🎨 Beautiful UI/UX
- **Glassmorphism Design** - Frosted glass cards with backdrop blur
- **Neon Gradient Buttons** - Glowing hover effects
- **Smooth Animations** - Powered by Framer Motion
- **Dark Theme** - Easy on the eyes (#0F172A background)
- **Fully Responsive** - Mobile, tablet, and desktop optimized

### 📚 Course Management
- **8 Programming Courses** - Python, SQL, React, C, ML, Data Science, Docker, MERN
- **65+ Video Lessons** - YouTube integration
- **Course Search & Filter** - Find courses quickly
- **Progress Tracking** - Mark lessons complete
- **Student Dashboard** - View enrolled courses

### 🔐 Authentication & Authorization
- **JWT Authentication** - Secure login/signup
- **Role-Based Access** - Admin and Student roles
- **Protected Routes** - Secure content access
- **Profile Management** - User dashboard

### 💳 Payment System
- **Dummy Payment Gateway** - Test enrollment flow
- **Multiple Payment Methods** - Credit Card & UPI
- **Instant Course Access** - Automatic enrollment after payment

### 👨‍💼 Admin Panel
- **Course Management** - Add, edit, delete courses
- **Lesson Management** - Organize course content
- **Enrollment Tracking** - View student enrollments
- **Analytics Dashboard** - Course statistics

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool & dev server
- **React Router DOM** - Navigation
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **Tailwind CSS** - Utility-first CSS

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt.js** - Password hashing

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/coursenest-lms.git
cd coursenest-lms
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
npm run seed  # Seed database with sample courses
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

4. **Configure Environment Variables**

Create `.env` file in backend folder:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/coursenest
JWT_SECRET=your_jwt_secret_here
```

5. **Start Development Servers**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

6. **Access the Application**
- Frontend: http://localhost:3001
- Backend API: http://localhost:5000

## 📖 Usage

### Default Admin Account
```
Email: admin@coursenest.com
Password: admin123
```

### Student Features
1. Browse courses catalog
2. View course details and syllabus
3. Enroll in courses (dummy payment)
4. Access enrolled courses from dashboard
5. Watch YouTube video lessons
6. Track progress
7. Mark lessons as complete

### Admin Features
1. Access admin panel (/admin)
2. Create new courses
3. Edit existing courses and lessons
4. Delete courses
5. View all enrollments
6. Manage course content

## 📁 Project Structure

```
coursenest-lms/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth & error handling
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── seeds/           # Database seeding
│   └── server.js        # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── context/     # Context providers
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # Entry point
│   ├── public/
│   └── index.html
└── README.md
```

## 🎨 Color Palette

```css
Primary: #6C63FF (Purple)
Secondary: #00D9FF (Cyan)
Accent: #F72585 (Pink)
Background: #0F172A (Dark Blue)
Surface: #1E293B (Slate)
Glass: rgba(255, 255, 255, 0.1)
```

## 📦 Sample Courses

1. **Python Programming** - Beginner to Advanced (10 lessons)
2. **SQL Mastery** - Complete Database Bootcamp (8 lessons)
3. **React Development** - Build Modern Web Apps (10 lessons)
4. **C Programming Fundamentals** (8 lessons)
5. **Machine Learning Basics** - AI for Everyone (8 lessons)
6. **Data Science with Python** - Complete Bootcamp (7 lessons)
7. **Docker Essentials** - Containerization (6 lessons)
8. **Full Stack Web Development** - MERN Stack (8 lessons)

## 🔒 Security Features

- **JWT Token Authentication**
- **Password Hashing with Bcrypt**
- **Protected API Routes**
- **Role-Based Access Control**
- **Input Validation**
- **CORS Protection**

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- YouTube for video hosting
- MongoDB for database
- Vite for amazing dev experience
- Tailwind CSS for styling
- Framer Motion for animations

## 📞 Support

For support, email your.email@example.com or open an issue in the repository.

---

**Made with ❤️ by Your Name**

⭐ Star this repo if you find it helpful!
