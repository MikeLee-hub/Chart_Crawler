const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const artistSchema = new Schema({
  artistname: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1
  },
  updated: { type: Date },
  debut: { type: Date, required: true }
}, {
  timestamps: false,
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;