const validation = schema => {
  return (req, res, next) => {
    const dataVaidate = req.query ? req.query : req.body;
    const { error } = schema.validate(dataVaidate);
    if (error) {
      error.status = 400;
      throw error;
    }
    next();
    // return true;
  };
};

module.exports = { validation };
