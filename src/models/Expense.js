import mongoose from "mongoose"


const expenseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true, 
  },
  
  title: {
    type: String,
    required: true,
    trim: true, 
  },
  amount: {
    type: Number,
    required: true,
    min: 0, 
  },
  category: {
    type: String,
    required: true,
    enum: ["Food", "Travel", "Entertainment", "Utilities", "Healthcare", "Shopping", "Other"],
  },
  description: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model("Expense", expenseSchema)