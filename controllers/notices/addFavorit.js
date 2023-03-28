const { Users } = require('../../models/users');

const addFavorit = async (req, res, next) => {
  const { user, params } = req;
  console.log('ctrl addfavorites param: ', params);
  console.log('ctrl addfavorites user._id: ', user._id);
  const ddd = await Users.updateOne(
    { _id: user._id },
    { $addToSet: { favorites: params.id } }
  );
  // const ddd = await Users.findById(
  //   { _id: user._id },
  //   { $addToSet: { favorites: params.id } }
  // );
  res.status(201).json({ message: 'Success added to favorites' });
};

module.exports = addFavorit;
