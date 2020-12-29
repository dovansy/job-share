import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { ROUTER, STATUS, STRING } from '@constants/Constant'
import { Navbar, Nav, Modal, Col, Row, FormControl, Button } from 'react-bootstrap'
import { getUserInfo } from '@src/redux/actions'
import Cookie from 'js-cookie'
import * as API from '@constants/Api'
import logo from './job.png'
import Loading from 'src/components/Loading'
import swal from 'sweetalert'
import './HeaderRecruitment.css'
import { Link } from 'react-router-dom'

class HeaderLogin extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      modalChangePass: false,
      user_info: '',
      modal: {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      },
    }
  }

  async saveAndChangePass() {
    const { currentPassword, newPassword, confirmNewPassword } = this.state.modal
    if (newPassword === confirmNewPassword) {
      this.setState({
        loadingAction: true,
      })
      try {
        const res = await API.changePassword({
          oldPassword: currentPassword,
          newPassword: newPassword,
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

  logout() {
    Cookie.remove('SESSION_ID_RECRUITMENT')
    window.location.href = ROUTER.RECRUITMENT
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
        <Modal.Header closeButton>
          <h5>Đổi mật khẩu</h5>
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
    const pathName = window.location.pathname
    return (
      <div className="container">
        {loadingAction && <Loading />}
        {this.changePassword()}
        <Navbar collapseOnSelect expand="lg">
          <Navbar.Brand href={ROUTER.RECRUITMENT}>
            <div className="row">
              <img src={logo} alt="logo" width="50" height="45" />
              <Nav.Link>
                <h5 className="pt-1">Job Share</h5>
              </Nav.Link>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav-login"
            style={{ border: 'none', backgroundColor: '#21303F' }}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
              {Cookie.get('SESSION_ID_RECRUITMENT') ? (
                <>
                  <Nav.Link
                    href={ROUTER.HOME_RECRUITMENT}
                    className={pathName.search(ROUTER.HOME_RECRUITMENT) !== -1 ? 'active-recruitment' : ''}
                  >
                    <a className="nav-text-login nav-text-login-recruitment">Trang chủ</a>
                  </Nav.Link>
                  <Nav.Link
                    href={ROUTER.SEARCH_APPLICANT}
                    className={pathName.search(ROUTER.SEARCH_APPLICANT) !== -1 ? 'active-recruitment' : ''}
                  >
                    <a className="nav-text-login nav-text-login-recruitment">Tìm ứng viên</a>
                  </Nav.Link>
                  <Nav.Link
                    href={ROUTER.NEWS_RECRUITMENT}
                    className={pathName.search(ROUTER.NEWS_RECRUITMENT) !== -1 ? 'active-recruitment' : ''}
                  >
                    <a className="nav-text-login nav-text-login-recruitment">Tin tuyển dụng</a>
                  </Nav.Link>
                  <Nav.Link href="" className="dropdown">
                    <a className="nav-text-login" data-toggle="dropdown">
                      <i className="far fa-user mr-1" />
                      {this.props.user_info || 'Tài khoản'}
                    </a>
                    <div className="dropdown-menu dropdown-menu-right">
                      {/* <a className="dropdown-item cursor drop--menu__hover">
                        <p className="menu--item__text my-1">Ứng viên đã lưu</p>
                      </a> */}
                      {/* <a className="dropdown-item cursor drop--menu__hover">
                        <p className="menu--item__text my-1">Thông tin cá nhân</p>
                      </a> */}
                      <Link to={ROUTER.CHANGE_INFO_COMPANY} style={{ textDecoration: 'none' }}>
                        <a className="dropdown-item cursor drop--menu__hover">
                          <p className="menu--item__text my-1">Thông tin công ty</p>
                        </a>
                      </Link>
                      <a
                        className="dropdown-item cursor drop--menu__hover"
                        onClick={() =>
                          this.setState({
                            modalChangePass: true,
                          })
                        }
                      >
                        <p className="menu--item__text my-1">Đổi mật khẩu</p>
                      </a>
                      <a className="dropdown-item cursor drop--menu__hover" onClick={this.logout}>
                        <p className="menu--item__text my-1">Đăng xuất</p>
                      </a>
                    </div>
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link
                    href={ROUTER.LOGIN_RECRUITMENT}
                    className={pathName.search(ROUTER.LOGIN_RECRUITMENT) !== -1 ? 'active-recruitment' : ''}
                  >
                    <a className="nav-text-login nav-text-login-recruitment">Đăng nhập</a>
                  </Nav.Link>
                  <Nav.Link
                    href={ROUTER.REGISTER_RECRUITMENT}
                    className={pathName.search(ROUTER.REGISTER_RECRUITMENT) !== -1 ? 'active-recruitment' : ''}
                  >
                    <a className="nav-text-login nav-text-login-recruitment">Đăng ký</a>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

export default HeaderLogin
