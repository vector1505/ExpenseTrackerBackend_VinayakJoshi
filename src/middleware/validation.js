
import { validationResult, body, query, param } from "express-validator"

const validate = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() })
  }

  next()
}

const validateRegister = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  validate,
]


const validateLogin = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
  validate,
]

const validateExpense = [
  body("title").notEmpty().withMessage("Title is required"),
  body("amount").isFloat({ min: 0 }).withMessage("Amount must be a positive number"),
  body("category").notEmpty().withMessage("Category is required"),
  body("date").isISO8601().withMessage("Invalid date format"),
  validate,
]

const validateMonthlyReport = [
  query("month").isInt({ min: 1, max: 12 }).withMessage("Month must be between 1-12"),
  query("year").isInt({ min: 2000 }).withMessage("Year must be valid"),
  validate,
]

const validateCategoryReport = [query("category").notEmpty().withMessage("Category is required"), validate]

const validateExpenseId = [param("id").isMongoId().withMessage("Invalid expense ID"), validate]

export {
  validate,
  validateRegister,
  validateLogin,
  validateExpense,
  validateMonthlyReport,
  validateCategoryReport,
  validateExpenseId,
}