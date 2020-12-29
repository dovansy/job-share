const VolunteerService = require("../services/volunteer.service.js");

const VolunteerController = {};

VolunteerController.create = async (req, res) => {
  let volunteer = await VolunteerService.create({...req.body,user_id: req.auth.user_id});
  return await VolunteerService.getInfo(volunteer);
};

VolunteerController.update = async (req, res) => {
  await VolunteerService.update(req.body);
  return await VolunteerService.getInfo(req.body.volunteer_id);
};

VolunteerController.delete = async (req, res) => {
  await VolunteerService.delete(req.body.volunteer_id);
  return await VolunteerService.getList();
};

VolunteerController.getList = async (req, res) => {
  return await VolunteerService.getList();
};

VolunteerController.getVolunteerInfo = async (req, res) => {
  return await VolunteerService.getInfo(req.body.volunteer_id);
};

module.exports = VolunteerController;
