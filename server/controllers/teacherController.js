const Teacher = require('../models/Teacher');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await Teacher.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });
    const hashed = await bcrypt.hash(password, 10);
    const teacher = new Teacher({ name, email, password: hashed });
    await teacher.save();
    res.status(201).json({ message: 'Teacher registered' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const teacher = await Teacher.findOne({ email });
    if (!teacher) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, teacher.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    const payload = { id: teacher._id, role: 'teacher', name: teacher.name };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, name: teacher.name, role: 'teacher' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};