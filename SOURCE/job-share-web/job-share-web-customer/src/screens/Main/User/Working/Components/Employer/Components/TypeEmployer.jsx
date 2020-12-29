import React, { Component } from 'react'
import logo from '@src/assets/logo.webp'
class TypeEmployer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <>
        <div className="col-6 col-sm-3 col-md-2 mt-2 p-2">
          <div style={{ border: '1px solid black', alignItems: 'center', borderRadius: '3px' }}>
            <img src={logo} style={{ maxWidth: '100%' }} />
          </div>
        </div>
      </>
    )
  }
}
export default TypeEmployer
