const news = require('./news');
const friends = require('./friends');
const {
  addUserPetController,
  removeUserPetController,
} = require('./petsController');

module.exports = {
  news,
  friends,
  addUserPetController,
  removeUserPetController,
};
