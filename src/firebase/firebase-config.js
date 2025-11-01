import admin from "firebase-admin"
import dotenv from "dotenv"

dotenv.config()

// Initialize Firebase service account with credentials from environment variables
let initialized = false

try {
  const {
    FIREBASE_PROJECT_ID,
    FIREBASE_PRIVATE_KEY,
    FIREBASE_CLIENT_EMAIL,
    FIREBASE_CLIENT_ID,
    FIREBASE_PRIVATE_KEY_ID,
  } = process.env

  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    throw new Error(
      "Missing Firebase credentials. Ensure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY are set in .env"
    )
  }

  const serviceAccount = {
    type: "service_account",
    project_id: FIREBASE_PROJECT_ID,
    private_key_id: FIREBASE_PRIVATE_KEY_ID,
    // Replace escaped newlines with actual newlines for proper formatting
    private_key: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: FIREBASE_CLIENT_EMAIL,
    client_id: FIREBASE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
  }

  // Initialize Firebase Admin SDK only once
  if (!admin.apps || admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
    initialized = true
    console.log("[FIREBASE] Admin initialized")
  } else {
    initialized = true
  }
} catch (error) {
  console.error("[FIREBASE] Initialization error:", error.message)
}

// Export auth instance; throw a clear error if not initialized
let auth
try {
  auth = admin.auth()
} catch (e) {
  throw new Error(
    "Firebase Admin not initialized. Check your .env and ensure initialization succeeded before using Firebase services."
  )
}

export { auth, admin }