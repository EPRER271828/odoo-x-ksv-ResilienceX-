const express = require("express");

const router = express.Router();

const {
  getVendors,
  createVendor,
} = require("./vendor.controller");

router.get("/", getVendors);

router.post("/", createVendor);

module.exports = router;