import React, { Component } from 'react'
import { STRING, STATUS, TYPE_ACTION, LABLE_BUTTON_ACTIVE, LABLE_BUTTON_UNACTIVE } from '@constants/Constant'
import { toDateString } from 'src/utils/helper'
import * as API from '@constants/Api'
import ButtonType from '@src/components/button/ButtonType'
import ConfirmModal from '@src/components/modal/ConfirmModal'
import LoadingAction from 'src/components/loading/LoadingAction'
import swal from 'sweetalert'
import './Cv.css'
import './CV_DETAIL.css'

class CvDetailScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      confirmModal: false,
      isExist: false,
      typeAction: '',
      titleModalConfirm: '',
      cv_detail: '',
    }
  }
  componentDidMount() {
    this.getCVDetail()
  }

  async getCVDetail() {
    this.setState({ isLoading: true })
    const {
      match: { params },
    } = this.props
    try {
      let res = await API.getCVDetail({ user_id: params?.id })
      if (res.status === STATUS.ACTIVE) {
        this.setState({
          isLoading: false,
          cv_detail: res.data,
        })
      }
    } catch (error) {
      this.setState({
        isLoading: false,
      })
    }
  }

  confirm() {
    alert('confirm')
  }

  reject() {
    alert('reject')
  }

  async changeStatusCV() {
    const { typeAction, cv_detail } = this.state
    this.setState({
      isLoading: true,
    })
    const Obj = {
      user_id: cv_detail?.user?.id,
      cv_status: typeAction,
    }
    try {
      const res = await API.changeStatusCV(Obj)
      if (res.status === STATUS.ACTIVE) {
        await this.setState({ isLoading: false, confirmModal: false }, () =>
          swal({
            title: 'Thao tác thành công',
            icon: 'success',
          })
        )
      }
      this.getCVDetail()
    } catch (error) {
      this.setState({ isLoading: false })
    }
  }

  renderBody() {
    const { confirmModal, titleModalConfirm, cv_detail } = this.state
    return (
      <div className="content-wrapper bg-white">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2 header--detail">
              <div className="ml-3">
                <h1 className="header h1--cursor" onClick={() => this.props.history.goBack()}>
                  <i className="fas mr-2 fa-angle-left" />
                  {STRING.cv_detail} {cv_detail?.user?.user_profile?.apply_work}
                </h1>
              </div>
              <div className="button--flex mr-1 mt-1">
                {cv_detail?.user?.cv_status === STATUS.ACTIVE && (
                  <ButtonType
                    typeButton={LABLE_BUTTON_UNACTIVE}
                    action={() =>
                      this.setState({
                        typeAction: 0,
                        confirmModal: true,
                        titleModalConfirm: TYPE_ACTION.unactive_title + ' tìm việc',
                      })
                    }
                  />
                )}
                {cv_detail?.user?.cv_status !== STATUS.ACTIVE && (
                  <ButtonType
                    typeButton={LABLE_BUTTON_ACTIVE}
                    action={() =>
                      this.setState({
                        typeAction: 1,
                        confirmModal: true,
                        titleModalConfirm: TYPE_ACTION.active_title + ' tìm việc',
                      })
                    }
                  />
                )}
              </div>
            </div>
          </div>
          <ConfirmModal
            isOpen={confirmModal}
            onHide={() =>
              this.setState({
                confirmModal: false,
              })
            }
            title={titleModalConfirm}
            action={() => this.changeStatusCV()}
          />
          <div className="py-3" style={{ backgroundColor: '#EEF1F5' }}>
            <div className="container">
              <div className="tab-content">
                <div>
                  <div id="cvo-document-root">
                    <div className="cvo-document">
                      <div className="cvo-page">
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
                                            src="https://www.topcv.vn/upload/images/avatars/no_avatar_3_4.jpg"
                                            value=""
                                            alt="avatar"
                                            name="cvoData[profile][avatar]"
                                            type="file"
                                            cvo-form-field="true"
                                            blockkey="profile"
                                            fieldkey="avatar"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => alert('1')}
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
                                    <div
                                      className="row"
                                      type="fieldgroup"
                                      cvo-form-fieldgroup="true"
                                      blockkey="education"
                                    >
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
                                    <div
                                      className="row"
                                      type="fieldgroup"
                                      cvo-form-fieldgroup="true"
                                      blockkey="experience"
                                    >
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
                                    <div
                                      className="row"
                                      type="fieldgroup"
                                      cvo-form-fieldgroup="true"
                                      blockkey="experience"
                                    >
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
                                    <div
                                      className="row"
                                      type="fieldgroup"
                                      cvo-form-fieldgroup="true"
                                      blockkey="experience"
                                    >
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
              </div>
            </div>
          </div>
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

export default CvDetailScreen
