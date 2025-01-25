const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  steamId: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  avatar: { type: String },
});

module.exports = mongoose.model('User', UserSchema);
