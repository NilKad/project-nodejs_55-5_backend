const { ValidationError } = require('../helpers');

const validation = schema => {
  return (req, res, next) => {
    const dataVaidate = req.query ? req.query : req.body;
    const { error } = schema.validate(dataVaidate);
    if (error) {
      throw new ValidationError(error.message);
    }
    next();
    // return true;
  };
};

module.exports = { validation };
