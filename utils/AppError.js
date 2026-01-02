class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // Calls the parent Error constructor to set the message
    this.statusCode = statusCode;
    this.isOperational = true;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
