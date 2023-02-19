const express = require("express");
const router = express.Router();

const asyncWrapper = require("../../context/asyncWrapper");
const careerService = require("./career.service");

router.post(
  "/",
  asyncWrapper(async (req, res) => {
    const payload = req.body;

    await careerService.createCareer(payload);

    res.json({
      success: true,
    });
  })
);

router.put(
  "/:id",
  asyncWrapper(async (req, res) => {
    const id = req.params.id;
    const payload = req.body;

    await careerService.updateCareer(id, payload);

    res.json({
      success: true,
    });
  })
);

module.exports = router;
