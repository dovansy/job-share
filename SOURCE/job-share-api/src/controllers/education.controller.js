const sequelize = require("@config/env");
const EducationService = require("../services/education.service.js");

const EducationController = {};

EducationController.create = async (req, res) => {
  let education = await EducationService.create({
    ...req.body,
    user_id: req.auth.user_id,
  });
  return await EducationService.getInfo(education);
};

EducationController.update = async (req, res) => {
  await EducationService.update(req.body);
  return await EducationService.getInfo(req.body.education_id);
};

EducationController.delete = async (req, res) => {
  return await EducationService.delete(req.body.education_id);
};

EducationController.getListEducation = async (req, res) => {
  let education = await EducationService.getList();
  return education;
};

EducationController.getEducationInfo = async (req, res) => {
  return await EducationService.getInfo(req.body.education_id);
};

module.exports = EducationController;
