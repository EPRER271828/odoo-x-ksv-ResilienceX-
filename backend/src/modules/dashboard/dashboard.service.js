const getDashboardOverview = async () => {
  return {
    metrics: {
      activeRfqs: 12,
      pendingApprovals: 5,
      monthlyPoValue: '2.3L',
      overdueInvoices: 3,
    },

    recentPurchaseOrders: [
      {
        id: 'PO1',
        vendor: 'Infra',
        amount: 87000,
        status: 'Approved',
      },
      {
        id: 'PO2',
        vendor: 'Tech Core',
        amount: 140000,
        status: 'Pending',
      },
      {
        id: 'PO3',
        vendor: 'OfficeNeed Co',
        amount: 34900,
        status: 'Draft',
      },
    ],

    spendingTrends: {
      labels: ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [
        120000,
        150000,
        110000,
        190000,
        160000,
        230000,
      ],
    },
  };
};

module.exports = {
  getDashboardOverview,
};