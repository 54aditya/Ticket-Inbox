export const sendError = (res, statusCode, message, details = []) => {
  return res.status(statusCode).json({
    error: message,
    details,
  });
};
