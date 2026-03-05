# 🚀 Render Deployment Guide for MERN School Website

## Prerequisites

- GitHub account with your repository pushed
- MongoDB Atlas account with connection string ready
- Render account (free at https://render.com)

---

## Step-by-Step Deployment

### Step 1️⃣: Push Code to GitHub

```bash
git init
git add .
git commit -m "Ready for deployment"
git branch -M main
git remote add origin https://github.com/yourusername/school-website.git
git push -u origin main
```

---

### Step 2️⃣: Deploy Backend API to Render

**2.1 Go to https://dashboard.render.com**

**2.2 Click "New +" → Select "Web Service"**

- Click "Build and deploy from a Git repository"

**2.3 Connect GitHub**

- Search for your repository: `school-website`
- Click "Connect"

**2.4 Configure Service**

```
Name:                 school-api
Root Directory:       server
Runtime:              Node
Build Command:        npm install
Start Command:        node index.js
```

**2.5 Add Environment Variables**
Click "Advanced" → "Add Environment Variable"

| Key            | Value                                                                                           |
| -------------- | ----------------------------------------------------------------------------------------------- |
| `MONGO_URI`    | `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/school?retryWrites=true&w=majority` |
| `JWT_SECRET`   | `your_super_secret_key_here`                                                                    |
| `PORT`         | `5000`                                                                                          |
| `FRONTEND_URL` | Will add after frontend deployment                                                              |

**2.6 Deploy**

- Click "Create Web Service"
- Wait 2-3 minutes for deployment
- You'll get a URL like: `https://school-api.onrender.com`

✅ **Save this Backend URL!**

---

### Step 3️⃣: Deploy Frontend to Render

**3.1 In Render Dashboard → Click "New +" → Choose "Static Site"**

**3.2 Connect Repository**

- Select same `school-website` repository
- Click "Connect"

**3.3 Configure**

```
Name:                   school-website
Root Directory:         client
Build Command:          npm install && npm run build
Publish Directory:      dist
```

**3.4 Add Environment Variables** (not needed for static sites, but good to have)

```
VITE_API_URL=https://school-api.onrender.com
```

**3.5 Deploy**

- Click "Create Static Site"
- Wait for build to complete
- You'll get URL like: `https://school-website-xxxxx.onrender.com`

✅ **Save this Frontend URL!**

---

### Step 4️⃣: Update Backend CORS (Important!)

**Go back to Backend Service:**

1. Click `school-api` service in Render dashboard
2. Go to "Environment" tab
3. Click "Edit" next to `FRONTEND_URL` or add it:
   ```
   FRONTEND_URL=https://school-website-xxxxx.onrender.com
   ```
4. Click "Save"
5. Go to "Deploy" tab
6. Click "Deploy latest commit" to redeploy

---

### Step 5️⃣: Test Your Deployment

**Open your frontend URL:** `https://school-website-xxxxx.onrender.com`

**Test Features:**

1. ✅ Click "Teacher Login" → Register
2. ✅ Upload an image to Gallery
3. ✅ Upload notes
4. ✅ Click "Student Login" → View content
5. ✅ Logout and refresh

**Should see all content working!**

---

## 🔧 Troubleshooting

### Issue: "Cannot GET /"

```
❌ Frontend shows 404
✅ Solution: Check that vite build was successful
- Go to Render → school-website → Logs
- Look for "Build successful" message
- Verify "Publish Directory" is set to "dist"
```

### Issue: API calls fail / "Failed to fetch"

```
❌ Gallery and Notes not loading
✅ Solution: Update CORS in backend
- Add FRONTEND_URL to backend environment variables
- Redeploy backend
- Wait 2-3 minutes for cold start
```

### Issue: Images not showing

```
❌ Upload works but images are 404
✅ Solutions:
1. For local uploads: Render deletes files on restart
2. Better solution: Use Cloudinary or AWS S3 for image storage
3. For now, ensure MongoDB has the URLs stored correctly
```

### Issue: Slow startup

```
❌ Site takes 30+ seconds to load first time
✅ Normal for free tier - Render spins down inactive services
- First request wakes it up (~30s)
- Subsequent requests are fast
- Upgrade to paid if needed
```

---

## 📊 What's Deployed

| Component   | URL                                         | Type           |
| ----------- | ------------------------------------------- | -------------- |
| Frontend    | `https://school-website-xxxxx.onrender.com` | React + Vite   |
| Backend API | `https://school-api.onrender.com`           | Express + Node |
| Database    | MongoDB Atlas (connected)                   | Cloud DB       |

---

## 🔐 Security Checklist

- ✅ `.env` file in `.gitignore` (don't commit secrets)
- ✅ Use strong JWT_SECRET in production
- ✅ CORS is configured for your domains only
- ✅ MongoDB credentials are separate per environment
- ✅ Never share your `.env` file

---

## 📈 Monitor Your Deployment

**View Logs:**

- Render Dashboard → Service → "Logs" tab
- Check for errors, database connection issues

**Monitor Performance:**

- See response times and uptime
- Check resource usage

**Update Code:**

```bash
# Make changes locally
git add .
git commit -m "Your changes"
git push origin main

# Render auto-redeploys within a minute!
```

---

## 🎉 Congratulations!

Your School Website is now live on the internet!

- 🌐 Share the frontend URL with users
- 👨‍🏫 Teachers can login and upload content
- 👨‍🎓 Students can view and download
- 📱 Responsive design works on all devices

---

## 📞 Need Help?

- **Render Docs**: https://render.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com
- **Vite Docs**: https://vitejs.dev

---

**Happy hosting! 🚀**
