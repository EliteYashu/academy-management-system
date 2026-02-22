# 🚀 QUICK START GUIDE

## Your Problem: No Data Showing

### Root Cause:
- ❌ Backend server is NOT running
- ❌ Database is NOT connected
- ❌ No data exists yet

---

## ⚡ FASTEST FIX (3 Steps)

### Step 1: Install Node.js (if not installed)
Download from: https://nodejs.org/
(Choose LTS version)

### Step 2: Start the Server
**Double-click:** `start-server.bat`

OR run in terminal:
```bash
npm install
npm start
```

### Step 3: Open Website
Open `management.html` in your browser

---

## ✅ Verify It's Working

You should see in the terminal:
```
✅ Connected to MongoDB successfully
🚀 Server running on http://localhost:3000
```

In browser console (F12):
```
✅ Connected to database successfully
📊 Loaded 0 records from database
```

---

## 📝 Add Your First Data

1. **Login as Admin:**
   - ID: `ADMIN001`
   - Password: `admin123`

2. **Add a Teacher:**
   - Click "Add Teacher" button
   - Fill in the form
   - Click Save

3. **Add a Student:**
   - Click "Students" in sidebar
   - Click "Add Student" button
   - Fill in the form
   - Click Save

4. **Check Dashboard:**
   - Click "Dashboard" in sidebar
   - You should now see your data!

---

## 🔧 Still Not Working?

### Check 1: Is MongoDB Installed?
```bash
mongod --version
```
If not installed: https://www.mongodb.com/try/download/community

### Check 2: Is MongoDB Running?
Windows: Check Services → MongoDB Server should be "Running"
Mac/Linux: `sudo systemctl status mongod`

### Check 3: Check Browser Console
Press F12 → Console tab → Look for errors

### Check 4: Check Server Terminal
Look for error messages in the terminal where server is running

---

## 🆘 Alternative: Run WITHOUT Database

If you don't want to use MongoDB:

1. Open `management.html` in a text editor
2. Find this line near the end:
   ```html
   <script src="api.js"></script>
   ```
3. Comment it out:
   ```html
   <!-- <script src="api.js"></script> -->
   ```
4. Save and refresh the page
5. Data will be stored in browser's localStorage instead

---

## 📞 Common Issues

| Issue | Solution |
|-------|----------|
| "Port 3000 in use" | Change PORT in `server.js` line 6 |
| "Cannot find module" | Run `npm install` |
| "MongoDB connection failed" | Install/start MongoDB |
| "CORS error" | Server must be running |
| Data disappears on refresh | Database not connected |

---

## 🎯 Expected Behavior

**WITH Database:**
- ✅ Data persists across browser sessions
- ✅ Data syncs across multiple tabs
- ✅ Data is stored in MongoDB

**WITHOUT Database (localStorage):**
- ✅ Data persists in same browser
- ❌ Data lost if you clear browser data
- ❌ Data NOT shared across browsers

---

## 📚 More Help

Read the full guide: `DATABASE_SETUP.md`
