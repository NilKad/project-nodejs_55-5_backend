const express = require('express');
const { sponsors } = require('../../controlers');
const ctrlWrapper = require('../../middleWares/ctrlWrapper');

const router = express.Router();

router.get('/', ctrlWrapper(sponsors));

module.exports = routerFriends = router;
