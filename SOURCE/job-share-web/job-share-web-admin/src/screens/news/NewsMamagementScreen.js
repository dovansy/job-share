import React, { Component } from 'react'
import { Row, Col, FormControl } from 'react-bootstrap'
import { STRING, LABLE_BUTTON_SEARCH, LABLE_BUTTON_ADD, LABLE_BUTTON_CLEARSEARCH } from '@constants/Constant'
import DatePickerCustom from '@src/components/datetime/DatePickerCustom'
import ConfirmModal from '@src/components/modal/ConfirmModal'
import TableData from '@src/components/table/TableData'
import ButtonType from '@src/components/button/ButtonType'
import PaginationType from '@src/components/pagination/PaginationType'

class NewsMamagementScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      [STRING.fromDate]: '',
      [STRING.toDate]: '',
      userName: '',
      status: '',
      activePage: 1,
      total_Page: 3,
      confirmModal: false,
      isExist: false,
      tableHeader: [
        {
          header: STRING.numericalOrder,
        },
        {
          header: STRING.code_news,
        },
        {
          header: STRING.title,
        },
        {
          header: STRING.user_created,
        },
        {
          header: STRING.status,
        },
        {
          header: STRING.createDate,
        },
        {
          header: STRING.action,
        },
      ],
      tableBody: {
        id: '1',
        fullName: 'BV_01',
        phone: 'Top 10 công ty công nghệ hàng đầu việt nam',
        email: 'Đỗ Văn Sỹ',
        status: 'Đang hoạt động',
        createDate: '10/10/2020',
      },
    }
  }

  getDetail() {
    alert('getDetail')
  }

  search() {
    alert('search')
  }

  add() {
    alert('add')
  }

  update() {
    alert('update')
  }

  clearSearch() {
    alert('clear search')
  }

  isOpen() {
    this.setState({
      confirmModal: true,
    })
  }

  handleChange = (fieldName, value) => {
    this.setState({
      ...this.state,
      [fieldName]: value || '',
    })
  }

  handleKeyPress = (e) => {
    if (e.charCode === 13) {
    }
  }

  renderField() {
    const { [STRING.fromDate]: fromDate, [STRING.toDate]: toDate, userName, status } = this.state
    return (
      <Row className="mx-0">
        <Col sm>
          <input
            onKeyPress={this.handleKeyPress}
            type="text"
            className="form-control"
            autoComplete="off"
            placeholder={STRING.code_news + ' , ' + STRING.title + ' , ' + STRING.user_created}
            value={userName}
            onChange={(e) => this.handleChange(userName, e.target.value)}
          />
        </Col>
        <Col sm>
          <FormControl
            as="select"
            aria-describedby="basic-addon1"
            value={status}
            onChange={(e) => this.handleChange('status', e.target.value)}
          >
            <option value="" defaultValue>
              {STRING.status}
            </option>
            <option value="active">active</option>
            <option value="inActive">inActive</option>
          </FormControl>
        </Col>
        <Col sm>
          <DatePickerCustom
            className={`date-picker form-control`}
            dateFormat="dd/MM/yyyy"
            placeholderText={STRING.fromDate}
            handleChange={this.handleChange}
            selected={fromDate}
            maxDate={new Date(toDate)}
          />
        </Col>
        <Col sm>
          <DatePickerCustom
            className={`date-picker form-control`}
            dateFormat="dd/MM/yyyy"
            placeholderText={STRING.toDate}
            handleChange={this.handleChange}
            selected={toDate}
            minDate={new Date(fromDate)}
          />
        </Col>
      </Row>
    )
  }

  renderTableData() {
    const { tableBody } = this.state
    return (
      <tbody>
        <tr>
          <td>{tableBody.id}</td>
          <td>{tableBody.fullName}</td>
          <td>{tableBody.phone}</td>
          <td>{tableBody.email}</td>
          <td>{tableBody.status}</td>
          <td>{tableBody.createDate}</td>
          <td>
            <i className="btnInfo fa fa-fw fa-eye" onClick={() => this.getDetail()} />
            <i className="btnEdit fa fa-fw fa-edit" onClick={() => this.update()} />
            <i className="btnDelete far fa-trash-alt" onClick={() => this.isOpen()} />
          </td>
        </tr>
      </tbody>
    )
  }

  renderBody() {
    const { tableHeader, activePage, total_Page, confirmModal } = this.state
    return (
      <div className="content-wrapper bg-white">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="header">{STRING.news_management}</h1>
              </div>
            </div>
          </div>
          {this.renderField()}
          <ConfirmModal
            isOpen={confirmModal}
            onHide={() =>
              this.setState({
                confirmModal: false,
              })
            }
            title="xóa"
            action={() => alert('hello world!!!')}
          />
          <div className="button--flex mr-1">
            <ButtonType typeButton={LABLE_BUTTON_SEARCH} action={() => this.search()} />
            <ButtonType typeButton={LABLE_BUTTON_ADD} action={() => this.add()} />
            <ButtonType typeButton={LABLE_BUTTON_CLEARSEARCH} action={() => this.clearSearch()} />
          </div>
          <TableData tableBody={this.renderTableData()} tableHeader={tableHeader} />
          <PaginationType activePage={activePage} total_Page={total_Page} action={() => alert('hi')} />
        </div>
      </div>
    )
  }

  render() {
    return <>{this.renderBody()}</>
  }
}

export default NewsMamagementScreen
