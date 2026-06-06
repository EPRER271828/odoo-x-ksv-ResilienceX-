const express = require("express");

const router = express.Router();

const quotationController = require("./quotation.controller");

const authMiddleware = require(
  "../../middleware/auth.middleware"
);

const authorize = require(
  "../../middleware/roleAuthorization.middleware"
);

const { ROLES } = require("../../config/constants");

router.get(
  "/rfq-summary/:rfqId",
  authMiddleware,
  authorize(ROLES.VENDOR),
  quotationController.getRFQSummary
);

router.post(
  "/submit",
  authMiddleware,
  authorize(ROLES.VENDOR),
  quotationController.submitQuotation
);

module.exports = router;