const { Users } = require('../../models');
const {
  userMainField,
  userFieldRecivedFromFront,
  dataFilter,
} = require('../../helpers');

const update = async (req, res, next) => {
  // console.log('userUpdate req.body', req.body);
  // console.log('userUpdate req.query', req.query);
  const newData = dataFilter(req.body, userFieldRecivedFromFront);
  req.file?.path && (newData.avatar = req.file.path);
  // console.log('userUpdate newData', newData);

  const resUpdate = await Users.findByIdAndUpdate(req.user._id, newData, {
    new: true,
  });
  const newResponse = dataFilter(resUpdate, userMainField);
  req.file?.path && (newResponse.avatar = req.file.path);

  res
    .status(200)
    .json({ code: 200, message: 'Successful operation', data: newResponse });
};

module.exports = update;
