const express = require('express');
const {
  addUserPetController,
  removeUserPetController,
} = require('../../controllers');
const {
  ctrlWrapper,
  newPetValidation,
  uploadCloud,
  authMiddleware,
} = require('../../middleWares');
const router = express.Router();

router.post(
  '/',
  authMiddleware,
  uploadCloud.single('imageURL'),
  newPetValidation,
  ctrlWrapper(addUserPetController)
);
router.delete('/:petID', authMiddleware, ctrlWrapper(removeUserPetController));

module.exports = router;
