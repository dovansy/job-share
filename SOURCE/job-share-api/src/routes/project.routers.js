var express = require("express");
var router = express.Router();
const response = require("../common/response");
const { wrapHandlerWithJSONResponse } = response;
const { validation, authenticated } = require("../middlewares/index.js");
const ProjectController = require("@controllers/project.controller");

router
  .post(
    "/createProject",
    authenticated.isAuthenticated(),
    validation.validateParams({
      name: "required|string",
      partner: "required|string",
      number_of_project: "required|integer",
      position: "required|string",
      mission: "required|string",
      technology: "string",
      status: "required|integer",
      start_time: "required|date",
      end_time: "date",
      description: "string",
      url: "string",
    }),
    wrapHandlerWithJSONResponse(ProjectController.create)
  )
  .put(
    "/updateProject",
    authenticated.isAuthenticated(),
    validation.validateParams({
      project_id: "required|integer|exist:Project,id,required",
      name: "required|string",
      partner: "required|string",
      number_of_project: "required|integer",
      position: "required|string",
      mission: "required|string",
      technology: "string",
      status: "required|integer",
      start_time: "required|date",
      end_time: "date",
      description: "string",
      url: "string",
    }),
    wrapHandlerWithJSONResponse(ProjectController.update)
  )
  .post(
    "/deleteProject",
    authenticated.isAuthenticated(),
    validation.validateParams({
      project_id: "required|integer|exist:Project,id,required",
    }),
    wrapHandlerWithJSONResponse(ProjectController.delete)
  )
  .get(
    "/getListProject",
    authenticated.isAuthenticated(),
    wrapHandlerWithJSONResponse(ProjectController.getList)
  )
  .get(
    "/getProjectInfo",
    authenticated.isAuthenticated(),
    wrapHandlerWithJSONResponse(ProjectController.getProjectInfo)
  );
module.exports = router;
