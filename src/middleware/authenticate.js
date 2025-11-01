import { auth } from "../firebase/firebase-config.js"

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1]

    if (!token) {
      return res.status(401).json({ message: "No token provided" })
    }

    const decodedToken = await auth.verifyIdToken(token)

    req.userId = decodedToken.uid
    req.userEmail = decodedToken.email

    next()
  } catch (error) {
    console.error("Authentication error:", error)

    // Return 401 if token is invalid or expired
    res.status(401).json({ message: "Invalid or expired token" })
  }
}

export default authenticate