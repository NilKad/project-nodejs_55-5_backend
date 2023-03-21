const express = require('express');
const { news } = require('../../controllers');
const ctrlWrapper = require('../../middleWares/ctrlWrapper');

const router = express.Router();

router.get('/', ctrlWrapper(news));

module.exports = routerNews = router;
