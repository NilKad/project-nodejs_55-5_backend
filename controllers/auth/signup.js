const { Users } = require('../../models');
const bcrypt = require('bcryptjs');
const {
  dataFilter,
  userMainField,
  userFieldRecivedFromFront,
  requiredSignUpFields,
  checkObjByList,
  ValidationError,
  DuplicateEmailError,
} = require('../../helpers');


const signup = async (req, res, next) => {
  const isValidInData = checkObjByList(req.body, requiredSignUpFields);
  if (!isValidInData) {
    throw new ValidationError('Bad request, invalid data')
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
    throw new DuplicateEmailError(`Email: ${userDataCreate.email} alredy register`)
  }

  const user = await Users.create(userDataCreate);
  const newUser = dataFilter(user, userMainField);

  res.status(201).json({ code: '201', message: 'user create', data: newUser });
};

module.exports = signup;
