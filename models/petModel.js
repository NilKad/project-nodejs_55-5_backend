const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Set name for pet'],
  },
  date: {
    type: Date,
    required: [true, 'Set date of birth for pet'],
  },
  breed: {
    type: String,
    required: [true, 'Set breed for pet'],
  },
  comments: {
    type: String,
    required: true,
    required: [true, 'Set comments for pet'],
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'users',
  },
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = { Pet };
