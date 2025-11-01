import { auth } from "../firebase/firebase-config.js"
import User from "../models/User.js"

const register = async (req, res) => {
  try {
    const { email, password } = req.body


    const userRecord = await auth.createUser({
      email,
      password,
    })


    const newUser = new User({
      uid: userRecord.uid,
      email: userRecord.email,
    })

    await newUser.save()

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      uid: userRecord.uid,
    })
  } catch (error) {
    console.error("Registration error:", error)

    res.status(400).json({
      success: false,
      message: error.message || "Registration failed",
    })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await auth.getUserByEmail(email)

    const token = await auth.createCustomToken(user.uid)

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      uid: user.uid,
    })
  } catch (error) {
    console.error("Login error:", error)

    res.status(401).json({
      success: false,
      message: "Invalid email or password",
    })
  }
}

const logout = async (req, res) => {
  try {
    
    res.status(200).json({
      success: true,
      message: "Logout successful",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Logout failed",
    })
  }
}

export { register, login, logout }