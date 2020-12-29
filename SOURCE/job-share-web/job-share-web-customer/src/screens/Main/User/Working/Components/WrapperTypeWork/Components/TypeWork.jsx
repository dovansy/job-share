import React, { Component } from 'react'
class TypeWork extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <>
        <div className="col-12 job--item__sub" style={{ borderBottom: '1px solid #ced4da', borderRadius: '3px' }}>
          <div className="row">
            <div
              className="col-4 float-left my-1"
              style={{ maxWidth: '100%', display: 'inline-block', height: '46px' }}
            >
              <img src={require('@src/assets/fpt.webp')} style={{ maxWidth: '60%', backgroundSize: 'cover' }} />
            </div>
            <div className=" col-8 float-left" style={{ display: 'inline-block' }}>
              <span>
                <b>Trợ lý dự án</b>
              </span>
              <br />
              <span>Công ty cổ phần job-share</span>
              {/* <div>
                <span>7-9m</span>
                <span>Hà Nội</span>
              </div> */}
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default TypeWork
