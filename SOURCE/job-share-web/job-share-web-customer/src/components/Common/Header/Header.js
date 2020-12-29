import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavBar from '../NavBar/NavBar'
import { getUserInfo } from '@src/redux/actions'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="container-fluid p-0 m-0" style={{ borderBottom: '1px solid lightgrey' }}>
        <div className="container" style={{ margin: 0, padding: 0 }}>
          <NavBar />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  getUserInfo,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
