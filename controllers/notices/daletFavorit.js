const { Users } = require('../../models/users');

const daletFavorit = async (req, res, next) => {
  const { user, params } = req;

  const ddd = await Users.updateOne(
    { _id: user._id },
    { $pull: { favorites: params.id } }
  );

  console.log(ddd);
  res.status(201).json({ message: 'Success deleted from favorites' });
};

module.exports = daletFavorit;
