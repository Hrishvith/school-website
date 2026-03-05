const Note = require('../models/Note');
const fs = require('fs');
const path = require('path');

exports.getNotes = async (req, res) => {
  try {
    const { standard, subject } = req.query;
    const query = { standard };
    if (subject) query.subject = subject;
    const notes = await Note.find(query);
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.upload = async (req, res) => {
  try {
    const file = req.file;
    const { standard, subject, title } = req.body;
    const fileUrl = `/uploads/notes/${file.filename}`;
    const note = new Note({ title: title || file.originalname, standard, subject, fileUrl, uploadedBy: req.user.id });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ message: 'Not found' });
    await Note.findByIdAndDelete(id);
    const filePath = path.join(__dirname, '../uploads/notes', path.basename(note.fileUrl));
    fs.unlink(filePath, (err) => {});
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};