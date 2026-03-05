const GalleryImage = require('../models/GalleryImage');
const fs = require('fs');
const path = require('path');

exports.getByCategory = async (req, res) => {
  try {
    const category = req.query.category;
    const images = await GalleryImage.find({ category });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.upload = async (req, res) => {
  try {
    const file = req.file;
    const { category } = req.body;
    const url = `/uploads/gallery/${file.filename}`;
    const image = new GalleryImage({ filename: file.filename, url, category, uploadedBy: req.user.id });
    await image.save();
    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const image = await GalleryImage.findById(id);
    if (!image) return res.status(404).json({ message: 'Not found' });
    await GalleryImage.findByIdAndDelete(id);
    const filePath = path.join(__dirname, '../uploads/gallery', image.filename);
    fs.unlink(filePath, (err) => {});
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};