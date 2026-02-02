const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  player: { type: String, required: true },
  clicks: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Score', scoreSchema, 'puntuaciones');
