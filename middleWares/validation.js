const { ValidationError } = require('../helpers');

const validation = schema => {
  return (req, res, next) => {
    console.log('req.query: ', req.body);
    const dataVaidate =
      Object.keys(req.query).length > 0 ? req.query : req.body;
    console.log('dataVaidate: ', dataVaidate);
    const { error } = schema.validate(dataVaidate);
    if (error) {
      throw new ValidationError(error.message);
    }
    next();
    // return true;
  };
};

module.exports = { validation };
