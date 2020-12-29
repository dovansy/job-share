import { STRING } from '@constants/Constant'
import React, { Component } from 'react'

export default class Topic extends Component {
  renderContent(data) {
    return (
      <div>
        {data?.map((item, index) => (
          <p key={index}>{item.topic}</p>
        ))}
      </div>
    )
  }
  renderTitle(title, data) {
    return (
      <>
        <div className="col-6">
          {title?.map((item, index) => (
            <h6 className="my-3 mb-4" key={index}>
              {item.title}
            </h6>
          ))}
          {this.renderContent(data)}
        </div>
      </>
    )
  }

  render() {
    const data = [
      {
        topic: 'Tìm việc làm',
      },
      // {
      //   topic: 'Hướng dẫn viết CV',
      // },
      // {
      //   topic: 'Tư vấn sửa CV',
      // },
      {
        topic: 'Thiết kế CV',
      },
      // {
      //   topic: 'Bài viết tham khảo',
      // },
    ]

    const dataRecuitment = [
      // {
      //   topic: 'Doanh nghiệp',
      // },
      // {
      //   topic: 'Trường đại học',
      // },
      {
        topic: 'Tuyển dụng miễn phí',
      },
      // {
      //   topic: 'Công ty liên kết',
      // },
      // {
      //   topic: 'Job Share Việt Nam',
      // },
    ]

    const dataJobShare = [
      {
        topic: 'Giới thiệu',
      },
      {
        topic: 'Tuyển dụng',
      },
      // {
      //   topic: 'Liên hệ',
      // },
      // {
      //   topic: 'Hỏi đáp',
      // },
    ]

    const dataJobShareRule = [
      // {
      //   topic: 'Chính sách bảo mật',
      // },
      // {
      //   topic: 'Điều khoản dịch vụ',
      // },
      // {
      //   topic: 'Quy chế hoạt động',
      // },
    ]

    const applicant = [
      {
        title: STRING.applicant,
      },
    ]
    const recruitment = [
      {
        title: STRING.recruitment,
      },
    ]

    return (
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-7 row pt-4" style={{ boxShadow: 'inset -30px 1px 30px -16px #eee' }}>
              {this.renderTitle(applicant, data)}
              {this.renderTitle(recruitment, dataRecuitment)}
            </div>
            <div className="col-12 col-md-5 row pl-5 pt-3">
              <div className="col-7">
                <img src={require('@src/assets/job-share.png')} style={{ objectFit: 'contain', maxWidth: '100%' }} />
                {/* <div className="ml-5">{this.renderContent(dataJobShare)}</div> */}
              </div>
              <div className="col-5">
                {/* <img
                  src={require('@src/assets/logo-google-for-startup.webp')}
                  className="mt-5 pt-3"
                  style={{ objectFit: 'contain' }}
                /> */}
                <div className="ml-5">{this.renderContent(dataJobShare)}</div>
                <div className="mt-5 pt-3">{this.renderContent(dataJobShareRule)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
