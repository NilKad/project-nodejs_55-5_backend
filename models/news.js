const { Schema, model } = require('mongoose');

const newsSchema = Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    url: {
      type: String,
      required: [true, 'Url is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const News = model('news', newsSchema);

module.exports = News;
