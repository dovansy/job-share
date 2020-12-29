import React, { Component } from 'react'
import TypeEmployer from './Components/TypeEmployer'
class Employer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numberEmployer: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    }
  }
  render() {
    return (
      <>
        <div className="col-12 my-0" style={{ textAlign: 'center' }}>
          <h3 style={{ cursor: 'pointer ' }}>NHÀ TUYỂN DỤNG NỔI BẬT</h3>
          <div className="row m-0">
            {this.state.numberEmployer.map((item, index) => (
              <TypeEmployer key={index} />
            ))}
          </div>
        </div>
      </>
    )
  }
}
export default Employer
