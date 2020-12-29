var express = require("express");
var router = express.Router();
const response = require("../common/response");
const { wrapHandlerWithJSONResponse } = response;
const {
  validation,
  authenticated,
  paging,
} = require("../middlewares/index.js");
const UserController = require("@controllers/users.controller");

router
  .post(
    "/createUser",
    // authenticated.isAuthenticated(),
    validation.validateParams({
      username: "required|string",
      password: "required|string",
      role_id: "required|integer",
      name: "required|string",
      email: "string",
      phone: "string",
      gender: "integer",
      address: "string",
      company: "string",
      province_id: "integer",
      district_id: "integer",
    }),
    wrapHandlerWithJSONResponse(UserController.create)
  )
  .put(
    "/updateUser",
    authenticated.isAuthenticated(),
    validation.validateParams({
      user_id: "required|integer",
      role_id: "required|integer",
      name: "required|string",
      email: "string",
      phone: "string",
      gender: "integer",
      address: "string",
      company_id: "integer",
      province_id: "integer",
      district_id: "integer",
    }),
    wrapHandlerWithJSONResponse(UserController.update)
  )
  .put(
    "/changePassword",
    authenticated.isAuthenticated(),
    validation.validateParams({
      oldPassword: "required|string",
      newPassword: "required|string",
    }),
    wrapHandlerWithJSONResponse(UserController.changePassword)
  )
  .post(
    "/deleteUser",
    validation.validateParams({
      user_id: "required|exist:User,id,required|integer",
    }),
    wrapHandlerWithJSONResponse(UserController.deleteUser)
  )
  .get(
    "/getListUser",
    authenticated.isAuthenticated(),
    paging(),
    wrapHandlerWithJSONResponse(UserController.getListUser)
  )
  .put(
    "/login",
    validation.validateParams({
      username: "required|string",
      password: "required|string",
      role_id: "required|integer",
    }),
    wrapHandlerWithJSONResponse(UserController.login)
  )
  .get(
    "/getUserInfo",
    authenticated.isAuthenticated(),
    wrapHandlerWithJSONResponse(UserController.getUserInfo)
  )
  .get(
    "/getUserDetail",
    validation.validateParams({
      user_id: "required|exist:User,id,required|integer",
    }),
    authenticated.isAuthenticated(),
    wrapHandlerWithJSONResponse(UserController.getUserDetail)
  )
  .get(
    "/getListStaff",
    authenticated.isAuthenticated(),
    paging(),
    wrapHandlerWithJSONResponse(UserController.getListStaff)
  )
  .post(
    "/changeStatus",
    validation.validateParams({
      user_id: "required|exist:User,id,required|integer",
      status: "required|integer",
    }),
    authenticated.isAuthenticated(),
    wrapHandlerWithJSONResponse(UserController.changeStatus)
  )
  .get(
    "/getListProvince",
    wrapHandlerWithJSONResponse(UserController.getListProvince)
  )
  .get(
    "/getListDistrict",
    validation.validateParams({
      province_code: "required|string",
    }),
    wrapHandlerWithJSONResponse(UserController.getListDistrict)
  )
  .post(
    "/createCV",
    authenticated.isAuthenticated(),
    validation.validateParams({
      // userInfo: {
      user_id: "required|integer|exist:User,id,required|integer",
      name: "required|string",
      // },
    }),
    wrapHandlerWithJSONResponse(UserController.createCV)
  )
  .post(
    "/updateCV",
    authenticated.isAuthenticated(),
    validation.validateParams({
      // userInfo: {
      user_id: "required|integer",
      name: "required|string",
      // },
    }),
    wrapHandlerWithJSONResponse(UserController.updateCV)
  )
  .get(
    "/getCVDetail",
    authenticated.isAuthenticated(),
    wrapHandlerWithJSONResponse(UserController.getCVDetail)
  )
  .get(
    "/getListCV",
    authenticated.isAuthenticated(),
    wrapHandlerWithJSONResponse(UserController.getListCV)
  )
  .post(
    "/changeStatusCv",
    authenticated.isAuthenticated(),
    validation.validateParams({
      user_id: "required|integer",
      cv_status: "required|integer",
    }),
    wrapHandlerWithJSONResponse(UserController.changeStatusCv)
  );

module.exports = router;
