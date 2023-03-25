const express = require('express');
const { auth: ctrl } = require('../../controllers');
const { ctrlWrapper, authMiddleware } = require('../../middleWares');
const { validation } = require('../../middleWares');
const { userValidationSchema } = require('../../models');

// const { auth: ctrl } = require('../../controllers');
// const { verification } = require('../../controllers/users');

const router = express.Router();

router.post(
  '/signin',
  // validation(userValidationSchema),
  ctrlWrapper(ctrl.signin)
);
router.post(
  '/signup',
  validation(userValidationSchema),
  ctrlWrapper(ctrl.signup)
);

router.post('/logout', ctrlWrapper(authMiddleware), ctrlWrapper(ctrl.logout));
router.post('/', ctrlWrapper(authMiddleware), ctrlWrapper(ctrl.current)); //get user from token (authautorisation)
//get user user information (user profile and pets)
// router.get('/', ctrlWrapper(authMiddleware), ctrlWrapper(ctrl.getProfile));

// router.post('/reset/', ctrlWrapper(ctrl.updatePassword));
// router.post('/reset/:verificationToken', ctrlWrapper(ctrl.updatePassword));
// router.get('/reset', ctrlWrapper(ctrl.resetPassword));

//* verification email
// router.post('/verification', ctrlWrapper(ctrl.reVerification));
// router.get('/preVerification/:verificationToken', ctrl.preVerification);
// router.patch('/verification/:verificationToken', ctrl.verification);

module.exports = routerAuth = router;
