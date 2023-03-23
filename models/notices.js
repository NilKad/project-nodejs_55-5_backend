const { Schema, model, SchemaTypes } = require('mongoose');

const noticesSchema = new Schema(
  {
    owner: { type: SchemaTypes.ObjectId, ref: 'users' },
    category: {
      type: String,
      enum: ['sell', 'lost-found', 'for-free'],
      required: [true, 'Category is required'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    birthday: {
      type: Date,
    },
    breed: {
      type: String,
      required: [true, 'Breed is required'],
    },
    sex: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    price: {
      type: Number,
    },
    currency: {
      type: String,
    },
    comments: {
      type: String,
      required: [true, 'Comments is required'],
    },
    imageUrl: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Notices = model('notices', noticesSchema);

module.exports = Notices;
