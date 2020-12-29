import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import { toDateString } from 'src/utils/helper'
import { notifyFail, notifySuccess } from 'src/utils/notify'
import {
  STRING,
  TYPE_ACTION,
  LABLE_BUTTON_UNACTIVE,
  LABLE_BUTTON_ACTIVE,
  STATUS,
  ROLE_TYPE,
  GENDER,
  ROLE,
} from '@constants/Constant'
import * as API from '@constants/Api'
import LoadingAction from 'src/components/loading/LoadingAction'
import ButtonType from '@src/components/button/ButtonType'
import ConfirmModal from '@src/components/modal/ConfirmModal'
import reactotron from 'src/config/ReactotronConfig'
import './UserScreen.css'

class UserDetailScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      confirmModal: false,
      isExist: false,
      typeAction: '',
      titleModalConfirm: '',
      user_detail: {},
    }
  }

  componentDidMount() {
    this.getUserDetail()
  }

  async getUserDetail() {
    this.setState({
      isLoading: true,
    })
    try {
      const {
        match: { params },
      } = this.props
      const res = await API.getUserDetail({ user_id: params.id })
      reactotron.log('res', res)
      if (res.status === STATUS.ACTIVE) {
        this.setState({
          isLoading: false,
          user_detail: res.data,
        })
      }
    } catch (error) {
      this.setState({
        isLoading: false,
      })
    }
  }

  async active() {
    this.setState({
      isLoading: true,
    })
    const {
      match: { params },
    } = this.props
    try {
      const res = await API.changeStatus({
        user_id: params.id,
        status: STATUS.ACTIVE,
      })
      if (res.status === STATUS.ACTIVE) {
        this.setState({ confirmModal: false, isLoading: false }, () => {
          notifySuccess(STRING.notifySuccess)
          this.getUserDetail()
        })
      }
    } catch (error) {
      this.setState(
        {
          confirmModal: false,
          isLoading: false,
        },
        () => notifyFail(STRING.notifyFail)
      )
    }
  }

  async unactive() {
    this.setState({
      isLoading: true,
    })
    const {
      match: { params },
    } = this.props
    try {
      const res = await API.changeStatus({
        user_id: params.id,
        status: STATUS.UNACTIVE,
      })
      if (res.status === STATUS.ACTIVE) {
        this.setState(
          {
            confirmModal: false,
            isLoading: false,
          },
          () => {
            notifySuccess(STRING.notifySuccess)
            this.getUserDetail()
          }
        )
      }
    } catch (error) {
      this.setState(
        {
          confirmModal: false,
          isLoading: false,
        },
        () => notifyFail(STRING.notifyFail)
      )
    }
  }

  renderActionConfirmModal = (typeAction) => {
    switch (typeAction) {
      case TYPE_ACTION.ACTIVE:
        return () => this.active()
      case TYPE_ACTION.UNACTIVE:
        return () => this.unactive()
      default:
        break
    }
  }

  renderUserInfo() {
    const { user_detail, isLoading } = this.state
    if (isLoading) {
      return (
        <div
          className="p-2"
          style={{ backgroundColor: 'white', borderRadius: '5px', boxShadow: '3px 3px 10px rgb(0, 0, 0, 0.4)' }}
        >
          <h6 className="ml-3">Loading...</h6>
        </div>
      )
    }
    return (
      <div
        className="p-2"
        style={{
          backgroundColor: 'white',
          borderRadius: '5px',
          boxShadow: '3px 3px 10px rgb(0, 0, 0, 0.4)',
          marginTop: -5,
        }}
      >
        <div className="mx-2">
          <h6>Thông tin</h6>
          <div className="row">
            {/* col 1 */}
            <div className="col-md-6 col-12">
              <div className="row mx-2 my-1">
                <div className="col-5">
                  <Col>{STRING.fullName}</Col>
                </div>
                <div className="col-7">
                  <Col>
                    <strong>{user_detail?.user_profile?.name || '--'}</strong>
                  </Col>
                </div>
              </div>
              <div className="row mx-2 my-3">
                <div className="col-5">
                  <Col>{STRING.phoneNumber}</Col>
                </div>
                <div className="col-7">
                  <Col>
                    <strong>{user_detail?.user_profile?.phone || '--'}</strong>
                  </Col>
                </div>
              </div>
              <div className="row mx-2 my-3">
                <div className="col-5">
                  <Col>{STRING.email}</Col>
                </div>
                <div className="col-7">
                  <Col>
                    <strong>{user_detail?.user_profile?.email || '--'}</strong>
                  </Col>
                </div>
              </div>
              <div className="row mx-2 my-3">
                <div className="col-5">
                  <Col>{STRING.sex}</Col>
                </div>
                <div className="col-7">
                  <Col>
                    <strong>{user_detail?.user_profile?.gender === GENDER.MALE ? 'Nam' : 'Nữ'}</strong>
                  </Col>
                </div>
              </div>
              {user_detail?.role_id === ROLE_TYPE.RECRUITMENT ? (
                ''
              ) : (
                <>
                  <div className="row mx-2 my-3">
                    <div className="col-5">
                      <Col>{STRING.date_of_birth}</Col>
                    </div>
                    <div className="col-7">
                      <Col>
                        <strong>
                          {user_detail?.user_profile?.dob ? toDateString(user_detail?.user_profile?.dob) : '--'}
                        </strong>
                      </Col>
                    </div>
                  </div>
                  <div className="row mx-2 my-3">
                    <div className="col-5">
                      <Col>{STRING.address}</Col>
                    </div>
                    <div className="col-7">
                      <Col>
                        <strong>{user_detail?.user_profile?.address || '--'}</strong>
                      </Col>
                    </div>
                  </div>
                  {/* <div className="row mx-2 my-3">
                    <div className="col-5">
                      <Col>{STRING.description}</Col>
                    </div>
                    <div className="col-7">
                      <Col>
                        <strong>{user_detail?.user_profile?.description || '--'}</strong>
                      </Col>
                    </div>
                  </div> */}
                </>
              )}
            </div>
            {/* col 2 */}
            {user_detail?.role_id === ROLE_TYPE.RECRUITMENT ? (
              <div className="col-md-6 col-12">
                <div className="row mx-2 my-1">
                  <div className="col-5">
                    <Col>{STRING.user_type}</Col>
                  </div>
                  <div className="col-7">
                    <Col>
                      <strong>{ROLE[user_detail?.role_id] || '--'}</strong>
                    </Col>
                  </div>
                </div>
                <div className="row mx-2 my-3">
                  <div className="col-5">
                    <Col>{STRING.status}</Col>
                  </div>
                  <div className="col-7">
                    <Col>
                      <strong>{user_detail?.is_active === STATUS.ACTIVE ? 'Đang hoạt động' : 'Ngừng hoạt động'}</strong>
                    </Col>
                  </div>
                </div>
                <div className="row mx-2 my-3">
                  <div className="col-5">
                    <Col>{STRING.profession}</Col>
                  </div>
                  <div className="col-7">
                    <Col>
                      <strong>Nhân viên</strong>
                    </Col>
                  </div>
                </div>
                <div className="row mx-2 my-3">
                  <div className="col-5">
                    <Col>{STRING.name_companmy}</Col>
                  </div>
                  <div className="col-7">
                    <Col>
                      <strong>{user_detail?.company?.name || '--'}</strong>
                    </Col>
                  </div>
                </div>
                <div className="row mx-2 my-3">
                  <div className="col-5">
                    <Col>{STRING.website}</Col>
                  </div>
                  <div className="col-7">
                    <Col>
                      {/* eslint-disable-next-line */}
                      <a href={user_detail?.company?.url}>{user_detail?.company?.url || '--'}</a>
                    </Col>
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-md-6 col-12">
                <div className="row mx-2 my-1">
                  <div className="col-5">
                    <Col>{STRING.user_type}</Col>
                  </div>
                  <div className="col-7">
                    <Col>
                      <strong>{ROLE[user_detail?.role_id] || '--'}</strong>
                    </Col>
                  </div>
                </div>
                <div className="row mx-2 my-3">
                  <div className="col-5">
                    <Col>{STRING.status}</Col>
                  </div>
                  <div className="col-7">
                    <Col>
                      <strong>{user_detail?.is_active === STATUS.ACTIVE ? 'Đang hoạt động' : 'Ngừng hoạt động'}</strong>
                    </Col>
                  </div>
                </div>
                <div className="row mx-2 my-3">
                  <div className="col-5">
                    <Col>{STRING.profession}</Col>
                  </div>
                  <div className="col-7">
                    <Col>
                      <strong>Sinh viên</strong>
                    </Col>
                  </div>
                </div>

                {/* <div className="row mx-2 my-3">
                  <div className="col-5">
                    <Col>{STRING.experience}</Col>
                  </div>
                  <div className="col-7">
                    <Col>
                      <strong>{user_detail?.experience || '--'}</strong>
                    </Col>
                  </div>
                </div> */}
                <div className="row mx-2 my-3">
                  <div className="col-5">
                    <Col>{STRING.situation_hope}</Col>
                  </div>
                  <div className="col-7">
                    <Col>
                      <strong>{user_detail?.user_profile?.apply_work || '--'}</strong>
                    </Col>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // renderListRecruitment() {
  //   return (
  //     <div
  //       className="p-2"
  //       style={{
  //         backgroundColor: 'white',
  //         borderRadius: '5px',
  //         boxShadow: '3px 3px 10px rgb(0, 0, 0, 0.4)',
  //         marginTop: -5,
  //       }}
  //     >
  //       <h1>renderListRecruitment</h1>
  //     </div>
  //   )
  // }

  renderUserDetail() {
    const { user_detail } = this.state
    return (
      <div className="mx-3">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="home-tab"
              data-toggle="tab"
              href="#thong-tin-nguoi-dung"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Thông tin người dùng
            </a>
          </li>
          {user_detail?.role_id === ROLE_TYPE.RECRUITMENT && (
            <li className="nav-item">
              <a
                className="nav-link"
                id="profile-tab"
                data-toggle="tab"
                href="#danh-sach-tin-tuyen-dung"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                Danh sách tin tuyển dụng
              </a>
            </li>
          )}
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="thong-tin-nguoi-dung"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            {this.renderUserInfo()}
          </div>
          {/* <div className="tab-pane fade" id="danh-sach-tin-tuyen-dung" role="tabpanel" aria-labelledby="profile-tab">
            {this.renderListRecruitment()}
          </div> */}
        </div>
      </div>
    )
  }

  renderBody() {
    const { confirmModal, typeAction, titleModalConfirm, user_detail } = this.state
    return (
      <div className="content-wrapper bg-white">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2 header--detail">
              <div className="ml-3">
                <h1 className="header h1--cursor" onClick={() => this.props.history.goBack()}>
                  <i className="fas mr-2 fa-angle-left" />
                  {STRING.user_detail} {user_detail?.username}
                </h1>
              </div>
              <div className="button--flex mr-1 mt-1">
                {user_detail?.is_active === STATUS.ACTIVE && (
                  <ButtonType
                    typeButton={LABLE_BUTTON_UNACTIVE}
                    action={() =>
                      this.setState({
                        typeAction: TYPE_ACTION.UNACTIVE,
                        confirmModal: true,
                        titleModalConfirm: TYPE_ACTION.unactive_title,
                      })
                    }
                  />
                )}
                {user_detail?.is_active === STATUS.UNACTIVE && (
                  <ButtonType
                    typeButton={LABLE_BUTTON_ACTIVE}
                    action={() =>
                      this.setState({
                        typeAction: TYPE_ACTION.ACTIVE,
                        confirmModal: true,
                        titleModalConfirm: TYPE_ACTION.active_title,
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
            action={this.renderActionConfirmModal(typeAction)}
          />
          {this.renderUserDetail()}
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

export default UserDetailScreen
