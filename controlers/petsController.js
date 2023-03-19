const { addUserPet, removeUserPet } = require('../services');

const addUserPetController = async (req, res, next) => {
  const currUser = req.user._id;

  const newPet = await addUserPet({ ...req.body, owner: currUser });
  res.status(201).json(newPet);
};

const removeUserPetController = async (req, res, next) => {
  const currUser = req.user._id;
  const { petID } = req.params;

  const deletedPet = await removeUserPet(petID, currUser);
  res.json(deletedPet);
};

module.exports = {
  addUserPetController,
  removeUserPetController,
};
