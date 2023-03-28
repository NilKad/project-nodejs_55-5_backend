// const Pet = require('../../models/petModel');
const { userMainField, dataFilter } = require('../../helpers');
const { Pet } = require('../../models');

const get = async (req, res, next) => {
  //
  const { user } = req;
  const newUser = dataFilter(user, userMainField);
  const pets =  await Pet.find({ owner: newUser._id });
  // console.log('user id: ', user._id);
  // console.log('pets: ', pets);
  res.status(200).json({
    code: 200,
    message: 'Successful operation',
    // data: { newUser, pets },
    user: newUser,
    pets,
  });
};
module.exports = get;
