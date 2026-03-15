# ⚠️ MongoDB Installation Required

## Current Status

✅ **Backend Server**: Created and configured (needs MongoDB)
✅ **Frontend Server**: Running on http://localhost:3000
❌ **MongoDB**: Not installed or not running

The backend needs MongoDB to store and retrieve data.

---

## 📥 Quick MongoDB Setup for Windows

### Option 1: MongoDB Local Installation (Recommended)

#### Step 1: Download MongoDB
1. Go to: https://www.mongodb.com/try/download/community
2. Select:
   - Version: Latest (8.0 or higher)
   - Platform: Windows
   - Package: msi
3. Click **Download**

#### Step 2: Install MongoDB
1. Run the downloaded `.msi` file
2. Choose **"Complete"** installation
3. Select **"Install MongoDB as a Service"**
4. Keep default settings
5. Click **Next** → **Install**

#### Step 3: Verify Installation
Open PowerShell as Administrator and run:
```powershell
net start MongoDB
```

You should see: "The MongoDB service is starting..."

#### Step 4: Seed the Database
In your terminal:
```bash
cd "c:\Users\Smart\OneDrive\Desktop\kodnest LMS portal\backend"
npm run seed
```

You should see: "✅ Database seeded successfully!"

---

### Option 2: MongoDB Atlas (Cloud - Easier!)

#### Step 1: Create Free Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with email or Google account
3. It's FREE for testing (no credit card needed)

#### Step 2: Create Cluster
1. Click **"Build a Database"**
2. Choose **FREE** tier (M0 Sandbox)
3. Select region closest to you
4. Click **"Create Cluster"**

#### Step 3: Create Database User
1. Click **"Database Access"** in left sidebar
2. Click **"+ ADD NEW DATABASE USER"**
3. Set username: `coursenest`
4. Set password: (choose a simple one for testing, e.g., `test123`)
5. Set role: **"Read and write to any database"**
6. Click **"Add User"**

#### Step 4: Whitelist Your IP
1. Click **"Network Access"** in left sidebar
2. Click **"+ ADD IP ADDRESS"**
3. Click **"ALLOW ACCESS FROM ANYWHERE"** (for testing)
4. Click **"Confirm"**

#### Step 5: Get Connection String
1. Click **"Database"** in left sidebar
2. Click **"Connect"** button
3. Choose **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://coursenest:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

#### Step 6: Update Backend Configuration
Edit this file: `backend/.env`

Replace the MONGODB_URI line with your connection string:
```env
MONGODB_URI=mongodb+srv://coursenest:test123@cluster0.xxxxx.mongodb.net/coursenest?retryWrites=true&w=majority
```

**Important:** Replace `<password>` with your actual password and `cluster0.xxxxx` with your cluster URL.

#### Step 7: Seed the Database
```bash
cd backend
npm run seed
```

---

## ✅ After MongoDB is Setup

### 1. Restart Backend Server
The backend will auto-restart when MongoDB is available, or you can:
- Close the backend terminal window
- Run again: `npm run dev` in backend folder

### 2. Seed the Database (First Time Only)
```bash
cd backend
npm run seed
```

This creates:
- 8 programming courses with lessons
- Admin account for testing

### 3. Test the Application
1. Open browser: http://localhost:3000
2. You should see the CourseNest homepage!
3. Login with admin credentials:
   - Email: `admin@coursenest.com`
   - Password: `admin123`

---

## 🎯 What Happens Without MongoDB?

**Frontend**: ✅ Works perfectly
- You can see the beautiful UI
- Navigate through pages
- See animations and design

**Backend**: ❌ Limited functionality
- API endpoints return errors
- No data can be stored/retrieved
- Authentication won't work

**Solution**: Install MongoDB (takes 5 minutes!)

---

## 🔧 Troubleshooting

### MongoDB Service Won't Start?
```powershell
# Check if MongoDB is installed
sc query MongoDB

# If not found, reinstall MongoDB
```

### Port Already in Use?
MongoDB uses port 27017. If it's blocked:
```powershell
netstat -ano | findstr :27017
```

### Connection String Not Working?
1. Double-check username and password
2. Make sure IP is whitelisted (0.0.0.0/0 allows all)
3. Wait 2-3 minutes after creating cluster

### Still Having Issues?
Try MongoDB Atlas (cloud option) - it's easier and works immediately!

---

## 📚 Additional Resources

- MongoDB Docs: https://docs.mongodb.com/manual/
- MongoDB University (Free Courses): https://university.mongodb.com
- Community Support: https://www.mongodb.com/community/forums

---

## ✨ Quick Summary

1. **Install MongoDB** (local or Atlas)
2. **Update .env file** with connection string
3. **Run seed script**: `npm run seed`
4. **Start servers**: Both backend and frontend
5. **Enjoy CourseNest!** 🎉

---

**Need help?** Check `QUICKSTART.md` or `README.md` for more details!
