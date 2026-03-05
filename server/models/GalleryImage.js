const mongoose = require('mongoose');

const galleryImageSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  url: { type: String, required: true },
  category: { type: String, enum: ['faculty','8th','9th','10th'], required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
}, { timestamps: true });

module.exports = mongoose.model('GalleryImage', galleryImageSchema);
