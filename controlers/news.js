const { News } = require("../models");


const news = async (req, res, next) => {
try {
    const news = await News.find();
    res.status(200).json(news)
} catch (err) {
    const error = new Error(err.message)
    error.status = 400 
    next(error)
}
}

module.exports = news;