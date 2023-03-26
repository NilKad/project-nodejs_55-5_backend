const { Breed } = require('../models');

const breeds = async (req, res, next) => {
  const breeds = await Breed.find();
  res.json(breeds);
};

module.exports = breeds;
