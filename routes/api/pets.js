const express = require('express');
const {
  addUserPetController,
  removeUserPetController,
} = require('../../controlers');
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
  uploadCloud.single('image'),
  newPetValidation,
  ctrlWrapper(addUserPetController)
);
router.delete('/:petID', auth, ctrlWrapper(removeUserPetController));

module.exports = router;
