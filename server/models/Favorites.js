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

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
