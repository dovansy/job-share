import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { STRING, ROUTER } from '@constants/Constant'
import './SideBar.css'
import logo from '@src/assets/job.png'
import SideBarItem from './SideBarItem.jsx'
// import reactotron from 'reactotron-react-js'

class SideBar extends Component {
  state = {
    width: window.innerWidth,
    height: window.innerHeight,
    show: false,
    menuItem: [
      {
        router: ROUTER.OVERVIEW,
        label: STRING.overView,
        icon: 'fa-tachometer-alt',
      },
      {
        router: ROUTER.RECRUITMENT,
        label: STRING.recruitment_management,
        icon: 'fa-file-alt',
      },
      {
        router: ROUTER.CV_MANAGEMENT,
        label: STRING.cv_management,
        icon: 'fa-address-card',
      },
      {
        router: ROUTER.COMPANY,
        label: STRING.company_management,
        icon: 'fa-building',
      },
      {
        router: ROUTER.STAFF,
        label: STRING.staff_management,
        icon: 'fa-user-tie',
      },
      {
        router: ROUTER.USER,
        label: STRING.user_management,
        icon: 'fa-users',
      },
      // {
      //   router: ROUTER.CHAT_SUPPORT,
      //   label: STRING.chat_support,
      //   icon: 'fa-comments',
      // },
    ],
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions)
  }

  handleRouter = (path) => {
    this.props.history.push(path)
  }

  render() {
    const { width, menuItem } = this.state
    const pathName = window.location.pathname
    return (
      <aside className="main-sidebar sidebar-dark-primary elevation-4 me-sidebar">
        <a className="brand-link cursor" href={ROUTER.OVERVIEW} style={{ textAlign: 'center' }}>
          <p className="mb-0">
            <img
              src={logo}
              className="brand-image"
              data-auto-collapse-size="768"
              alt="img_logo"
              style={{ opacity: '1' }}
            />
            <span className="brand-text font-weight-light me-txt-logo">JOB SHARE</span>
            <i className="nav-icon fas fa-bars me-delete" data-widget={width < 990 && 'pushmenu'}></i>
          </p>
        </a>
        <div className="sidebar me-sidebar">
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <SideBarItem dataSideBar={menuItem} pathName={pathName} dataWiget={width} action={this.handleRouter} />
            </ul>
          </nav>
        </div>
      </aside>
    )
  }
}

export default withRouter(SideBar)
