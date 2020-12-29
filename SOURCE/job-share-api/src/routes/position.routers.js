var express = require("express");
var router = express.Router();
const response = require("../common/response");
const { wrapHandlerWithJSONResponse } = response;
const { validation, authenticated } = require("../middlewares/index.js");
const PositionController = require("@controllers/position.controller");

router
  .post(
    "/createPosition",
    validation.validateParams({}),
    wrapHandlerWithJSONResponse(PositionController.createPosition)
  )
  .get(
    "/getListPosition",
    wrapHandlerWithJSONResponse(PositionController.getListPosition)
  );

module.exports = router;
