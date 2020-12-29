var { Volunteer } = require("@models");
const Sequelize = require("sequelize");
const sequelize = require("@config/env");

const VolunteerService = {};

VolunteerService.create = async (options) => {
  return await sequelize.transaction(async (t) => {
    let volunteer = await Volunteer.create(
      {
        user_id: options.user_id,
        organization: options.organization,
        position: options.position,
        start_time: options.start_time,
        end_time: options.end_time,
        status: options.status,
        description: options.description,
        url: options.url,
      },
      { transaction: t }
    );
    return volunteer.id;
  });
};

VolunteerService.update = async (options) => {
  return await sequelize.transaction(async (t) => {
    return await Volunteer.update(options, {
      where: {
        id: options.volunteer_id
      },
      transaction : t,
    });
  });
};

VolunteerService.delete = async (id) => {
  return await Volunteer.destroy({
    where: {
      id: id
    }
  })
}

VolunteerService.getList = async () => {
  return await Volunteer.findAll();
}

VolunteerService.getInfo = async (id) => {
  return await Volunteer.findOne({
    where: {
      id: id,
    },
  });
  return {
    volunteer_id: 1,
    organization: "WS",
    position: "Nhà tài trợ",
    status: 1,
    start_time: "2020-5-29",
    end_time: "",
    description: "",
  };
};

module.exports = VolunteerService;
