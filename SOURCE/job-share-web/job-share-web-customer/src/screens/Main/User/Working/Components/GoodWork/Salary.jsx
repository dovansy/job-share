import React, { Component } from 'react'
import fpt from '@src/assets/fpt.webp'
class Salary extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <>
        <div className=" col-6 mt-2" style={{ border: '1px solid #ced4da', borderRadius: '3px' }}>
          <div className="float-left mt-1" style={{ width: '70px', display: 'inline-block' }}>
            <img src={fpt} style={{ maxWidth: '100%', backgroundSize: 'cover' }} />
          </div>
          <div className="float-left ml-3" style={{ display: 'inline-block' }}>
            <span>
              <b>Trợ lý dự án</b>
            </span>
            <br />
            <span>Công ty cổ phần job-share</span>
            <div>
              <span>7-9m </span>
              <span>Hà Nội</span>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default Salary
