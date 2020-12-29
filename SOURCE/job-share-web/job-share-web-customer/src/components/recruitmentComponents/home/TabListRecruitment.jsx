import React, { Component } from 'react'
import './TabHomeMenu.css'
import empty from '../../../assets/empty.svg'
import * as API from '@constants/Api'
import Loading from 'src/components/Loading'
import TabNewRecruitment from './TabNewRecruitment'
import reactotron from 'src/debug/ReactotronConfig'
import StarRatings from 'react-star-ratings'
import { STRING, STATUS, EXP_TYPE, JOB_TYPE } from '@constants/Constant'
import { Modal, Col, Button } from 'react-bootstrap'
import { toDateString } from 'src/utils/helper'
import swal from 'sweetalert'
import ReactToPrint from 'react-to-print'

class TabListRecruitment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      tab_status: 1,
      isLoading: false,
      list_count: {},
      list_job: {},
      confirmModal: false,
    }
  }
  componentDidMount() {
    this.getListJobStatus()
    this.getListJobByUser()
  }

  async getListJobStatus() {
    this.setState({ isLoading: true })
    try {
      const res = await API.getListJobStatus()
      if (res.status === 1) {
        this.setState({
          isLoading: false,
          list_count: res.data,
        })
      }
    } catch (error) {
      this.setState({
        isLoading: false,
      })
    }
  }

  async getListJobByUser() {
    this.setState({ isLoading: true })
    const { tab_status, search } = this.state
    try {
      const res = await API.getListJobByUser({
        search: search,
        status: tab_status,
      })
      if (res.status === 1) {
        this.setState({
          isLoading: false,
          list_job: res.data,
        })
      }
    } catch (error) {
      this.setState({
        isLoading: false,
      })
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
        })
      }
    } catch (error) {
      this.setState({
        isLoading: false,
      })
    }
  }

  async deleteJob(job_id) {
    this.setState({
      isLoading: true,
    })
    try {
      const res = await API.deleteJob({ job_id: job_id })
      if (res.status === STATUS.ACTIVE) {
        await this.setState(
          {
            isLoading: false,
            showModal: false,
            confirmModal: false,
          },
          () =>
            swal({
              title: 'Xóa tin tuyển dụng thành công',
              icon: 'success',
            })
        )
      }
      this.getListJobStatus()
      this.getListJobByUser()
    } catch (error) {
      this.setState({
        isLoading: false,
        confirmModal: false,
      })
    }
  }

  setShow = async (bool, item) => {
    if (item) {
      await this.getJobInfo(item.id)
    }
    this.setState({
      showModal: bool,
    })
  }

  handleChange = (fieldName, value) => {
    this.setState({
      [fieldName]: value || '',
    })
  }

  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      this.getListJobByUser()
    }
  }

  renderBody() {
    const { list_count, isLoading, tab_status, list_job, search } = this.state
    return (
      <div>
        {isLoading && <Loading />}
        <div id="job-tabs">
          <ul className="row">
            <li>
              <a
                className={tab_status === 1 ? 'job-showing-tab active' : ''}
                onClick={() =>
                  this.setState(
                    {
                      tab_status: 1,
                      search: '',
                    },
                    () => this.getListJobByUser()
                  )
                }
              >
                <span>Tin đang hiển thị</span> <label className="job-label">{list_count?.confirm || 0}</label>
              </a>
            </li>
            <li>
              <a
                className={tab_status === 0 ? 'job-showing-tab active' : ''}
                onClick={() =>
                  this.setState(
                    {
                      tab_status: 0,
                      search: '',
                    },
                    () => this.getListJobByUser()
                  )
                }
              >
                <span>Tin chờ xác thực</span> <label className="job-label">{list_count?.pending || 0}</label>
              </a>
            </li>
            <li>
              <a
                className={tab_status === 2 ? 'job-showing-tab active' : ''}
                onClick={() =>
                  this.setState(
                    {
                      tab_status: 2,
                      search: '',
                    },
                    () => this.getListJobByUser()
                  )
                }
              >
                <span>Tin hết hạn</span>
                <label className="job-label">{list_count?.expired || 0}</label>
              </a>
            </li>
            <li>
              <a
                className={tab_status === 3 ? 'job-showing-tab active' : ''}
                onClick={() =>
                  this.setState(
                    {
                      tab_status: 3,
                      search: '',
                    },
                    () => this.getListJobByUser()
                  )
                }
              >
                <span>Tin bị từ chối</span> <label className="job-label">{list_count?.reject || 0}</label>
              </a>
            </li>
          </ul>
        </div>
        <div className="well no-mb flat border-radius-0 my-2">
          <div action="" id="form-search-job">
            <div className="flex items-center">
              <div className="flex-auto mr-5">
                <input
                  onKeyPress={this.handleKeyPress}
                  type="text"
                  name="title"
                  className="form-control flat"
                  placeholder="Tìm kiếm tin tuyển dụng"
                  value={search}
                  id="jobTitle1"
                  onChange={(e) => this.handleChange('search', e.target.value)}
                  aria-describedby="title"
                />
              </div>
              <div style={{ float: 'right' }}>
                <button className="btn-search1 btn mt-2" id="btn-search" onClick={() => this.getListJobByUser()}>
                  <i className="fa fa-search mr-1"></i> Tìm kiếm
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="jobs">
          {list_job.length ? (
            <div className="box-white box" id="box-job-result" style={{ minHeight: 450 }}>
              {list_job?.map((item, index) => (
                <>
                  <div className="search-result" key={index} onClick={() => this.setShow(true, item)}>
                    <div className="result-job-hover pb-4">
                      <div className="row job">
                        <div className="col-sm-2" style={{ textAlign: 'center' }}>
                          <a className="company-logo col-avatar">
                            <img src={item?.company_image || empty} alt="logo" style={{ objectFit: 'contain' }} />
                          </a>
                          <div className="rated-company mt-1" style={{ textAlign: 'center' }}>
                            <a className="company-avg-over-all stars-container  ml-3">
                              <StarRatings
                                rating={item?.rating || 0}
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
                            <a>{item?.company_name || '--'}</a>
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
                              <span className="address">Địa chỉ: {item?.company_address || '--'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="m-0 p-0" />
                </>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <div>
                <img src={empty} style={{ width: 380, height: 160, margin: '50px auto' }} />
                <p style={{ paddingBottom: 40 }}>Không có tin tuyển dụng nào!</p>
              </div>
            </div>
          )}
        </div>
      </div>
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
          <h5 style={{ textTransform: 'capitalize' }}>{job_detail?.user?.company?.name || ''}</h5>
        </Modal.Header>
        <Modal.Body className="custom-body px-5">
          <div className="mb-3" style={{ float: 'right' }}>
            <ReactToPrint
              trigger={() => (
                <span className="mr-4" style={{ color: '#7dd39f', fontWeight: 700, cursor: 'pointer' }}>
                  <i class="fas fa-download"></i> Download Jd
                </span>
              )}
              content={() => this.componentRef}
            />

            <span
              className="mr-4"
              style={{ color: 'red', fontWeight: 700, cursor: 'pointer' }}
              onClick={() =>
                this.setState({
                  confirmModal: true,
                })
              }
            >
              <i className="far fa-trash-alt"></i> Xóa tin tuyển dụng
            </span>
          </div>
          <div
            className="pt-4 pb-4 my-3 mx-3 mt-4"
            style={{ backgroundColor: 'white', borderRadius: '5px', boxShadow: '3px 3px 10px rgb(0, 0, 0, 0.1)' }}
            ref={(el) => (this.componentRef = el)}
          >
            <h4 className="mx-5 my-2" style={{ textTransform: 'capitalize' }}>
              {job_detail?.user?.company?.name || ''}
            </h4>
            <h5 className="mx-5">Tuyển dụng vị trí: {job_detail?.job?.name || ''}</h5>
            <h5 className="mx-5">Thông tin tuyển dụng</h5>
            <div className="m-3 mb-2 container mx-5">
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

  renderConfirmModal() {
    const { confirmModal, job_detail } = this.state
    return (
      <Modal
        show={confirmModal}
        onHide={() =>
          this.setState({
            confirmModal: false,
          })
        }
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        centered
      >
        <Modal.Header closeButton>
          <h5>Bạn chắc chắn muốn xóa tin tuyển dụng ?</h5>
        </Modal.Header>
        <Modal.Body className="custom-body">
          <div style={{ textAlign: 'center' }}>
            <Col>
              <Button
                variant="primary"
                onClick={() =>
                  this.setState({
                    confirmModal: false,
                  })
                }
              >
                Thoát
              </Button>
              <Button variant="success" onClick={() => this.deleteJob(job_detail?.job_id)}>
                Xóa
              </Button>
            </Col>
          </div>
        </Modal.Body>
      </Modal>
    )
  }

  render() {
    return (
      <>
        {this.renderBody()}
        {this.renderModal()}
        {this.renderConfirmModal()}
      </>
    )
  }
}

export default TabListRecruitment
