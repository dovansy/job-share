const sequelize = require("@config/env");

var { Position } = require("@models");

const PositionService = {};

PositionService.findOrCreate = async (name, transition) => {
  let [data] = await Position.findOrCreate({
    where: {
      position: name,
    },
    transaction: transition,
  });

  return data.id;
};

PositionService.getListPosition = async () => {
  return await Position.findAll();
};

module.exports = PositionService;
