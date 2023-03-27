const { Notices } = require('../../models');
const { ValidationError, constructorResponse } = require('../../helpers');

const get = async (req, res, next) => {
  const isPagination = req.query.page;
  const {
    search,
    isFavorites,
    myAdds,
    findtext,
    page = 1,
    perPage = isPagination ? 20 : 5000,
  } = req.query;
  const limit = perPage * 1;
  const skip = perPage * (page - 1);

  //   console.log('!!!!!!!!', typeof isFavorites);
  const category = req.params.category;
  const total = await Notices.find().count();
  let notices = [];
  const constructorData = {
    pagination: isPagination,
    total,
    perPage,
    // data: notices,
    page,
  };

  if (req.user) {
    const { _id } = req.user;
    if (isFavorites === 'true' && myAdds === 'true') {
      throw new ValidationError(
        'is Favorites and myAdds must not have the same values ​(true)'
      );
    }
    console.log(req.user.favorites[0]);
    if (isFavorites === 'true') {
      if (findtext) {
        console.log(findtext);
        notices = await Notices.find({
          category,
          _id: { $in: req.user.favorites },
          title: { $regex: findtext, $options: 'i' },
        })
          .limit(limit)
          .skip(skip);
        return res
          .status(200)
          .json(constructorResponse(constructorData, notices));
      }
      notices = await Notices.find({
        category,
        _id: { $in: req.user.favorites },
      })
        .limit(limit)
        .skip(skip);
      return res
        .status(200)
        .json(constructorResponse(constructorData, notices));
    }

    if (myAdds === 'true') {
      if (findtext) {
        notices = await Notices.find({
          category,
          owner: _id,
          title: { $regex: findtext, $options: 'i' },
        })
          .limit(limit)
          .skip(skip);
        return res
          .status(200)
          .json(constructorResponse(constructorData, notices));
      }
      notices = await Notices.find({ category, owner: _id })
        .limit(limit)
        .skip(skip);

      return res
        .status(200)
        .json(constructorResponse(constructorData, notices));
    }
  }

  if (findtext) {
    notices = await Notices.find({
      category: category,
      title: { $regex: findtext, $options: 'i' },
    })
      .limit(limit)
      .skip(skip);
    res.status(200).json(constructorResponse(constructorData, notices));
  } else {
    notices = await Notices.find({
      category: { $regex: category, $options: 'i' },
    })
      .limit(limit)
      .skip(skip);
    res.status(200).json(constructorResponse(constructorData, notices));
  }
};

module.exports = get;
