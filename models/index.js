const Pet = require('./petModel');
const News = require('./news');
const Friends = require('./friends');
const {
  Users,
  userValidationSchema,
  userUpdateValidationSchema,
} = require('./users');
const Notices = require('./notices');

module.exports = {
  News,
  Friends,
  Pet,
  Users,
  Notices,
  userValidationSchema,
  userUpdateValidationSchema,
};
