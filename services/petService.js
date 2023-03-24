const { mongoose } = require('mongoose');
const { Pet } = require('../models');
const { ValidationError, WrongIdError } = require('../helpers/errors');

const getUserPets = async userId => {
  return await Pet.find({ owner: userId });
};

const removeUserPet = async (petID, ownerId) => {
  const deletedPet = await Pet.findOneAndDelete({
    _id: petID,
    owner: ownerId,
  });
  if (!deletedPet) throw new WrongIdError('petID not found');
  return deletedPet;
};

const addUserPet = async data => {
  const newPet = new Pet(data);

  try {
    await newPet.save();
    return newPet;
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      throw new ValidationError(error);
    }
    throw new Error(error);
  }
};

module.exports = { getUserPets, addUserPet, removeUserPet };
