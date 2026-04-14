const StudentModel = require('../models/studentModel');
const AppError = require('../utils/AppError');

// ─── GET /api/students ────────────────────────────────────────────────────────
const getAllStudents = async (req, res, next) => {
  next({
    message: "Error from controller",
    statusCode: 403
  })
  // try {
  //   const students = await StudentModel.getAll();
  //   res.status(200).json({
  //     success: true,
  //     count: students.length,
  //     data: students,
  //   });
  // } catch (err) {
  //   next(err); // forwarded to global error handler
  // }
};

// ─── GET /api/students/:id ──────────────────────────────────────────────────── 
const getStudentById = async (req, res, next) => {
  try {
    const student = await StudentModel.getById(req.params.id);
    if (!student) {
      return next(new AppError('Student not found', 404));
    }
    res.status(200).json({ success: true, data: student });
  } catch (err) {
    next(err);
  }
};

// ─── POST /api/students ───────────────────────────────────────────────────────
const createStudent = async (req, res, next) => {
  try {
    const student = await StudentModel.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: student,
    });
  } catch (err) {
    next(err); // duplicate-email (23505) handled centrally
  }
};

// ─── PUT /api/students/:id ────────────────────────────────────────────────────
const updateStudent = async (req, res, next) => {
  try {
    const student = await StudentModel.update(req.params.id, req.body);
    if (!student) {
      return next(new AppError('Student not found', 404));
    }
    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: student,
    });
  } catch (err) {
    next(err);
  }
};

// ─── DELETE /api/students/:id ─────────────────────────────────────────────────
const deleteStudent = async (req, res, next) => {
  try {
    const student = await StudentModel.delete(req.params.id);
    if (!student) {
      return next(new AppError('Student not found', 404));
    }
    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: student,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
