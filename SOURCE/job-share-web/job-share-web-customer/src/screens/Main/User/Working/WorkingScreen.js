import React, { Component } from 'react'
import { ROUTER, STATUS, EXP_TYPE, JOB_TYPE } from '@constants/Constant'
import Footer from 'src/components/Common/Footer/Footer'
import BestWork from './Components/BestWork/BestWork'
import HotWork from './Components/HotWork/HotWork'
import Header from '@src/components/Common/Header/Header'
import WrapperTypeWork from './Components/WrapperTypeWork/WrapperTypeWork'
import Select from 'react-select'
import './WorkingScreen.css'
import Loading from 'src/components/Loading'
import StarRatings from 'react-star-ratings'
import Cookie from 'js-cookie'
import * as API from '@constants/Api'
import reactotron from 'src/debug/ReactotronConfig'
import ReactPaginate from 'react-paginate'
import { Col, FormControl, Modal, Row } from 'react-bootstrap'
import { toDateString } from 'src/utils/helper'
import empty from '../../../../assets/empty.svg'
import swal from 'sweetalert'

class WorkingScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      search: '',
      list_location: [],
      location: '',
      list_career: [],
      career: '',
      activePage: 1,
      status_search: '',
      paging: '',
      showModalSendEmail: false,
      showModal: false,
      from: '',
      to: '',
      subject: '[CV SEND FROM JOBSHARE]',
      text: '',
      file: null,
      job_id: '',
    }
  }

  componentDidMount() {
    this.getListProvince()
    this.getListProsition()
  }

  async getListProvince() {
    this.setState({
      isLoading: true,
    })
    try {
      const res = await API.getListProvince()
      this.setState({
        isLoading: false,
        list_location: res.data.map(
          (value) =>
            new Object({
              value: value.id,
              label: value.name,
            })
        ),
      })
    } catch (error) {
      this.setState({ isLoading: false })
    }
  }

  async getListProsition() {
    this.setState({
      isLoading: true,
    })
    try {
      const res = await API.getListPosition()
      this.setState({
        isLoading: false,
        list_career: res.data.map(
          (value) =>
            new Object({
              value: value.id,
              label: value.position,
            })
        ),
      })
    } catch (error) {
      this.setState({ isLoading: false })
    }
  }

  async getListJob() {
    this.setState({
      status_search: 1,
      isLoading: true,
    })
    const { search, activePage, status_id, career, location } = this.state
    try {
      const res = await API.getListJob({
        page: activePage,
        search: search,
        status_id: STATUS.ACTIVE,
        from_date: '',
        to_date: '',
        position_id: career?.value || '',
        province_id: location?.value || '',
      })
      if (res.status === 1) {
        this.setState({
          isLoading: false,
          listJob: res.data,
          paging: res.paging,
        })
      }
    } catch (error) {
      this.setState({ isLoading: false })
    }
  }

  async getJobInfo(id) {
    this.setState({
      isLoading: true,
    })
    try {
      const res = await API.getJobDetail({
        job_id: parseInt(id),
      })
      if (res.status === STATUS.ACTIVE) {
        this.setState({
          isLoading: false,
          job_detail: res?.data,
          to: res?.data?.user?.company?.email,
          from: '',
          job_id: res.data.job_id,
        })
      }
    } catch (error) {
      this.setState({
        isLoading: false,
      })
    }
  }

  async sendEmail() {
    this.setState({
      isLoading: true,
    })
    const { from, to, text, subject, file, job_id } = this.state
    let token = Cookie.get('SESSION_ID_APPLICANT')
    if (!token) {
      this.setState(
        {
          isLoading: false,
        },
        () =>
          swal({
            title: 'Vui lòng đăng nhập!',
            icon: 'warning',
          })
      )
      return
    } else if (file && from && to && text) {
      try {
        const formData = new FormData()
        formData.append('from', from)
        formData.append('to', to)
        formData.append('subject', subject)
        formData.append('text', text)
        formData.append('file', file)
        formData.append('job_id', job_id)
        const res = await API.sendEmail(formData)
        if (res.status === STATUS.ACTIVE) {
          this.setState(
            {
              isLoading: false,
              showModalSendEmail: false,
            },
            () =>
              swal({
                title: 'Gửi Cv thành công',
                icon: 'success',
              })
          )
        }
      } catch (error) {
        this.setState({
          isLoading: false,
        })
      }
    } else {
      this.setState(
        {
          isLoading: false,
        },
        () =>
          swal({
            title: 'Vui lòng nhập đầy đủ thông tin',
            icon: 'warning',
          })
      )
    }
  }

  handleChange(fieldName, value) {
    this.setState({
      ...this.state,
      [fieldName]: value || '',
    })
  }

  handleChangeSelect(fieldName, value) {
    this.setState({ [fieldName]: value }, () => this.getListJob())
  }

  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      this.getListJob()
    }
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected
    this.setState(
      {
        activePage: selectedPage,
      },
      () => {
        this.getListJob()
      }
    )
  }

  setShow = async (bool, item) => {
    if (item) {
      await this.getJobInfo(item.id)
    }
    this.setState({
      showModal: bool,
    })
  }

  renderBoydy() {
    const {
      search,
      location,
      career,
      list_career,
      list_location,
      isLoading,
      listJob,
      status_search,
      paging,
    } = this.state
    const total_page = Math.ceil(paging?.totalItemCount / paging?.limit)
    return (
      <>
        <Header />
        {isLoading && <Loading />}
        <div className="container-fluid py-0" style={{ backgroundColor: '#21303F' }}>
          <div className="container">
            <div className="row pt-2 m-0 pt-3">
              <div className="col-12 col-md-4 pl-0 btn--search">
                {/* <span className="ctn-icon">
                  <i className="fas fa-search m-0 p-0" style={{ fontSize: 17 }}></i>
                </span> */}
                <FormControl
                  onKeyPress={this.handleKeyPress}
                  type="text"
                  // className="pl-5"
                  autoComplete="off"
                  placeholder="Tên công việc, vị trí bạn muốn ứng tuyển..."
                  value={search}
                  id="name"
                  onChange={(e) => this.handleChange('search', e.target.value)}
                ></FormControl>
              </div>
              <div className="col-12 col-md-3 pl-0 btn--search">
                <span className="ctn-icon">
                  <i className="fas fa-map-marker-alt m-0 p-0" style={{ fontSize: 17 }}></i>
                </span>
                <Select
                  value={location}
                  id="location"
                  options={list_location}
                  placeholder="Tất cả địa điểm"
                  onChange={(e) => this.handleChangeSelect('location', e)}
                />
              </div>

              <div className="col-12 col-md-3 pl-0 btn--search">
                <span className="ctn-icon">
                  <i className="fas fa-tools m-0 p-0" style={{ fontSize: 17 }}></i>
                </span>
                <Select
                  value={career}
                  id="career_1"
                  options={list_career}
                  placeholder="Tất cả ngành nghề"
                  onChange={(e) => this.handleChangeSelect('career', e)}
                />
              </div>
              <div
                className="col-12 col-md-2 d-flex justify-content-center btn--search1"
                style={{
                  cursor: 'pointer',
                  border: '1px solid white',
                  backgroundColor: '#06B04F',
                  borderRadius: '3px',
                  color: 'white',
                  alignItems: 'center',
                }}
                onClick={() => this.getListJob()}
              >
                <div className="rowe" id="btn-tim">
                  <i className="fas fa-search p-1 mt-1" />
                  <strong>Tìm</strong>
                </div>
              </div>
              <span
                className="m-0 p-0"
                style={{ color: 'white', cursor: 'pointer' }}
                onClick={() =>
                  this.setState(
                    {
                      career: '',
                      location: '',
                      search: '',
                    },
                    () => this.getListJob()
                  )
                }
              >
                {'>>'} Xóa tìm kiếm
              </span>
            </div>

            <div className="row pb-3">
              <div className="col-12 col-md-10 mt-3" style={{ fontSize: '16px', color: 'white' }}>
                <strong>Tìm kiếm việc làm nhanh, thuận tiện, uy tín trên JobShare</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid py-2" style={{ backgroundColor: '#F0F0F0' }}>
          {status_search === 1 ? (
            <>
              <div id="box-result-job-count">
                <div class="box-white box container pt-2 pb-1 my-2" id="box-result">
                  <div class="row">
                    <div class="col-md-7 col-xs-12 search-meta">
                      <h1 style={{ fontWeight: 700, fontSize: 20 }}>Những việc làm tìm thấy</h1>
                    </div>
                    {listJob?.length ? (
                      <div class="col-md-3 col-xs-6 meta-count" id="viec-phu-hop-1">
                        <span style={{ fontWeight: 700 }} id="viec-phu-hop-2">
                          {paging?.totalItemCount || '--'}
                        </span>
                        <span id="viec-phu-hop-3"> việc phù hợp</span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="box-white box container" id="box-job-result" style={{ minHeight: 450 }}>
                {listJob?.map((item, index) => (
                  <>
                    <div className="search-result" onClick={() => this.setShow(true, item)}>
                      <div className="result-job-hover pb-4">
                        <div className="row job">
                          <div className="col-sm-2" style={{ textAlign: 'center' }}>
                            <a className="company-logo col-avatar">
                              <img
                                src={item?.job?.company?.company_image || empty}
                                alt="logo"
                                style={{ objectFit: 'contain' }}
                              />
                            </a>
                            <div className="rated-company mt-1" style={{ textAlign: 'center' }}>
                              <a className="company-avg-over-all stars-container  ml-3">
                                <StarRatings
                                  rating={item?.job?.company?.rating || 0}
                                  starRatedColor="#F0ac19"
                                  numberOfStars={5}
                                  name="rating"
                                  starDimension="18px"
                                  starSpacing="1px"
                                />
                              </a>
                            </div>
                          </div>
                          <div className="col-sm-9 mx-3 mt-2">
                            <h4 className="job-title">
                              <a>
                                <span style={{ fontWeight: 500 }} className="transform-job-title">
                                  {item?.job?.name}
                                </span>
                              </a>
                            </h4>
                            <div className="row-company">
                              <a>{item?.job?.company?.name || '--'}</a>
                            </div>
                            <div className="row text-gray" id="row-result-info-job">
                              <div className="salary col-sm-4 col-xs-6">
                                Lương:
                                <span className="text-highlight">
                                  {item?.job?.min_salary && item.job.max_salary
                                    ? item?.job?.min_salary + ' - ' + item?.job?.max_salary + 'triệu'
                                    : item?.job?.min_salary && !item?.job?.max_salary
                                    ? ' Từ ' + item?.job?.min_salary
                                    : !item?.job?.min_salary && item.job.max_salary
                                    ? ' Đến ' + item?.job?.max_salary
                                    : ' Thỏa thuận'}
                                </span>
                              </div>
                              <div className="col-sm-4 col-xs-6 text_ellipsis">
                                <span className="address">Địa chỉ: {item?.job?.company?.address || '--'}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="m-0 p-0" />
                  </>
                ))}
                {listJob?.length > 0 ? (
                  <div className="my-3" style={{ justifyContent: 'center', display: 'flex' }}>
                    <ReactPaginate
                      previousLabel={'< Back'}
                      nextLabel={'Next >'}
                      breakLabel={'...'}
                      breakClassName={'break-me'}
                      pageCount={total_page}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={this.handlePageClick}
                      containerClassName={'pagination'}
                      subContainerClassName={'pages pagination'}
                      activeClassName={'active'}
                    />
                  </div>
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <img src={empty} style={{ width: 380, height: 160, margin: '50px auto' }} />
                    <p style={{ paddingBottom: 40 }} id="khong-co-tin">
                      Không có tin tuyển dụng nào!
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="container">
              <div className="row">
                <div className="col-7 text-right mt-3" style={{ fontSize: '22px', color: '#666666' }}>
                  Bạn chưa có CV trên JobShare?
                </div>
                <div className="col-5">
                  <div className="btn btn-successs mt-1" onClick={() => this.props.history.push(ROUTER.MANAGER_CV)}>
                    <b style={{ fontSize: 20 }}>TẠO CV NGAY</b>
                  </div>
                </div>
              </div>
              <BestWork />
            </div>
          )}
        </div>
        <Footer />
      </>
    )
  }

  renderModal() {
    const { showModal, job_detail } = this.state
    const exp = EXP_TYPE.filter((item) => parseInt(item.value) === parseInt(job_detail?.job?.require_exp))
    const job_type = JOB_TYPE.filter((item) => parseInt(item.value) === parseInt(job_detail?.job?.type))
    return (
      <Modal
        show={showModal}
        onHide={() =>
          this.setState({
            showModal: false,
          })
        }
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        centered
        size="xl"
      >
        <Modal.Header closeButton>
          <h5>{job_detail?.user?.company?.name || ''}</h5>
        </Modal.Header>
        <Modal.Body className="custom-body px-5">
          <div
            className="pt-4 pb-4 my-3 mx-3"
            style={{ backgroundColor: 'white', borderRadius: '5px', boxShadow: '3px 3px 10px rgb(0, 0, 0, 0.1)' }}
          >
            <div style={{ justifyContent: 'space-between', display: 'flex' }}>
              <h5 className="mx-5">Tuyển dụng vị trí: {job_detail?.job?.name || ''}</h5>
              <span
                className="mr-4"
                style={{ color: '#2BB04E', fontWeight: 700, cursor: 'pointer' }}
                onClick={() => this.setState({ showModalSendEmail: true })}
              >
                <i className="fas fa-envelope"> </i> Gửi CV đến nhà tuyển dụng
              </span>
            </div>
            <h5 className="mx-5">Thông tin tuyển dụng</h5>
            <div className="m-3 mb-2 container mx-5" style={{ paddingLeft: 30 }}>
              <div className="premium-box">
                <div className="premium-box-body">
                  <div className="row">
                    <div className="col-sm-6">
                      <p>
                        <span className="icon">
                          <i className="fa fa-calendar"></i>
                        </span>
                        <span className="ml-3" data-toggle="tooltip" title="Hạn ứng tuyển">
                          Hạn ứng tuyển: {job_detail?.job?.deadline ? toDateString(job_detail?.job?.deadline) : '--'}
                        </span>
                      </p>
                      <p>
                        <span className="icon text-premium">
                          <i className="fa fa-users"></i>
                        </span>
                        <span
                          data-toggle="tooltip"
                          data-placement="right"
                          className="ml-2 pl-1"
                          data-original-title="Số lượng cần tuyển"
                        >
                          {job_detail?.job?.amount
                            ? `Số lượng: ${job_detail?.job?.amount || '--'} người`
                            : 'Số lượng: Không giới hạn'}
                        </span>
                      </p>
                      <p>
                        <span className="icon text-premium">
                          <i className="fa fa-briefcase"></i>
                        </span>
                        {exp?.map((item, index) => (
                          <span
                            className="ml-3"
                            key={index}
                            data-toggle="tooltip"
                            data-placement="right"
                            title=""
                            data-original-title="Yêu cầu kinh nghiệm"
                          >
                            Kinh nghiệm: {item.lable}
                          </span>
                        ))}
                      </p>
                    </div>
                    <div className="col-sm-6">
                      <p>
                        <span className="icon text-premium">
                          <i className="fa fa-dollar-sign"></i>
                        </span>
                        <span
                          data-toggle="tooltip"
                          data-placement="right"
                          className="ml-3"
                          data-original-title="Mức lương"
                        >
                          Mức lương:{' '}
                          {job_detail?.job?.min_salary && job_detail?.job?.min_salary //eslint-disable-next-line
                            ? `${job_detail?.job?.min_salary + ' - ' + job_detail?.job?.max_salary + ' triệu'}`
                            : job_detail?.job?.min_salary && !job_detail?.job?.max_salary
                            ? `${'Từ ' + job_detail?.job?.min_salary + ' triệu'}`
                            : !job_detail?.job?.min_salary && job_detail?.job?.max_salary
                            ? `${'Đến ' + job_detail?.job?.max_salary + ' triệu'}`
                            : 'Thỏa thuận'}
                        </span>
                      </p>
                      <p>
                        <span className="icon text-premium">
                          <i className="fa fa-clock"></i>
                        </span>
                        {job_type?.map((item, index) => (
                          <span
                            data-toggle="tooltip"
                            data-placement="right"
                            className="ml-2 pl-1"
                            data-original-title="Yêu cầu kinh nghiệm"
                          >
                            Loại công việc: {item.lable}
                          </span>
                        ))}
                      </p>
                      <p>
                        <span className="icon text-premium">
                          <i className="fa fa-transgender"></i>
                        </span>
                        <span
                          data-toggle="tooltip"
                          data-placement="right"
                          className="ml-3"
                          data-original-title="Giới tính"
                        >
                          Giới tính:{' '}
                          {parseInt(job_detail?.job?.gender) === 1
                            ? 'Nam'
                            : parseInt(job_detail?.job?.gender) === 2
                            ? 'Nữ'
                            : 'Không yêu cầu'}
                        </span>
                      </p>
                    </div>
                    <p className="px-3">
                      <span className="icon text-premium">
                        <i className="fas fa-map-marker-alt"></i>
                      </span>
                      <span
                        data-toggle="tooltip"
                        data-placement="right"
                        className="ml-3"
                        data-original-title="Địa chỉ làm việc"
                      >
                        Địa chỉ làm việc: {job_detail?.user?.company?.address}
                      </span>
                    </p>
                  </div>
                  <div class="pr-5">
                    <h5>Mô tả công việc</h5>
                    {job_detail?.job?.description
                      ? job_detail?.job?.description
                          ?.split('-')
                          ?.map((item, index) => item && <p key={index}>- {item}</p>)
                      : '--'}
                    <h5>Yêu cầu ứng viên</h5>
                    <div>
                      {job_detail?.job?.skill
                        ? job_detail?.job?.skill?.split('-')?.map((item, index) => item && <p key={index}>- {item}</p>)
                        : '--'}
                    </div>
                    <h5>Quyền lợi được hưởng</h5>
                    <div>
                      {job_detail?.job?.benefit
                        ? job_detail?.job?.benefit
                            ?.split('-')
                            ?.map((item, index) => item && <p key={index}>- {item}</p>)
                        : '--'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    )
  }

  fileUpload = (e) => {
    this.setState({ ...this.state, file: e.target.files[0] })
  }

  renderModalSendEmail() {
    const { showModalSendEmail, job_detail, from, to, subject, text } = this.state
    return (
      <Modal
        show={showModalSendEmail}
        onHide={() =>
          this.setState({
            showModalSendEmail: false,
          })
        }
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        centered
      >
        <Modal.Header closeButton>
          <h5 className="pt-1" style={{ color: '#2BB04E', fontWeight: 700, cursor: 'pointer' }}>
            <i className="fas fa-envelope"> Gửi CV đến nhà tuyển dụng</i>
          </h5>
        </Modal.Header>
        <Modal.Body className="custom-body px-5">
          <Row>
            <Col className="modal-field" sm={4}>
              <span>Đến nhà tuyển dụng: </span>
            </Col>
            <Col sm={8}>
              <FormControl disabled value={to || ''} />
            </Col>
          </Row>
          <Row className="my-3">
            <Col className="modal-field" sm={4}>
              <span>Email của bạn: </span>
            </Col>
            <Col sm={8}>
              <FormControl
                value={from}
                placeholder="Nhập email của bạn"
                onChange={(e) => this.handleChange('from', e.target.value)}
              />
            </Col>
          </Row>
          <Row className="my-3">
            <Col className="modal-field" sm={4}>
              <span>Tiêu đề: </span>
            </Col>
            <Col sm={8}>
              <FormControl disabled value={subject} />
            </Col>
          </Row>
          <Row className="my-3">
            <Col className="modal-field" sm={4}>
              <span>Nội dung: </span>
            </Col>
            <Col sm={8}>
              <textarea
                className="p-1 pl-2 form-control"
                placeholder="Nhập nội dung lời nhắn ... "
                value={text}
                onChange={(e) => this.handleChange('text', e.target.value)}
              />
            </Col>
          </Row>
          <Row className="my-3">
            <Col className="modal-field" sm={4}>
              <span>CV của bạn: </span>
            </Col>
            <Col sm={8}>
              <FormControl type="file" onChange={this.fileUpload} />
            </Col>
          </Row>
          <Row className="py-3" sm={4} style={{ justifyContent: 'center', marginLeft: 30 }}>
            <div
              onClick={() => this.sendEmail()}
              className="px-2 py-1"
              style={{
                justifyContent: 'center',
                textAlign: 'center',
                backgroundColor: '#2BB04E',
                cursor: 'pointer',
                borderRadius: 4,
                boxShadow: '3px 5px 10px rgb(0, 0, 0, 0.2)',
              }}
            >
              <span style={{ fontWeight: 700, color: 'white' }}>
                <i className="far fa-paper-plane"> Gửi</i>
              </span>
            </div>
          </Row>
        </Modal.Body>
      </Modal>
    )
  }

  render() {
    return (
      <>
        {this.renderBoydy()}
        {this.renderModal()}
        {this.renderModalSendEmail()}
      </>
    )
  }
}

export default WorkingScreen
