const JobService = require("../services/job.service.js");
const { apiCode, config, role, account_state } = require("@utils/constant");

const JobController = {};

JobController.create = async (req, res) => {
  const job_id = await JobService.create({
    ...req.body,
    company_id: req.auth.company_id,
    user_id: req.auth.user_id,
  });
  return await JobService.getInfo({ job_id });
};

JobController.getInfo = async (req, res) => {
  const { job_id } = req.query;
  return await JobService.getInfo({ job_id });
};

JobController.getListJobByUser = async (req, res) => {
  return await JobService.getListJobByUser(
    req.query.search,
    req.query.status,
    req.auth.user_id,
    req
  );
};

JobController.getListJobHome = async (req, res) => {
  return await JobService.getListJobHome({ req });
};

JobController.getListJobStatus = async (req, res) => {
  return await JobService.getListJobStatus(req.auth.user_id);
};

JobController.getListJob = async (req, res) => {
  let {
    page,
    offset,
    limit,
    search,
    from_date,
    to_date,
    status_id,
    position_id,
    province_id,
  } = req.query;
  return await JobService.getListJob({
    page,
    offset,
    limit,
    search,
    status_id,
    from_date,
    to_date,
    position_id,
    province_id,
    req,
  });
};

JobController.changeStatus = async (req, res) => {
  if (req.auth.role_id !== 1) {
    throw apiCode.UNAUTHORIZED;
  } else {
    return await JobService.changeStatus(req.body.status, req.body.id);
  }
};

JobController.deleteJob = async (req, res) => {
  const { job_id } = req.body;
  await JobService.deleteJob({ job_id: job_id });
  return {};
};

module.exports = JobController;
