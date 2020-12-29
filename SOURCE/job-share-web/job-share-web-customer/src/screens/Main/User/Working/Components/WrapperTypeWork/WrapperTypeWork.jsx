import React, { Component } from 'react'
import {} from 'react-bootstrap'
import '@styles/BestWork.css'
import TypeWork from './Components/TypeWork'

class WrapperTypeWork extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numberCompany: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    }
  }
  render() {
    return (
      <>
        <div className="row p-2 px-3 mt-2 d-flex header--modal m-0" style={{ backgroundColor: '#21303F' }}>
          <h6 className="text-left header__title">Việc làm hot nhất</h6>
          {/* <span className="text-right seemore">{'>>'} Xem tất cả</span> */}
        </div>
        <div
          className="row p-2 m-0 d-flex justify-content-between"
          style={{
            border: '1px solid #ced4da',
            backgroundColor: 'white',
            borderRadius: '3px',
            maxHeight: 600,
            overflow: 'scroll',
          }}
        >
          {this.state.numberCompany.map((item, index) => (
            <TypeWork key={index} />
          ))}
        </div>
      </>
    )
  }
}
export default WrapperTypeWork
