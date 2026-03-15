# 🚀 Deploy CourseNest LMS - FREE Hosting Guide

Get your CourseNest LMS live on the internet where anyone can access it!

---

## 🌐 **Complete Deployment (Frontend + Backend)**

### **Part 1: Deploy Frontend on Vercel (5 minutes)**

#### **Step 1: Go to Vercel**
1. Visit: https://vercel.com
2. Click **"Sign Up"**
3. Sign in with your **GitHub account** (VaishnaviIti)

#### **Step 2: Import Your Repository**
1. Click **"Add New Project"**
2. Select **"Import Git Repository"**
3. Find and select: `VaishnaviIti/CourseNest-`
4. Click **"Import"**

#### **Step 3: Configure Build**
- **Framework Preset:** Vite
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

#### **Step 4: Add Environment Variables**
Click "Environment Variables" and add:
```
VITE_API_URL=https://your-backend-url.onrender.com
```
(We'll get the backend URL in Part 2)

#### **Step 5: Deploy!**
- Click **"Deploy"**
- Wait 2-3 minutes
- ✅ **Your frontend is LIVE!**

You'll get a URL like: `https://coursenest-.vercel.app`

---

### **Part 2: Deploy Backend on Render (10 minutes)**

#### **Step 1: Go to Render**
1. Visit: https://render.com
2. Click **"Get Started for Free"**
3. Sign in with **GitHub**

#### **Step 2: Create New Web Service**
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub account
3. Select repository: `VaishnaviIti/CourseNest-`

#### **Step 3: Configure Service**
- **Name:** coursenest-backend
- **Region:** Choose closest to you
- **Branch:** main
- **Root Directory:** `backend`
- **Runtime:** Node
- **Build Command:** `npm install`
- **Start Command:** `node server.js`

#### **Step 4: Environment Variables**
Click "Environment" and add:
```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://your-mongodb-atlas-uri
JWT_SECRET=your_super_secret_jwt_key_12345
```

#### **Step 5: MongoDB Atlas Setup**

**You need MongoDB in the cloud (free):**

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with GitHub/Google
3. Create **FREE cluster** (M0 Sandbox)
4. Get connection string:
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your admin password
   - Example: `mongodb+srv://admin:password123@cluster0.xxxxx.mongodb.net/coursenest?retryWrites=true&w=majority`

5. Add this to Render environment variables as `MONGODB_URI`

#### **Step 6: Deploy Backend**
- Click **"Create Web Service"**
- Wait 5-10 minutes
- ✅ **Your backend is LIVE!**

You'll get a URL like: `https://coursenest-backend.onrender.com`

---

### **Part 3: Connect Frontend to Backend**

#### **Update Vercel Frontend:**
1. Go back to Vercel dashboard
2. Select your CourseNest project
3. Go to **"Settings"** → **"Environment Variables"**
4. Edit `VITE_API_URL` to your Render backend URL:
   ```
   VITE_API_URL=https://coursenest-backend.onrender.com
   ```
5. Click **"Save"**
6. Go to **"Deployments"** tab
7. Click **"Redeploy"** on latest deployment

---

## ✅ **YOU'RE DONE!**

### **Your Live URLs:**

**Frontend (Student Access):**
```
https://coursenest-.vercel.app
```

**Backend API:**
```
https://coursenest-backend.onrender.com/api
```

**Share the frontend URL with students!**

---

## 🎯 **Alternative: Quick Demo (Frontend Only)**

If you just want to show the UI quickly (without backend features):

### **Netlify Drop (2 minutes)**

1. Build frontend locally:
   ```bash
   cd frontend
   npm run build
   ```

2. Go to: https://app.netlify.com/drop

3. Drag and drop the `frontend/dist` folder

4. ✅ **Instant live URL!** (like `https://coursenest-lms.netlify.app`)

⚠️ **Note:** This won't have working login/enrollment (no backend), but shows the beautiful UI!

---

## 📱 **Test Your Live Site:**

Once deployed, test these features:

1. ✅ **Homepage loads** with animations
2. ✅ **Browse courses** (8 courses visible)
3. ✅ **Course details** page works
4. ✅ **Login/Signup** forms (with backend connected)
5. ✅ **Enroll in course** (dummy payment)
6. ✅ **Dashboard** shows enrolled courses
7. ✅ **Video player** loads YouTube lessons
8. ✅ **Mark complete** tracks progress

---

## 💡 **Pro Tips:**

### **Custom Domain (Optional)**
- Buy domain from Namecheap/GoDaddy
- Connect to Vercel/Render (free SSL included!)
- Students access via: `https://coursenest.com`

### **Keep It Free**
- Vercel: Free for personal projects
- Render: Free tier available (sleeps after 15 min inactivity)
- MongoDB Atlas: Free 512MB storage

### **Performance**
- Enable caching on Vercel
- Use CDN for static assets
- Optimize images in README

---

## 🔧 **Troubleshooting:**

### **Frontend Can't Connect to Backend:**
- Check `VITE_API_URL` in Vercel environment variables
- Make sure backend URL starts with `https://`
- Verify backend is running (visit the URL in browser)

### **Backend Not Starting:**
- Check Render logs for errors
- Verify `MONGODB_URI` is correct
- Make sure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

### **MongoDB Connection Failed:**
- Whitelist IP in MongoDB Atlas (0.0.0.0/0 for all IPs)
- Check username/password in connection string
- Verify database name is `coursenest`

---

## 🎊 **Success!**

Your CourseNest LMS is now:
- ✅ Hosted online (FREE)
- ✅ Accessible worldwide
- ✅ Shareable with anyone
- ✅ Ready for your portfolio!

**Add the live URL to:**
- Your resume
- LinkedIn profile
- Portfolio website
- Job applications

---

## 📞 **Need Help?**

Common issues and solutions:
- Vercel docs: https://vercel.com/docs
- Render docs: https://render.com/docs
- MongoDB Atlas: https://www.mongodb.com/docs/atlas/

**Good luck with your deployment! 🚀**
