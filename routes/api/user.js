const express = require('express');
const { user: ctrl } = require('../../controllers');
const {
  ctrlWrapper,
  authMiddleware,
  validation,
  uploadCloud,
} = require('../../middleWares');
const { userUpdateValidationSchema } = require('../../models');

const router = express.Router();

router.get('/', ctrlWrapper(authMiddleware), ctrlWrapper(ctrl.get));
router.patch(
  '/',
  ctrlWrapper(authMiddleware),
  uploadCloud.single('avatar'),
  validation(userUpdateValidationSchema),
  ctrlWrapper(ctrl.update)
);

module.exports = routerUser = router;
