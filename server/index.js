const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

dotenv.config();

const app = express();
app.use(express.json());

// ensure upload directories exist (multer fails if they are missing)
['uploads/gallery', 'uploads/notes'].forEach((dir) => {
  fs.mkdirSync(path.join(__dirname, dir), { recursive: true });
});

// CORS: the API is consumed via same-origin requests (Vite dev proxy) or by
// deployed frontends, so we reflect the request origin. Auth uses Bearer tokens
// (no cookies), so permissive CORS is safe here. Set FRONTEND_URL to restrict.
app.use(
  cors({
    origin: process.env.FRONTEND_URL || true,
  })
);

// static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// route imports
const teacherRoutes = require('./routes/teacherRoutes');
const studentRoutes = require('./routes/studentRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const notesRoutes = require('./routes/notesRoutes');

// use routes
app.use('/api/teachers', teacherRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/notes', notesRoutes);

// health check: 200 + db status when the app is up
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    uptime: process.uptime(),
  });
});


// BACKEND_PORT keeps the API on a fixed port (5000) so the injected PORT
// can be reserved for the Vite dev server when running the fullstack dev script.
const PORT = process.env.BACKEND_PORT || 5000;
const hasMongoUri = Boolean(process.env.MONGO_URI);

// Dev fallback: without JWT_SECRET, logins would crash. Generate a random secret
// per boot (sessions reset on restart). Set JWT_SECRET in production for stable tokens.
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = crypto.randomBytes(32).toString('hex');
  console.log('JWT_SECRET not set - generated a temporary secret (sessions reset on restart)');
}

const startServer = () => {
  app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
};

if (hasMongoUri) {
  mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to MongoDB');
      startServer();
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err.message);
      console.log('Server starting without database connection...');
      startServer();
    });
} else {
  console.log('MONGO_URI not set - server starting without database connection');
  startServer();
}