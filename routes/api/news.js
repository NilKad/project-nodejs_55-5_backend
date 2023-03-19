const express = require("express");
const news = require("../../controlers/news");
const ctrlWrapper = require("../../middleWares/ctrlWrapper");

const router = express.Router();

router.get("/", ctrlWrapper(news));
// const news = (req, res, next) => {
//   
// };

module.exports = routerNews = router;
