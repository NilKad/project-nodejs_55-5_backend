const { Users } = require('../../models');
const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const {
  dataFilter,
  userMainField,
  userFieldRecivedFromFront,
  requiredSignUpFields,
  checkObjByList,
} = require('../../helpers');


const signup = async (req, res, next) => {
  const isValidInData = checkObjByList(req.body, requiredSignUpFields);
  if (!isValidInData) {
    return next(createError(400, 'Bad request, invalid data'));
  }

  const userDataCreate = dataFilter(req.body, userFieldRecivedFromFront);

  console.log('userDataCreate: ', userDataCreate);
  const hashPassword = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  userDataCreate.password = hashPassword;

  const isFoundUser = await Users.findOne(
    { email: userDataCreate.email },
    'email'
  );
  if (isFoundUser) {
    return res.status(409).json({
      code: '409',
      message: `Email: ${userDataCreate.email} alredy register`,
    });
  }

  const user = await Users.create(userDataCreate);
  const newUser = dataFilter(user, userMainField);

  res.status(201).json({ code: '201', message: 'user create', data: newUser });
};

module.exports = signup;
