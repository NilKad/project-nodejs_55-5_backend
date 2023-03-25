const { Schema, model } = require('mongoose');

const breedSchema = Schema({
  name: {
    type: String,
    required: true,
  },
});

const Breed = model('breeds', breedSchema);

module.exports = Breed;
