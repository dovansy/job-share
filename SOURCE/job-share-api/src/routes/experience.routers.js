var express = require("express");
var router = express.Router();
const response = require("../common/response");
const { wrapHandlerWithJSONResponse } = response;
const { validation, authenticated } = require("../middlewares/index.js");
const ExperienceController = require("@controllers/experience.controller");

router
  .post(
    "/createExperience",
    authenticated.isAuthenticated(),
    validation.validateParams({
      company: "required|string",
      position: "required|string",
      status: "required|integer",
      start_time: "required|date",
      end_time: "date",
      description: "string",
      url: "string"
    }),
    wrapHandlerWithJSONResponse(ExperienceController.create)
  )
  .put(
    "/updateExperience",
    authenticated.isAuthenticated(),
    validation.validateParams({
      experience_id: "required|integer|exist:Experience,id,required",
      company: "required|string",
      position: "required|string",
      status: "required|integer",
      start_time: "required|date",
      end_time: "date",
      description: "string",
    }),
    wrapHandlerWithJSONResponse(ExperienceController.update)
  )
  .post(
    "/deleteExperience",
    authenticated.isAuthenticated(),
    validation.validateParams({
      experience_id: "required|integer|exist:Experience,id,required",
    }),
    wrapHandlerWithJSONResponse(ExperienceController.deleteExperience)
  )
  .get(
    "/getListExperience",
    authenticated.isAuthenticated(),
    wrapHandlerWithJSONResponse(ExperienceController.getListExperience)
  )
  .get(
    '/getExperienceInfo',
    authenticated.isAuthenticated(),
    validation.validateParams({
      experience_id: "required|integer|exist:Experience,id,required",
    }),
    wrapHandlerWithJSONResponse(ExperienceController.getExperienceInfo)
  )
module.exports = router;
