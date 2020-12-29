import React, { Component } from 'react'
import { toDateString } from 'src/utils/helper'
import { TYPE_ACTION, LABLE_BUTTON_CONFIRM, LABLE_BUTTON_REJECT, STATUS, EXP_TYPE, JOB_TYPE } from '@constants/Constant'
import ButtonType from '@src/components/button/ButtonType'
import ConfirmModal from '@src/components/modal/ConfirmModal'
import * as API from '@constants/Api'
import './Recruitment.css'
import LoadingAction from 'src/components/loading/LoadingAction'
import swal from 'sweetalert'

class RecruitmentDetailScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmModal: false,
      isExist: false,
      isLoading: false,
      typeAction: '',
      titleModalConfirm: '',
      job_detail: '',
      status_action: '',
    }
  }
  componentDidMount() {
    this.getJobInfo()
  }

  async getJobInfo() {
    this.setState({
      isLoading: true,
    })
    try {
      const {
        match: { params },
      } = this.props
      const res = await API.getJobDetail({
        job_id: parseInt(params.id),
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

  async changeStatus() {
    const { status_action } = this.state
    const listJobChecked = []
    const {
      match: { params },
    } = this.props
    listJobChecked.push(params.id)
    const Obj = {
      id: listJobChecked,
      status: status_action,
    }
    if (listJobChecked.length) {
      this.setState({ isLoading: true })
      try {
        const res = await API.changeStatusJob(Obj)
        if (res.status === STATUS.ACTIVE) {
          await this.setState(
            {
              confirmModal: false,
              isLoading: false,
            },
            () =>
              swal({
                title: 'Thao tác thành công',
                icon: 'success',
              })
          )
          this.getJobDetail()
        }
      } catch (error) {
        this.setState({
          confirmModal: false,
          isLoading: false,
        })
      }
    } else {
      swal({
        title: 'Vui lòng chọn tin tuyển dụng!',
        icon: 'warning',
      })
    }
  }
  renderDetail() {
    const { job_detail, isLoading } = this.state
    const exp = EXP_TYPE.filter((item) => parseInt(item.value) === parseInt(job_detail?.job?.require_exp))
    const job_type = JOB_TYPE.filter((item) => parseInt(item.value) === parseInt(job_detail?.job?.type))
    if (isLoading) {
      return (
        <div
          className="pt-4 pb-4 mt-2 mx-3"
          style={{ backgroundColor: 'white', borderRadius: '5px', boxShadow: '3px 3px 10px rgb(0, 0, 0, 0.4)' }}
        >
          <h6 className="ml-3">Loading...</h6>
        </div>
      )
    }
    return (
      <div
        className="pt-4 pb-4 mt-2 mx-3"
        style={{ backgroundColor: 'white', borderRadius: '5px', boxShadow: '3px 3px 10px rgb(0, 0, 0, 0.4)' }}
      >
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
                      className="ml-3"
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
                    <span data-toggle="tooltip" data-placement="right" className="ml-3" data-original-title="Mức lương">
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
                        className="ml-3"
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
                    <span data-toggle="tooltip" data-placement="right" className="ml-3" data-original-title="Giới tính">
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
                  ? job_detail?.job?.description?.split('-')?.map((item, index) => item && <p key={index}>- {item}</p>)
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
                    ? job_detail?.job?.benefit?.split('-')?.map((item, index) => item && <p key={index}>- {item}</p>)
                    : '--'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderBody() {
    const { confirmModal, titleModalConfirm, job_detail } = this.state
    return (
      <div className="content-wrapper bg-white">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2 header--detail">
              <div className="ml-3">
                <h1 className="header h1--cursor" onClick={() => this.props.history.goBack()}>
                  <i className="fas mr-2 fa-angle-left" />
                  Chi tiết tin {job_detail?.job?.name}
                </h1>
              </div>
              <div className="button--flex mr-1 mt-1">
                {job_detail?.status === 0 && (
                  <>
                    <ButtonType
                      typeButton={LABLE_BUTTON_CONFIRM}
                      action={() =>
                        this.setState({
                          status_action: 1,
                          typeAction: TYPE_ACTION.CONFIRM,
                          confirmModal: true,
                          titleModalConfirm: TYPE_ACTION.confirm_title,
                        })
                      }
                    />
                    <ButtonType
                      typeButton={LABLE_BUTTON_REJECT}
                      action={() =>
                        this.setState({
                          status_action: 3,
                          typeAction: TYPE_ACTION.REJECT,
                          confirmModal: true,
                          titleModalConfirm: TYPE_ACTION.reject_title,
                        })
                      }
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          {this.renderDetail()}
          <ConfirmModal
            isOpen={confirmModal}
            onHide={() =>
              this.setState({
                confirmModal: false,
              })
            }
            title={titleModalConfirm}
            action={() => this.changeStatus()}
          />
        </div>
      </div>
    )
  }

  render() {
    const { isLoading } = this.state
    return (
      <>
        {isLoading && <LoadingAction />}
        {this.renderBody()}
      </>
    )
  }
}

export default RecruitmentDetailScreen
