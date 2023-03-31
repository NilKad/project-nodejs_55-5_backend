const { Users } = require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  dataFilter,
  userFullField,
  userFieldRecivedFromFront,
  requiredSignUpFields,
  checkObjByList,
  ValidationError,
  DuplicateEmailError,
} = require('../../helpers');

const { SECRET_KEY } = process.env;

const signup = async (req, res, next) => {
  const isValidInData = checkObjByList(req.body, requiredSignUpFields);
  if (!isValidInData) {
    throw new ValidationError('Bad request, invalid data');
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
    throw new DuplicateEmailError(
      `Email: ${userDataCreate.email} alredy register`
    );
  }
  // userDataCreate.authToken = authToken;

  const user = await Users.create(userDataCreate);

  // console.log()
  const payload = { id: user._id };
  const authToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '14d' });
  const result = await Users.findByIdAndUpdate(
    user._id,
    { authToken },
    { new: true }
  );

  const newUser = dataFilter(result, userFullField);

  res
    .status(201)
    .json({ code: '201', message: 'user create', data: newUser })
    .redirect('/login');
};

module.exports = signup;
