const Joi = require('joi');
// const { string } = require('joi');
const mongoose = require('mongoose');
require('mongoose-type-email');
require('mongoose-type-url');

const userValidationSchema = Joi.object({
  userName: Joi.string().min(3).max(32).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(7).max(32).required(),
  location: Joi.string().required(),
  phone: Joi.string().length(13).required(),
  birtday: Joi.date(),
  avatar: Joi.string().uri(),
});

const userUpdateValidationSchema = Joi.object({
  userName: Joi.string().min(3).max(32),
  email: Joi.string().email(),
  password: Joi.string().min(7).max(32),
  location: Joi.string(),
  phone: Joi.string().length(13),
  birthday: Joi.date(),
  avatar: Joi.string().uri(),
});
const UsersSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, 'Set user name'],
    },
    email: {
      type: mongoose.SchemaTypes.Email,
      required: [true, 'Set email user'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Set pasword'],
    },
    location: {
      type: String,
      required: [true, 'Set comments for pet'],
    },
    phone: {
      type: String,
      required: [true, 'Set phone Number'],
    },
    birthday: {
      type: Date,
      // required: [false, 'Set birthday user'],
    },
    avatar: {
      type: mongoose.SchemaTypes.Url,
      default: '',
    },
    isActivate: {
      type: Boolean,
      default: false,
    },
    authToken: {
      type: String,
      default: '',
    },
    refreshToken: {
      type: String,
      default: '',
    },
    // birthday: {
    //   type: mongoose.SchemaTypes.ObjectId,
    //   ref: 'users',
    // },
    favorites: { type: Array, default: [] },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Users = mongoose.model('users', UsersSchema);

module.exports = { Users, userValidationSchema, userUpdateValidationSchema };
