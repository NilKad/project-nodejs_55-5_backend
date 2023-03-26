const { ValidationError } = require('../helpers');
const { News } = require('../models');

const news = async (req, res, next) => {
  try {
    if (req.query.search) {
      const search = req.query.search;
      console.log('search: ', search);
      const news = await News.find({
        title: { $regex: search, $options: 'i' },
      }).sort({ date: -1 });
      return res.status(200).json(news);
    }
    const news = await News.find().sort({ date: -1 });
    res.status(200).json(news);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = news;
