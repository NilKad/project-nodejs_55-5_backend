const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const createError = require('http-errors');
const { dataFilter, userFieldEnabledReturnList } = require('../helpers');

const { SECRET_KEY } = process.env;

const authMiddleware = async (req, res, next) => {
  const { authorization = '' } = req.headers;


  const [bearer, token] = authorization.split(' ');
  if(bearer !== 'Bearer') {
 
    return  next()
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await Users.findById({ _id: id });

    if(!user || user.authToken !== token) {
      next()
      return
    }
    const newUser = dataFilter(user, userFieldEnabledReturnList);
    req.user = newUser;
  } catch (error) {
    throw error;
  }
  next();
};

module.exports = authMiddleware;
