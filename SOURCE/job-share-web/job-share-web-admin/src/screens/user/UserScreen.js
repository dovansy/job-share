import React, { Component } from 'react'
import { Row, Col, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { deleteUser, getListUser } from '@constants/Api'
import { toDateString } from '@src/utils/helper'
import { notifyFail, notifySuccess } from 'src/utils/notify'
import {
  STRING,
  LABLE_BUTTON_SEARCH,
  LABLE_BUTTON_CLEARSEARCH,
  ROUTER,
  NUMBER,
  MESSAGE,
  STATUS,
  ROLE,
  ROLE_TYPE,
} from '@constants/Constant'
import DatePickerCustom from '@src/components/datetime/DatePickerCustom'
import ConfirmModal from '@src/components/modal/ConfirmModal'
import TableData from '@src/components/table/TableData'
import ButtonType from '@src/components/button/ButtonType'
import PaginationComponent from '@src/components/pagination/PaginationComponent'
import LoadingAction from '@src/components/loading/LoadingAction'
import Error from '@src/components/error/Error'
import './UserScreen.css'

class UserScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      [STRING.fromDate]: '',
      [STRING.toDate]: '',
      userName: '',
      search: '',
      status_id: '',
      user_type: '',
      activePage: 1,
      isLoading: false,
      error: null,
      confirmModal: false,
      isExist: false,
      listUser: [],
      paging: {},
      tableHeader: [
        {
          header: STRING.numericalOrder,
        },
        {
          header: STRING.fullName,
        },
        {
          header: STRING.phoneNumber,
        },
        {
          header: STRING.email,
        },
        {
          header: STRING.address,
        },
        {
          header: STRING.user_type,
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
      user: '',
    }
  }

  componentDidMount() {
    this.getListUser()
  }

  async getListUser() {
    this.setState({ isLoading: true })
    const {
      activePage,
      search,
      status_id,
      [STRING.fromDate]: from_date,
      [STRING.toDate]: to_date,
      user_type,
    } = this.state
    try {
      const res = await getListUser({
        page: activePage,
        search: search,
        status_id: status_id,
        role_id: user_type,
        from_date: from_date,
        to_date: to_date,
      })
      if (res.status === 1) {
        this.setState({
          listUser: res.data,
          paging: res.paging,
          isLoading: false,
        })
      }
    } catch (error) {
      this.setState({
        error: error,
        isLoading: false,
      })
    }
  }

  async clearSearch() {
    this.setState({
      isLoading: true,
    })
    try {
      this.setState(
        {
          isLoading: false,
          search: '',
          status_id: '',
          user_type: '',
          [STRING.fromDate]: '',
          [STRING.toDate]: '',
          activePage: 1,
        },
        () => this.getListUser()
      )
    } catch (error) {
      this.setState({ isLoading: false, error: error })
    }
  }

  async delete(user_id) {
    this.setState({
      isLoading: true,
    })
    try {
      const res = await deleteUser({ user_id: user_id })
      if (res.status === 1) {
        this.getListUser()
        this.setState({ isLoading: false, confirmModal: false }, () => notifySuccess(MESSAGE.success))
      }
    } catch (error) {
      this.setState(
        {
          error: error,
          isLoading: false,
        },
        () => notifyFail(error.msg)
      )
    }
  }

  isOpen = (bool, value) => {
    this.setState({
      user: value,
      confirmModal: bool,
    })
  }

  handleChange = (fieldName, value) => {
    this.setState({
      ...this.state,
      [fieldName]: value || '',
    })
  }
  handleChangeSelect = (fieldName, value) => {
    this.setState(
      {
        ...this.state,
        [fieldName]: value || '',
      },
      () => this.getListUser()
    )
  }

  handleChangePage = (page) => {
    this.setState(
      {
        activePage: page,
      },
      () => this.getListUser()
    )
  }

  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      this.getListUser()
    }
  }

  renderField() {
    const { [STRING.fromDate]: fromDate, [STRING.toDate]: toDate, search, status_id, user_type } = this.state
    return (
      <Row className="mx-0">
        <Col sm>
          <input
            onKeyPress={this.handleKeyPress}
            type="text"
            className="form-control"
            autoComplete="off"
            placeholder={STRING.fullName + ' , ' + STRING.phoneNumber}
            value={search}
            onChange={(e) => this.handleChange('search', e.target.value)}
          />
        </Col>
        <Col sm>
          <FormControl
            as="select"
            aria-describedby="basic-addon1"
            value={status_id}
            onChange={(e) => this.handleChangeSelect('status_id', e.target.value)}
          >
            <option value="" defaultValue>
              {STRING.status}
            </option>
            <option value={STATUS.ACTIVE}>{STRING.active}</option>
            <option value={STATUS.UNACTIVE}>{STRING.unActive}</option>
          </FormControl>
        </Col>
        <Col sm>
          <FormControl
            as="select"
            aria-describedby="basic-addon1"
            value={user_type}
            onChange={(e) => this.handleChangeSelect('user_type', e.target.value)}
          >
            <option value="" defaultValue>
              {STRING.user_type}
            </option>
            <option value={ROLE_TYPE.RECRUITMENT}>{STRING.recruitmer}</option>
            <option value={ROLE_TYPE.APPLICANT}>{STRING.applicant}</option>
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

  renderButton() {
    return (
      <div className="button--flex mr-1">
        <ButtonType typeButton={LABLE_BUTTON_SEARCH} action={() => this.getListUser()} />
        <ButtonType typeButton={LABLE_BUTTON_CLEARSEARCH} action={() => this.clearSearch()} />
      </div>
    )
  }

  renderTableData() {
    const { listUser, activePage, isLoading } = this.state
    if (isLoading) {
      return (
        <tbody>
          <tr>
            <td>Loading...</td>
          </tr>
        </tbody>
      )
    }
    return (
      <tbody>
        {listUser?.length ? (
          listUser?.map((item, index) => (
            <tr key={index}>
              <td>{index + NUMBER.page_limit * (activePage - 1) + 1}</td>
              <td>{item.name || '--'}</td>
              <td>{item.phone || '--'}</td>
              <td>{item.email || '--'}</td>
              <td>{item.address || '--'}</td>
              <td>{ROLE[item.role_id] || '--'}</td>
              <td>{item.is_active === STATUS.ACTIVE ? STRING.active : STRING.unActive}</td>
              <td>{toDateString(item.created_date) || '--'}</td>
              <td>
                <Link to={ROUTER.USER_DETAIL + '/' + item.user_id}>
                  <i className="btnInfo fa fa-fw fa-eye" />
                </Link>
                <i className="btnDelete far fa-trash-alt" onClick={() => this.isOpen(true, item)} />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="9">{STRING.emptyData}</td>
          </tr>
        )}
      </tbody>
    )
  }

  renderTable() {
    const { tableHeader } = this.state
    return (
      <div
        className="pt-4 pb-5 mt-3 mx-3"
        style={{ backgroundColor: 'white', borderRadius: '5px', boxShadow: '3px 3px 10px rgb(0, 0, 0, 0.4)' }}
      >
        <TableData tableBody={this.renderTableData()} tableHeader={tableHeader} />
        {this.renderPagination()}
      </div>
    )
  }

  renderPagination() {
    const { activePage, paging } = this.state
    const total_page = paging?.totalItemCount / paging?.limit
    return (
      <>
        {total_page > 1 && (
          <PaginationComponent activePage={activePage} total_Page={total_page} action={this.handleChangePage} />
        )}
      </>
    )
  }

  renderConfirmModal() {
    const { confirmModal, user } = this.state
    return (
      <ConfirmModal
        isOpen={confirmModal}
        onHide={() =>
          this.setState({
            confirmModal: false,
          })
        }
        title={STRING.delete}
        action={() => this.delete(user.user_id)}
      />
    )
  }

  renderBody() {
    return (
      <div className="content-wrapper bg-white">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="header">{STRING.user_management}</h1>
              </div>
            </div>
          </div>
          {this.renderField()}
          {this.renderButton()}
          {this.renderTable()}
          {this.renderConfirmModal()}
        </div>
      </div>
    )
  }

  render() {
    const { isLoading, error } = this.state
    return (
      <>
        {isLoading && <LoadingAction />}
        <Error isOpen={error} />
        {this.renderBody()}
      </>
    )
  }
}

export default UserScreen
