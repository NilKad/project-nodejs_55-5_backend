const { NodeError } = require('./errors');

const errorHandler = (error, req, res, next) => {
  errEvent = { code: error.status, message: error.message };
  if (error.data) errEvent.data = error.data;

  if (error instanceof NodeError) {
    return res.status(errEvent.code).json(errEvent);
  }

  res.status(500).json(errEvent);
};

module.exports = { errorHandler };
