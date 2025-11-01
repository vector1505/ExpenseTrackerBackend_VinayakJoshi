import express from "express"
import { register, login, logout } from "../controllers/authController.js"
import { validateRegister, validateLogin } from "../middleware/validation.js"
import authenticate from "../middleware/authenticate.js"

const router = express.Router()

router.post("/register", validateRegister, register)

router.post("/login", validateLogin, login)

router.post("/logout", authenticate, logout)

export default router