# 🚨 CORRECT MONGODB CONNECTION STRING FOR RENDER

## Your Current (BROKEN) Connection String:
```
mongodb+srv://admin:%40Mongodb123@ac-gvdedga-shard-00-00.q9yo3h0.mongodb.net/coursenest?retryWrites=true&w=majority
```

## ✅ WORKING Connection String Formats:

### Option 1: SRV Format (Recommended for Render)
```
mongodb+srv://admin:%40Mongodb123@cluster0.ac-gvdedga.mongodb.net/coursenest?retryWrites=true&w=majority
```

### Option 2: Legacy Format (If SRV doesn't work)
```
mongodb://admin:%40Mongodb123@ac-gvdedga-shard-00-00.q9yo3h0.mongodb.net:27017,ac-gvdedga-shard-00-01.q9yo3h0.mongodb.net:27017,ac-gvdedga-shard-00-02.q9yo3h0.mongodb.net:27017/coursenest?ssl=true&replicaSet=atlas-13p6nj-shard-0&authSource=admin&appName=Cluster0
```

---

## 🔧 HOW TO GET THE CORRECT ONE:

### Step 1: Go to MongoDB Atlas
https://cloud.mongodb.com → Log in

### Step 2: Click "Database" in left sidebar

### Step 3: Click "Connect" button on your cluster

### Step 4: Choose "Drivers" or "Connect your application"

### Step 5: You should see TWO options:

**Option A - SRV Connection String:**
```
mongodb+srv://admin:<password>@cluster0.ac-gvdedga.mongodb.net/?retryWrites=true&w=majority
```
✅ This is what we want! Copy this one.

**Option B - Full Connection String:**
```
mongodb://admin:<password>@ac-gvdedga-shard-00-00.q9yo3h0.mongodb.net:27017,...
```
❌ Don't use this unless Option A fails.

### Step 6: Replace `<password>` with your URL-encoded password

Your password: `@Mongodb123`
URL-encoded: `%40Mongodb123`

### Step 7: Add `/coursenest` database name

Final format:
```
mongodb+srv://admin:%40Mongodb123@cluster0.ac-gvdedga.mongodb.net/coursenest?retryWrites=true&w=majority
```

---

## 📋 UPDATE IN RENDER:

1. Go to Render dashboard
2. Click on `coursenest-backend` service
3. Click "Environment" tab
4. Edit `MONGODB_URI` variable
5. Paste the CORRECT connection string from above
6. Click "Save Changes"
7. Redeploy

---

## ⚠️ IMPORTANT NOTES:

- The cluster name MUST match exactly what MongoDB Atlas shows you
- If you see `cluster0.xxxxx.mongodb.net`, use that exact format
- The SRV format starts with `mongodb+srv://` (not just `mongodb://`)
- Your password must be URL-encoded (`@` becomes `%40`)

---

## 🎯 STILL NOT WORKING?

Try the legacy format (Option 2 above) - it's longer but more reliable.

Copy the ENTIRE long string from MongoDB Atlas and replace `<password>` with `%40Mongodb123`
