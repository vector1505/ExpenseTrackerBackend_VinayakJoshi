import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  // Uid is the unique firebase identifier for each user
  uid: {
    type: String,
    required: true,
    unique: true, 
  },
  
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  
  displayName: String,
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Create and export User model for database operations
export default mongoose.model("User", userSchema)