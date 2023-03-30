const Joi = require('joi');
const { ValidationError } = require('../helpers/errors');

module.exports = {
  newPetValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(2).max(16).required(),
      date: Joi.date().required(),
      breed: Joi.string().min(2).max(30).required(),
      comments: Joi.string().min(8).max(120).required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return next(
        new ValidationError(validationResult.error.details[0].message)
      );
    }

    next();
  },
};
