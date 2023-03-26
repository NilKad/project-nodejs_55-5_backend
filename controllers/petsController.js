const { mongoose } = require('mongoose');
const { Pet } = require('../models');
const { WrongIdError, ValidationError } = require('../helpers');

const addUserPetController = async (req, res, next) => {
  const owner = req.user._id;
  const petData = req.body;

  const data = !!req.file
    ? { ...petData, owner, imageUrl: req.file.path }
    : { ...petData, owner };

  const newPet = new Pet(data);

  try {
    await newPet.save();
    res.status(201).json(newPet);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      throw new ValidationError(error);
    }
    throw new Error(error);
  }
};

const removeUserPetController = async (req, res, next) => {
  const currUser = req.user._id;
  const { petID } = req.params;

  const deletedPet = await Pet.findOneAndDelete({
    _id: petID,
    owner: currUser,
  });
  if (!deletedPet) throw new WrongIdError('petID not found');

  res.json(deletedPet);
};

module.exports = {
  addUserPetController,
  removeUserPetController,
};
