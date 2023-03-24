const Users = require('../../models/users');
const {
  userMainField,
  userFieldRecivedFromFront,
  dataFilter,
} = require('../../helpers');

const update = async (req, res, next) => {
  // const { user } = req;
  const newData = dataFilter(req.body, userFieldRecivedFromFront);
  const resUpdate = await Users.findByIdAndUpdate(req.user._id, newData, {
    new: true,
  });
  const newResponse = dataFilter(resUpdate, userMainField);

  res
    .status(200)
    .json({ code: 200, message: 'Successful operation', data: newResponse });
};

module.exports = update;
