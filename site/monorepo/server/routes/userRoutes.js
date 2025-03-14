const express = require("express");
const { getUser, updateUser } = require("../controllers/userController");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/user", ensureAuthenticated, getUser);
router.patch("/user", ensureAuthenticated, updateUser);

module.exports = router;
