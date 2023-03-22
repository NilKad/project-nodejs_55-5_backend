const Pet = require('../../models/petModel');
const { userFieldEnabledReturnList, dataFilter } = require('../../helpers');
const { getUserPets } = require('../../services');

const get = async (req, res, next) => {
  //
  const { user } = req;
  const newUser = dataFilter(user, userFieldEnabledReturnList);
  const pets = await Pet.find({ owner: user._id });
  res.status(200).json({
    code: 200,
    message: 'Successful operation',
    data: { newUser, pets },
  });
};
module.exports = get;
