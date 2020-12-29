const OverViewController = {};
const OverViewService = require("../services/overview.service");

OverViewController.overViewAdmin = async (req, res) => {
  return await OverViewService.overViewAdmin();
};

OverViewController.overViewRecruitment = async (req, res) => {
  return await OverViewService.overViewRecruitment({
    user_id: req.auth.user_id,
  });
};

OverViewController.sendEmail = async (req, res) => {
  return await OverViewService.sendEmail({ req });
};

OverViewController.getListApply = async (req, res) => {
  return await OverViewService.getListApply({ req });
};
module.exports = OverViewController;
