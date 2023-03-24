const Users = require('../../models/users');
const bcrypt = require('bcryptjs');
const {
  dataFilter,
  userMainField,
  userFieldRecivedFromFront,
} = require('../../helpers');

const signup = async (req, res, next) => {
  // const {
  //   userName,
  //   email,
  //   password,
  //   location,
  //   phone,
  //   // birthday,
  //   // avatar,
  //   // favorites,
  //   // groupAcces,
  //   // groupsResurces,
  // } = req.body;

  const userDataCreate = dataFilter(req.body, userFieldRecivedFromFront);
  console.log('userDataCreate: ', userDataCreate);
  // console.log('req.body', req.body);
  const hashPassword = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  userDataCreate.password = hashPassword;
  // console.log('hashPassword', hashPassword);
  if (!userName || !email || !password || !location || !phone) {
    return next(createError(400, 'Bad request, invalid data'));
  }
  const isFoundUser = await Users.findOne({ email }, 'email');
  console.log('isFoundUser:\t', isFoundUser);
  if (isFoundUser) {
    return res
      .status(409)
      .json({ code: 409, message: `Email: ${email} alredy register` });
  }
  console.log('userDataCreate:\t', userDataCreate);
  const user = await Users.create(userDataCreate);
  const newUser = dataFilter(user, userMainField);
  res.status(201).json({ code: '201', message: 'user create', data: newUser });
};

module.exports = signup;
