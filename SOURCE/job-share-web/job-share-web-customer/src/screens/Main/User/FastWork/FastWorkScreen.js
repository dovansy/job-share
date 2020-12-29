import React, { Component } from 'react'
import { ROUTER } from '@constants/Constant'
import Header from '@src/components/Common/Header/Header'

class FastWorkScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numberLogoCompany: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8],
    }
  }
  render() {
    return (
      <>
        <Header />
        <div className="container-fluid" style={{ backgroundColor: '#f6fbf9' }}>
          <div className="container">
            <div className="row m-0">
              <div className="col-12 col-lg-7 p-2" style={{ lineHeight: '24px' }}>
                <h1 style={{ lineHeight: '1.9' }}>CÓ VIỆC SIÊU TỐC</h1>
                <i>
                  <h3 style={{ lineHeight: '1.3' }}>CẬP NHẬT CV NHANH - BẬT ĐÈN XANH CHO NHÀ TUYỂN DỤNG</h3>
                </i>
                <p className="my-3" style={{ fontSize: '18px' }}>
                  <b>Gửi CV tới 95.000+ Nhà tuyển dụng ngay tức thì</b>
                </p>

                <div
                  className="mt-4 p-2 btn-success"
                  style={{
                    border: '1px solid green',
                    borderRadius: '25px',
                    width: '170px',
                    textAlign: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <a href={ROUTER.SEARCH_JOB} style={{ fontSize: '16px', color: 'white', textDecoration: 'none' }}>
                    Tham gia ngay
                  </a>
                </div>
              </div>
              <div className="col-12 col-lg-5 mt-1 p-3 text-center">
                <img
                  src={require('@src/assets/image_vieclamsieutoc.webp')}
                  style={{ maxWidth: '60%', height: 'auto', backgroundSize: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid mt-3 py-0 mx-0" style={{ backgroundColor: '##f0f0f0' }}>
          <div className="container">
            <div className="row m-0">
              <div className="my-4 text-center col-12">
                <h3>
                  <strong>CÁCH THỨC JOPSHARE KẾT NỐI BẠN VỚI NHÀ TUYỂN DỤNG PHÙ HỢP</strong>
                </h3>
              </div>
              {/* buoc 1 */}
              <div className="d-flex row" style={{ height: 'auto', alignItems: 'center' }}>
                <div className="col-12 col-lg-6 mt-2 text-center">
                  <img src={require('@src/assets/image_b1.webp')} style={{ maxWidth: '100%' }} />
                </div>
                <div className="col-12 col-lg-6 row  mt-2">
                  <div className=" col-12 col-lg-4 text-center mt-2">
                    <img src={require('@src/assets/icon_b1.webp')} style={{ maxWidth: '100%' }} />
                  </div>
                  <div className=" col-12 col-lg-8 mt-2">
                    <h5 style={{ lineHeight: '1.5' }}>Tải CV lên và với trạng thái Đang tìm việc</h5>
                    <p style={{ lineHeight: '1.5', fontSize: '16px' }}>
                      JobShare sẽ giúp bạn review và hoàn thiện CV, tăng sức hấp dẫn với Nhà tuyển dụng
                    </p>
                  </div>
                </div>
              </div>
              {/* buoc 2 */}
              <div className="d-flex mt-3 row" style={{ height: 'auto', alignItems: 'center' }}>
                <div className="col-12 col-lg-6 row mt-2">
                  <div className="col-12 col-lg-4 text-center mt-2">
                    <img src={require('@src/assets/icon_b2.webp')} style={{ maxWidth: '100%' }} />
                  </div>
                  <div className="col-12 col-lg-8 mt-2">
                    <h5 style={{ lineHeight: '1.5' }}>
                      Hệ thống tự động gửi hồ sơ của bạn tới các Nhà tuyển dụng phù hợp
                    </h5>
                    <p style={{ lineHeight: '1.5', fontSize: '16px' }}>
                      CV của bạn sẽ gửi tới các Nhà tuyển dụng uy tín đã được JobShare xác thực
                    </p>
                  </div>
                </div>
                <div className="col-12 col-lg-6 mt-2 text-center">
                  <img src={require('@src/assets/image_buoc2.webp')} style={{ maxWidth: '100%' }} />
                </div>
              </div>
              {/* buoc 3 */}
              <div className="d-flex mt-3 row" style={{ height: 'auto', alignItems: 'center' }}>
                <div className="col-12 col-lg-6 mt-2 text-center">
                  <img src={require('@src/assets/image_buoc3.webp')} style={{ maxWidth: '100%' }} />
                </div>
                <div className="col-12 col-lg-6 row mt-2 mx-auto">
                  <div className="col-12 col-lg-4 text-center mt-2">
                    <img src={require('@src/assets/icon_b3.webp')} style={{ maxWidth: '100%' }} />
                  </div>

                  <div className="col-12 col-lg-8 mt-2">
                    <h5 style={{ lineHeight: '1.5' }}>
                      Nhận cuộc gọi từ Nhà tuyển dụng để được giới thiệu về công việc và hẹn phỏng vấn
                    </h5>
                    <p style={{ lineHeight: '1.5', fontSize: '16px' }}>
                      95.000+ Nhà tuyển dụng trên JobShare sẵn sàng xem CV của bạn
                    </p>
                  </div>
                </div>
              </div>

              {/* tham gia */}
              <div className="col-12 mt-4">
                <div
                  className="p-2 btn-success"
                  style={{
                    border: '1px solid green',
                    borderRadius: '25px',
                    width: '170px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    margin: 'auto',
                  }}
                >
                  <a href={ROUTER.SEARCH_JOB} style={{ fontSize: '16px', color: 'white', textDecoration: 'none' }}>
                    Tham gia ngay
                  </a>
                </div>
              </div>

              <div className="row mt-3 py-0" style={{ backgroundColor: '#f5f8fa' }}>
                <div className="container">
                  <div className="row m-0">
                    <div className="my-3 text-center col-12">
                      <h5>GIÁ TRỊ BẠN NHẬN ĐƯỢC</h5>
                    </div>
                    <div className="col-12 col-md-7 pt-5">
                      <p style={{ fontSize: '20px', lineHeight: '1.7' }}>
                        Không mất thời gian ứng tuyển và chọn lọc công việc phù hợp
                      </p>
                      <p style={{ fontSize: '20px', lineHeight: '1.7' }}>
                        Tăng cơ hội kết nối Nhà tuyển dụng cùng một thời điểm
                      </p>
                      <p style={{ fontSize: '20px', lineHeight: '1.7' }}>
                        Hiểu hơn về công việc qua công cụ chat trực tiếp với Nhà tuyển dụng (đang phát triển)
                      </p>
                    </div>
                    <div className="col-12 col-md-5 mt-1 p-3 text-center">
                      <img
                        src={require('@src/assets/image_001.webp')}
                        style={{ maxWidth: '70%', height: 'auto', backgroundSize: 'cover' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-3 py-0" style={{ backgroundColor: '#f0f0f0' }}>
                <div className="container">
                  <div className="row m-0 py-2">
                    <div className="my-3 text-center col-12">
                      <h5>NẾU BẠN LÀ NHÀ TUYỂN DỤNG</h5>
                    </div>
                    <div className="col-12 col-md-6 mt-1 p-3 text-center">
                      <img
                        src={require('@src/assets/image_001.webp')}
                        style={{ maxWidth: '70%', height: 'auto', backgroundSize: 'cover' }}
                      />
                    </div>
                    <div className="col-12 col-md-6 pt-5">
                      <p style={{ fontSize: '20px', lineHeight: '1.7' }}>
                        Xem và liên hệ ứng viên đang tìm việc MIỄN PHÍ
                      </p>
                      <p style={{ fontSize: '20px', lineHeight: '1.7' }}>Tạo nguồn ứng viên chất lượng</p>
                      <p style={{ fontSize: '20px', lineHeight: '1.7' }}>Gia tăng thương hiệu tuyển dụng</p>
                      <div
                        className="mt-4 p-2 btn-success "
                        style={{
                          border: '1px solid green',
                          borderRadius: '25px',
                          width: '150px',
                          textAlign: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <a
                          href={ROUTER.RECRUITMENT}
                          style={{ fontSize: '16px', color: 'white', textDecoration: 'none' }}
                        >
                          Đăng kí ngay
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="row mt-3 py-0" style={{ backgroundColor: '#f0f0f0' }}>
                <div className="container">
                  <div className="row m-0 pb-3">
                    <div className="text-center my-3 col-12">
                      <h3>NHÀ TUYỂN DỤNG NỔI BẬT</h3>
                    </div>
                    <div className="d-flex justify-content-between row mx-0 px-2">
                      {this.state.numberLogoCompany?.map((item) => (
                        <div className="col-6 col-sm-4 col-md-2 mt-2">
                          <img src={require('@src/assets/Company2.webp')} style={{ maxWidth: '100%' }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div> */}

              <div className="text-center my-4 col-12">
                <h5>HOTLINE LIÊN HỆ</h5>
              </div>
              <div className="col-12 col-md-6 my-3 text-center">
                <p>
                  <strong>Hotline dành cho ứng viên</strong>
                </p>
                <p>
                  <strong>Điện thoại: (024) 8888 8888</strong>
                </p>
                <p>
                  <strong>Email: hotro@JobShare.vn</strong>
                </p>
              </div>
              <div className="col-12 col-md-6 my-3 text-center">
                <p>
                  <strong>Hotline dành cho Nhà tuyển dụng</strong>
                </p>
                <p>
                  <strong>Điện thoại: (024) 999 99 999</strong>
                </p>
                <p>
                  <strong>Email: cskh@JobShare.vn</strong>
                </p>
              </div>
              <div className="text-center my-3 col-12">
                <p>© 2020 Nền tảng được phát triển và bảo trợ bởi job-share</p>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default FastWorkScreen
