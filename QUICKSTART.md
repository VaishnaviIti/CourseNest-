# CourseNest - Quick Start Guide

## ✅ What's Been Built

CourseNest is a complete full-stack Learning Management System with:

### Backend (Node.js + Express + MongoDB)
- ✅ User authentication with JWT
- ✅ Course management APIs
- ✅ Enrollment system
- ✅ Dummy payment processing
- ✅ Admin panel APIs
- ✅ MongoDB database models

### Frontend (React + Vite + Tailwind CSS)
- ✅ Modern glassmorphism UI design
- ✅ Animated landing page
- ✅ Course catalog with search/filter
- ✅ Course detail pages
- ✅ Student dashboard
- ✅ Course player with YouTube integration
- ✅ Admin panel
- ✅ Login/Signup authentication

## 🚀 Current Status

**Both servers are now running:**
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

## ⚠️ IMPORTANT: MongoDB Setup Required

The application requires MongoDB to be installed and running. 

### Option 1: Install MongoDB Locally (Recommended for Development)

1. **Download MongoDB Community Edition**
   - Visit: https://www.mongodb.com/try/download/community
   - Select your operating system (Windows)
   - Download and install

2. **Start MongoDB Service**
   ```bash
   # Windows (run as Administrator in PowerShell)
   net start MongoDB
   ```

3. **Seed the Database**
   ```bash
   cd backend
   npm run seed
   ```

### Option 2: Use MongoDB Atlas (Cloud - Free Tier)

1. **Create Account**
   - Visit: https://www.mongodb.com/cloud/atlas
   - Sign up for free account

2. **Create Cluster**
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select your region
   - Click "Create"

3. **Get Connection String**
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace password with your database user password

4. **Update Backend .env**
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/coursenest?retryWrites=true&w=majority
   ```

5. **Seed the Database**
   ```bash
   cd backend
   npm run seed
   ```

## 📋 Test Credentials

After seeding the database:

**Admin Account:**
- Email: `admin@coursenest.com`
- Password: `admin123`

**Student Account:**
- Create via signup at: http://localhost:3000/signup

## 🎯 Features to Test

### As a Student:
1. Browse courses on the home page
2. View course details
3. Sign up for an account
4. Enroll in a course (dummy payment)
5. Access your dashboard
6. Watch video lessons
7. Mark lessons as complete

### As an Admin:
1. Login with admin credentials
2. Navigate to Admin panel
3. Add new courses
4. Edit/Delete existing courses
5. Manage lessons

## 🔧 Troubleshooting

### Backend Not Starting?
```bash
cd backend
npm install
npm run dev
```

### Frontend Not Starting?
```bash
cd frontend
npm install
npm run dev
```

### Database Connection Error?
- Make sure MongoDB is running
- Check MONGODB_URI in backend/.env
- For local MongoDB: `mongodb://localhost:27017/coursenest`

### Can't See Courses?
- Run the seed script: `npm run seed` in backend folder
- Check if backend server is running on port 5000

## 🌟 Key Features Implemented

✅ **Authentication**
- JWT-based auth
- Protected routes
- Role-based access (student/admin)

✅ **Course Management**
- Browse all courses
- Search functionality
- Filter by category
- Course details with syllabus

✅ **Enrollment System**
- Dummy payment gateway
- Credit Card & UPI options
- Instant course access after "payment"

✅ **Learning Interface**
- YouTube video integration
- Lesson navigation
- Progress tracking
- Mark as complete functionality

✅ **Dashboard**
- View enrolled courses
- Track progress
- Continue learning

✅ **Admin Panel**
- Add/Edit/Delete courses
- Manage lessons
- View enrollments

✅ **UI/UX**
- Glassmorphism design
- Neon gradient buttons
- Smooth animations
- Responsive layout
- Dark theme

## 📱 Pages Available

1. **Home** (/) - Landing page with featured courses
2. **Courses** (/courses) - Browse all courses
3. **Course Detail** (/courses/:id) - Individual course info
4. **Login** (/login) - User authentication
5. **Signup** (/signup) - User registration
6. **Dashboard** (/dashboard) - Student dashboard
7. **Course Player** (/course-player/:id) - Learning interface
8. **Admin** (/admin) - Admin panel (requires admin role)

## 🎨 Customization

Want to change colors? Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: '#6C63FF',      // Main purple
  secondary: '#00D9FF',    // Cyan accent
  accent: '#F72585',       // Pink highlight
  background: '#0F172A',   // Dark background
}
```

## 📦 Project Structure

```
CourseNest/
├── backend/
│   ├── controllers/     # Business logic
│   ├── models/          # Database schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth, error handling
│   ├── config/          # DB connection
│   ├── seeds/           # Sample data
│   └── server.js        # Express app
│
└── frontend/
    ├── src/
    │   ├── components/  # Reusable UI
    │   ├── pages/       # Page components
    │   ├── services/    # API calls
    │   ├── context/     # React Context
    │   └── App.jsx      # Main app
    └── public/
```

## 🎯 Next Steps

1. **Install MongoDB** (see instructions above)
2. **Seed the database**: `cd backend && npm run seed`
3. **Open browser**: http://localhost:3000
4. **Explore the platform!**

## 💡 Tips

- The app works without MongoDB but you won't see any data
- All payments are fake/dummy - no real money involved
- YouTube videos are embedded from public playlists
- Feel free to modify course data in `backend/seeds/courses.js`

## 🆘 Need Help?

Check these files:
- `README.md` - Full documentation
- `backend/.env` - Backend configuration
- `frontend/.env` - Frontend configuration
- `backend/seeds/courses.js` - Sample course data

---

**Happy Learning! 🚀**

Built with ❤️ using MERN Stack
