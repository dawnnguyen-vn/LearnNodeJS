const handleGlobalError = (err, req, res, next) => {
  res.json({
    status: err.status || 500,
    message: err.message || "Internal Server Error",
  });
};

module.exports = handleGlobalError;
