var express = require('express');
var router = express.Router();
const response = require('../common/response');
const { wrapHandlerWithJSONResponse } = response;
const EducationController = require('@controllers/education.controller');
const {
  validation,
  authenticated,
  paging,
} = require('../middlewares/index.js');

router
  .post(
    '/createEducation',
    authenticated.isAuthenticated(),
    validation.validateParams({
        university: {
          id: 'integer',
          university: 'required|string'
        },
        major: {
          id: 'integer',
          major: 'required|string'
        },
        status: 'required|integer',
        start_time: 'required|date',
        end_time: 'date',
        description: 'string'
    }),
    wrapHandlerWithJSONResponse(EducationController.create),
  )
  .put(
    '/updateEducation',
    authenticated.isAuthenticated(),
    validation.validateParams({
      education_id: 'required|integer|exist:Education,id,required',
      university: {
        id: 'integer',
        university: 'required|string'
      },
      major: {
        id: 'integer',
        major: 'required|string'
      },
      status: 'required|integer',
      start_time: 'required|date',
      end_time: 'date',
      description: 'string'
    }),
    wrapHandlerWithJSONResponse(EducationController.update),
  )
  .post(
    '/deleteEducation',
    authenticated.isAuthenticated(),
    validation.validateParams({
      education_id: 'required|integer|exist:Education,id,required',
    }),
    wrapHandlerWithJSONResponse(EducationController.delete),
  )
  .get(
    '/getListEducation',
    authenticated.isAuthenticated(),
    wrapHandlerWithJSONResponse(EducationController.getListEducation),
  )
  .get(
    '/getEducationInfo',
    authenticated.isAuthenticated(),
    validation.validateParams({
      education_id: 'required|integer|exist:Education,id,required',
    }),
    wrapHandlerWithJSONResponse(EducationController.getEducationInfo),
  )
module.exports = router;
