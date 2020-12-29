import React, { Component } from 'react'
import './RecruitmentScreen.css'

export default class ContentPageRecruitment extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="col-xs-12">
            <h4 className="block-title">Tại sao doanh nghiệp chọn JobShare</h4>
          </div>
          <div className="row">
            <div className="stat col-md-3 col-sm-6">
              <div className="number">1000+</div>
              <div className="title">Lượt ứng viên truy cập hàng tháng</div>
            </div>
            <div className="stat col-md-3 col-sm-6">
              <div className="number">50%</div>
              <div className="title">1+ năm kinh nghiệm</div>
            </div>
            <div className="stat col-md-3 col-sm-6">
              <div className="number">80%</div>
              <div className="title">Sinh viên mới tốt nghiệp</div>
            </div>
            <div className="stat col-md-3 col-sm-6">
              <div className="number">75%</div>
              <div className="title">Chủ động tìm việc</div>
            </div>
          </div>
          <div className="row service">
            <div className="col-md-6">img</div>
            <div className="col-md-6">
              <h3>Tìm kiếm Ứng viên thuận tiện</h3>
              <div
                className="my-3"
                style={{ backgroundColor: '#444', height: 6, width: 40, bottom: -30, left: 0 }}
              ></div>
              <p>
                - <strong>Hồ sơ người tìm việc</strong> : cập nhật liên tục. Mỗi tháng có nhiều ứng viên cập nhật CV
                trên JobShare.
              </p>
              <p> - Nhà tuyển dụng tìm kiếm ứng viên theo Quận/Huyện, vị trí cần tuyển</p>
              <a className="btn1 btn-success" style={{ textDecoration: 'none', color: 'white' }}>
                Đăng ký ngay
              </a>
            </div>
          </div>
          <div className="row service">
            <div className="col-md-6">
              <h3>Đăng tin Tuyển dụng Miễn phí</h3>
              <div
                className="my-3"
                style={{ backgroundColor: '#444', height: 6, width: 40, bottom: -30, left: 0 }}
              ></div>
              <p>- Đăng tin tuyển dụng miễn phí.</p>
              <p>- Tiếp cận với 1000+ ứng viên.</p>
              <p>- Đăng tin dễ dàng, không quá 1 phút.</p>
              <a className="btn1 btn-success" style={{ textDecoration: 'none', color: 'white' }}>
                Đăng ký ngay
              </a>
            </div>
            <div className="col-md-6">
              <a>logo</a>
            </div>
          </div>
        </div>
        <div id="highlight" className="mt-5">
          <div className="container">
            <div className="row">
              <div className="col-sm-7">
                <div className="message">Tìm kiếm ứng viên ngay bây giờ</div>
              </div>
              <div className="col-sm-5">
                <a href="" className="btn btn-success">
                  Tìm kiếm Ứng Viên
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
