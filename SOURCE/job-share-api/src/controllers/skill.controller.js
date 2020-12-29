const SkillService = require("../services/skill.service.js");

const SkillController = {};

SkillController.create = async (req, res) => {
  let skill = await SkillService.create({...req.body,user_id: req.auth.user_id})
  return await SkillService.getInfo(skill.id);
};

SkillController.update = async (req, res) => {
  await SkillService.update(req.body);
  return await SkillService.getInfo(req.body.skill_id);
};

SkillController.deleteSkill = async (req, res) => {
  await SkillService.delete(req.body.skill_id);
  return SkillService.getList();
};

SkillController.getListSkill = async (req, res) => {
  return await SkillService.getList();
};

SkillController.getSkillInfo = async (req, res) => {
  return await SkillService.getInfo(req.body.skill_id);
};

module.exports = SkillController;
