const ctrlWrapper = require('./ctrlWrapper');
const auth = require('./auth');
const { newPetValidation } = require('./newPetValidation');
const uploadCloud = require("./uploadMiddleware")

module.exports = { ctrlWrapper, auth, newPetValidation, uploadCloud };
