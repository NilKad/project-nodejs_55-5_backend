const express = require('express');
const { notices } = require('../../controllers');
const {ctrlWrapper, authMiddleware, uploadCloud, tokenValidation, newNoticesValidation} = require('../../middleWares');
const {createValidation, validateId} = newNoticesValidation
const {createNotices, get, getId, addFavorit, daletFavorit, deleteNotices} = notices;

const router = express.Router();

router.get('/:category',ctrlWrapper(tokenValidation), ctrlWrapper(get));
router.get('/byid/:id',validateId, ctrlWrapper(getId));
router.post('/:category', ctrlWrapper(authMiddleware), uploadCloud.single('imageURL'), createValidation, ctrlWrapper(createNotices));
router.post('/favorites/:id',validateId, ctrlWrapper(authMiddleware), ctrlWrapper(addFavorit));
router.delete('/favorites/:id',validateId, ctrlWrapper(authMiddleware), ctrlWrapper(daletFavorit));
router.delete('/:id', ctrlWrapper(authMiddleware), ctrlWrapper(deleteNotices));

module.exports = routerNotices = router;


