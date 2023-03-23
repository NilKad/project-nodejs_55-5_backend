const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const createError = require('http-errors');
const { dataFilter, userFieldEnabledReturnList } = require('../helpers');

const { SECRET_KEY } = process.env;

const errorNotAutorized = () => {
  const err = createError(401, 'Not autorized');
  throw err;
};

const tokenValidation = async (req, res, next) => {
  console.log('1')
  if(!req.headers.authorization) {
    next()
    return
  }
  const { authorization = '' } = req.headers;
 
  const [bearer, token] = authorization.split(' ');
  if(bearer !== 'Bearer') {
    next()
    return
  }
 

    if(token) {
    const {id} = jwt.verify(token, SECRET_KEY);
    const user = await Users.findById({ _id: id });
    req.user = user;
    }


  
  next();
};

module.exports = tokenValidation;
