const ROUTER = {
  // nha tuyen dung
  RECRUITMENT: '/nha-tuyen-dung',
  HOME_RECRUITMENT: '/nha-tuyen-dung-trang-chu',
  LOGIN_RECRUITMENT: '/nha-tuyen-dung-dang-nhap',
  REGISTER_RECRUITMENT: '/nha-tuyen-dung-dang-ky',
  NEWS_RECRUITMENT: '/nha-tuyen-dung-tin-tuyen-dung',
  SEARCH_APPLICANT: '/nha-tuyen-dung-tim-ung-vien',
  CHANGE_INFO_COMPANY: '/nha-tuyen-dung-sua-thong-tin-cong-ty',
  // ung vien
  LOGIN_APPLICANT: '/ung-vien-dang-nhap',
  APPLICANT: '/ung-vien',
  COMPANY_SHOW: '/danh-sach-cong-ty',
  COMPANY_DETAIL: '/chi-tiet-cong-ty',
  MANAGER_CV: '/quan-ly-cv',
  FAST_JOB: '/co-viec-sieu-toc',
  SEARCH_JOB: '/tim-viec-lam',
}
const STRING = {
  applicant: 'Ứng viên',
  about: 'Về JobShare',
  template: 'Mẫu CV',
  work: 'Công việc',
  company: 'Công ty',
  sex: 'Giới tính',
  fullName: 'Họ và tên',
  phoneNumber: 'Số điện thoại',
  password: 'Mật khẩu',
  email: 'Email',
  position: 'Vị trí công tác',
  work_location: 'Địa điểm làm việc',
  complete: 'Hoàn tất',
  choose_province: 'Chọn tỉnh/thành phố',
  choose_district: 'Quận/huyện',
  recruitment: 'Nhà tuyển dụng',
  deadline: 'Hạn đăng ký',
}
const LABLE_BUTTON_SEARCH = {
  lable: 'Tìm kiếm',
  variant: 'success',
  style: '',
}

const LABLE_BUTTON_CLEARSEARCH = {
  lable: 'Xóa tìm kiếm',
  variant: 'secondary',
  style: '',
}

const LABLE_BUTTON_ADD = {
  lable: 'Thêm mới',
  variant: 'primary',
  style: '',
}

const TYPE_INPUT = {
  text: 1,
  select: 2,
  multiselect: 3,
  radio: 4,
  number: 5,
  total_type: 6,
}

const MESSAGE = {
  fail: 'Đã có lỗi xảy ra, vui lòng thử lại!',
  success: 'Thao tác thành công!',
  warning: '',
  empty: 'Vui lòng nhập đầy đủ thông tin!',
}

const ROLE_TYPE = {
  ADMIN: 1,
  RECRUITMENT: 2,
  APPLICANT: 3,
}

const STATUS = {
  ACTIVE: 1,
  UNACTIVE: 2,
}

const JOB_TYPE = [
  { value: 1, lable: 'Toàn thời gian' },
  { value: 2, lable: 'Bán thời gian' },
  { value: 3, lable: 'Thực tập' },
  { value: 4, lable: 'Remote - Làm việc từ xa' },
]

const GENDER_TYPE = [
  { value: 0, lable: 'Không yêu cầu' },
  { value: 1, lable: 'Nam' },
  { value: 2, lable: 'Nữ' },
]

const EXP_TYPE = [
  { value: 0, lable: 'Chưa có kinh nghiệm' },
  { value: 1, lable: '1 năm' },
  { value: 2, lable: '2 năm' },
  { value: 3, lable: '3 năm' },
  { value: 4, lable: '4 năm' },
  { value: 5, lable: '5 năm' },
  { value: 6, lable: 'Trên 5 năm' },
]

const SALARY_TYPE = [
  { value: '', lable: 'Thỏa thuận' },
  { value: 1, lable: 'Từ' },
  { value: 2, lable: 'Đến' },
  { value: 3, lable: 'Trong khoảng' },
]

export {
  MESSAGE,
  ROUTER,
  STRING,
  LABLE_BUTTON_SEARCH,
  LABLE_BUTTON_ADD,
  LABLE_BUTTON_CLEARSEARCH,
  TYPE_INPUT,
  ROLE_TYPE,
  STATUS,
  JOB_TYPE,
  GENDER_TYPE,
  EXP_TYPE,
  SALARY_TYPE,
}
