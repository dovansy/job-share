import React, { Component } from 'react'
import {} from 'react-bootstrap'
import '@styles/BestWork.css'
import Company from './Components/Company'
import * as API from '@constants/Api'
import reactotron from 'src/debug/ReactotronConfig'
class BestWork extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newJob: [],
    }
  }

  componentDidMount() {
    this.getListJobHome()
  }

  async getListJobHome() {
    const res = await API.getListJobHome()
    this.setState({
      newJob: res?.data?.newJob,
    })
  }

  render() {
    return (
      <>
        <div
          className="row p-2 px-3  d-flex justify-content-between header--modal m-0"
          style={{ backgroundColor: '#21303F' }}
        >
          <div className="row px-3">
            <h6 className="text-left header__title">Tin tuyển dụng mới nhất từ nhà tuyển dụng</h6>
          </div>
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
          {this.state?.newJob?.map((item, index) => (
            <Company key={index} data={item} />
          ))}
        </div>
      </>
    )
  }
}
export default BestWork
