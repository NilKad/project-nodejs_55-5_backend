const news = require('./news');
const friends = require('./friends');
const {
  addUserPetController,
  removeUserPetController,
} = require('./petsController');
const auth = require('./auth');
const user = require('./user');

module.exports = {
  news,
  friends,
  addUserPetController,
  removeUserPetController,
  auth,
  user,
};
