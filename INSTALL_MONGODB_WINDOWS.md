# 📥 MongoDB Local Installation Guide - Windows

## Quick Installation Steps

### Step 1: Download MongoDB Community Server

**Direct Download Link:**
https://www.mongodb.com/try/download/community

**Download Settings:**
- **Version:** 8.0.x (latest) or 7.0.x
- **Platform:** Windows
- **Package:** MSI

Click **Download** (no account required for community edition)

---

### Step 2: Install MongoDB

1. **Run the downloaded `.msi` file** (usually in Downloads folder)

2. **Setup Wizard Opens**
   - Click **Next**

3. **Accept License Agreement**
   - Check "I accept the terms..."
   - Click **Next**

4. **Choose Setup Type**
   - Select **"Complete"** installation
   - Click **Next**

5. **Service Configuration (IMPORTANT!)**
   - ✅ **CHECK** "Install MongoDB as a Service"
   - ✅ **CHECK** "Run service as Network Service user"
   - Service Name: `MongoDB`
   - Data Directory: `C:\Program Files\MongoDB\Server\8.0\data` (default)
   - Log Directory: `C:\Program Files\MongoDB\Server\8.0\log` (default)
   - Click **Next**

6. **Install**
   - Click **Install**
   - Wait for installation to complete (~2-3 minutes)
   - Click **Finish**

---

### Step 3: Verify MongoDB Installation

Open **PowerShell as Administrator** and run:

```powershell
sc query MongoDB
```

You should see:
```
SERVICE_NAME: MongoDB
        TYPE               : 10  WIN32_OWN_PROCESS
        STATE              : 4  RUNNING
                                (STOPPABLE, NOT_PAUSABLE, ACCEPTS_SHUTDOWN)
```

**OR** start the service manually:
```powershell
net start MongoDB
```

You should see: `The MongoDB service is starting...` followed by `The MongoDB service was started successfully.`

---

### Step 4: Test MongoDB Connection

Open a regular PowerShell and run:
```powershell
mongosh
```

You should see:
```
Current Mongosh Log ID: ...
Connecting to: mongodb://127.0.0.1:27017/
Using MongoDB: 8.0.x
Welcome to Mongosh!
```

Type `exit` to quit mongosh.

---

### Step 5: Seed CourseNest Database

Now that MongoDB is running, let's seed your CourseNest database!

In your terminal (in the CourseNest folder):

```bash
cd backend
npm run seed
```

**Expected Output:**
```
MongoDB Connected...
Collections cleared...
Admin user created...
Created course: Python Programming - From Beginner to Advanced
Added 10 lessons to Python Programming - From Beginner to Advanced
Created course: SQL Mastery - Complete Database Bootcamp
Added 8 lessons to SQL Mastery - Complete Database Bootcamp
...
✅ Database seeded successfully!

Admin credentials:
Email: admin@coursenest.com
Password: admin123
```

---

### Step 6: Restart Backend Server

The backend will automatically detect MongoDB and restart. If not:

Close the backend terminal window and run again:
```bash
cd backend
npm run dev
```

You should now see:
```
Server running in development mode on port 5000
MongoDB Connected: localhost
```

---

## 🎉 You're Done!

### Access Your Application:

**Frontend:** http://localhost:3001
**Backend API:** http://localhost:5000/api

### Login Credentials:

**Admin Account:**
- Email: `admin@coursenest.com`
- Password: `admin123`

**Student Account:**
- Create via signup at: http://localhost:3001/signup

---

## 🔧 Troubleshooting

### MongoDB Service Won't Start?

**Check if MongoDB is installed:**
```powershell
sc query MongoDB
```

If you get "The specified service does not exist", reinstall MongoDB.

**Try starting manually:**
```powershell
net start MongoDB
```

### Port 27017 Already in Use?

Check what's using the port:
```powershell
netstat -ano | findstr :27017
```

Kill the process (replace PID with actual number):
```powershell
taskkill /PID <PID> /F
```

### mongosh Command Not Found?

MongoDB Shell might not be in PATH. Try full path:
```
"C:\Program Files\MongoDB\Server\8.0\bin\mongosh.exe"
```

Or add to PATH:
1. Open System Properties → Environment Variables
2. Add to Path: `C:\Program Files\MongoDB\Server\8.0\bin`

### Connection Still Failing?

**Check MongoDB is running:**
```powershell
sc query MongoDB
```

**Restart MongoDB service:**
```powershell
net stop MongoDB
net start MongoDB
```

---

## 📚 MongoDB Tools (Optional)

### MongoDB Compass (GUI)

Download MongoDB Compass for a visual interface:
https://www.mongodb.com/try/download/compass

**Connection String:**
```
mongodb://localhost:27017/
```

You can browse databases, collections, and documents visually!

---

## ✨ Quick Reference

| Task | Command |
|------|---------|
| Start MongoDB | `net start MongoDB` |
| Stop MongoDB | `net stop MongoDB` |
| Check Status | `sc query MongoDB` |
| Connect to DB | `mongosh` |
| Seed Database | `npm run seed` |
| Start Backend | `npm run dev` |
| Start Frontend | `npm run dev` |

---

## 🎯 What Happens After Seeding?

Your CourseNest database will have:

**Users:**
- 1 Admin account

**Courses (8 total):**
1. Python Programming (10 lessons)
2. SQL Mastery (8 lessons)
3. React Development (10 lessons)
4. C Programming (8 lessons)
5. Machine Learning (8 lessons)
6. Data Science (7 lessons)
7. Docker Essentials (6 lessons)
8. Full Stack Web Development (8 lessons)

**Total:** 65+ video lessons ready to watch!

---

## 🆘 Still Need Help?

Check these files:
- `README.md` - Full documentation
- `QUICKSTART.md` - Getting started guide
- `MONGODB_SETUP.md` - Alternative setup methods

**MongoDB Documentation:**
https://docs.mongodb.com/manual/

**MongoDB University (Free Courses):**
https://university.mongodb.com

---

**Happy Coding! 🚀**
