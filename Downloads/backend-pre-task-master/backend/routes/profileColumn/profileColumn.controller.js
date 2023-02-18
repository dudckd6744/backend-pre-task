const express = require("express");
const router = express.Router();

const asyncWrapper = require("../../context/asyncWrapper");
const { profile_column: ProfileColumn } = require("../../models");

router.get(
  "/",
  asyncWrapper(async (req, res) => {
    const list = await ProfileColumn.findAll();

    res.json({
      list,
    });
  })
);

module.exports = router;
