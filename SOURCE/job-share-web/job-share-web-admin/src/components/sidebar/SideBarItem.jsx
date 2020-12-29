import React from 'react'
import { withRouter } from 'react-router-dom'
import './SideBar.css'

const SideBarItem = ({ dataSideBar, dataWiget, action, pathName }) => {
  return (
    <>
      {dataSideBar?.map((value, index) => (
        <li
          key={index}
          className={pathName.search(value.router) !== -1 ? 'nav-item hoved nav__active--link' : 'nav-item hoved'}
          data-widget={dataWiget < 990 && 'pushmenu'}
          onClick={() => action(value.router)}
        >
          <span className="nav-link cursor nav-link-hover" style={{ color: '#fff' }}>
            <i className={`${'nav-icon fas'} ${value.icon}`} />
            <p className="me-txt-menu">{value.label}</p>
          </span>
        </li>
      ))}
    </>
  )
}

export default withRouter(SideBarItem)
