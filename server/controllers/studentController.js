const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await Student.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });
    const hashed = password ? await bcrypt.hash(password, 10) : '';
    const student = new Student({ name, email, password: hashed });
    await student.save();
    res.status(201).json({ message: 'Student registered' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ message: 'Invalid credentials' });
    if (student.password) {
      const match = await bcrypt.compare(password, student.password);
      if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    }
    const payload = { id: student._id, role: 'student', name: student.name };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, name: student.name, role: 'student' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
