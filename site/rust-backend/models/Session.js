const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, 
  user_id: {
    type: String,
    required: true,
    default: "guest",
  },
  jwt: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Session", SessionSchema);
