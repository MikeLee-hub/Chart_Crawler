const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chartSchema = new Schema({
  artistname: { type: String, required: true },
  songname: { type: String, required: true },
  chartname: { type: String, required: true },
  rank: {type: Number, required: true },
  date: { type: String, required: true },
}, {
  timestamps: true,
});

const Chart = mongoose.model('Charts', chartSchema);

module.exports = Chart;