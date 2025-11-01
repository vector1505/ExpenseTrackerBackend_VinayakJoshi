import Expense from "../models/Expense.js"

const getMonthlyReport = async (req, res) => {
  try {
    const { month, year } = req.query

    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 0, 23, 59, 59)

    const expenses = await Expense.find({
      userId: req.userId,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    })

    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0)

    const categories = {}
    expenses.forEach((exp) => {
      if (!categories[exp.category]) {
        categories[exp.category] = 0
      }
      categories[exp.category] += exp.amount
    })

    res.status(200).json({
      success: true,
      month,
      year,
      total,
      categories,
      expenseCount: expenses.length,
      expenses,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const getCategoryReport = async (req, res) => {
  try {
    const { category, sortBy = "-date" } = req.query

    const expenses = await Expense.find({
      userId: req.userId,
      category,
    }).sort(sortBy) 
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0)

    res.status(200).json({
      success: true,
      category,
      total,
      count: expenses.length,
      data: expenses,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export { getMonthlyReport, getCategoryReport }