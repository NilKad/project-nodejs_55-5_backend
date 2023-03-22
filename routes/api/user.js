const express = require('express');
const { user: ctrl } = require('../../controllers');
const { ctrlWrapper, authMiddleware } = require('../../middleWares');

const router = express.Router();

router.get('/', ctrlWrapper(authMiddleware), ctrlWrapper(ctrl.get));
router.post('/', ctrlWrapper(authMiddleware), ctrlWrapper(ctrl.update));

module.exports = routerUser = router;
