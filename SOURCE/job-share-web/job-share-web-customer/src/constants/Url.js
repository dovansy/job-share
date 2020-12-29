const Url = {
  //user + staff
  Login: 'users/login',
  getUserInfo: 'users/getUserInfo',
  getUserDetail: 'users/getUserDetail',
  createStaff: 'users/createUser',
  updateStaff: 'users/updateUser',
  changePassword: 'users/changePassword',
  //company
  getListCompany: 'company/getListCompany',
  getInfoCompany: 'company/companyInfo',
  updateCompany: 'company/updateCompany',
  //location
  getListProvince: 'users/getListProvince',
  getListDistrict: 'users/getListDistrict',
  //job
  createJob: 'job/createJob',
  getListJob: 'job/getListJob',
  getJobDetail: 'job/getJobInfo',
  getListJobStatus: 'job/getListJobStatus',
  getListJobByUser: 'job/getListJobByUser',
  deleteJob: 'job/deleteJob',
  getListJobHome: 'job/getListJobHome',
  //position
  getListPosition: 'position/getListPosition',
  //review rating
  createReview: 'review/createReview',
  //cv
  createCV: 'users/createCV',
  updateCV: 'users/updateCV',
  getCVDetail: 'users/getCVDetail',
  getListCV: 'users/getListCV',
  //overview
  overViewRecruitment: 'overview/overViewRecruitment',
  //sendEmail
  sendEmail: 'overview/sendEmail',
  getListApply: 'overview/getListApply',
}

export default Url
