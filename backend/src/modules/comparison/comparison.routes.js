const express =
  require("express");

const {
  getComparison,
  selectVendor,
} = require(
  "./comparison.controller"
);

const router =
  express.Router();

router.get(
  "/:rfqId",
  getComparison
);

router.post(
  "/select",
  selectVendor
);

module.exports =
  router;