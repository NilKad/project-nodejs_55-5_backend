const jwt = require('jsonwebtoken');
const {Users} = require('../models/users');
const { dataFilter, userMainField, ValidationError } = require('../helpers');

const { SECRET_KEY } = process.env;

const authMiddleware = async (req, res, next) => {
  const { authorization = '' } = req.headers;

  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    return next();
  }
  console.log('!!!!! token validation');
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await Users.findById({ _id: id });

    if (!user || user.authToken !== token) {
      next();
      return;
    }
    const newUser = dataFilter(user, userMainField);
    req.user = newUser;
  } catch (error) {
    log('Error token validation');
    throw new ValidationError(error.message);
  }
  next();
};

module.exports = authMiddleware;
