const ctrlWrapper = require('./ctrlWrapper');
const auth = require('./auth');
const { newPetValidation } = require('./newPetValidation');
const uploadCloud = require('./uploadMiddleware');
const authMiddleware = require('./authMiddleware');
const tokenValidation = require('./tokenValidation');

module.exports = {
  ctrlWrapper,
  auth,
  newPetValidation,
  uploadCloud,
  authMiddleware,
  tokenValidation,
};
