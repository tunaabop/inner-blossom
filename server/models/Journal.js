const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const journalSchema = new Schema({
  journalText: {
    type: String,
    required: 'leave a journal!',
    minlength: 1,
    maxlength: 280,
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
  // comments: [
  //   {
  //     commentText: {
  //       type: String,
  //       required: true,
  //       minlength: 1,
  //       maxlength: 280,
  //     },
  //     commentAuthor: {
  //       type: String,
  //       required: true,
  //     },
  //     createdAt: {
  //       type: Date,
  //       default: Date.now,
  //       get: (timestamp) => dateFormat(timestamp),
  //     },
  //   },
  // ],
});

const Journal = model('Journal', journalSchema);

module.exports = Journal;
