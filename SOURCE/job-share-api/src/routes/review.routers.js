var express = require("express");
var router = express.Router();
const response = require("../common/response");
const { wrapHandlerWithJSONResponse } = response;
const { validation, authenticated } = require("../middlewares/index.js");
const ReviewController = require("@controllers/review.controller");

router
  .post(
    "/createReview",
    authenticated.isAuthenticated(),
    validation.validateParams({
      company_id: "required|integer|exist:Company,id,required",
      rating: "required|integer",
    }),
    wrapHandlerWithJSONResponse(ReviewController.create)
  )
  .get(
    "/getListReview",
    authenticated.isAuthenticated(),
    wrapHandlerWithJSONResponse(ReviewController.getListReview)
  );

module.exports = router;
