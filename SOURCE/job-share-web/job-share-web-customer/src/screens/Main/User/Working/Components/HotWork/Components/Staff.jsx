import React, { Component } from 'react'
class Staff extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <>
        <div className="col-12 job--item__sub" style={{ borderBottom: '1px solid #ced4da', borderRadius: '3px' }}>
          <div className="row">
            <div className="col-3 float-left my-1" style={{ display: 'inline-block' }}>
              <img src={require('@src/assets/fpt.webp')} style={{ maxWidth: '60%', backgroundSize: 'cover' }} />
            </div>
            <div className=" col-5 float-left" style={{ display: 'inline-block' }}>
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
            <div className="col-2">10-15 triệu</div>
            <div className="col-2">Hà Nội</div>
          </div>
        </div>
      </>
    )
  }
}
export default Staff
