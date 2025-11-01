import { auth } from "../firebase/firebase-config.js"
import User from "../models/User.js"

const register = async (req, res) => {
  try {
    const { email, password } = req.body
    const userRecord = await auth.createUser({ email, password })
    const newUser = new User({ uid: userRecord.uid, email: userRecord.email })
    await newUser.save()
    res.status(201).json({ success: true, message: "User registered successfully", uid: userRecord.uid })
  } catch (error) {
    console.error("Registration error:", error)
    res.status(400).json({ success: false, message: error.message || "Registration failed" })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const API_KEY = process.env.FIREBASE_API_KEY
    if (!API_KEY) {
      return res.status(500).json({ success: false, message: 'Server misconfiguration: FIREBASE_API_KEY missing' })
    }
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    })
    const data = await resp.json()
    if (!resp.ok) {
      const msg = data?.error?.message || 'Login failed'
      return res.status(401).json({ success: false, message: msg })
    }
    return res.status(200).json({ success: true, message: 'Login successful', token: data.idToken, uid: data.localId })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}

const logout = async (req, res) => {
  try {
    res.status(200).json({ success: true, message: "Logout successful" })
  } catch (error) {
    res.status(500).json({ success: false, message: "Logout failed" })
  }
}

export { register, login, logout }