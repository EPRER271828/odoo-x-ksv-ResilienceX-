const mongoose = require("mongoose");

const lineItemSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
      trim: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const rfqSchema = new mongoose.Schema(
  {
    rfqId: {
      type: String,
      unique: true,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    deadline: {
      type: Date,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    lineItems: {
      type: [lineItemSchema],
      required: true,
    },

    assignedVendors: [
      {
        type: String,
      },
    ],

    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Published",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RFQ", rfqSchema);