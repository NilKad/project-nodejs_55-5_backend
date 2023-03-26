const express = require('express');
const { breeds } = require('../../controllers');
const ctrlWrapper = require('../../middleWares/ctrlWrapper');

const router = express.Router();

router.get('/', ctrlWrapper(breeds));

module.exports = routerBreeds = router;
