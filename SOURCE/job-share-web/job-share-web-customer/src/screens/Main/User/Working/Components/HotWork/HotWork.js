import React, { Component } from 'react'
import {} from 'react-bootstrap'
import '@styles/BestWork.css'
import Staff from './Components/Staff'

class HotWork extends Component {
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
          <i className="fas fa-heart p-2" style={{ fontSize: 22, color: '#F8D205' }} />
          <h6 className="text-left header__title">Việc làm hấp dẫn</h6>
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
            <Staff key={index} />
          ))}
        </div>
      </>
    )
  }
}
export default HotWork
