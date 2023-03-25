const ctrlWrapper = require('./ctrlWrapper');
const { newPetValidation } = require('./newPetValidation');
const uploadCloud = require('./uploadMiddleware');
const authMiddleware = require('./authMiddleware');
const tokenValidation = require('./tokenValidation');
const newNoticesValidation = require('./newNoticesValidation');
const { validation } = require('./validation');

module.exports = {
  ctrlWrapper,
  newPetValidation,
  uploadCloud,
  authMiddleware,
  tokenValidation,
  newNoticesValidation,
  validation,
};
