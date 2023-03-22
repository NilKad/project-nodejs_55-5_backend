const Users = require('../../models/users');
const bcrypt = require('bcryptjs');

const signup = async (req, res, next) => {
  const {
    userName,
    email,
    password,
    location,
    phone,
    // birthday,
    // avatar,
    // favorites,
    // groupAcces,
    // groupsResurces,
  } = req.body;

  // console.log('req.body', req.body);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
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

  const user = await Users.create({
    userName,
    email,
    password: hashPassword,
    location,
    phone,
  });
  res.status(201).json({ code: '201', message: 'user create', data: { user } });
};

module.exports = signup;
