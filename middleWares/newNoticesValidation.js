const Joi = require('joi');
const { ValidationError } = require('../helpers/errors');

const createValidation = (req, res, next) => {
    const {body, params} = req
    console.log(body)
    const schema = Joi.object({
        title: Joi.string().min(2).max(48).required(),
        imageUrl: Joi.string(),
        name: Joi.string().min(2).max(16).required(),
        birthday: Joi.string(),
        breed: Joi.string().min(2).max(34).required(),
        sex: Joi.string().valid('male', 'female').required(),
        location: Joi.string().required(),
        comments: Joi.string().min(8).max(120).required(),
        price: Joi.number().min(1).messages({
          'number.base': 'The price must be a number',
          'number.min': 'The price must be greater than 0'
        })
      });

    const validationResult = schema.validate(req.body);
    console.log(validationResult)
    if (validationResult.error) {
      return next(
        new ValidationError(validationResult.error.details[0].message)
      );
    }

    next();
}





const validateId = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.required()
  }).min(1);
  const validationResult = schema.validate({ id: req.params });
  if (validationResult.error) {
    return next(
      new ValidationError("Bad request (id incorrect)")
    );
  }
  next();
}


module.exports = {createValidation, validateId};
