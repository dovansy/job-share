import React, { Component } from 'react'
import Topic from './Components/Topic'

class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div style={{ borderTop: '1px solid lightgray' }}>
        <Topic />
        <div className="container-fluid" style={{ border: '1px solid lightgray' }}>
          <div className="container">
            <div className="col-12 m-3" style={{ textAlign: 'center' }}>
              <p>© 2020 - Job-Share Việt Nam</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Footer
