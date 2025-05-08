const mongoose = require("mongoose");

const betaTesterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "betatesters" }
);

module.exports = mongoose.model("BetaTester", betaTesterSchema);
