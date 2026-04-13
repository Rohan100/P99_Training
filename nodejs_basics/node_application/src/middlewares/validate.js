const { body, validationResult } = require('express-validator');

/**
 * Validation rules for creating / updating a student
 */
const studentValidationRules = () => [
  body('first_name')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ max: 100 }).withMessage('First name must be ≤ 100 characters'),

  body('last_name')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ max: 100 }).withMessage('Last name must be ≤ 100 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail(),

  body('phone')
    .optional({ nullable: true, checkFalsy: true })
    .isMobilePhone().withMessage('Invalid phone number'),

  body('age')
    .optional({ nullable: true, checkFalsy: true })
    .isInt({ min: 1, max: 150 }).withMessage('Age must be an integer between 1 and 150'),

  body('course')
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ max: 150 }).withMessage('Course must be ≤ 150 characters'),
];

/**
 * Middleware to check validation results and respond with errors if any
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

module.exports = { studentValidationRules, validate };
