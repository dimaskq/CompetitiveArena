const express = require("express");
const path = require("path");
const app = express();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}

module.exports = { ensureAuthenticated };
