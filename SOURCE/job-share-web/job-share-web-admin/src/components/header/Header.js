import React, { Component } from 'react'
import { connect } from 'react-redux'
import { STATUS, STRING } from '@constants/Constant'
import { Modal, Col, Row, FormControl, Button } from 'react-bootstrap'
import avatar from '../../assets/img_logo.png'
import Cookie from 'js-cookie'
import Loading from 'src/components/loading/LoadingAction'
import swal from 'sweetalert'
import * as API from '@constants/Api'
import './Header.css'
// import reactotron from 'reactotron-react-js'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_info: '',
      loadingAction: false,
      modalChangePass: false,
      modal: {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      },
    }
  }

  componentDidMount() {
    this.getUserInfo()
  }

  async getUserInfo() {
    this.setState({
      loadingAction: true,
    })
    try {
      const res = await API.getUserInfo()
      if (res.status === STATUS.ACTIVE) {
        this.setState({
          loadingAction: false,
          user_info: res.data,
        })
      }
    } catch (error) {
      this.setState({
        loadingAction: false,
      })
    }
  }
  refreshPage() {
    window.location.reload(false)
  }

  async saveAndChangePass() {
    const { currentPassword, newPassword, confirmNewPassword } = this.state.modal
    if (newPassword === confirmNewPassword) {
      this.setState({
        loadingAction: true,
      })
      try {
        const res = await API.changePassword({
          OLD_PASS: currentPassword,
          NEW_PASS: newPassword,
        })
        if (res.status === STATUS.ACTIVE) {
          this.setState(
            {
              modalChangePass: false,
              loadingAction: false,
            },
            () =>
              swal({
                title: 'Đổi Mật khẩu thành công',
                icon: 'success',
              })
          )
        }
      } catch (error) {
        this.setState({
          loadingAction: false,
          error: error,
        })
      }
    } else {
      swal({
        title: 'Vui lòng kiểm tra lại mật khẩu',
        icon: 'warning',
      })
    }
  }

  setShowModal = (bool) => {
    this.setState({
      showModal: bool,
    })
  }

  logout() {
    Cookie.remove('SESSION_ID')
    window.location.href = '/login'
  }

  checkValueEmpty = () => {
    const { currentPassword, newPassword, confirmNewPassword } = this.state.modal
    if (currentPassword === '' || newPassword === '' || confirmNewPassword === '') {
      return true
    }
    return false
  }

  changePassword = () => {
    const { modalChangePass } = this.state
    return (
      <Modal
        show={modalChangePass}
        onHide={() => this.setState({ modalChangePass: false })}
        dialogClassName="modal-90w"
        centered
      >
        <Modal.Header closeButton style={{ backgroundColor: 'rgb(68, 87, 128)' }}>
          <h5 className="text-white">Đổi mật khẩu</h5>
        </Modal.Header>

        <Modal.Body className="custom-body">
          <Row>
            <Col className="modal-field" sm={4}>
              <span>Nhập {STRING.password}</span>
            </Col>
            <Col sm={8}>
              <FormControl
                type="password"
                id="oldPassword"
                maxLength={20}
                onChange={(e) => {
                  this.setState({
                    ...this.state,
                    modal: {
                      ...this.state.modal,
                      currentPassword: e.target.value,
                    },
                  })
                }}
                value={this.state.modal.currentPassword}
              />
            </Col>
          </Row>

          <Row className="my-3">
            <Col className="modal-field" sm={4}>
              <span>Nhập mật khẩu mới</span>
            </Col>
            <Col sm={8}>
              <FormControl
                maxLength={20}
                type="password"
                onChange={(e) => {
                  this.setState({
                    ...this.state,
                    modal: {
                      ...this.state.modal,
                      newPassword: e.target.value,
                    },
                  })
                }}
                value={this.state.modal.newPassword}
              />
            </Col>
          </Row>
          <Row className="my-3">
            <Col className="modal-field" sm={4}>
              <span style={{ justifyContent: 'center' }}>Xác nhận mật khẩu</span>
            </Col>
            <Col sm={8}>
              <FormControl
                maxLength={20}
                type="password"
                onChange={(e) => {
                  this.setState({
                    ...this.state,
                    modal: {
                      ...this.state.modal,
                      confirmNewPassword: e.target.value,
                    },
                  })
                }}
                value={this.state.modal.confirmNewPassword}
              />
            </Col>
          </Row>
          <Row sm={4} style={{ justifyContent: 'center', marginLeft: 30 }}>
            <Button variant="success" onClick={() => this.saveAndChangePass()} disabled={this.checkValueEmpty()}>
              Lưu
            </Button>
          </Row>
        </Modal.Body>
      </Modal>
    )
  }

  render() {
    const { loadingAction, user_info } = this.state
    return (
      <>
        {loadingAction && <Loading />}
        {this.changePassword()}
        <nav className="main-header navbar navbar-expand navbar-light me-header">
          {/* Left navbar links */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link cursor" data-widget="pushmenu" href="name">
                <i className="fas fa-bars icon--bars" />
              </a>
            </li>
          </ul>
          {/* Right navbar links */}
          <ul className="navbar-nav ml-auto">
            {/* Notifications Dropdown Menu */}
            <li className="nav-item dropdown" onClick={() => this.setState({ showModalNoti: true })}>
              <div className="nav-link mx-2" href="thong-bao" style={{ cursor: 'pointer' }}>
                <i className="fas fa-bell icon--bell" />
              </div>
            </li>
            <li className="nav-item dropdown">
              <div data-toggle="dropdown" style={{ cursor: 'pointer' }}>
                <span className="ml-3" style={{ fontWeight: 500, fontSize: 16 }}>
                  {user_info?.username}
                </span>
                <img src={avatar} alt="avatar" className="img--avatar  ml-2 mr-4" />
              </div>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right m-2" style={{ width: '210%' }}>
                <div className="dropdown-item cursor menu-hover dropdown--item" href="name">
                  <div className="dropdown--admin__item row">
                    <i className="far fa-user ml-3 mr-2 header--menu__icon" />
                    <p className="me-txt-admin-drop">Cập nhật thông tin</p>
                  </div>
                </div>
                <div
                  className="dropdown-item cursor menu-hover"
                  onClick={() =>
                    this.setState({
                      modalChangePass: true,
                    })
                  }
                >
                  <div className="dropdown--admin__item row">
                    <i className="fas fa-key ml-3 mr-2 header--menu__icon" />
                    <p className="me-txt-admin-drop">Đổi mật khẩu</p>
                  </div>
                </div>
                <div className="dropdown-item cursor menu-hover" onClick={this.logout}>
                  <div className="dropdown--admin__item row">
                    <i className="fas fa-sign-out-alt ml-3 mr-2 header--menu__icon" />
                    <p className="me-txt-admin-drop">Đăng xuất</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
