const ROUTER = {
  OVERVIEW: '/tong-quan',
  RECRUITMENT: '/tin-tuyen-dung',
  RECRUITMENT_DETAIL: '/chi-tiet-tin-tuyen-dung',
  CV_MANAGEMENT: '/quan-ly-cv',
  CV_DETAIL: '/chi-tiet-cv',
  NEWS: '/bai-viet',
  NEWS_DETAIL: '/chi-tiet-bai-viet',
  COMPANY: '/cong-ty',
  COMPANY_DETAIL: '/chi-tiet-cong-ty',
  STAFF: '/nhan-su',
  STAFF_DETAIL: '/chi-tiet-nhan-su',
  USER: '/nguoi-dung',
  USER_DETAIL: '/chi-tiet-nguoi-dung',
  CHAT_SUPPORT: '/ho-tro-tu-van',
}

const STRING = {
  emptyData: 'Không có dữ liệu!',
  home: 'Trang chủ',
  user: 'Người dùng',
  user_management: 'Quản lý người dùng',
  user_detail: 'Chi tiết người dùng',
  login: 'Đăng nhập',
  forgotPass: 'Quên mật khẩu?',
  password: 'Mật khẩu',
  confirmPassword: 'Xác nhận mật khẩu',
  overView: 'Tổng quan',
  profile: 'Hồ sơ',
  search: 'Tìm kiếm',
  clearSearch: 'Xóa tìm kiếm',
  add: 'Thêm mới',
  phoneNumber: 'Số điện thoại',
  fromDate: 'Từ ngày',
  toDate: 'Đến ngày',
  status: 'Trạng thái',
  numericalOrder: 'STT',
  fullName: 'Họ và tên',
  email: 'Email',
  sex: 'Giới tính',
  date_of_birth: 'Ngày sinh',
  exit: 'Thoát',
  save: 'Lưu',
  address: 'Địa chỉ',
  createDate: 'Ngày tạo',
  action: 'Hành động',
  project: 'Dự án',
  config: 'Cấu hình',
  account: 'Tài khoản',
  accountUser: 'Tài khoản người dùng',
  staff: 'Nhân sự',
  recruitmer: 'Nhà tuyển dụng',
  staff_management: 'Quản lý nhân sự',
  recruitment_management: 'Quản lý tin tuyển dụng',
  recruitment: 'Tin tuyển dụng',
  recruitment_detail: 'Chi tiết tin tuyển dụng',
  cv: 'Tổng số Cv',
  cv_management: 'Quản lý Cv',
  cv_detail: 'Chi tiết Cv',
  news: 'Bài viết',
  news_management: 'Quản lý bài viết',
  news_detail: 'chi tiết bài viết',
  company: 'Công ty',
  company_management: 'Quản lý công ty',
  company_detail: 'Chi tiết công ty',
  chat_support: 'Hỗ trợ, tư vấn',
  delete: 'xóa',
  allSystem: 'Toàn hệ thống',
  pending: 'Chờ xử lý',
  rejected: 'Đã từ chối',
  confirmed: 'Đã được duyệt',
  confirm: 'duyệt',
  reject: 'từ chối',
  applicant: 'Ứng viên',
  employer: 'Nhà tuyển dụng',
  name_companmy: 'Tên công ty',
  user_proxy: 'Người đại diện',
  code_recuiment: 'Mã tin tuyển dụng',
  title: 'Tiêu đề',
  user_created: 'Người tạo',
  code_cv: 'Mã Cv',
  user_confirm: 'Người duyệt',
  code_news: 'Mã bài viết',
  editStaff: 'Sửa nhân sự',
  addStaff: 'Thêm nhân sự',
  active: 'Đang hoạt động',
  unActive: 'Ngừng hoạt động',
  user_type: 'Loại người dùng',
  profession: 'Nghề nghiệp',
  experience: 'Kinh nghiệm',
  description: 'Mô tả',
  situation_hope: 'Vị trí mong muốn',
  website: 'Website',
  notifyFail: 'Thao tác thất bại',
  notifySuccess: 'Thao tác thành công',
  userName: 'Tên đăng nhập',
  fouding_day: 'Ngày thành lập',
  staff_number: 'Số nhân viên',
  average_of_age: 'Độ tuổi trung bình',
  rating: 'Đánh giá',
}

