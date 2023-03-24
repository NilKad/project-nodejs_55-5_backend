const { types } = require("joi");
const { News } = require("../models");


const news = async (req, res, next) => {
try {
    if (req.query.search) {
    const search = req.query.search;
    const news = await News.find({ 'title': { $regex: search } });
    return res.status(200).json(news)
    }
    const news = await News.find();
    res.status(200).json(news)
} catch (err) {
    const error = new Error(err.message)
    error.status = 400 
    next(error)
}
}

module.exports = news;