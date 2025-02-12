const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  steamId: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  avatar: { type: String },
  wood: { type: Number, default: 0 },
  stone: { type: Number, default: 0 },
  methal: { type: Number, default: 0 },
  sulfur: { type: Number, default: 0 },
  scrap: { type: Number, default: 0 },
  hqm: { type: Number, default: 0 },
  kd: { type: Number, default: 0 },
  kill: { type: Number, default: 0 },
  death: { type: Number, default: 0 },
  solo: { type: Number, default: 0 },
  duo: { type: Number, default: 0 },
  squad: { type: Number, default: 0 },
  trio: { type: Number, default: 0 },

});

module.exports = mongoose.model('User', UserSchema);