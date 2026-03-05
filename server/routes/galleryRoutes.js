const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const auth = require('../middleware/authMiddleware');
const teacherOnly = require('../middleware/teacherOnly');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/gallery'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  }
});
const upload = multer({ storage });

router.get('/', galleryController.getByCategory);
router.post('/upload', auth, teacherOnly, upload.single('image'), galleryController.upload);
router.delete('/:id', auth, teacherOnly, galleryController.delete);

module.exports = router;