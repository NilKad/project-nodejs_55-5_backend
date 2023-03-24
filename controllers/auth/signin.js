const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../../models');
const { requestError, userMainField, dataFilter } = require('../../helpers');
const createError = require('http-errors');

const { SECRET_KEY } = process.env;

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createError(400, 'Bad request (invalid request body)'));
  }
  const user = await Users.findOne({ email });
  if (!user) return next(createError(401, 'Email or password is wrong'));

  // if (!user.isActivate) {
  //   const err = createError(403, `Email ${email} not verified`);
  //   err.data = { user: { email: user.email, verify: user.verify } };
  //   return next(err);
  // }

  const isCorrectPassword = bcrypt.compareSync(password, user.password);
  if (!isCorrectPassword)
    return next(createError(401, 'Email or password is wrong'));

  const payload = { id: user._id };
  const authToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '14d' });

  const result = await Users.findByIdAndUpdate(
    user._id,
    { authToken },
    { new: true }
  );
  // .select(selectUserElement);
  const newResult = dataFilter(result, userMainField);

  res.status(200).json({ code: 200, message: 'ok', data: newResult });
};

module.exports = signin;
