import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './HeaderRecruitment.css'
class ContentHeader extends Component {
  render() {
    return (
      <div style={{ width: '100%', height: 'auto' }}>
        <div className="container">
          <div>
            <div className="text-align-center">
              <div clasName="header--content__title">
                <h1 style={{ fontSize: 40, fontFamily: 'sans-serif', fontWeight: 300 }}>
                  Đăng tin tuyển dụng & tìm hồ sơ hiệu quả trên JobShare
                </h1>
              </div>
            </div>
            <div className="header--content__title__h2">
              <h5 style={{ fontSize: 24, fontFamily: 'sans-serif', fontWeight: 300 }}>
                Đăng tin tuyển dụng miễn phí, tiếp cận ứng viên dễ dàng!
              </h5>
            </div>
            <div className="col-12 text-center">
              <Link to="/nha-tuyen-dung-tin-tuyen-dung">
                <button type="button" className="btn btn-primary">
                  Đăng tin tuyển dụng
                </button>
              </Link>
              <Link to="/nha-tuyen-dung-tim-ung-vien">
                <button type="button" className="btn btn-success">
                  Tìm kiếm ứng viên
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default ContentHeader
