const {Users} = require('../../models');

const logout = async (req, res, next) => {
  const { _id } = req.user;
  // console.log('!!logout, user _id:\t', _id);
  await Users.findByIdAndUpdate(_id, { authToken: null });
  res.status(204).send(); //.json({ code: 204, message: 'Logout success' });
};

module.exports = logout;
