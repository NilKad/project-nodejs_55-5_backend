const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const createError = require('http-errors');
const { dataFilter, userFieldEnabledReturnList } = require('../helpers');

const { SECRET_KEY } = process.env;

const errorNotAutorized = () => {
  const err = createError(401, 'Not autorized');
  throw err;
};

// const errorTokenExpired = error => {
//   if (error.message === 'jwt expired') {
//     const err = createError(500, 'Token expired');
//     throw err;
//   }
// };

const authMiddleware = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  // console.log('authorization: ', authorization);

  const [bearer, token] = authorization.split(' ');
  bearer !== 'Bearer' && errorNotAutorized();

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    // console.log('token decoder, id:\t', id);
    const user = await Users.findById({ _id: id });
    // console.log('!!! middleware USER:\n', user);
    // console.log('token1: ', token);
    // console.log('token2: ', user.authToken);
    // console.log('token !== token2  -  ', user.authToken !== token);
    // console.log('!!!-0');
    (!user || user.authToken !== token) && errorNotAutorized();
    const newUser = dataFilter(user, userFieldEnabledReturnList);
    req.user = newUser;
  } catch (error) {
    throw error;
  }
  next();
};

module.exports = authMiddleware;
