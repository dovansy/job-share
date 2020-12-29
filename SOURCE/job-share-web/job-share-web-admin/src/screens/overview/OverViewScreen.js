import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import { STRING, STATUS } from '@constants/Constant'
import OverViewBlock from './OverViewBlock'
import LoadingAction from 'src/components/loading/LoadingAction'
import * as API from '@constants/Api'
import reactotron from 'src/config/ReactotronConfig'
export default class OverViewScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      data: [{ value: '' }, { value: '' }, { value: '' }, { value: '' }],
      cv: {},
      customer: {},
      style: [
        {
          label: STRING.allSystem,
          icon: 'fas fa-2x fa-server',
          color: '#4F73DF',
        },
        {
          label: STRING.pending,
          icon: 'fas fa-2x fa-spinner',
          color: '#1CC88B',
        },
        {
          label: STRING.confirmed,
          icon: 'far fa-2x fa-check-circle',
          color: '#36B9CC',
        },
        {
          label: STRING.rejected,
          icon: 'fas fa-2x fa-exclamation-circle',
          color: '#F6C13E',
        },
      ],
      dataUser: [{ value: 10 }, { value: 15 }],
      styleUser: [
        {
          label: STRING.applicant,
          icon: 'far fa-2x fa-user',
          color: '#5c96e7',
        },
        {
          label: STRING.employer,
          icon: 'far fa-2x fa-handshake',
          color: '#cba83c',
        },
      ],
    }
  }
  componentDidMount() {
    this.overViewAdmin()
  }
  async overViewAdmin() {
    this.setState({
      isLoading: true,
    })
    try {
      const res = await API.overViewAdmin()
      reactotron.log(res)
      if (res.status === STATUS.ACTIVE) {
        this.setState({
          isLoading: false,
          data: res.data.recruitment,
          cv: res.data.cv,
          customer: res.data.customer,
        })
      }
    } catch (error) {
      this.setState({
        isLoading: false,
      })
    }
  }
  renderBody() {
    const { data, style, cv, customer } = this.state
    return (
      <div className="content-wrapper bg-white">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="header">{STRING.overView}</h1>
              </div>
            </div>
          </div>
        </div>
        <OverViewBlock data={data} style={style} title={STRING.recruitment} iconLabel="far fa-2x fa-file-alt" />
        <div className="overview--recruitment mx-4 px-4">
          <div className="mx-4 overview--div__text">
            <i className="far fa-2x fa-address-card"></i>
            <span className="overview--text pl-1">{STRING.cv}</span>
          </div>
          <div className="row overview--responsive__user pb-4">
            <div
              className="p-2 pt-3 mr-3 overview--responsive__box"
              style={{
                borderLeft: `4px solid #4F73DF`,
                color: `#4F73DF`,
              }}
            >
              <Col sm={9} className="ml-1">
                <p className="txt-title">Tổng số cv</p>
                <p className="txt--title__value ml-4">{cv?.cv_all || 0}</p>
              </Col>
              <Col>
                <p className="mt-4"></p>
                <i style={{ color: '#DCE0EB' }} className="fas fa-2x fa-user-plus" />
              </Col>
            </div>
            <div
              className="p-2 pt-3  mr-3 overview--responsive__box"
              style={{
                borderLeft: `4px solid #1CC88B`,
                color: `#1CC88B`,
              }}
            >
              <Col sm={9} className="ml-1">
                <p className="txt-title">Đang tìm việc</p>
                <p className="txt--title__value ml-4">{cv?.cv_search_job || 0}</p>
              </Col>
              <Col>
                <p className="mt-4 mr-3"></p>
                <i style={{ color: '#DCE0EB' }} className="fas fa-2x fa-handshake" />
              </Col>
            </div>
          </div>
        </div>
        <div className="overview--recruitment mx-4 px-4">
          <div className="mx-4 overview--div__text">
            <i className="fas fa-2x fa-users"></i>
            <span className="overview--text pl-1">{STRING.accountUser}</span>
          </div>
          <div className="row overview--responsive__user pb-4">
            <div
              className="p-2 pt-3 mr-3 overview--responsive__box"
              style={{
                borderLeft: `4px solid #4F73DF`,
                color: `#4F73DF`,
              }}
            >
              <Col sm={9} className="ml-1">
                <p className="txt-title">{STRING.employer}</p>
                <p className="txt--title__value ml-4">{customer?.recruitment || 0}</p>
              </Col>
              <Col>
                <p className="mt-4"></p>
                <i style={{ color: '#DCE0EB' }} className="fas fa-2x fa-user-plus" />
              </Col>
            </div>
            <div
              className="p-2 pt-3  mr-3 overview--responsive__box"
              style={{
                borderLeft: `4px solid #1CC88B`,
                color: `#1CC88B`,
              }}
            >
              <Col sm={9} className="ml-1">
                <p className="txt-title">{STRING.applicant}</p>
                <p className="txt--title__value ml-4">{customer?.applicant || 0}</p>
              </Col>
              <Col>
                <p className="mt-4 mr-3"></p>
                <i style={{ color: '#DCE0EB' }} className="fas fa-2x fa-handshake" />
              </Col>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { isLoading } = this.state
    return (
      <>
        {isLoading && <LoadingAction />}
        {this.renderBody()}
      </>
    )
  }
}
