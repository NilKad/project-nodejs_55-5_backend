const { ValidationError } = require("../helpers");
const {Friends}  = require("../models");


const friends = async (req, res, next) => {
try {
    const friends = await Friends.find({}, { "workDays._id": 0 });
    res.status(200).json(friends)
} catch (err) {
   throw new ValidationError(err.message)
}
}

module.exports = friends