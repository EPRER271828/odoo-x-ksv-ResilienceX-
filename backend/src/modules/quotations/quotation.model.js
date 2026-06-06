const mongoose = require("mongoose");

const lineItemBidSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
    },

    qty: {
      type: Number,
      required: true,
    },

    unitPrice: {
      type: Number,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },

    deliveryDays: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const quotationSchema = new mongoose.Schema(
  {
    quotationId: {
      type: String,
      unique: true,
      required: true,
    },

    rfqId: {
      type: String,
      required: true,
    },

    vendorId: {
      type: String,
      required: true,
    },

    lineItemBids: {
      type: [lineItemBidSchema],
      required: true,
    },

    taxRatePercentage: {
      type: Number,
      required: true,
    },

    subtotal: {
      type: Number,
      required: true,
    },

    gstAmount: {
      type: Number,
      required: true,
    },

    grandTotal: {
      type: Number,
      required: true,
    },

    paymentTerms: {
      type: String,
      default: "",
    },

    isDraft: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["Draft", "Submitted"],
      default: "Submitted",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Quotation", quotationSchema);