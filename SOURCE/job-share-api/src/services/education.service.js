const MajorService = require("./major.service");
const Sequelize = require("sequelize");
const sequelize = require("@config/env");

var { Education, University, Major } = require("@models");

const EducationService = {};

EducationService.create = async ({
  user_id,
  university,
  major,
  start_time,
  end_time,
  status,
  description,
}) => {
  return await sequelize.transaction(async (t) => {
    let university_id = await UniversityService.findOrCreate(
      university.university,
      t
    );
    let major_id = await MajorService.findOrCreate(major.major, t);
    let educationInfo = await Education.create(
      {
        user_id: user_id,
        university_id: university_id,
        major_id: major_id,
        start_time: start_time,
        end_time: end_time,
        status: status,
        description: description,
      },
      { transaction: t }
    );
    return educationInfo.id;
  });
};

EducationService.delete = async (id) => {
  await Education.destroy({
    where: {
      id: id,
    },
  });
  return EducationService.getList();
};

EducationService.getList = async () => {
  let list = await Education.findAll();
  return list;
};

EducationService.getInfo = async (id) => {
  let info = await Education.findOne({
    where: {
      id: id,
    },
    include: [{ model: University }, { model: Major }],
    attributes: [
      ["id", "education_id"],
      "user_id",
      "start_time",
      "end_time",
      "status",
    ],
  });
  return info;
};

module.exports = EducationService;
