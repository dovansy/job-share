const { Sequelize, Op, fn, col, literal } = require("sequelize");
const sequelize = require("@config/env");
const OverViewService = {};
var { Job, JobUser, UserProfile, User, Company } = require("@models");
const { account_state, role, apiCode } = require("@src/utils/constant");
const nodemailer = require("nodemailer");
const hat = require("hat");

OverViewService.overViewAdmin = async () => {
  const all = await JobUser.count({
    where: {
      status: { [Op.ne]: 4 },
    },
  });
  const pending = await JobUser.count({
    where: {
      status: 0,
    },
  });
  const confirm = await JobUser.count({
    where: {
      status: 1,
    },
  });
  const reject = await JobUser.count({
    where: {
      status: 3,
    },
  });

  const cv_all = await User.count({
    where: {
      cv_status: 1,
    },
  });
  const cv_search_job = await User.count({
    where: {
      cv_status: 1,
      is_active: account_state.ACTIVE,
    },
  });

  const recruitment = await User.count({
    where: {
      role_id: role.RECRUITER,
      is_active: account_state.ACTIVE,
    },
  });
  const applicant = await User.count({
    where: {
      role_id: role.APPLICANT,
      is_active: account_state.ACTIVE,
    },
  });

  const res = {
    recruitment: [
      { value: all, label: "all" },
      { value: pending, label: "pending" },
      { value: confirm, label: "confirm" },
      { value: reject, label: "reject" },
    ],
    cv: {
      cv_all: cv_all,
      cv_search_job: cv_search_job,
    },
    customer: {
      recruitment: recruitment,
      applicant: applicant,
    },
  };
  return res;
};

OverViewService.overViewRecruitment = async ({ user_id }) => {
  const all_applicant = await User.count({
    where: {
      role_id: role.APPLICANT,
      is_active: account_state.ACTIVE,
    },
  });

  const applicant_job_search = await User.count({
    where: {
      cv_status: 1,
      role_id: role.APPLICANT,
      is_active: account_state.ACTIVE,
    },
  });

  const all = await JobUser.count({
    where: { user_id: user_id },
  });

  return {
    all_applicant: all_applicant,
    applicant_job_search: applicant_job_search,
    all: all,
  };
};

OverViewService.getListApply = async ({ req }) => {
  const { user_id } = req.auth;
  const rows = await JobUser.findAll({
    where: {
      user_id: user_id,
      is_send: 1,
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
                fn("CONCAT", req.url, col("job.company.image")),
                "company_image",
              ],
            ],
          },
        ],
      },
    ],
    attributes: [
      [sequelize.col("job_user.id"), "id"],
      [sequelize.col("job_user.job_id"), "job_id"],
    ],
    order: [["id", "DESC"]],
  });

  return {
    data: rows,
  };
};

OverViewService.sendEmail = async ({ req }) => {
  const { subject, text, from, to, job_id } = req.body;
  if (!text) throw apiCode.NOT_FOUND;

  if (job_id) {
    await JobUser.create({
      job_id: job_id,
      user_id: req.auth.user_id,
      status: 4,
      is_send: 1,
    });
  }

  var path = "";
  if (req.files && req.files.file) {
    console.log(req.files);
    path = await uploadFile(req.files.file, "/upload/filePdf/");
    console.log("path", path);
  }

  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    service: "Gmail",
    auth: {
      user: "job.share.tlu@gmail.com",
      pass: "dovansy1998",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  console.log(req.body, req.files);
  var mainOptions = {
    from: from,
    to: to,
    subject: subject,
    text: text,
    attachments: [
      {
        filename: req.files.name,
        path: `${req.url}${path}`,
        contentType: "application/pdf",
      },
    ],
  };
  transporter.sendMail(mainOptions, function (err, info) {
    if (err) {
      console.log("1", err);
      return "https://myaccount.google.com/lesssecureapps";
    } else {
      console.log("Message sent: " + info.response);
    }
  });
};

async function uploadFile(file, pathImage) {
  try {
    const fileType = file.mimetype.replace("application/", "");
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

// async function uploadFile(file, pathFile) {
//   try {
//     const fileType = file.mimetype.replace("file/", "");
//     const fileName = `${hat()}.${fileType}`;
//     //Use the mv() method to place the file in upload directory
//     file.mv(`./public${pathFile}` + fileName);
//     // file.mv(path.join(__dirname.replace("src/controllers", ""), `public/${pathImage}` + fileName))
//     return pathFile + fileName;
//   } catch (error) {
//     console.log(error);
//     return "";
//   }
// }

// OverViewService.sendEmail({ req: "" });
module.exports = OverViewService;
