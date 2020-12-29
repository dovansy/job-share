const PositionService = require("../services/position.service.js");

const PositionController = {};

PositionController.createPosition = async (req, res) => {
  let position = await PositionService.create({
    ...req.body,
    user_id: req.auth.user_id,
  });
  return review;
};

PositionController.getListPosition = async (req, res) => {
  return await PositionService.getListPosition();
};

module.exports = PositionController;
