const express = require('express');
const router = express.Router();

const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');

const { studentValidationRules, validate } = require('../middlewares/validate');

/**
 * @route   GET /api/students
 * @desc    Get all students
 */
router.get('/', getAllStudents);

/**
 * @route   GET /api/students/:id
 * @desc    Get student by ID
 */
router.get('/:id', getStudentById);

/**
 * @route   POST /api/students
 * @desc    Create a new student
 */
router.post('/', studentValidationRules(), validate, createStudent);

/**
 * @route   PUT /api/students/:id
 * @desc    Update a student
 */
router.put('/:id', studentValidationRules(), validate, updateStudent);

/**
 * @route   DELETE /api/students/:id
 * @desc    Delete a student
 */
router.delete('/:id', deleteStudent);

module.exports = router;
