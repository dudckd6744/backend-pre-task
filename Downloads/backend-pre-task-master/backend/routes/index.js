const express = require("express");
const router = express.Router();

const profileColumnRoutes = require("./profileColumn/profileColumn.controller");
const userRoutes = require("./user/user.controller");
const careerRoutes = require("./career/career.controller");

router.use("/profile-column", profileColumnRoutes);
router.use("/user", userRoutes);
router.use("/career", careerRoutes);

module.exports = router;
