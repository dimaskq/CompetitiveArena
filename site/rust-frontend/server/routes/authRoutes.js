const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
  "/steam",
  passport.authenticate("steam", { failureRedirect: "https://example.com" })
);

router.get(
  "/steam/return",
  passport.authenticate("steam"),
  (req, res) => {
    res.redirect("https://example.com");
  }
);

module.exports = router;
