var express = require("express");
var router = express.Router();
const response = require("../common/response");
const { wrapHandlerWithJSONResponse } = response;
const { validation, authenticated } = require("../middlewares/index.js");
const SkillController = require("@controllers/skill.controller");

router
  .post(
    "/createSkill",
    authenticated.isAuthenticated(),
    validation.validateParams({
      skill_type: "required|string",
      rating: "required|integer",
      description: "string",
    }),
    wrapHandlerWithJSONResponse(SkillController.create)
  )
  .put(
    "/updateSkill",
    authenticated.isAuthenticated(),
    validation.validateParams({
      skill_id: "required|integer|exist:Skill,id,required",
      skill_type: "required|string",
      rating: "required|integer",
      description: "string",
    }),
    wrapHandlerWithJSONResponse(SkillController.update)
  )
  .post(
    "/deleteSkill",
    authenticated.isAuthenticated(),
    validation.validateParams({
      skill_id: "required|integer|exist:Skill,id,required",
    }),
    wrapHandlerWithJSONResponse(SkillController.deleteSkill)
  )
  .get(
    "/getListSkill",
    authenticated.isAuthenticated(),
    wrapHandlerWithJSONResponse(SkillController.getListSkill)
  )
  .get(
    "/getSkillInfo",
    authenticated.isAuthenticated(),
    validation.validateParams({
      skill_id: "required|integer|exist:Skill,id,required",
    }),
    wrapHandlerWithJSONResponse(SkillController.getSkillInfo)
  );
module.exports = router;
