const mongoose =
  require("mongoose");

const workflowStepSchema =
  new mongoose.Schema(
    {
      step: Number,
      name: String,
      status: String,
      signee: String,
      assignedTo:
        String,
      timestamp:
        String,
    },
    { _id: false }
  );

const approvalSchema =
  new mongoose.Schema(
    {
      approvalId: {
        type: String,
        unique: true,
        required: true,
      },

      rfqId: String,

      quotationId:
        String,

      vendorId: String,

      currentStep: {
        type: Number,
        default: 2,
      },

      status: String,

      comments:
        String,

      workflowSteps:
        [
          workflowStepSchema,
        ],

      poGenerated: {
        type: Boolean,
        default: false,
      },

      poNumber:
        String,

      invoiceGenerated:
        {
          type: Boolean,
          default: false,
        },

      invoiceId:
        String,
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Approval",
    approvalSchema
  );