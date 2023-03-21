const express = require('express');
const {
  addUserPetController,
  removeUserPetController,
} = require('../../controllers');
const {
  auth,
  ctrlWrapper,
  newPetValidation,
  uploadCloud,
} = require('../../middleWares');
const router = express.Router();

router.post(
  '/',
  auth,
  uploadCloud.single('imageURL'),
  newPetValidation,
  ctrlWrapper(addUserPetController)
);
router.delete('/:petID', auth, ctrlWrapper(removeUserPetController));

module.exports = router;
