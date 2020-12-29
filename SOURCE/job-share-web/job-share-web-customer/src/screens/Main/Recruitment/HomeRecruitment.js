import React, { Component } from 'react'
import { connect } from 'react-redux'
import Footer from 'src/components/Common/Footer/Footer'
import HeaderLogin from 'src/components/recruitmentComponents/header/HeaderLogin'
import TabListRecruitment from 'src/components/recruitmentComponents/home/TabListRecruitment'
import reactotron from 'src/debug/ReactotronConfig'
import Loading from 'src/components/Loading'
import * as API from '@constants/Api'
import './HomeRecruitment.css'
import { STATUS } from '@constants/Constant'

class HomeRecruitment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      data: '',
    }
  }
  componentDidMount() {
    this.overViewRecruitment()
  }

  async overViewRecruitment() {
    this.setState({
      isLoading: true,
    })
    try {
      const res = await API.overViewRecruitment()
      if (res.status === STATUS.ACTIVE) {
        this.setState({
          isLoading: false,
          data: res.data,
        })
      }
    } catch (error) {
      this.setState({
        isLoading: false,
      })
    }
  }

  render() {
    const { data, isLoading } = this.state
    return (
      <div>
        {isLoading && <Loading />}
        <div style={{ borderBottom: '0.1px solid #E7E7E7' }}>
          <HeaderLogin />
        </div>
        <div className="py-3" style={{ backgroundColor: '#EEF1F5' }}>
          <div className="container bg-white pt-4 px-5">
            <div style={{ borderBottom: '2px solid #E0EFF3' }}>
              <p className="mb-1" style={{ fontSize: 22 }}>
                Thống kê
              </p>
            </div>
            <div className="row px-3" style={{ justifyContent: 'space-between' }}>
              <div className="my-3 col-xs-4">
                <div style={{ color: '#555', fontSize: 14, marginBottom: 5, fontWeight: 700 }}>Tổng số ứng viên</div>
                <div className="number--recruitment text-default--recruitment">{data?.all_applicant || 0}</div>
              </div>
              <div className="my-3 col-xs-4">
                <div style={{ color: '#555', fontSize: 14, marginBottom: 5, fontWeight: 700 }}>
                  Số ứng viên đang tìm việc
                </div>
                <div className="number--recruitment text-warning--recruitment">{data?.applicant_job_search || 0}</div>
              </div>
              <div className="my-3 col-xs-4">
                <div style={{ color: '#555', fontSize: 14, marginBottom: 5, fontWeight: 700 }}>
                  Tổng số tin tuyển dụng
                </div>
                <div className="number--recruitment text-err--recreuitment">{data?.all || 0}</div>
              </div>
            </div>
            <div className="my-5 text-center">
              <div>
                <a href="nha-tuyen-dung-tim-ung-vien" className="btn-search">
                  <i className="fa fa-search"></i> Tìm ứng viên ngay
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

// const mapStateToProps = (state) => ({
//   userInfoState: state.userReducer,
// })

// export default connect(mapStateToProps, null)(HomeRecruitment)
export default HomeRecruitment
