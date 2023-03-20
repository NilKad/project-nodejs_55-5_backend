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

const addUserPet = async data => {
  const newPet = new Pet(data);

  try {
    const createdPet = await newPet.save();

    // ˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜To be added as a userService (Push new pet._id to userPets)˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜
    // if (createdPet) {
    //   User.findByIdAndUpdate(createdPet.owner, { $push: { userPets: createdPet._id } })
    //     .then((user) => {
    //       if (user) {
    //         res.status(201).json({ success: true, pet });
    //       }

    return createdPet;
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      throw new ValidationError(error);
    }
    throw new Error(error);
  }
};

module.exports = { getUserPets, addUserPet, removeUserPet };
