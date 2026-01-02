const error = async function (err, req, res, next) {
  console.error("StackErr:", err.stack);
  err.message = err.message || "Something went wrong";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default error;
