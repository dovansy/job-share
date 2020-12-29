var express = require("express");
var router = express.Router();
const response = require("../common/response");
const { wrapHandlerWithJSONResponse } = response;
const { validation, authenticated } = require("../middlewares/index.js");
const CompanyController = require("@controllers/company.controller");

router
  .get(
    "/getListCompany",
    wrapHandlerWithJSONResponse(CompanyController.getListCompany)
  )
  .get(
    "/companyInfo",
    // authenticated.isAuthenticated(),
    validation.validateParams({
      company_id: "required|integer|exist:Company,id,required",
    }),
    wrapHandlerWithJSONResponse(CompanyController.getCompanyInfo)
  )
  .post(
    "/updateCompany",
    authenticated.isAuthenticated(),
    // validation.validateParams({
    //   name: "required|string",
    //   major: "required|string",
    //   address: "required|string",
    //   phone: "required|string",
    //   email: "required|string",
    //   url: "required|string",
    //   number_of_staff: "required|integer",
    //   description: "required|string",
    // }),
    wrapHandlerWithJSONResponse(CompanyController.updateCompany)
  );

module.exports = router;
