const ctrlWrapper = require('./ctrlWrapper');
const { newPetValidation } = require('./newPetValidation');
const uploadCloud = require('./uploadMiddleware');
const authMiddleware = require('./authMiddleware');

module.exports = {
  ctrlWrapper,
  newPetValidation,
  uploadCloud,
  authMiddleware,
};
