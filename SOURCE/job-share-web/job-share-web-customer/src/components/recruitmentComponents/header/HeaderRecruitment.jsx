import React, { Component } from 'react'
import NavBarRecruitment from './NavBarRecruitment'
import ContentHeader from './ContentHeader'
import './HeaderRecruitment.css'

class HeaderRecruitment extends Component {
  render() {
    return (
      <div className="container--header">
        <div className="layer">
          <NavBarRecruitment />
          <ContentHeader />
        </div>
      </div>
    )
  }
}

export default HeaderRecruitment
