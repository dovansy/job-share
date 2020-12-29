const bcrypt = require("bcrypt");
const hat = require("hat");
const { apiCode, config, role, account_state } = require("@utils/constant");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const sequelize = require("@config/env");
const UserController = {};
const UserService = require("../services/users.service");

var { User, UserProfile, Position, Role } = require("@models");

UserController.create = async (req, res) => {
  let user_id = await UserService.create(req.body);

  return await UserService.getInfo({ user_id });
};

UserController.update = async (req, res) => {
  await UserService.update(req.body);
  return await UserService.getInfo({ user_id: req.body.user_id });
};

UserController.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { user_id } = req.auth;

  let comparePass = await bcrypt.compare(oldPassword, req.auth.password);

  if (!comparePass) throw apiCode.WRONG_PASSWORD;

  var hash = bcrypt.hashSync(newPassword, config.CRYPT_SALT);

  await User.update(
    { password: hash },
    {
      where: { id: user_id },
    }
  );

  return await UserService.getInfo({ user_id });
};

UserController.deleteUser = async (req, res) => {
  await UserService.deleteUser(req.body);
  return new Object({});
};

UserController.getListUser = async (req, res) => {
  let {
    page = 1,
    offset = 0,
    limit = config.PAGING_LIMIT,
    search,
    status_id,
    role_id,
    from_date,
    to_date,
  } = req.query;
  const { count, rows } = await User.findAndCountAll({
    where: {
      role_id: { [Op.ne]: role.ADMIN },
      is_active: { [Op.ne]: account_state.DELETED },
      [Op.and]: [
        { is_active: { [Op.substring]: status_id } },
        { role_id: { [Op.substring]: role_id } },
        {
          created_date: from_date
            ? { [Op.gte]: from_date }
            : { [Op.not]: null },
        },
        {
          created_date: to_date ? { [Op.lte]: to_date } : { [Op.not]: null },
        },
      ],
    },
    include: [
      {
        model: UserProfile,
        where: {
          [Op.or]: [
            { name: { [Op.substring]: search } },
            { phone: { [Op.substring]: search } },
          ],
        },
        attributes: [],
      },
      { model: Role, attributes: [] },
      { model: Position, attributes: [] },
    ],
    attributes: [
      ["id", "user_id"],
      [sequelize.col("name"), "name"],
      [sequelize.col("user.is_active"), "is_active"],
      [sequelize.col("phone"), "phone"],
      [sequelize.col("address"), "address"],
      [sequelize.col("email"), "email"],
      [sequelize.col("position.position"), "position_name"],
      [sequelize.col("role.id"), "role_id"],
      [sequelize.col("user.created_date"), "created_date"],
    ],
    limit: parseInt(limit),
    offset: (page - 1) * limit,
    order: [["id", "DESC"]],
  });

  return {
    data: rows,
    paging: { page: page, totalItemCount: count, limit: limit },
  };
};
UserController.getListStaff = async (req, res) => {
  let {
    page,
    offset = 0,
    limit = config.PAGING_LIMIT,
    search,
    status_id,
    from_date,
    to_date,
  } = req.query;
  const { count, rows } = await User.findAndCountAll({
    where: {
      role_id: role.ADMIN,
      is_active: { [Op.ne]: account_state.DELETED },
      [Op.and]: [
        { is_active: { [Op.substring]: status_id } },
        {
          created_date: from_date
            ? { [Op.gte]: from_date }
            : { [Op.not]: null },
        },
        {
          created_date: to_date ? { [Op.lte]: to_date } : { [Op.not]: null },
        },
      ],
    },
    include: [
      {
        model: UserProfile,
        where: {
          [Op.or]: [
            { name: { [Op.substring]: search } },
            { phone: { [Op.substring]: search } },
          ],
        },
        attributes: [],
      },
      { model: Role, attributes: [] },
    ],
    attributes: [
      ["id", "user_id"],
      [sequelize.col("name"), "name"],
      [sequelize.col("user.is_active"), "is_active"],
      [sequelize.col("phone"), "phone"],
      [sequelize.col("address"), "address"],
      [sequelize.col("email"), "email"],
      [sequelize.col("role.id"), "role_id"],
      [sequelize.col("user.created_date"), "created_date"],
    ],
    limit: parseInt(limit),
    offset: (page - 1) * limit,
    order: [["id", "DESC"]],
  });

  return {
    data: rows,
    paging: { page: page, totalItemCount: count, limit: limit },
  };
};

