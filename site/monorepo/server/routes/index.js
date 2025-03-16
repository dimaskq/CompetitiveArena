const express = require("express");

const saveUsersRouter = require("./saveUsers");
const logoutRouter = require("./logout");
const usersRouter = require("./users");
const userRouter = require("./user");

const router = express.Router();

router.use("/api/save-users", saveUsersRouter);
router.use("/logout", logoutRouter);
router.use("/api/users", usersRouter);
router.use("/api/user", userRouter);

module.exports = router;
