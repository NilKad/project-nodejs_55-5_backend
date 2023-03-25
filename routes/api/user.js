const express = require('express');
const { user: ctrl } = require('../../controllers');
const {
  ctrlWrapper,
  authMiddleware,
  validation,
} = require('../../middleWares');
const { userValidationSchema } = require('../../models');

const router = express.Router();

router.get('/', ctrlWrapper(authMiddleware), ctrlWrapper(ctrl.get));
router.patch(
  '/',
  ctrlWrapper(authMiddleware),
  validation(userValidationSchema),
  ctrlWrapper(ctrl.update)
);

module.exports = routerUser = router;
