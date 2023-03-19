const { mongoose } = require('mongoose');
const { Pet } = require('../models');
const { ValidationError, WrongIdError } = require('../helpers/errors');

const getUserPets = async userId => {
  //to be used as a part of response for GET /user
  return await Pet.find({ owner: userId });
};

const removeUserPet = async (petID, ownerId) => {
  const deletedContact = await Pet.findOneAndDelete({
    _id: petID,
    owner: ownerId,
  });
  if (!deletedContact) throw new WrongIdError('petID not found');
  return deletedContact;
};

const addUserPet = async reqBody => {
  const newPet = new Pet(reqBody);

  try {
    const createdPet = await newPet.save();
    return createdPet;
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      throw new ValidationError(error);
    }
    throw new Error(error);
  }
};

module.exports = { getUserPets, addUserPet, removeUserPet };
