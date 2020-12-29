var { Skill } = require("@models");
const Sequelize = require("sequelize");
const sequelize = require("@config/env");

const SkillService = {};

SkillService.create = async ({
  user_id,
  skill_type,
  rating,
  description,
}) => {
  return await sequelize.transaction(async (t) => {
    let skill = await Skill.create(
      {
        user_id,
        skill_type,
        rating,
        description,
      },
      { transaction: t}
    );
    return skill;
  });
}

SkillService.update = async (options) => {
  return await sequelize.transaction(async (t) => {
    if(options.skill_id){
      let skillInfo = await Skill.update(options, {
        where: {
          id: options.skill_id
        },
        transaction : t,
      })
    };

    await Skill.update(options, {
      where: {
        id: options.skill_id
      },
      transaction : t,
    })
  });
}

SkillService.delete = async (id) => {
  await Skill.destroy({
    where: {
      id: id
    }
  })
}

SkillService.getList = async () => {
  return await Skill.findAll();
}

SkillService.getInfo = async (id) => {
  let skill = await Skill.findOne({
    where: {
      id: id
    }
  });
  return skill;
};

module.exports = SkillService;
