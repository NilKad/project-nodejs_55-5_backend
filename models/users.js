const mongoose = require('mongoose');
// require('mongoose-type-url');

const UsersSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, 'Set user name'],
    },
    email: {
      type: Date,
      required: [true, 'Set email user'],
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
      required: [true, 'Set pasword'],
    },
    birthday: {
      type: Date,
      required: [false, 'Set birthday user'],
    },
    avatar: {
      type: mongoose.SchemaTypes.Url,
      unique: true,
    },
    birthday: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'users',
    },
    favorites: {
      type: array,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Users = mongoose.model('Pet', UsersSchema);

module.exports = Users;
