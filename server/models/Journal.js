const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const journalSchema = new Schema({
  journalText: {
    type: String,
    required: 'leave a note',
    minlength: 1,
    maxlength: 2800,
    trim: true,
  },
  journalAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Journal = model('Journal', journalSchema);

module.exports = Journal;
