const jwt = require('jsonwebtoken');
const { Users } = require('../models/users');
const { dataFilter, userMainField, UnauthorizedError } = require('../helpers');

const { SECRET_KEY } = process.env;

// const errorTokenExpired = error => {
//   if (error.message === 'jwt expired') {
//     const err = createError(500, 'Token expired');
//     throw err;
//   }
// };

const authMiddleware = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [authType, token] = authorization.split(' ');

  if (authType !== 'Bearer' || !token) {
    return next(new UnauthorizedError('Not authorized'));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    // console.log('token decoder, id:\t', id);
    const user = await Users.findById({ _id: id });
    // console.log('!!! middleware USER:\n', user);
    // console.log('token1: ', token);
    // console.log('token2: ', user.authToken);
    // console.log('token !== token2  -  ', user.authToken !== token);
    // console.log('!!!-0');
    (!user || user.authToken !== token) &&
      next(new UnauthorizedError('Not authorized'));
    const newUser = dataFilter(user, userMainField);
    req.user = newUser;
  } catch (error) {
    next(new UnauthorizedError('Not authorized'));
  }
  console.log('!!!!!!');
  next();
};

module.exports = authMiddleware;
