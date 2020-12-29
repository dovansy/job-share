const { Sequelize, Op, fn, col, literal } = require("sequelize");
// const Sequelize = require("sequelize");
// const Op = Sequelize.Op;
const sequelize = require("@config/env");
const { config, role, account_state, apiCode } = require("@utils/constant");
var { Company, User, UserProfile } = require("@models");
const { where } = require("sequelize");
const hat = require("hat");

const CompanyService = {};

CompanyService.findOrCreate = async ({ name, province_id, district_id }) => {
  let company = await Company.findOne({
    where: { name: name, is_active: account_state.ACTIVE },
  });
  if (company) {
    return company;
  } else {
    return await Company.create({
      name: name,
      province_id: province_id,
      district_id: district_id,
      is_active: 1,
    });
  }
};

CompanyService.getList = async ({
  page,
  search,
  offset = 0,
  limit = config.PAGING_LIMIT,
  status_id,
  req,
}) => {
  const urlRequest = req.protocol + "://" + req.get("host");
  if (page < 1) {
    return await Company.findAll({
      attributes: [
        "id",
        "name",
        "email",
        "phone",
        "description",
        "rating",
        "major",
        "number_of_staff",
        "address",
        "date_of_establishment",
        "url",
        "is_active",
        [fn("CONCAT", urlRequest, col("image")), "image"],
      ],
      where: {
        name: { [Op.substring]: search },
        is_active: account_state.ACTIVE,
      },
    });
  }

  const { rows, count } = await Company.findAndCountAll({
    attributes: [
      "id",
      "name",
      "email",
      "phone",
      "description",
      "rating",
      "major",
      "number_of_staff",
      "address",
      "date_of_establishment",
      "url",
      "is_active",
      [fn("CONCAT", urlRequest, col("image")), "image"],
    ],
    where: {
      [Op.and]: [
        { name: { [Op.substring]: search } },
        { is_active: { [Op.substring]: status_id } },
      ],
    },
    limit,
    offset: (page - 1) * limit,
    order: [["id", "DESC"]],
  });
  return {
    data: rows,
    paging: { page: parseInt(page), totalItemCount: count, limit: limit },
  };
};

CompanyService.getInfo = async ({
  company_id,
  page = 1,
  offset = 0,
  limit = config.PAGING_LIMIT,
  req,
}) => {
  const urlRequest = req.protocol + "://" + req.get("host");
  let company = await Company.findOne({
    attributes: [
      "id",
      "name",
      "email",
      "phone",
      "description",
      "rating",
      "major",
      "number_of_staff",
      "address",
      "date_of_establishment",
      "url",
      [fn("CONCAT", urlRequest, col("image")), "image"],
    ],
    where: {
      id: company_id,
      is_active: account_state.ACTIVE,
    },
  });
  const { count, rows } = await User.findAndCountAll({
    where: {
      company_id: company_id,
      is_active: account_state.ACTIVE,
    },
    include: { model: UserProfile, attributes: [] },
    attributes: [
      ["id", "user_id"],
      "username",
      "role_id",
      "created_date",
      [sequelize.col("user.is_active"), "is_active"],
      [sequelize.col("user_profile.name"), "name"],
      [sequelize.col("user_profile.phone"), "phone"],
      [sequelize.col("user_profile.gender"), "gender"],
      [sequelize.col("user_profile.email"), "email"],
      [sequelize.col("user_profile.address"), "address"],
      [sequelize.col("user_profile.province_id"), "province_id"],
      [sequelize.col("user_profile.district_id"), "district_id"],
      [sequelize.col("user_profile.dob"), "dob"],
    ],
    offset,
    limit,
    order: [["id", "DESC"]],
  });
  return {
    company,
    listUser: {
      data: rows,
      paging: { page: page, totalItemCount: count, limit: limit },
    },
  };
};

CompanyService.updateCompany = async ({
  company_id,
  name,
  major,
  address,
  phone,
  email,
  url,
  number_of_staff,
  description,
  req,
}) => {
  const currentCompany = await Company.findOne({
    where: {
      id: company_id,
      is_active: account_state.ACTIVE,
    },
  });

  if (!currentCompany) throw apiCode.NOT_FOUND;

  let urlImage = "";
  if (req.files && req.files.image) {
    urlImage = await uploadFile(req.files.image, "/upload/company/");
  }

  let dataUpdate = {
    name: name,
    major: major,
    address: address,
    phone: phone,
    email: email,
    url: url,
    number_of_staff: number_of_staff,
    description: description,
    // image: urlImage,
  };
  if (urlImage.length > 0) {
    dataUpdate.image = urlImage;
  }

  await currentCompany.update(dataUpdate);
};

async function uploadFile(file, pathImage) {
  try {
    const fileType = file.mimetype.replace("image/", "");
    // const fileType = file.type.replace('image/', '');
    const fileName = `${hat()}.${fileType}`;
    //Use the mv() method to place the file in upload directory
    file.mv(`./public${pathImage}` + fileName);
    // file.mv(path.join(__dirname.replace("src/controllers", ""), `public/${pathImage}` + fileName))
    return pathImage + fileName;
  } catch (error) {
    console.log(error);
    return "";
  }
}

// CompanyService.updateCompany({
//   company_id: 1,
//   name: "Công ty cổ phần công nghệ Windsoft - Việt Nam",
//   major: "IT - Phần mềm",
//   address: "Số 2 tòa nhà FiveStar, Kim Giang, Thanh Xuân, Hà Nội",
//   phone: "0987654321",
//   email: "windsoft@gmail.com",
//   url: "https://winds.vn",
//   number_of_staff: 60,
//   description:
//     "Chuyên cung cấp giải pháp phần mềm cho những doanh nghiệp trong nước và quốc tế, trong lĩnh vực công nghệ thông tin",
// });

module.exports = CompanyService;
