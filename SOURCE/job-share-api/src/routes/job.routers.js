var express = require("express");
var router = express.Router();
const response = require("../common/response");
const { wrapHandlerWithJSONResponse } = response;
const { validation, authenticated } = require("../middlewares/index.js");
const JobController = require("@controllers/job.controller");

router
  .get(
    "/getJobInfo",
    // authenticated.isAuthenticated(),
    validation.validateParams({
      job_id: "required|integer|exist:JobUser,id,required",
    }),
    wrapHandlerWithJSONResponse(JobController.getInfo)
  )
  .get(
    "/getListJobByUser",
    authenticated.isAuthenticated(),
    wrapHandlerWithJSONResponse(JobController.getListJobByUser)
  )
  .get(
    "/getListJobHome",
    wrapHandlerWithJSONResponse(JobController.getListJobHome)
  )
  .get(
    "/getListJob",
    validation.validateParams({
      status_id: "integer",
      position_id: "integer",
      province_id: "integer",
      page: "required|integer",
    }),
    // authenticated.isAuthenticated(),
    wrapHandlerWithJSONResponse(JobController.getListJob)
  )
  .get(
    "/getListJobStatus",
    authenticated.isAuthenticated(),
    wrapHandlerWithJSONResponse(JobController.getListJobStatus)
  )
  .post(
    "/createJob",
    authenticated.isAuthenticated(),
    validation.validateParams({
      name: "required|string",
      type: "required|integer",
      position_id: "required|integer",
      amount: "integer",
      deadline: "required|date",
      require_exp: "required|integer",
      gender: "required|integer",
      description: "required|string",
      skill: "required|string",
      benefit: "required|string",
    }),
    wrapHandlerWithJSONResponse(JobController.create)
  )
  .post(
    "/changeStatus",
    authenticated.isAuthenticated(),
    validation.validateParams({
      id: "required|exist:JobUser,id,required",
      status: "required|integer",
    }),
    wrapHandlerWithJSONResponse(JobController.changeStatus)
  )
  .post(
    "/deleteJob",
    authenticated.isAuthenticated(),
    validation.validateParams({
      job_id: "required|exist:Job,id,required",
    }),
    wrapHandlerWithJSONResponse(JobController.deleteJob)
  );
module.exports = router;
