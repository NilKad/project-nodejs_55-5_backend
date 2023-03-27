const { ValidationError, constructorResponse } = require('../helpers');
const { News } = require('../models');

const news = async (req, res, next) => {
  const { search = null, page = 1, perPage = 20 } = req.query;
  const isPagination = req.query.page;
  const limit = perPage * 1;
  const skip = perPage * (page - 1);

  try {
    const total = await News.find().count();
    if (search) {
      console.log('search: ', search);
      const news = await News.find(
        {
          title: { $regex: search, $options: 'i' },
        },
        params
      ).sort({ date: -1 });
      return res.status(200).json(news);
    }
    const news = await News.find().limit(limit).skip(skip).sort({ date: -1 });
    console.log('total', total);
    const constructorData = {
      pagination: isPagination,
      total,
      perPage,
      data: news,
      page,
    };
    res.status(200).json(await constructorResponse(constructorData));
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = news;
