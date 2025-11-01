
import express from "express"
import { getMonthlyReport, getCategoryReport } from "../controllers/reportController.js"
import authenticate from "../middleware/authenticate.js"
import { validateMonthlyReport, validateCategoryReport } from "../middleware/validation.js"

const router = express.Router()


router.use(authenticate)

router.get("/monthly", validateMonthlyReport, getMonthlyReport)

router.get("/category", validateCategoryReport, getCategoryReport)

export default router