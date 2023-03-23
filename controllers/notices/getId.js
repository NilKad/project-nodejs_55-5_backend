const { Notices } = require('../../models');

const getId = async (req, res, next) => {
  const { search, isFavorites, myAdds, findtext } = req.query;
  const id = req.params.id;

  const notices = await Notices.findById({ _id: id }).populate(
    'owner',
    '_id email'
  );

  res.status(200).json(notices);
};

module.exports = getId;
