const CompanyService = require("../services/company.service.js");

const CompanyController = {};

CompanyController.getListCompany = async (req, res) => {
  let { page, offset, limit, search, status_id } = req.query;
  return await CompanyService.getList({
    page,
    offset,
    limit,
    search,
    status_id,
    req,
  });
};

CompanyController.getCompanyInfo = async (req, res) => {
  return await CompanyService.getInfo({
    company_id: req.query.company_id,
    req,
  });
};

CompanyController.updateCompany = async (req, res) => {
  const { company_id } = req.auth;
  const {
    name,
    major,
    address,
    phone,
    email,
    url,
    number_of_staff,
    description,
  } = req.body;
  await CompanyService.updateCompany({
    company_id,
    name,
    major,
    address,
    phone,
    email,
    url,
    number_of_staff,
    description,
    req,
  });
  return {};
};

module.exports = CompanyController;
