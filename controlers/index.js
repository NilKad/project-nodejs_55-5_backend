const news = require("../controlers/news");
const sponsors = require("../controlers/sponsors");
const {
  addUserPetController,
  removeUserPetController,
} = require('./petsController');

module.exports = {news, sponsors, addUserPetController, removeUserPetController};