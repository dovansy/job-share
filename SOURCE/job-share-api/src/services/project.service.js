var { Project } = require("@models");
const Sequelize = require("sequelize");
const sequelize = require("@config/env");

const ProjectService = {};

ProjectService.create = async (options) => {
  return await sequelize.transaction(async (t) => {
    let project = await Project.create(
      {
        user_id: options.user_id,
        name: options.name,
        partner: options.partner,
        number_of_project: options.number_of_project,
        position: options.position,
        mission: options.mission,
        technology: options.technology,
        start_time: options.start_time,
        end_time: options.end_time,
        status: options.status,
        description: options.description,
        url: options.url,
      },
      { transaction: t }
    );
    return project.ID;
  });
};

ProjectService.update = async (options) => {
  return await sequelize.transaction(async (t) => {
    return await Project.update(options,{
      where: {
        id: options.project_id
      },
      transaction : t,
    });
  });
};

ProjectService.delete = async (id) => {
  return await Project.destroy({
    where: {
      ID: id,
    },
  });
};

ProjectService.getList = async () => {
  return await Project.findAll();
};

ProjectService.getInfo = async (id) => {
  return await Project.findOne({
    where: {
      ID: id,
    },
  });
  return {
    project_id: 1,
    project_name: "Job Share",
    partner: "Mọi người",
    number_of_project: 5,
    position: "dev",
    mission: "Chia sẻ việc làm",
    technology: "ReactJs + NodeJs + Mysql",
    status: 1,
    start_time: "2020-9-18",
    end_time: "2020-11-20",
    description: "kết nối người tuyển dụng với người tìm việc",
  };
};

module.exports = ProjectService;
