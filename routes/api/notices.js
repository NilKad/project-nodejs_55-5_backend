const express = require('express');
const { notices } = require('../../controllers');
const {ctrlWrapper, authMiddleware, uploadCloud, tokenValidation} = require('../../middleWares');

const {createNotices, get, getId} = notices;
console.log(createNotices)
const router = express.Router();

router.get('/:category',ctrlWrapper(tokenValidation), ctrlWrapper(get));
router.get('/byid/:id', ctrlWrapper(getId));
router.post('/:category',ctrlWrapper(authMiddleware), uploadCloud.single('imageURL'), ctrlWrapper(createNotices));

module.exports = routerNotices = router;


