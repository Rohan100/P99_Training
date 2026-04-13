const StudentModel = require('../models/studentModel');

const getAllStudents = async (req, res) => {
  try {
    const students = await StudentModel.getAll();
    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await StudentModel.getById(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.status(200).json({ success: true, data: student });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const createStudent = async (req, res) => {
  try {
    const student = await StudentModel.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: student,
    });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ success: false, message: 'A student with this email already exists.' });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const student = await StudentModel.update(req.params.id, req.body);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: student,
    });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ success: false, message: 'A student with this email already exists.' });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await StudentModel.delete(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: student,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
