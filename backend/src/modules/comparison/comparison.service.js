const RFQ = require(
  "../rfqs/rfq.model"
);

const Quotation = require(
  "../quotations/quotation.model"
);

const Vendor = require(
  "../vendors/vendor.model"
);

const Approval = require(
  "../approvals/approval.model"
);

const ApiError = require(
  "../../utils/ApiError"
);

const generateApprovalId =
  require(
    "../../utils/generateApprovalId"
  );

const getComparison =
  async (rfqId) => {
    const rfq =
      await RFQ.findOne({
        rfqId,
      });

    if (!rfq) {
      throw new ApiError(
        404,
        "RFQ not found"
      );
    }

    const quotations =
      await Quotation.find({
        rfqId,
        status:
          "Submitted",
      });

    if (
      quotations.length === 0
    ) {
      throw new ApiError(
        404,
        "No quotations found"
      );
    }

    const vendors =
      await Vendor.find({
        vendorId: {
          $in: quotations.map(
            (q) =>
              q.vendorId
          ),
        },
      });

    const vendorMap = {};

    vendors.forEach(
      (vendor) => {
        vendorMap[
          vendor.vendorId
        ] = vendor.name
          .replace(
            /\s+/g,
            ""
          )
          .replace(
            /[^\w]/g,
            ""
          );
      }
    );

    const grandTotalRow =
      {
        criteria:
          "Grand Total",
      };

    const gstRow = {
      criteria:
        "GST %",
    };

    const deliveryRow = {
      criteria:
        "Delivery (days)",
    };

    const ratingRow = {
      criteria:
        "Vendor rating",
    };

    const paymentRow = {
      criteria:
        "Payment terms",
    };

    let lowestPrice =
      Infinity;

    let lowestVendor =
      null;

    let fastestDays =
      Infinity;

    let fastestVendor =
      null;

    quotations.forEach(
      (quotation) => {
        const vendorName =
          vendorMap[
            quotation
              .vendorId
          ];

        grandTotalRow[
          vendorName
        ] =
          quotation.grandTotal;

        gstRow[vendorName] =
          quotation.taxRatePercentage;

        const delivery =
          Math.min(
            ...quotation.lineItemBids.map(
              (item) =>
                item.deliveryDays
            )
          );

        deliveryRow[
          vendorName
        ] = delivery;

        ratingRow[
          vendorName
        ] = "N/A";

        paymentRow[
          vendorName
        ] =
          quotation.paymentTerms;

        if (
          quotation.grandTotal <
          lowestPrice
        ) {
          lowestPrice =
            quotation.grandTotal;

          lowestVendor =
            vendorName;
        }

        if (
          delivery <
          fastestDays
        ) {
          fastestDays =
            delivery;

          fastestVendor =
            vendorName;
        }
      }
    );

    grandTotalRow.isLowest =
      lowestVendor;

    gstRow.isLowest = null;

    deliveryRow.isLowest =
      fastestVendor;

    ratingRow.isLowest =
      null;

    paymentRow.isLowest =
      null;

    return {
      rfqId: rfq.rfqId,

      title:
        rfq.title.toLowerCase(),

      bidsCount:
        quotations.length,

      comparisonMatrix: [
        grandTotalRow,
        gstRow,
        deliveryRow,
        ratingRow,
        paymentRow,
      ],
    };
  };

const selectVendor =
  async (payload) => {
    const quotation =
      await Quotation.findOne(
        {
          quotationId:
            payload.selectedQuotationId,
        }
      );

    if (!quotation) {
      throw new ApiError(
        404,
        "Quotation not found"
      );
    }

    const approval =
      await Approval.create(
        {
          approvalId:
            await generateApprovalId(),

          rfqId:
            payload.rfqId,

          quotationId:
            payload.selectedQuotationId,

          vendorId:
            payload.selectedVendorId,

          currentStep: 2,

          status:
            "L1 Review",

          workflowSteps:
            [
              {
                step: 1,
                name:
                  "Submitted",
                status:
                  "completed",
                timestamp:
                  new Date().toLocaleString(),
              },
              {
                step: 2,
                name:
                  "L1 Review",
                status:
                  "pending",
                assignedTo:
                  "Manager / Approver",
                timestamp:
                  new Date().toLocaleString(),
              },
              {
                step: 3,
                name:
                  "L2 Approval",
                status:
                  "queued",
              },
              {
                step: 4,
                name:
                  "Generate PO",
                status:
                  "queued",
              },
            ],
        }
      );

    return {
      success: true,

      approvalId:
        approval.approvalId,

      nextRequiredRole:
        "Manager / Approver",

      status:
        "L1 Review",
    };
  };

module.exports = {
  getComparison,
  selectVendor,
};