UserController.login = async (req, res) => {
  let user = await User.findOne({
    where: {
      username: req.body.username,
      role_id: req.body.role_id,
      is_active: account_state.ACTIVE,
    },
  });

  if (!user) throw apiCode.ERROR_LOGIN;

  let comparePass = await bcrypt.compare(req.body.password, user.password);

  if (!comparePass) throw apiCode.ERROR_LOGIN;

  var token = hat();
  await UserService.update({ user_id: user.id, token });

  return await UserService.getInfo(req.body);
};

UserController.getUserInfo = async (req, res) => {
  return await UserService.getInfo(req.headers);
};

UserController.getUserDetail = async (req, res) => {
  const { user_id } = req.query;
  return await UserService.getUserDetail(user_id);
};

UserController.changeStatus = async (req, res) => {
  const { user_id, status } = req.body;
  await UserService.changeStatus(user_id, status);
  return {};
};

UserController.getListProvince = async (req, res) => {
  return await UserService.getListProvince();
};

UserController.getListDistrict = async (req, res) => {
  return await UserService.getListDistrict(req.query.province_code);
};

UserController.createCV = async (req, res) => {
  const {
    user_id,
    name,
    phone,
    gender,
    email,
    address,
    province_id,
    district_id,
    dob,
    hobby,
    apply_work,
    target_work,
    school,
    start_time,
    end_time,
    major,
    company,
    start_time_work,
    end_time_work,
    exp_detail,
    work_location,
    organization,
    start_time_join,
    end_time_out,
    work_volumteer_detail,
    name_pro,
    start_time_pro,
    end_time_pro,
    des_pro,
  } = req.body;
  await UserService.createCV({
    user_id,
    name,
    phone,
    gender,
    email,
    address,
    province_id,
    district_id,
    dob,
    hobby,
    apply_work,
    target_work,
    school,
    start_time,
    end_time,
    major,
    company,
    start_time_work,
    end_time_work,
    exp_detail,
    work_location,
    organization,
    start_time_join,
    end_time_out,
    work_volumteer_detail,
    name_pro,
    start_time_pro,
    end_time_pro,
    des_pro,
    req,
  });
  return await UserService.getCVDetail({ req, user_id: user_id });
};

UserController.updateCV = async (req, res) => {
  const {
    user_id,
    name,
    phone,
    gender,
    email,
    address,
    province_id,
    district_id,
    dob,
    hobby,
    apply_work,
    target_work,
    school,
    start_time,
    end_time,
    major,
    company,
    start_time_work,
    end_time_work,
    exp_detail,
    work_location,
    organization,
    start_time_join,
    end_time_out,
    work_volumteer_detail,
    name_pro,
    start_time_pro,
    end_time_pro,
    des_pro,
  } = req.body;
  await UserService.updateCV({
    user_id,
    name,
    phone,
    gender,
    email,
    address,
    province_id,
    district_id,
    dob,
    hobby,
    apply_work,
    target_work,
    school,
    start_time,
    end_time,
    major,
    company,
    start_time_work,
    end_time_work,
    exp_detail,
    work_location,
    organization,
    start_time_join,
    end_time_out,
    work_volumteer_detail,
    name_pro,
    start_time_pro,
    end_time_pro,
    des_pro,
    req,
  });
  return await UserService.getCVDetail({ req, user_id: user_id });
};

UserController.getCVDetail = async (req, res) => {
  return await UserService.getCVDetail({ req, user_id: req.query.user_id });
};

UserController.getListCV = async (req, res) => {
  const { search, status_id, province_id, page, cv_status } = req.query;
  return await UserService.getListCV({
    req,
    search,
    status_id,
    province_id,
    page,
    cv_status,
  });
};

UserController.changeStatusCv = async (req, res) => {
  const { user_id, cv_status } = req.body;
  return await UserService.changeStatusCv({
    user_id: user_id,
    cv_status: cv_status,
  });
};

module.exports = UserController;
