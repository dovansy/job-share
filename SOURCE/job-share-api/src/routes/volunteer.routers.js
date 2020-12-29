var express = require("express");
var router = express.Router();
const response = require("../common/response");
const { wrapHandlerWithJSONResponse } = response;
const { validation, authenticated } = require("../middlewares/index.js");
const VolunteerController = require("@controllers/volunteer.controller");

router
  .post(
    "/createVolunteer",
    authenticated.isAuthenticated(),
    validation.validateParams({
      organization: 'required|string',
      position: 'required|string',
      status: 'required|integer',
      start_time: 'required|date',
      end_time: 'date',
      description: 'string',
      url: 'string'
    }),
    wrapHandlerWithJSONResponse(VolunteerController.create)
  )
  .put(
    "/updateVolunteer",
    authenticated.isAuthenticated(),
    validation.validateParams({
      volunteer_id: 'required|integer|exist:Volunteer,id,exist',
      organization: 'required|string',
      position: 'required|string',
      status: 'required|integer',
      start_time: 'required|date',
      end_time: 'date',
      description: 'string',
      url: 'string'
    }),
    wrapHandlerWithJSONResponse(VolunteerController.update)
  )
  .post(
    "/deleteVolunteer",
    authenticated.isAuthenticated(),
    validation.validateParams({
      volunteer_id: 'required|integer|exist:Volunteer,id,required',
    }),
    wrapHandlerWithJSONResponse(VolunteerController.delete)
  )
  .get(
    "/getListVolunteer",
    authenticated.isAuthenticated(),
    wrapHandlerWithJSONResponse(VolunteerController.getList)
  )
  .get(
    "/getVolunteerInfo",
    authenticated.isAuthenticated(),
    wrapHandlerWithJSONResponse(VolunteerController.getVolunteerInfo)

  );
module.exports = router;
