const mongoose = require('mongoose');
require('mongoose-type-email');
// require('mongoose-type-url');

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
      required: [false, 'Set birthday user'],
    },
    avatar: {
      type: mongoose.SchemaTypes.Url,
    },
    // birthday: {
    //   type: mongoose.SchemaTypes.ObjectId,
    //   ref: 'users',
    // },
    favorites: {
      type: array,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Users = mongoose.model('users', UsersSchema);

module.exports = Users;
