var { Experience } = require("@models");
const Sequelize = require("sequelize");
const sequelize = require("@config/env");

const ExperienceService = {};

const PositionService = require("./position.service");

ExperienceService.create = async ({
  user_id,
  company,
  position,
  status,
  start_time,
  end_time,
  description,
  url,
}) => {
  return await sequelize.transaction(async (t) => {
    let position_id = await PositionService.findOrCreate(position);

    let info = await Experience.create(
      {
        user_id,
        company,
        position_id,
        start_time,
        end_time,
        status,
        description,
        url,
      },
      { transaction: t }
    );
    return info.id;
  });
};

ExperienceService.update = async (options) => {
  await sequelize.transaction(async (t) => {
    let position_id = await PositionService.findOrCreate(options.position);
    
    if(options.experience_id){
      let experienceInfo = await Experience.update({...options,position_id: position_id} , {
        where: {
          id: options.experience_id
        },
        transaction: t,
      });

      await Experience.update({...options,position_id: position_id}, {
        where: {
          id: options.experience_id
        },
        transaction: t,
      })
    }
  })
}

ExperienceService.delete = async (id) => {
  await Experience.destroy({
    where: {
      id: id
    }
  });
  return ExperienceService.getList();
};


ExperienceService.getList = async () => {
  let list = await Experience.findAll();
  return list;
};

ExperienceService.getInfo = async (id) => {
  let experience = await Experience.findOne({
    where: {
      id: id,
    },
  });
  return experience;
};

module.exports = ExperienceService;
