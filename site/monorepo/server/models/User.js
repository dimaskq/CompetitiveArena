const mongoose = require("mongoose");

const ServerSchema = new mongoose.Schema({
  solo: { type: Number },
  duo: { type: Number },
  trio: { type: Number },
  squad: { type: Number },
  kills: { type: Number, default: 0 },
  deaths: { type: Number, default: 0 },
  resources: {
    wood: { type: Number, default: 0 },
    stone: { type: Number, default: 0 },
    metal: { type: Number, default: 0 },
    sulfur: { type: Number, default: 0 },
    scrap: { type: Number, default: 0 },
    hqm: { type: Number, default: 0 },
  },
  kd: { type: Number, default: 0 },
});

const UserSchema = new mongoose.Schema({
  steamId: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  avatar: { type: String },
  servers: {
    type: [ServerSchema],
    default: [
      {
        solo: 0,
        pvp: {
          kills: 0,
          deaths: 0,
          kd: 0,
        },
        pve: {
          kills: 0,
          deaths: 0,
          kd: 0,
        },
        resources: { wood: 0, stone: 0, metal: 0, sulfur: 0, scrap: 0, hqm: 0 },
      },
      {
        duo: 0,
        pvp: {
          kills: 0,
          deaths: 0,
          kd: 0,
        },
        pve: {
          kills: 0,
          deaths: 0,
          kd: 0,
        },
        resources: { wood: 0, stone: 0, metal: 0, sulfur: 0, scrap: 0, hqm: 0 },
      },
      {
        trio: 0,
        pvp: {
          kills: 0,
          deaths: 0,
          kd: 0,
        },
        pve: {
          kills: 0,
          deaths: 0,
          kd: 0,
        },
        resources: { wood: 0, stone: 0, metal: 0, sulfur: 0, scrap: 0, hqm: 0 },
      },
      {
        squad: 0,
        pvp: {
          kills: 0,
          deaths: 0,
          kd: 0,
        },
        pve: {
          kills: 0,
          deaths: 0,
          kd: 0,
        },
        resources: { wood: 0, stone: 0, metal: 0, sulfur: 0, scrap: 0, hqm: 0 },
      },
    ],
  },
});

module.exports = mongoose.model("User", UserSchema);
