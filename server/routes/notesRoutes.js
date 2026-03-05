const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');
const auth = require('../middleware/authMiddleware');
const teacherOnly = require('../middleware/teacherOnly');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/notes'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  }
});
const upload = multer({ storage });

router.get('/', notesController.getNotes);
router.post('/upload', auth, teacherOnly, upload.single('file'), notesController.upload);
router.delete('/:id', auth, teacherOnly, notesController.delete);

module.exports = router;