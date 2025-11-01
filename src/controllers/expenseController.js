import Expense from "../models/Expense.js"

const getAllExpenses = async (req, res) => {
  try {
    const { sortBy = "-date", page = 1, limit = 10 } = req.query

    const expenses = await Expense.find({ userId: req.userId })
      .sort(sortBy) 
      .limit(limit * 1)
      .skip((page - 1) * limit)
    const total = await Expense.countDocuments({ userId: req.userId })

    res.status(200).json({
      success: true,
      data: expenses,
      pagination: {
        total,
        page: Number.parseInt(page),
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params

    const expense = await Expense.findById(id)

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      })
    }

    if (expense.userId !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access this expense",
      })
    }

    res.status(200).json({
      success: true,
      data: expense,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


const createExpense = async (req, res) => {
  try {
    const { title, amount, category, date, description } = req.body

    const newExpense = new Expense({
      userId: req.userId,
      title,
      amount,
      category,
      date: new Date(date), 
      description,
    })

    await newExpense.save()

    res.status(201).json({
      success: true,
      message: "Expense added successfully",
      id: newExpense._id,
      data: newExpense,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


const updateExpense = async (req, res) => {
  try {
    const { id } = req.params

    const { title, amount, category, date, description } = req.body

    const expense = await Expense.findById(id)

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      })
    }

    if (expense.userId !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this expense",
      })
    }

    expense.title = title || expense.title
    expense.amount = amount || expense.amount
    expense.category = category || expense.category
    expense.date = date ? new Date(date) : expense.date
    expense.description = description || expense.description
    expense.updatedAt = Date.now() 
    await expense.save()

    res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      data: expense,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params

    const expense = await Expense.findById(id)

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      })
    }

    if (expense.userId !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this expense",
      })
    }

    await Expense.findByIdAndDelete(id)

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export { getAllExpenses, getExpenseById, createExpense, updateExpense, deleteExpense }