const Users = require('../../models/users');
const {
  userFieldEnabledReturnList,
  userFieldRecivedFromFront,
  dataFilter,
} = require('../../helpers');

const update = async (req, res, next) => {
  const { user } = req.user;
  const newData = dataFilter(req.body, userFieldRecivedFromFront);

  const resUpdate = await Users.findByIdAndUpdate(user._id, newData);
  const newResponse = dataFilter(resUpdate, userFieldEnabledReturnList);

  res
    .status(200)
    .json({ code: 200, message: 'Successful operation', data: newResponse });
};

module.exports = update;
