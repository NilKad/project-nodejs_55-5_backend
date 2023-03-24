const { Notices } = require('../../models');
const createError = require('http-errors');

const get = async (req, res, next) => {
  const { search, isFavorites, myAdds, findtext } = req.query;
  //   console.log('!!!!!!!!', typeof isFavorites);
  const category = req.params.category;

  if (req.user) {
    const { _id } = req.user;
    if (isFavorites === 'true' && myAdds === 'true') {
      const err = 
      createError(400, 'is Favorites and myAdds must not have the same values ​(true)');
      throw err;
    }
    console.log(req.user.favorites[0]);
    if (isFavorites === 'true') {
      if (findtext) {
        console.log(findtext);
        const result = await Notices.find({
          category,
          _id: { $in: req.user.favorites },
          title: { $regex: findtext, $options: 'i' },
        });
        return res.status(200).json(result);
      }
      const result = await Notices.find({
        category,
        _id: { $in: req.user.favorites },
      });
      return res.status(200).json(result);
    }

    if (myAdds === 'true') {
      if (findtext) {
        const result = await Notices.find({
          category,
          owner: _id,
          title: { $regex: findtext, $options: 'i' },
        });
        return res.status(200).json(result);
      }
      const result = await Notices.find({ category, owner: _id });
      return res.status(200).json(result);
    }
  }

  if (findtext) {
    const notices = await Notices.find({
      category: category,
      title: { $regex: findtext, $options: 'i' },
    });
    res.status(200).json(notices);
  } else {
    const notices = await Notices.find({
      category: { $regex: category, $options: 'i' },
    });
    res.status(200).json(notices);
  }
};

module.exports = get;
