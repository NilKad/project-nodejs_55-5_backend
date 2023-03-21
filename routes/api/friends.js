const express = require('express');
const { friends } = require('../../controllers');
const ctrlWrapper = require('../../middleWares/ctrlWrapper');

const router = express.Router();

router.get('/', ctrlWrapper(friends));

module.exports = routerFriends = router;
