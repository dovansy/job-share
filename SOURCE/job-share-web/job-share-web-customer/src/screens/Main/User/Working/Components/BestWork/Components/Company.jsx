import React, { Component } from 'react'
import fpt from '@src/assets/fpt.webp'
import { toDateString } from 'src/utils/helper'
import { Col, FormControl, Modal, Row } from 'react-bootstrap'
import { ROUTER, STATUS, EXP_TYPE, JOB_TYPE } from '@constants/Constant'
import './Company.css'
import reactotron from 'src/debug/ReactotronConfig'
import * as API from '@constants/Api'
import swal from 'sweetalert'
import Cookie from 'js-cookie'

class Company extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      showModalSendEmail: false,
      job_detail: '',
      from: '',
      to: '',
      subject: '[CV SEND FROM JOBSHARE]',
      text: '',
      file: null,
      job_id: '',
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

  setShow = async (bool, item) => {
    if (item) {
      await this.getJobInfo(item.id)
    }
    this.setState({
      showModal: bool,
    })
  }

  fileUpload = (e) => {
    this.setState({ ...this.state, file: e.target.files[0] })
  }

  handleChange(fieldName, value) {
    this.setState({
      ...this.state,
      [fieldName]: value || '',
    })
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
        {this.renderModal()}
        {this.renderModalSendEmail()}
        <div
          className="col-6 hover"
          style={{
            border: '1px solid #ced4da',
            borderRadius: '3px',
            height: 100,
            overflow: 'scroll',
            cursor: 'pointer',
          }}
          onClick={() => this.setShow(true, this.props.data)}
        >
          <div className="row mt-2" style={{ display: 'flex', flexWrap: 'wrap' }}>
            <div className="col-2" style={{ alignItems: 'center', display: 'flex' }}>
              <img
                src={this.props.data?.job?.company?.company_image || ''}
                style={{ maxWidth: '100%', backgroundSize: 'cover' }}
              />
            </div>
            <div className="col-10">
              <span>
                <b>{this.props.data?.job?.name}</b>
              </span>
              <br />
              <span>{this.props.data?.job?.company?.name}</span>
              <div>
                <span style={{ color: '#00b14f' }}>
                  Mức lương:{' '}
                  {this.props.data?.job?.min_salary && this.props.data?.job?.min_salary //eslint-disable-next-line
                    ? `${this.props.data?.job?.min_salary + ' - ' + this.props.data?.job?.max_salary + ' triệu'}`
                    : this.props.data?.min_salary && !this.props.data?.job?.max_salary
                    ? `${'Từ ' + this.props.data?.job?.min_salary + ' triệu'}`
                    : !this.props.data?.job?.min_salary && this.props.data?.job?.max_salary
                    ? `${'Đến ' + this.props.data?.job?.max_salary + ' triệu'}`
                    : 'Thỏa thuận'}
                </span>
                <br />
                <span>Địa chỉ: {this.props.data?.job?.company?.address}</span>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default Company
