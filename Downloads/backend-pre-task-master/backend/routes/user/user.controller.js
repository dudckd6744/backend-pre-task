const express = require("express");
const router = express.Router();

const asyncWrapper = require("../../context/asyncWrapper");
const userService = require("./user.service");

router.post(
  "/",
  asyncWrapper(async (req, res) => {
    const payload = req.body;

    await userService.createUser(payload);

    res.json({ success: true });
  })
);

router.get(
  "/",
  asyncWrapper(async (req, res) => {
    const payload = req.query;
    const result = await userService.findAllUser(payload);

    res.json({ ...result });
  })
);

module.exports = router;
