const { Schema, model } = require("mongoose");

const sponsorsSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
    },
    addressUrl: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
    },
    address: {
      type: String,
      required: true
    },
    workDays: {
      type: [{
        isOpen: {
          type: Boolean,
          required: true
        },
        from: {
          type: String
        },
        to: {
          type: String
        }
      }],
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String
    }
  });
  
  const Sponsors = model('Sponsors', sponsorsSchema );
  
  module.exports = Sponsors;