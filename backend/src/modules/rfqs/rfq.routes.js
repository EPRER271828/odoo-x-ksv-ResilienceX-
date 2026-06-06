const express = require("express");

const router = express.Router();

const {
  createRFQ,
} = require("./rfq.controller");

router.post("/", createRFQ);

module.exports = router;