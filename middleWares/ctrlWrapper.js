const ctrlWrapper = ctrl => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
      console.log('!!!^^^ ctrlWrapper OK');
    } catch (error) {
      // res.status(error.status).json;
      // console.log('!!!^^^ ctrlWrapper error: ', error);
      next(error);
    }
  };
};

module.exports = ctrlWrapper;
