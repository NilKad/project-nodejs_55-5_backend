const news = require('./news');
const friends = require('./friends');
const breeds = require('./breeds');
const {
  addUserPetController,
  removeUserPetController,
} = require('./petsController');
const auth = require('./auth');
const user = require('./user');
const notices = require('./notices')

module.exports = {
  breeds,
  news,
  friends,
  addUserPetController,
  removeUserPetController,
  auth,
  user,
  notices,
};
