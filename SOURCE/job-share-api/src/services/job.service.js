const { Sequelize, Op, fn, col, literal } = require("sequelize");
// const Sequelize = require("sequelize");
const sequelize = require("@config/env");
// const Op = Sequelize.Op;
const { apiCode, config, role, account_state } = require("@utils/constant");
var { Job, JobUser, UserProfile, User, Company } = require("@models");
const { changeStatus } = require("./users.service");

const JobService = {};

JobService.getListJobByUser = async (search, status, user_id, req) => {
  const urlRequest = req.protocol + "://" + req.get("host");
  const { rows, count } = await JobUser.findAndCountAll({
    where: {
      status: status,
      user_id: user_id,
    },
    include: [
      {
        model: Job,
        where: { [Op.and]: [{ name: { [Op.substring]: search } }] },
      },
      {
        model: User,
        attributes: [],
        include: [{ model: Company, attributes: [] }],
      },
    ],
    attributes: [
      [sequelize.col("job_user.id"), "id"],
      [sequelize.col("job_user.status"), "status"],
      [sequelize.col("user.id"), "created_by_userId"],
      [sequelize.col("user.company.name"), "company_name"],
      [sequelize.col("user.company.address"), "company_address"],
      [sequelize.col("user.company.rating"), "rating"],
      [fn("CONCAT", urlRequest, col("image")), "company_image"],
    ],
  });
  return { data: rows, count: count };
};

JobService.getListJob = async ({
  page,
  offset = 0,
  limit = config.PAGING_LIMIT,
  search,
  status_id,
  from_date,
  to_date,
  position_id,
  province_id,
  req,
}) => {
  const urlRequest = req.protocol + "://" + req.get("host");
  let queryProvince = province_id ? `company.province_id = ${province_id}` : ``;
  const { count, rows } = await JobUser.findAndCountAll({
    where: {
      status: { [Op.substring]: status_id },
      is_send: 0,
    },
    logging: console.log,
    include: [
      {
        model: Job,
        where: {
          [Op.and]: {
            name: { [Op.substring]: search },
            position_id: position_id
              ? { [Op.eq]: position_id }
              : { [Op.not]: "" },
            [Op.and]: [
              {
                created_date: from_date
                  ? { [Op.gte]: from_date }
                  : { [Op.not]: null },
              },
              {
                created_date: to_date
                  ? { [Op.lte]: to_date }
                  : { [Op.not]: null },
              },
            ],
          },
        },
        include: [
          {
            model: Company,
            where: {
              province_id: province_id
                ? { [Op.eq]: province_id }
                : { [Op.not]: null },
            },
            attributes: [
              "id",
              "name",
              "address",
              "rating",
              "province_id",
              [
                fn("CONCAT", urlRequest, col("job.company.image")),
                "company_image",
              ],
            ],
          },
        ],
      },

      {
        model: User,
        attributes: [],
        include: [
          {
            model: UserProfile,
            attributes: [],
          },
        ],
      },
    ],
    attributes: [
      [sequelize.col("job_user.id"), "id"],
      [sequelize.col("job_user.status"), "status"],
      [sequelize.col("user.id"), "created_by_userId"],
      [sequelize.col("user.user_profile.name"), "created_by_userName"],
    ],
    limit: parseInt(limit),
    offset: (page - 1) * limit,
    // order: [["id", "DESC"]],
    order: [["status", "ASC"]],
  });

  return {
    data: rows,
    paging: { page: parseInt(page), totalItemCount: count, limit: limit },
  };
};

