const { Notices } = require('../../models');
const { WrongIdError } = require('../../helpers');

const getId = async (req, res, next) => {
  const { search, isFavorites, myAdds, findtext } = req.query;
  const id = req.params.id;
  try {
    const notices = await Notices.findById(
      { _id: id },
      { createdAt: 0, updatedAt: 0 }
    )
      .populate({
        path: 'owner',
        select: '-_id email phone',
      })
      .lean();
    notices.email = notices.owner.email;
    notices.phone = notices.owner.phone;
    delete notices.owner;
    res.status(200).json(notices);
  } catch (error) {
    throw new WrongIdError(error.message);
  }
};

module.exports = getId;
