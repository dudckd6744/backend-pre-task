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

router.get(
  "/:id",
  asyncWrapper(async (req, res) => {
    const userId = req.params.id;

    const result = await userService.findOneUser(userId);

    res.json({ result });
  })
);

router.put(
  "/:id",
  asyncWrapper(async (req, res) => {
    const userId = req.params.id;
    const payload = req.body;

    const result = await userService.updateUser(userId, payload);

    res.json({ success: true });
  })
);

router.delete(
  "/:id",
  asyncWrapper(async (req, res) => {
    const userId = req.params.id;

    const result = await userService.deleteUser(userId);

    res.json({ success: true });
  })
);

module.exports = router;