JobService.getListJobHome = async ({ req }) => {
  const urlRequest = req.protocol + "://" + req.get("host");
  const rowsNewJob = await JobUser.findAll({
    where: {
      status: 1,
      is_send: 0,
    },
    include: [
      {
        model: Job,
        include: [
          {
            model: Company,
            attributes: [
              "id",
              "name",
              "address",
              "rating",
              "province_id",
              [
                fn("CONCAT", urlRequest, col("job.company.image")),
                "company_image",
              ],
            ],
          },
        ],
      },
      {
        model: User,
        attributes: [],
        include: [
          {
            model: UserProfile,
            attributes: [],
          },
        ],
      },
    ],
    attributes: [
      [sequelize.col("job_user.id"), "id"],
      [sequelize.col("job_user.status"), "status"],
      [sequelize.col("user.id"), "created_by_userId"],
      [sequelize.col("user.user_profile.name"), "created_by_userName"],
    ],
    limit: 30,
    order: [["job_id", "DESC"]],
  });

  // const rowsHotJob = await JobUser.findAll({
  //   where: {
  //     status: 1,
  //     is_send: 0,
  //   },
  //   include: [
  //     {
  //       model: Job,
  //       include: [
  //         {
  //           model: Company,
  //           attributes: [
  //             "id",
  //             "name",
  //             "address",
  //             "rating",
  //             "province_id",
  //             [
  //               fn("CONCAT", urlRequest, col("job.company.image")),
  //               "company_image",
  //             ],
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       model: User,
  //       attributes: [],
  //       include: [
  //         {
  //           model: UserProfile,
  //           attributes: [],
  //         },
  //       ],
  //     },
  //   ],
  //   attributes: [
  //     [sequelize.col("job_user.id"), "id"],
  //     [sequelize.col("job_user.status"), "status"],
  //     [sequelize.col("user.id"), "created_by_userId"],
  //     [sequelize.col("user.user_profile.name"), "created_by_userName"],
  //   ],
  //   limit: 30,
  //   logging: console.log,
  //   order: [["job.max_salary", "DESC"]],
  // });
  return {
    data: {
      newJob: rowsNewJob,
      // hotJob: rowsHotJob,
    },
  };
};

JobService.getListJobStatus = async (user_id) => {
  const pending = await JobUser.count({
    where: {
      user_id: user_id,
      status: 0,
      is_send: 0,
    },
  });
  const confirm = await JobUser.count({
    where: {
      user_id: user_id,
      status: 1,
      is_send: 0,
    },
  });
  const expired = await JobUser.count({
    where: { user_id: user_id, status: 2, is_send: 0 },
  });
  const reject = await JobUser.count({
    where: { user_id: user_id, status: 3, is_send: 0 },
  });
  return {
    pending: pending,
    confirm: confirm,
    expired: expired,
    reject: reject,
  };
};

JobService.create = async (object) => {
  return await sequelize.transaction(async (t) => {
    jobInfo = await Job.create(
      {
        company_id: object.company_id,
        name: object.name,
        type: object.type,
        amount: object.amount,
        description: object.description,
        deadline: object.deadline,
        position_id: object.position_id,
        min_salary: object.min_salary,
        max_salary: object.max_salary,
        require_exp: object.require_exp,
        gender: object.gender,
        skill: object.skill,
        benefit: object.benefit,
      },
      { transaction: t }
    );
    await JobUser.create(
      {
        job_id: jobInfo.id,
        user_id: object.user_id,
      },
      { transaction: t }
    );
    return jobInfo.id;
  });
};

JobService.changeStatus = async (status, id) => {
  id.forEach((value) => {
    JobUser.update({ status: status }, { where: { id: value } });
  });
  return {};
};

JobService.getInfo = async ({ job_id }) => {
  return await JobUser.findOne({
    where: {
      id: job_id,
    },
    include: [
      { model: Job },
      {
        model: User,
        include: [
          { model: UserProfile, attributes: ["name"] },
          { model: Company },
        ],
      },
    ],
  });
};

JobService.deleteJob = async ({ job_id }) => {
  let jobCurrent = await Job.findOne({
    where: {
      id: job_id,
    },
  });
  if (!jobCurrent) throw apiCode.NOT_FOUND;
  await Job.destroy({
    where: {
      id: job_id,
    },
  });
};

module.exports = JobService;
