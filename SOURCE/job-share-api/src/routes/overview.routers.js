var express = require("express");
var router = express.Router();
const response = require("../common/response");
const { wrapHandlerWithJSONResponse } = response;
const { validation, authenticated } = require("../middlewares/index.js");
const OverViewController = require("@controllers/overview.controller");

router
  .get(
    "/overViewAdmin",
    authenticated.isAuthenticated(),
    wrapHandlerWithJSONResponse(OverViewController.overViewAdmin)
  )
  .get(
    "/overViewRecruitment",
    authenticated.isAuthenticated(),
    wrapHandlerWithJSONResponse(OverViewController.overViewRecruitment)
  )
  .post(
    "/sendEmail",
    authenticated.isAuthenticated(),
    wrapHandlerWithJSONResponse(OverViewController.sendEmail)
  )
  .get(
    "/getListApply",
    authenticated.isAuthenticated(),
    wrapHandlerWithJSONResponse(OverViewController.getListApply)
  );

module.exports = router;
