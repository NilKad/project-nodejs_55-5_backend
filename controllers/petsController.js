const { addUserPet, removeUserPet } = require('../services');

const addUserPetController = async (req, res, next) => {
  const owner = req.user._id;
  const petData = req.body;

  const data = !!req.file
    ? { ...petData, owner, imageUrl: req.file.path }
    : { ...petData, owner };

  const newPet = await addUserPet(data);
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
