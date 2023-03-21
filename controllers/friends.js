const { Sponsors } = require('../models');

const friends = async (req, res, next) => {
  try {
    const friends = await Sponsors.find();
    res.status(200).json(friends);
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    next(error);
  }
};

module.exports = friends;