const MESSAGE = {
  fail: 'Đã có lỗi xảy ra, vui lòng thử lại!',
  success: 'Thao tác thành công!',
  warning: '',
  empty: 'Vui lòng nhập đầy đủ thông tin!',
}

const NUMBER = {
  page_limit: 15,
}

const GENDER = {
  MALE: 1,
  FEMALE: 2,
  male: 'Nam',
  female: 'Nữ',
}

const TYPE_ACTION = {
  CONFIRM: 1,
  confirm_title: 'duyệt',
  REJECT: 3,
  reject_title: 'từ chối',
  ACTIVE: 4,
  active_title: 'kích hoạt',
  UNACTIVE: 5,
  unactive_title: 'ngừng hoạt động',
  DELETE: 6,
  delete_title: 'xóa',
}

const LABLE_BUTTON_SEARCH = {
  label: 'Tìm kiếm',
  variant: 'success',
}

const LABLE_BUTTON_CLEARSEARCH = {
  label: 'Xóa tìm kiếm',
  variant: 'secondary',
}

const LABLE_BUTTON_ADD = {
  label: 'Thêm mới',
  variant: 'primary',
}
const LABLE_BUTTON_SYNCHRONIZED = {
  label: 'Đồng bộ',
  variant: 'danger',
}
const LABLE_BUTTON_REJECT = {
  label: 'Từ chối',
  variant: 'danger',
}

const LABLE_BUTTON_CONFIRM = {
  label: 'Duyệt',
  variant: 'warning',
}

const LABLE_BUTTON_ACTIVE = {
  label: 'Kích hoạt',
  variant: 'success',
}

const LABLE_BUTTON_UNACTIVE = {
  label: 'Ngừng hoạt động',
  variant: 'danger',
}

const TYPE_INPUT = {
  text: 1,
  select: 2,
  multiselect: 3,
  radio: 4,
  number: 5,
}

const ROLE = { 1: 'Quản trị viên', 2: 'Nhà tuyển dụng', 3: 'Ứng viên' }

const STATUS_RECRUITMENT = { 0: 'Chờ duyệt', 1: 'Đang hiển thị', 2: 'Đã hết hạn', 3: 'Từ chối' }

const ROLE_TYPE = {
  ADMIN: 1,
  RECRUITMENT: 2,
  APPLICANT: 3,
}

const STATUS = {
  ACTIVE: 1,
  UNACTIVE: 2,
}
const EXP_TYPE = [
  { value: 0, lable: 'Chưa có kinh nghiệm' },
  { value: 1, lable: '1 năm' },
  { value: 2, lable: '2 năm' },
  { value: 3, lable: '3 năm' },
  { value: 4, lable: '4 năm' },
  { value: 5, lable: '5 năm' },
  { value: 6, lable: 'Trên 5 năm' },
]

const JOB_TYPE = [
  { value: 1, lable: 'Toàn thời gian' },
  { value: 2, lable: 'Bán thời gian' },
  { value: 3, lable: 'Thực tập' },
  { value: 4, lable: 'Remote - Làm việc từ xa' },
]

export {
  ROUTER,
  STRING,
  NUMBER,
  GENDER,
  MESSAGE,
  TYPE_ACTION,
  TYPE_INPUT,
  LABLE_BUTTON_SEARCH,
  LABLE_BUTTON_ADD,
  LABLE_BUTTON_SYNCHRONIZED,
  LABLE_BUTTON_REJECT,
  LABLE_BUTTON_CONFIRM,
  LABLE_BUTTON_CLEARSEARCH,
  LABLE_BUTTON_ACTIVE,
  LABLE_BUTTON_UNACTIVE,
  ROLE,
  ROLE_TYPE,
  STATUS,
  STATUS_RECRUITMENT,
  EXP_TYPE,
  JOB_TYPE,
}
