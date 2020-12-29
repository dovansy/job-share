const ProjectService = require("../services/project.service.js");

const ProjectController = {};

ProjectController.create = async (req, res) => {
  let project = await ProjectService.create({
    ...req.body,
    user_id: req.auth.user_id,
  });
  return await ProjectService.getInfo(project);
};

ProjectController.update = async (req, res) => {
  await ProjectService.update(req.body);
  return await ProjectService.getInfo(req.body.project_id);
};

ProjectController.delete = async (req, res) => {
  await ProjectService.delete(req.body.project_id);
  return await ProjectService.getList();
};

ProjectController.getList = async (req, res) => {
  return await ProjectService.getList();
};

ProjectController.getProjectInfo = async (req, res) => {
  return await ProjectService.getInfo(req.body.project_id);
};

module.exports = ProjectController;
