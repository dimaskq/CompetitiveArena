const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).send("Logout failed");
    }
    res.redirect("/");
  });
});

module.exports = router;
