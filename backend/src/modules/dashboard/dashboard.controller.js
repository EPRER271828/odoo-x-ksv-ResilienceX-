const dashboardService = require('./dashboard.service');

const getDashboardOverview = async (req, res, next) => {
  try {
    const dashboardData =
      await dashboardService.getDashboardOverview();

    return res.status(200).json(dashboardData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardOverview,
};