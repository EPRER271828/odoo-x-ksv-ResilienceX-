const Approval = require(
  "../modules/approvals/approval.model"
);

const generateApprovalId =
  async () => {
    const count =
      await Approval.countDocuments();

    return `APP-${new Date().getFullYear()}-${String(
      count + 1
    ).padStart(4, "0")}`;
  };

module.exports =
  generateApprovalId;