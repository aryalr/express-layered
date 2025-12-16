const errorHandler = (err, req, res, next) => {
   console.error(`Error Log: ${err.stack}`)

   let statusCode = err.status || 500
   let message = err.message || "Internal server error"

   if (err.code === "P2025") {
      statusCode = 400
      message = "Produk tidak ditemukan"
   }

   if (err.name === "Validation Error") {
      statusCode = 400
   }

   res.status(statusCode).json({
      success: false,
      message: message,
   })
}