import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import './HeaderRecruitment.css'
import logo from '@src/assets/job2.png'
import { ROUTER } from '@constants/Constant'
export default class NavBarRecruitment extends Component {
  render() {
    return (
      <div className="container">
        <Navbar collapseOnSelect expand="lg">
          <Navbar.Brand href={ROUTER.RECRUITMENT}>
            <div className="row">
              <img src={logo} alt="logo" width="50" height="45" />
              <Nav.Link>
                <h5 className="pt-1 header--text__name">Job Share</h5>
              </Nav.Link>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ border: 'none' }} />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
              <Nav.Link href="#features">
                <a className="header--menu__text">GIỚI THIỆU</a>
              </Nav.Link>
              <Nav.Link href={ROUTER.LOGIN_RECRUITMENT}>
                <a className="header--menu__text">ĐĂNG NHẬP</a>
              </Nav.Link>
              <Nav.Link href={ROUTER.REGISTER_RECRUITMENT}>
                <a className="header--menu__text">ĐĂNG KÝ</a>
              </Nav.Link>
              <Nav.Link href={ROUTER.SEARCH_JOB}>
                <a className="header--menu__text">BẠN LÀ ỨNG VIÊN?</a>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}
