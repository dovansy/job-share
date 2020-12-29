import React, { Component } from 'react'
import { JOB_TYPE, STATUS, STRING, GENDER_TYPE, EXP_TYPE, SALARY_TYPE } from '@constants/Constant'
import * as API from '@constants/Api'
import Footer from 'src/components/Common/Footer/Footer'
import HeaderLogin from 'src/components/recruitmentComponents/header/HeaderLogin'
import TabListRecruitment from 'src/components/recruitmentComponents/home/TabListRecruitment'
import TabNewRecruitment from '../../../components/recruitmentComponents/home/TabNewRecruitment'
import './HomeRecruitment.css'

class Recruiement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tab_active: 1,
      user_info: '',
    }
  }

  componentDidMount() {
    this.getUserInfo()
  }

  async getUserInfo() {
    this.setState({
      isLoading: true,
    })
    try {
      const res = await API.getUserInfo()
      if (res.status === STATUS.ACTIVE) {
        this.setState({
          isLoading: false,
          user_info: res.data,
        })
      }
    } catch (error) {
      this.setState({
        isLoading: false,
      })
    }
  }

  render() {
    const { tab_active, user_info } = this.state
    return (
      <div>
        <div style={{ borderBottom: '0.1px solid #E7E7E7' }}>
          <HeaderLogin />
          {/* <HeaderLogin user_info={user_info?.user_profile?.name} /> */}
        </div>
        <div>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="tabbable-panel">
                  <div className="tabbable-line">
                    <ul className="nav nav-tabs ">
                      <li
                        className={tab_active === 1 ? 'active tab--menu p-1' : 'tab--menu p-1'}
                        onClick={() =>
                          this.setState({
                            tab_active: 1,
                          })
                        }
                      >
                        <a href="#tab_default_1" data-toggle="tab" className="tab--menu__text">
                          Danh sách tin tuyển dụng
                        </a>
                      </li>
                      <li
                        className={tab_active === 2 ? 'active tab--menu p-1' : 'tab--menu p-1'}
                        onClick={() =>
                          this.setState({
                            tab_active: 2,
                          })
                        }
                      >
                        <a href="#tab_default_2" data-toggle="tab" className="tab--menu__text">
                          Đăng tin tuyển dụng
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-3" style={{ backgroundColor: '#EEF1F5' }}>
            <div className="container">
              <div className="tab-content">
                <div className="tab-pane active" id="tab_default_1">
                  <TabListRecruitment />
                </div>
                <div className="tab-pane" id="tab_default_2">
                  <TabNewRecruitment />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
export default Recruiement
