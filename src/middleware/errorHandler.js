const errorHandler = (err, req, res, next) => {
  console.error("Error:", err)

  const statusCode = err.statusCode || 500
  const message = err.message || "Internal server error"

  res.status(statusCode).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV === "development" && { error: err }),
  })
}

export { errorHandler }