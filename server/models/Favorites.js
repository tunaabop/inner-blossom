const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  quote: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});


module.exports = favoriteSchema;
