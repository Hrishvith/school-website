# MERN School Website - Deployment Guide

## 🚀 Quick Start for Local Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (free tier available at https://cloud.mongodb.com)

### Local Setup

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd School
```

2. **Environment Variables**

#### Server (.env)

```bash
cd server
cat > .env << EOF
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/school?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this
PORT=5000
EOF
```

#### Replace with your MongoDB Atlas credentials from: https://cloud.mongodb.com/

3. **Install Dependencies**

```bash
# Backend
cd server
npm install

# Frontend
cd client
npm install
```

4. **Run Locally**

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npx vite
```

- Backend: http://localhost:5000
- Frontend: http://localhost:3002

---

## 🌐 Deploy to Render (FREE)

### Step 1: Prepare Your Code for Deployment

Create a root-level `package.json` for the monorepo:

```json
{
  "name": "school-website",
  "version": "1.0.0",
  "description": "MERN School Website",
  "main": "server/index.js",
  "scripts": {
    "install-all": "cd server && npm install && cd ../client && npm install",
    "start": "cd server && node index.js",
    "dev": "concurrently \"cd server && npm run dev\" \"cd client && npx vite\""
  }
}
```

### Step 2: Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/school-website.git
git push -u origin main
```

### Step 3: Deploy Backend to Render

1. **Go to https://render.com and sign up** (use GitHub)
2. **Create New Service** → "Web Service"
3. **Connect GitHub repository**
4. **Configure:**
   - **Name**: `school-api`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`

5. **Add Environment Variables:**
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Your secret key
   - `PORT`: `5000`

6. **Create Service** → Wait for deployment (2-3 mins)

✅ **Backend URL**: `https://school-api.onrender.com`

### Step 4: Deploy Frontend to Render

1. **Create New Static Site**
2. **Connect same GitHub repository**
3. **Configure:**
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. **Add Environment Variable:**
   - Create `client/.env.production`:

   ```
   VITE_API_URL=https://school-api.onrender.com
   ```

5. **Update vite.config.js:**

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": process.env.VITE_API_URL || "http://localhost:5000",
    },
  },
});
```

6. **Deploy** → Get your frontend URL

✅ **Frontend URL**: `https://school-xxxxx.onrender.com`

### Step 5: Update Backend CORS

Update `server/index.js`:

```javascript
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3002",
      "https://school-xxxxx.onrender.com", // Your frontend URL
    ],
  }),
);
```

### Step 6: Redeploy Backend

Go to Render dashboard → Select `school-api` → Click "Deploy" → manual deploy

---

## ✅ Verification

1. Open your frontend URL
2. Test Teacher Login → Register & Create Content
3. Test Gallery Upload & Notes
4. Test Student Login & View Content

---

## 📱 Features Available After Deployment

- ✅ Teacher/Student Authentication
- ✅ Image Gallery with Upload
- ✅ Notes Management by Subject
- ✅ Role-based Access Control
- ✅ Responsive Design
- ✅ File Storage

---

## 🔗 Useful Links

- **Render Dashboard**: https://dashboard.render.com
- **MongoDB Atlas**: https://cloud.mongodb.com
- **GitHub**: https://github.com

---

## 💬 Troubleshooting

### Issue: "Cannot GET /"

- Make sure `index.html` exists in `client/` folder
- Check Build Command is correct: `npm install && npm run build`

### Issue: API Calls Failing

- Update CORS in backend with your frontend URL
- Redeploy backend after changes
- Check environment variables in Render dashboard

### Issue: Images/Files Not Showing

- Ensure `server/uploads/` folder exists and has read permissions
- MongoDB should have the image URLs stored

---

## 📞 Support

For issues:

1. Check Render logs: Dashboard → Service → Logs
2. Verify MongoDB connection: https://cloud.mongodb.com
3. Check browser console for client-side errors

---

**Congratulations! Your School Website is now live! 🎉**
