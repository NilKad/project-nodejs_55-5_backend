const {Sponsors}  = require("../models");


const sponsors = async (req, res, next) => {
try {
    const sponsors = await Sponsors.find();
    res.status(200).json(sponsors)
} catch (err) {
    const error = new Error(err.message)
    error.status = 400 
    next(error)
}
}

module.exports = sponsors;