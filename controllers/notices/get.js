const { Notices } = require('../../models');
const { ValidationError, constructorResponse } = require('../../helpers');

const get = async (req, res, next) => {
  try {
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

    const category = req.params.category;
    let total = await Notices.find({ category }).count();
    let notices = [];
    const constructorData = {
      pagination: isPagination,
      total,
      perPage,
      // data: notices,
      page,
    };

    if (req.user) {
      const { _id, favorites } = req.user;

      if (category === 'favorite') {
        if (findtext) {
          total = await Notices.find({
            _id: { $in: favorites },
            title: { $regex: findtext, $options: 'i' },
          }).count();
          constructorData.total = total;

          notices = await Notices.find({
            _id: { $in: favorites },
            title: { $regex: findtext, $options: 'i' },
          })
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: -1 });
          return res
            .status(200)
            .json(constructorResponse(constructorData, notices));
        }
        total = await Notices.find({ _id: { $in: favorites } }).count();
        constructorData.total = total;
        notices = await Notices.find({ _id: { $in: favorites } })
          .limit(limit)
          .skip(skip)
          .sort({ createdAt: -1 });
        return res
          .status(200)
          .json(constructorResponse(constructorData, notices));
      }
      if (category === 'own') {
        if (findtext) {
          total = await Notices.find({
            owner: _id,
            title: { $regex: findtext, $options: 'i' },
          }).count();
          constructorData.total = total;
          notices = await Notices.find({
            owner: _id,
            title: { $regex: findtext, $options: 'i' },
          })
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: -1 });
          return res
            .status(200)
            .json(constructorResponse(constructorData, notices));
        }

        notices = await Notices.find({ owner: _id })
          .limit(limit)
          .skip(skip)
          .sort({ createdAt: -1 });

        return res
          .status(200)
          .json(constructorResponse(constructorData, notices));
      }
    }
    // if('lost-found' === category || 'for-free' === category ||) {

    // }

    if (findtext) {
      total = await Notices.find({
        category: category,
        title: { $regex: findtext, $options: 'i' },
      }).count();
      constructorData.total = total;
      notices = await Notices.find({
        category: category,
        title: { $regex: findtext, $options: 'i' },
      })
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 });
      if (isPagination) {
        return res
          .status(200)
          .json(constructorResponse(constructorData, notices));
      }
      res.status(200).json(constructorResponse(constructorData, notices));
    } else {
      notices = await Notices.find({
        category: { $regex: category, $options: 'i' },
      })
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 });
      res.status(200).json(constructorResponse(constructorData, notices));
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid search characters' });
  }
  // const isPagination = req.query.page;
  // const {
  //   search,
  //   isFavorites,
  //   myAdds,
  //   findtext,
  //   page = 1,
  //   perPage = isPagination ? 20 : 5000,
  // } = req.query;
  // const limit = perPage * 1;
  // const skip = perPage * (page - 1);

  // //   console.log('!!!!!!!!', typeof isFavorites);
  // const category = req.params.category;
  // const total = await Notices.find().count();
  // let notices = [];
  // const constructorData = {
  //   pagination: isPagination,
  //   total,
  //   perPage,
  //   // data: notices,
  //   page,
  // };

  // if (req.user) {
  //   const { _id } = req.user;
  //   if (isFavorites === 'true' && myAdds === 'true') {
  //     throw new ValidationError(
  //       'is Favorites and myAdds must not have the same values ​(true)'
  //     );
  //   }
  //   console.log(req.user.favorites[0]);
  //   if (isFavorites === 'true') {
  //     if (findtext) {
  //       console.log(findtext);
  //       notices = await Notices.find({
  //         category,
  //         _id: { $in: req.user.favorites },
  //         title: { $regex: findtext, $options: 'i' },
  //       })
  //         .limit(limit)
  //         .skip(skip);
  //       return res
  //         .status(200)
  //         .json(constructorResponse(constructorData, notices));
  //     }
  //     notices = await Notices.find({
  //       category,
  //       _id: { $in: req.user.favorites },
  //     })
  //       .limit(limit)
  //       .skip(skip);
  //     return res
  //       .status(200)
  //       .json(constructorResponse(constructorData, notices));
  //   }

  //   if (myAdds === 'true') {
  //     if (findtext) {
  //       notices = await Notices.find({
  //         category,
  //         owner: _id,
  //         title: { $regex: findtext, $options: 'i' },
  //       })
  //         .limit(limit)
  //         .skip(skip);
  //       return res
  //         .status(200)
  //         .json(constructorResponse(constructorData, notices));
  //     }
  //     notices = await Notices.find({ category, owner: _id })
  //       .limit(limit)
  //       .skip(skip);

  //     return res
  //       .status(200)
  //       .json(constructorResponse(constructorData, notices));
  //   }
  // }

  // if (findtext) {
  //   notices = await Notices.find({
  //     category: category,
  //     title: { $regex: findtext, $options: 'i' },
  //   })
  //     .limit(limit)
  //     .skip(skip);
  //   res.status(200).json(constructorResponse(constructorData, notices));
  // } else {
  //   notices = await Notices.find({
  //     category: { $regex: category, $options: 'i' },
  //   })
  //     .limit(limit)
  //     .skip(skip);
  //   res.status(200).json(constructorResponse(constructorData, notices));
  // }
  // res.status(200).json('1');
};

module.exports = get;
