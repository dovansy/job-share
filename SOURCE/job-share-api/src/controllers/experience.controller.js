const ExperienceService = require("../services/experience.service.js");

const ExperienceController = {};

ExperienceController.create = async (req, res) => {
  let experience_id = await ExperienceService.create({
    ...req.body,
    user_id: req.auth.user_id,
  });
  return await ExperienceService.getInfo(experience_id);
};

ExperienceController.update = async (req, res) => {
  await ExperienceService.update(req.body);
  return await ExperienceService.getInfo(req.body.experience_id);
};

ExperienceController.deleteExperience = async (req, res) => {
  return await ExperienceService.delete(req.body.experience_id);
};

ExperienceController.getListExperience = async (req, res) => {
  return await ExperienceService.getList();
};

ExperienceController.getExperienceInfo = async (req, res) => {
  return await ExperienceService.getInfo(req.body.experience_id);
};

module.exports = ExperienceController;
