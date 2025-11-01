import express from "express"
import {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController.js"
import authenticate from "../middleware/authenticate.js"
import { validateExpense, validateExpenseId } from "../middleware/validation.js"

const router = express.Router()

router.use(authenticate)

router.get("/", getAllExpenses)

router.get("/:id", validateExpenseId, getExpenseById)

router.post("/", validateExpense, createExpense)

router.put("/:id", validateExpenseId, validateExpense, updateExpense)

router.delete("/:id", validateExpenseId, deleteExpense)

export default router