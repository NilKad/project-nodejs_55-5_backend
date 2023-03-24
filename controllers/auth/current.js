const { dataFilter, userMainField } = require('../../helpers');

const current = async (req, res, next) => {
  const { user } = req;
  const newUser = dataFilter(user, userMainField);
  res
    .status(200)
    .json({ code: 200, message: 'Auth OK', data: { user: newUser } });
};

module.exports = current;
