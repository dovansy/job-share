import React, { Component } from 'react'
import { ROUTER, STATUS } from '@constants/Constant'
import Header from '@src/components/Common/Header/Header'
import Footer from 'src/components/Common/Footer/Footer'
import Loading from 'src/components/Loading'
import StarRatings from 'react-star-ratings'
import * as API from '@constants/Api'
import './CompanyScreen.css'
import reactotron from 'src/debug/ReactotronConfig'
import empty from '../../../../assets/empty.svg'
import Cookie from 'js-cookie'
import { Button } from 'react-bootstrap'
import swal from 'sweetalert'

class CompanyDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activePage: 1,
      isLoading: false,
      rating: 0,
      company_info: '',
      status_rating: false,
    }
  }
  componentDidMount() {
    this.getInfoCompany()
  }

  async getInfoCompany() {
    this.setState({
      isLoading: true,
    })
    const {
      match: { params },
    } = this.props
    try {
      const res = await API.getInfoCompany({
        company_id: parseInt(params.id),
      })
      if (res.status === STATUS.ACTIVE) {
        this.setState({
          isLoading: false,
          company_info: res.data,
        })
      }
    } catch (error) {
      this.setState({
        isLoading: false,
      })
    }
  }

  async createReview() {
    this.setState({
      isLoading: true,
    })
    const { company_info, rating } = this.state
    if (!Cookie.get('SESSION_ID_APPLICANT')) {
      this.setState({ isLoading: false }, () => {
        swal({
          title: 'Vui lòng đăng nhập !',
          icon: 'warning',
        })
      })
    } else {
      try {
        const res = await API.createReview({
          company_id: company_info?.company?.id,
          rating: rating,
        })
        if (res.status === STATUS.ACTIVE) {
          this.setState(
            {
              isLoading: false,
            },
            () =>
              swal({
                title: 'Đánh giá thành công',
                icon: 'success',
              })
          )
        }
      } catch (error) {
        this.setState({
          isLoading: false,
        })
      }
    }
  }

  handleChange = (fieldName, value) => {
    this.setState({
      ...this.state,
      [fieldName]: value || '',
    })
  }

  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      this.getListCompany()
    }
  }

  changeRating = (newRating, name) => {
    this.setState({
      rating: newRating,
    })
  }

  render() {
    const { isLoading, company_info, status_rating, rating } = this.state
    return (
      <>
        <Header />
        {isLoading && <Loading />}
        <div className="container-fluid" style={{ backgroundColor: '#F6F6F6' }}>
          <div className="container bg-white ">
            <div
              className="company--logo pt-2"
              style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}
            >
              <img
                src={company_info?.company?.image || require('../../../../assets/job2.png')}
                width="130"
                height="130"
                style={{ objectFit: 'contain', marginRight: 15 }}
              />
              <div style={{ display: 'inline' }}>
                <h3
                  className="my-3"
                  style={{ textAlign: 'center', fontWeight: 700, color: '#00b14f', textTransform: 'uppercase' }}
                >
                  {company_info?.company?.name}
                </h3>
                <div>
                  Website : <a href={company_info?.company?.url}>{company_info?.company?.url}</a>
                </div>
                <div>
                  Địa chỉ : <a>{company_info?.company?.address}</a>
                </div>
              </div>
            </div>
            <hr />
            <div className="company--des row mx-2" style={{ justifyContent: 'center', display: 'flex' }}>
              <div className="col-sm-12 col-md-7">
                <div>
                  <h5>Giới Thiệu về công ty</h5>
                </div>
                <div style={{ fontSize: 16 }}>{company_info?.company?.description}</div>
              </div>
              <div className="col-sm-12 col-md-5" style={{ justifyContent: 'center' }}>
                <div style={{ justifyContent: 'center', display: 'flex' }}>
                  <h5>Đánh giá</h5>
                </div>

                <div className="mt-3" style={{ textAlign: 'center' }}>
                  <StarRatings
                    rating={company_info?.company?.rating || 0}
                    starRatedColor="#E68619"
                    numberOfStars={5}
                    name="rating"
                    starDimension="30px"
                    starSpacing="3px"
                  />
                </div>
                <div className="row mt-3" style={{ justifyContent: 'center' }}>
                  <button
                    className="px-3 py-2 review-btn"
                    style={{ color: 'white', backgroundColor: '#035799', border: 'none' }}
                    onClick={() =>
                      this.setState({
                        status_rating: true,
                      })
                    }
                  >
                    Tạo đánh giá
                  </button>
                </div>
                {status_rating && (
                  <>
                    <div className="mt-3" style={{ textAlign: 'center' }}>
                      <StarRatings
                        rating={rating}
                        starRatedColor="#E68619"
                        changeRating={this.changeRating}
                        numberOfStars={5}
                        name="rating"
                        starDimension="30px"
                        starSpacing="3px"
                      />
                    </div>
                    <div className="row mt-3" style={{ justifyContent: 'center' }}>
                      <button
                        className="px-3 py-2 review-btn"
                        style={{ color: 'white', backgroundColor: '#035799', border: 'none' }}
                        onClick={() =>
                          this.setState(
                            {
                              status_rating: false,
                            },
                            () => this.createReview()
                          )
                        }
                      >
                        Gửi đánh giá
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            <hr />
            <div className="pb-3 mx-2">
              <div className="col-12">
                <div>
                  <h5>Danh sách tin tuyển dụng</h5>
                </div>
                <div style={{ justifyContent: 'center', display: 'flex', textAlign: 'center' }}>
                  <div>
                    <img src={empty} style={{ width: 380, height: 160, margin: '50px auto' }} />
                    <p>Không có tin tuyển dụng nào!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}
export default CompanyDetail
