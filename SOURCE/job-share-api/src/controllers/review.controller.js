const ReviewService = require("../services/review.service.js");

const ReviewController = {};

ReviewController.create = async (req, res) => {
  return await ReviewService.create({
    user_id: req.auth.user_id,
    company_id: req.body.company_id,
    rating: req.body.rating,
  });
};

ReviewController.getListReview = async (req, res) => {
  return await ReviewService.getList();
};

module.exports = ReviewController;
