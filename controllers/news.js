const { ValidationError, constructorResponse } = require('../helpers');
const { News } = require('../models');

const news = async (req, res, next) => {
  const isPagination = req.query.page;
  const {
    search = null,
    page = 1,
    perPage = isPagination ? 20 : 5000,
  } = req.query;
  const limit = perPage * 1;
  const skip = perPage * (page - 1);

  try {
    // const total = await News.find().count();
    const total = search
      ? await News.find({ title: { $regex: search, $options: 'i' } }).count()
      : await News.find().count();
    const constructorData = {
      pagination: isPagination,
      total,
      perPage,
      // data: news,
      page,
    };
    if (search) {
      console.log('search: ', search);
      const news = await News.find({
        title: { $regex: search, $options: 'i' },
      })
        .limit(limit)
        .skip(skip)
        .sort({ date: -1 });
      if (isPagination) {
        return res.status(200).json(constructorResponse(constructorData, news));
      }
      return res.status(200).json(news);
    }
    console.log('limit: ', limit, '\tskip: ', skip);
    const news = await News.find().limit(limit).skip(skip).sort({ date: -1 });
    console.log('total', total);
    // console.log('news: ', news);
    // const constructorData = {
    //   pagination: isPagination,
    //   total,
    //   perPage,
    //   // data: news,
    //   page,
    // };
    res.status(200).json(constructorResponse(constructorData, news));
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = news;
