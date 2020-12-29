import React, { Component } from 'react'
import Footer from 'src/components/Common/Footer/Footer'
import HeaderLogin from 'src/components/recruitmentComponents/header/HeaderLogin'
import empty from '../../../assets/empty.svg'
import noavatar from '../../../assets/noavatar.webp'
import * as API from '@constants/Api'
import Loading from 'src/components/Loading'
import Select from 'react-select'
import { STATUS } from '@constants/Constant'
import reactotron from 'src/debug/ReactotronConfig'
import ReactPaginate from 'react-paginate'
import { toDateString } from 'src/utils/helper'
import { Modal, Row, Col, FormControl } from 'react-bootstrap'
import swal from 'sweetalert'

export default class SearchApplicant extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activePage: 1,
      isLoading: false,
      search: '',
      list_location: [],
      location: '',
      listCV: [],
      paging: '',
      showModal: false,
      showModalSendEmail: false,
      from: '',
      to: '',
      subject: '[JD SEND FROM JOBSHARE]',
      text: '',
      file: null,
    }
  }

  componentDidMount() {
    this.getListProvince()
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

  async getListCV() {
    this.setState({
      isLoading: true,
    })
    const { activePage, search, location } = this.state
    try {
      let res = await API.getListCV({
        page: activePage,
        search: search,
        status_id: STATUS.ACTIVE,
        province_id: location?.value || '',
        cv_status: STATUS.ACTIVE,
      })
      if (res.status === STATUS.ACTIVE) {
        this.setState({
          isLoading: false,
          listCV: res.data,
          paging: res.paging,
        })
      }
    } catch (error) {
      this.setState({
        isLoading: false,
      })
    }
  }

  async getCVDetail(id) {
    this.setState({ isLoading: true })
    try {
      let res = await API.getCVDetail({ user_id: parseInt(id) })
      if (res.status === STATUS.ACTIVE) {
        this.setState({
          isLoading: false,
          cv_detail: res.data,
          to: res?.data?.user?.user_profile?.email,
          from: '',
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
    const { from, to, text, subject, file } = this.state
    if (file && from && to && text) {
      try {
        const formData = new FormData()
        formData.append('from', from)
        formData.append('to', to)
        formData.append('subject', subject)
        formData.append('text', text)
        formData.append('file', file)
        const res = await API.sendEmail(formData)
        if (res.status === STATUS.ACTIVE) {
          this.setState(
            {
              isLoading: false,
              showModalSendEmail: false,
            },
            () =>
              swal({
                title: 'Gửi Jd thành công',
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

  handleChange = (fieldName, value) => {
    this.setState({
      ...this.state,
      [fieldName]: value || '',
    })
  }

  handleChangeSelect = (fieldName, value) => {
    this.setState({ ...this.state, [fieldName]: value }, () => this.getListCV())
  }

  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      this.getListCV()
    }
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected
    this.setState(
      {
        activePage: selectedPage,
      },
      () => {
        this.getListCV()
      }
    )
  }

  setShow = async (bool, item) => {
    if (item) {
      await this.getCVDetail(item.id)
    }
    this.setState({
      showModal: bool,
    })
  }
  fileUpload = (e) => {
    this.setState({ ...this.state, file: e.target.files[0] })
  }

  renderBody() {
    const { search, location, list_location, isLoading, listCV, paging } = this.state
    const total_page = Math.ceil(paging?.totalItemCount / paging?.limit)
    return (
      <div>
        {isLoading && <Loading />}
        <div style={{ borderBottom: '0.1px solid #E7E7E7' }}>
          <HeaderLogin />
        </div>
        <div className="py-3" style={{ backgroundColor: '#EEF1F5' }}>
          <div className="container bg-white pt-3">
            <div className="mx-3 mt-1">{'>>'}Tìm kiếm ứng viên</div>
            <div class="col-md-12 mt-3">
              <div class="row">
                <div class="col-md-5">
                  {/* <i class="fa fa-user-circle mr-1"></i>
                  <label>Từ khóa</label> */}
                  <input
                    onKeyPress={this.handleKeyPress}
                    type="text"
                    id="keyword"
                    placeholder="Gõ tên vị trí nhân sự bạn muốn tìm kiếm. VD: nhân viên kinh doanh, lập trình viên,..."
                    class="form-control ui-autocomplete-input"
                    autocomplete="off"
                    value={search}
                    onChange={(e) => this.handleChange('search', e.target.value)}
                  />
                </div>
                <div id="search-location" class="col-md-4">
                  {/* <i class="fa fa-map-marker-alt mr-1"></i>
                  <label>Địa điểm</label> */}
                  <span className="ctn-icon">
                    <i className="fas fa-map-marker-alt" style={{ fontSize: 17, marginTop: 5, marginLeft: 13 }}></i>
                  </span>
                  <Select
                    value={location}
                    options={list_location}
                    placeholder="Tất cả địa điểm"
                    onChange={(e) => this.handleChangeSelect('location', e)}
                  />
                </div>
                <div className="col-md-3 ">
                  <button className="btn-block" onClick={() => this.getListCV()}>
                    <i class="fa fa-search"></i> Tìm kiếm
                  </button>
                </div>
              </div>
            </div>
            <div className="col-xs-12 px-3 mt-4">
              <hr />
            </div>
            <div className="jobs mt-3">
              {listCV?.length ? (
                <div className="col-12">
                  <div className="p-0 m-0">
                    <div class="search-stats">
                      Tìm thấy: <strong> {paging?.totalItemCount} </strong> ứng viên phù hợp
                    </div>
                    <div className="candidate-list">
                      {listCV?.map((item, index) => (
                        <div class="candidate" key={index} onClick={() => this.setShow(true, item)}>
                          <div class="avatar">
                            <img src={item?.user_profile?.image || noavatar} style={{ objectFit: 'contain' }} />
                          </div>
                          <div class="row">
                            <div class="col-md-8">
                              <a class="name">{item?.user_profile?.name}</a>
                            </div>
                            <div class="col-md-4 text-right">
                              <div style={{ fontSize: '0.9em', color: 'rgb(153, 153, 153)' }}> </div>
                            </div>
                            <div className="ml-3">
                              <u>Vị trí ứng tuyển:</u> {item?.user_profile?.apply_work || '--'}
                            </div>
                          </div>
                          <div class="row" style={{ marginTop: 10 }}>
                            <div class="col-md-9">
                              <div class="education">
                                <i aria-hidden="true" class="fa fa-graduation-cap"></i>
                                <span>
                                  Học vấn: {item?.education[0].major} - {item?.education[0].name}
                                </span>
                              </div>
                              <div class="experience">
                                <i aria-hidden="true" class="fa fa-briefcase"></i>
                                <span>
                                  Kinh nghiệm: {item?.experiences[0].position} - {item?.experiences[0].name}
                                </span>
                              </div>
                              <div class="education">
                                <i aria-hidden="true" class="fas fa-map-marker-alt"></i>
                                <span>Địa chỉ: {item?.user_profile?.address || '--'}</span>
                              </div>
                              <div class="education">
                                <i aria-hidden="true" class="fa fa-transgender"></i>
                                <span>Giới tính: {item?.user_profile?.gender === 1 ? 'Nam' : 'Nữ'}</span>
                              </div>
                            </div>
                          </div>
                          <div class="row" style={{ marginTop: 10 }}>
                            <div class="col-md-10">
                              <div class="location location-right" style={{ textAlign: 'left' }}>
                                <i aria-hidden="true" class="fa fa-star"></i> Mục tiêu:
                                {item?.user_profile?.target_work
                                  ? item?.user_profile?.target_work
                                      ?.split('-')
                                      ?.map((item, index) => item && <p key={index}>- {item}</p>)
                                  : '--'}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
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
                </div>
              ) : (
                <div className="text-center">
                  <img src={empty} style={{ width: 380, height: 160, margin: '50px auto' }} />
                  <p style={{ paddingBottom: 40 }}>Không có tin ứng viên nào!</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  renderModal() {
    const { showModal, cv_detail } = this.state
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
          <h5
            className="pt-1"
            style={{ color: '#2BB04E', fontWeight: 700, cursor: 'pointer' }}
            onClick={() => this.setState({ showModalSendEmail: true })}
          >
            <i className="fas fa-envelope"> </i> Gửi JD tới ứng viên
          </h5>
        </Modal.Header>
        <Modal.Body className="custom-body px-5">
          <div>
            <div id="cvo-document-root">
              <div className="cvo-document">
                <div
                  className="cvo-page"
                  style={{ backgroundColor: 'white', borderRadius: '5px', boxShadow: '3px 3px 10px rgb(0, 0, 0, 0.1)' }}
                >
                  <div className="cvo-subpage">
                    <div className="cvo-body">
                      <div className="cvo-main">
                        <div id="group-header">
                          <div id="cvo-profile" className="cvo-block">
                            <table className="profile-table">
                              <tbody>
                                <tr>
                                  <td className="avatar-wraper" rowSpan="9">
                                    <img
                                      id="cvo-profile-avatar"
                                      src={cv_detail?.user?.user_profile?.image || noavatar}
                                      name="cvoData[profile][avatar]"
                                      type="file"
                                      cvo-form-field="true"
                                      blockkey="profile"
                                      fieldkey="avatar"
                                      style={{ maxWidth: '100%', objectFit: 'contain' }}
                                    />
                                  </td>
                                  <td>
                                    <span id="cvo-profile-fullname" cvo-placeholder="Họ tên">
                                      <label>{cv_detail?.user?.user_profile?.name || '--'}</label>
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <span id="cvo-profile-title" className="default_min_width">
                                      <span className="input fullName">
                                        {cv_detail?.user?.user_profile?.apply_work || '--'}
                                      </span>
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <span className="profile-label">Ngày sinh: </span>
                                    <span className="profile-field default_min_width">
                                      {cv_detail?.user?.user_profile?.dob
                                        ? toDateString(cv_detail?.user?.user_profile?.dob)
                                        : '--'}
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <span className="profile-label">Giới tính:</span>
                                    <span className="profile-field default_min_width">
                                      {cv_detail?.user?.user_profile?.gender === 1 ? 'Nam' : 'Nữ'}
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <span className="profile-label">Điện thoại: </span>
                                    <span className="profile-field default_min_width" id="cvo-profile-phone">
                                      {cv_detail?.user?.user_profile?.phone || '--'}
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <span className="profile-label">Email: </span>
                                    <span className="profile-field default_min_width" id="cvo-profile-email">
                                      {cv_detail?.user?.user_profile?.email || '--'}
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <span className="profile-label">Địa chỉ: </span>
                                    <span className="profile-field default_min_width" id="cvo-profile-address">
                                      {cv_detail?.user?.user_profile?.address || '--'}
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div id="group-content">
                          <div id="cvo-objective" className="cvo-block">
                            <h3 className="cvo-block-title">
                              <span id="cvo-objective-blocktitle">Mục tiêu nghề nghiệp</span>
                            </h3>
                            <div className="cvo-block-body">
                              <div id="cvo-objective-objective">
                                <span className="profile-field default_min_width" id="cvo-profile-address">
                                  {cv_detail?.user?.user_profile?.target_work
                                    ? cv_detail?.user?.user_profile?.target_work
                                        ?.split('-')
                                        ?.map((item, index) => item && <p key={index}>- {item}</p>)
                                    : '--'}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div id="cvo-education" className="cvo-block">
                            <h3 className="cvo-block-title">
                              <span id="cvo-education-blocktitle">Học vấn</span>
                            </h3>
                            <div id="education-table" className="cvo-block-body">
                              <div className="row" type="fieldgroup" cvo-form-fieldgroup="true" blockkey="education">
                                <div className="cvo-education-time col-time">
                                  <span className="cvo-education-start start default_min_width">
                                    {cv_detail?.education?.start_time || '--'}
                                  </span>{' '}
                                  -{' '}
                                  <span className="cvo-education-end end default_min_width">
                                    {cv_detail?.education?.end_time || '--'}
                                  </span>
                                </div>
                                <div className="school">
                                  <span className="cvo-education-school default_min_width">
                                    {cv_detail?.education?.name || '--'}
                                  </span>
                                  <span className="cvo-education-title default_min_width">
                                    {cv_detail?.education?.major || '--'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div id="cvo-experience" className="cvo-block">
                            <h3 class="cvo-block-title">
                              <span id="cvo-experience-blocktitle">Kinh nghiệm làm việc</span>
                            </h3>
                            <div id="experience-table" className="cvo-block-body">
                              <div className="row" type="fieldgroup" cvo-form-fieldgroup="true" blockkey="experience">
                                <div className="cvo-experience-time col-time">
                                  <span class="cvo-experience-start start default_min_width">
                                    {cv_detail?.experience?.start_time || '--'}
                                  </span>{' '}
                                  -{' '}
                                  <span class="cvo-experience-end end default_min_width">
                                    {cv_detail?.experience?.end_time || '--'}
                                  </span>
                                </div>
                                <div class="company">
                                  <span class="cvo-experience-company default_min_width">
                                    {cv_detail?.experience?.name || '--'}
                                  </span>
                                  <span className="cvo-experience-position default_min_width">
                                    {cv_detail?.experience?.position || '--'}
                                  </span>
                                  <div class="cvo-experience-details default_min_width">
                                    {cv_detail?.experience?.description || '--'}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/*  */}
                          <div id="cvo-experience" className="cvo-block">
                            <h3 class="cvo-block-title">
                              <span id="cvo-experience-blocktitle">Dự án</span>
                            </h3>
                            <div id="experience-table" className="cvo-block-body">
                              <div className="row" type="fieldgroup" cvo-form-fieldgroup="true" blockkey="experience">
                                <div className="cvo-experience-time col-time">
                                  <span class="cvo-experience-start start default_min_width">
                                    {cv_detail?.project?.start_time || '--'}
                                  </span>{' '}
                                  -{' '}
                                  <span class="cvo-experience-end end default_min_width">
                                    {cv_detail?.project?.end_time || '--'}
                                  </span>
                                </div>
                                <div class="company">
                                  <span class="cvo-experience-company default_min_width">
                                    {cv_detail?.project?.name || '--'}
                                  </span>
                                  <div class="cvo-experience-details default_min_width">
                                    {cv_detail?.project?.description || '--'}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/*  */}
                          <div id="cvo-experience" className="cvo-block">
                            <h3 class="cvo-block-title">
                              <span id="cvo-experience-blocktitle">Hoạt động</span>
                            </h3>
                            <div id="experience-table" className="cvo-block-body">
                              <div className="row" type="fieldgroup" cvo-form-fieldgroup="true" blockkey="experience">
                                <div className="cvo-experience-time col-time">
                                  <span class="cvo-experience-start start default_min_width">
                                    {cv_detail?.volunteer?.start_time || '--'}
                                  </span>{' '}
                                  -{' '}
                                  <span class="cvo-experience-end end default_min_width">
                                    {cv_detail?.volunteer?.end_time || '--'}
                                  </span>
                                </div>
                                <div class="company">
                                  <span class="cvo-experience-company default_min_width">
                                    {cv_detail?.volunteer?.name || '--'}
                                  </span>
                                  <div class="cvo-experience-details default_min_width">
                                    {cv_detail?.volunteer?.description || '--'}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div id="cvo-experience" className="cvo-block">
                            <h3 class="cvo-block-title">
                              <span id="cvo-experience-blocktitle">Sở thích</span>
                            </h3>
                            <div className="cvo-block-body">
                              <div id="cvo-objective-objective">
                                {cv_detail?.user?.user_profile?.hobby
                                  ? cv_detail?.user?.user_profile?.hobby
                                      ?.split('-')
                                      ?.map((item, index) => item && <p key={index}>- {item}</p>)
                                  : '--'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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

  renderModalSendEmail() {
    const { showModalSendEmail, cv_detail, from, to, subject, text } = this.state
    console.log(cv_detail)
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
            <i className="fas fa-envelope"> Gửi JD tới ứng viên</i>
          </h5>
        </Modal.Header>
        <Modal.Body className="custom-body px-5">
          <Row>
            <Col className="modal-field" sm={4}>
              <span>Đến ứng viên: </span>
            </Col>
            <Col sm={8}>
              <FormControl disabled value={cv_detail?.user?.user_profile?.email || ''} />
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
              <span>File JD: </span>
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
        {this.renderBody()}
        {this.renderModal()}
        {this.renderModalSendEmail()}
      </>
    )
  }
}
