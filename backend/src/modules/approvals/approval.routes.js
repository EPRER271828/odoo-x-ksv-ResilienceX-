const express = require(
  "express"
);

const {
  getApproval,
  processAction,
} = require(
  "./approval.controller"
);

const router =
  express.Router();

router.get(
  "/:approvalId",
  getApproval
);

router.patch(
  "/:approvalId/action",
  processAction
);

module.exports = router;