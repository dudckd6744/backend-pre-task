const express = require("express");
const router = express.Router();

const profileColumnRoutes = require("./profileColumn/profileColumn.controller");
const userRoutes = require("./user/user.controller");

router.use("/profile-column", profileColumnRoutes);
router.use("/user", userRoutes);

module.exports = router;
