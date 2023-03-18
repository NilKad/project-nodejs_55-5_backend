const ctrlWrapper = ctrl => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      // res.status(error.status).json;
      next(error);
    }
  };
};

module.exports = ctrlWrapper;
