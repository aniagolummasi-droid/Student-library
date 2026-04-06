const Student = require('../models/Student');

exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    return res.status(201).json(student);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    return res.json(students);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    return res.json(student);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!student) return res.status(404).json({ error: 'Student not found' });
    return res.json(student);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    return res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
