import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, FormControl } from 'react-bootstrap'
import { toDateString } from 'src/utils/helper'
import {
  STRING,
  ROUTER,
  TYPE_ACTION,
  NUMBER,
  LABLE_BUTTON_SEARCH,
  LABLE_BUTTON_CONFIRM,
  LABLE_BUTTON_CLEARSEARCH,
  LABLE_BUTTON_REJECT,
  STATUS_RECRUITMENT,
  STATUS,
} from '@constants/Constant'
import DatePickerCustom from '@src/components/datetime/DatePickerCustom'
import ConfirmModal from '@src/components/modal/ConfirmModal'
import TableData from '@src/components/table/TableData'
import ButtonType from '@src/components/button/ButtonType'
import PaginationComponent from '@src/components/pagination/PaginationComponent'
import LoadingAction from 'src/components/loading/LoadingAction'
import * as API from '@constants/Api'
import swal from 'sweetalert'
// import reactotron from 'src/config/ReactotronConfig'

class RecruitmentScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      [STRING.fromDate]: '',
      [STRING.toDate]: '',
      search: '',
      status_id: '',
      activePage: 1,
      confirmModal: false,
      isExist: false,
      titleModalConfirm: '',
      typeAction: '',
      checked: [],
      paging: {},
      listJob: [],
      isLoading: false,
      job_id: '',
    }
  }

  componentDidMount() {
    this.getListJob()
  }

  async getListJob() {
    this.setState({
      isLoading: true,
    })
    const {
      search,
      activePage,
      status_id,
      [STRING.fromDate]: from_date,
      [STRING.toDate]: to_date,
      position,
    } = this.state
    try {
      const res = await API.getListJob({
        page: activePage,
        search: search,
        status_id: status_id,
        from_date: from_date,
        to_date: to_date,
        position_id: position?.value || '',
        // major: major?.value || '',
      })
      if (res.status === 1) {
        this.setState({
          isLoading: false,
          listJob: res.data,
          paging: res.paging,
          checked: res?.data?.map((i) => false),
        })
      }
    } catch (error) {
      this.setState({ isLoading: false })
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
          [STRING.fromDate]: '',
          [STRING.toDate]: '',
          activePage: 1,
        },
        () => this.getListJob()
      )
    } catch (error) {
      this.setState({ isLoading: false })
    }
  }

  async changeStatus() {
    const { checked, listJob, status_action } = this.state
    const listJobChecked = []
    checked.forEach((value, index) => {
      if (value) {
        listJobChecked.push(listJob[index].id)
      }
    })
    const Obj = {
      id: listJobChecked,
      status: status_action,
    }
    if (listJobChecked.length) {
      this.setState({ isLoading: true })
      try {
        const res = await API.changeStatusJob(Obj)
        if (res.status === STATUS.ACTIVE) {
          await this.setState(
            {
              confirmModal: false,
              isLoading: false,
            },
            () =>
              swal({
                title: 'Thao tác thành công',
                icon: 'success',
              })
          )
          this.getListJob()
        }
      } catch (error) {
        this.setState({
          confirmModal: false,
          isLoading: false,
        })
      }
    } else {
      swal({
        title: 'Vui lòng chọn tin tuyển dụng!',
        icon: 'warning',
      })
    }
  }

  async deleteJob(job_id) {
    this.setState({
      isLoading: true,
    })
    try {
      const res = await API.deleteJob({ job_id: job_id })
      if (res.status === STATUS.ACTIVE) {
        await this.setState(
          {
            isLoading: false,
            showModal: false,
            confirmModal: false,
          },
          () =>
            swal({
              title: 'Xóa tin tuyển dụng thành công',
              icon: 'success',
            })
        )
        this.getListJob()
      }
    } catch (error) {
      this.setState({
        isLoading: false,
        confirmModal: false,
      })
    }
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

  handleChangeSelect = (fieldName, value) => {
    this.setState(
      {
        ...this.state,
        [fieldName]: value || '',
      },
      () => this.getListJob()
    )
  }

  handleChangePage = (page) => {
    this.setState(
      {
        activePage: page,
      },
      () => this.getListJob()
    )
  }

  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      this.getListJob()
    }
  }

  renderField() {
    const { [STRING.fromDate]: fromDate, [STRING.toDate]: toDate, search, status_id } = this.state
    return (
      <Row className="mx-0">
        <Col sm>
          <input
            onKeyPress={this.handleKeyPress}
            type="text"
            className="form-control"
            autoComplete="off"
            placeholder={STRING.title + ' tin tuyển dụng'}
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
              {STRING.status} tin tuyển dụng
            </option>
            <option value="0">{STATUS_RECRUITMENT[0]}</option>
            <option value="1">{STATUS_RECRUITMENT[1]}</option>
            <option value="2">{STATUS_RECRUITMENT[2]}</option>
            <option value="3">{STATUS_RECRUITMENT[3]}</option>
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
        <ButtonType typeButton={LABLE_BUTTON_SEARCH} action={() => this.getListJob()} />
        <ButtonType
          typeButton={LABLE_BUTTON_CONFIRM}
          action={() =>
            this.setState({
              status_action: TYPE_ACTION.CONFIRM,
              confirmModal: true,
              titleModalConfirm: STRING.confirm,
            })
          }
        />
        <ButtonType
          typeButton={LABLE_BUTTON_REJECT}
          action={() =>
            this.setState({
              status_action: TYPE_ACTION.REJECT,
              confirmModal: true,
              titleModalConfirm: STRING.reject,
            })
          }
        />
        <ButtonType typeButton={LABLE_BUTTON_CLEARSEARCH} action={() => this.clearSearch()} />
      </div>
    )
  }

  renderTable() {
    // const { checked } = this.state
    const tableHeader = [
      {
        header: STRING.numericalOrder,
      },
      {
        header: STRING.title,
      },
      {
        header: STRING.name_companmy,
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
      {
        // header: checked.length > 0 && (
        //   <input
        //     type="checkbox"
        //     checked={checked.every(Boolean)}
        //     onChange={() => {
        //       this.setState({
        //         ...this.state,
        //         checked: checked.fill(!checked.every(Boolean)),
        //       })
        //     }}
        //   />
        // ),
      },
    ]
    return (
      <div
        className="pt-4 pb-5 mt-3 mx-3"
        style={{ backgroundColor: 'white', borderRadius: '5px', boxShadow: '3px 3px 10px rgb(0, 0, 0, 0.4)' }}
      >
        <TableData tableHeader={tableHeader} tableBody={this.renderTableData()} />
        {this.renderPagination()}
      </div>
    )
  }

  renderTableData() {
    const { listJob, isLoading, activePage, checked } = this.state
    if (isLoading) {
      return (
        <tbody>
          <tr>
            <td>Loading...</td>
          </tr>
        </tbody>
      )
    }
    console.log(listJob)
    return (
      <tbody>
        {listJob?.length ? (
          listJob?.map((item, index) => (
            <tr key={index}>
              <td>{index + NUMBER.page_limit * (activePage - 1) + 1}</td>
              <td style={{ width: '30%' }}>{item.job.name || '--'}</td>
              <td style={{ width: '25%' }}>{item.job.company.name || '--'}</td>
              <td>{item.created_by_userName || '--'}</td>
              <td>{STATUS_RECRUITMENT[item.status]}</td>
              <td>{item.job.created_date ? toDateString(item.job.created_date) : '--'}</td>
              <td>
                <Link to={ROUTER.RECRUITMENT_DETAIL + '/' + item.id}>
                  <i className="btnInfo fa fa-fw fa-eye" />
                </Link>
                <i
                  className="btnDelete far fa-trash-alt"
                  onClick={() =>
                    this.setState({
                      job_id: item.id,
                      status_action: TYPE_ACTION.DELETE,
                      confirmModal: true,
                      titleModalConfirm: TYPE_ACTION.delete_title,
                    })
                  }
                />
              </td>
              <td>
                {item.status === 0 && (
                  <input
                    type="checkbox"
                    checked={checked[index]}
                    onChange={() => {
                      checked[index] = !checked[index]
                      this.setState({
                        ...this.state,
                        checked: checked,
                      })
                    }}
                  />
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8">{STRING.emptyData}</td>
          </tr>
        )}
      </tbody>
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

  renderConfirmModal = () => {
    const { confirmModal, titleModalConfirm, job_id, status_action } = this.state
    return (
      <ConfirmModal
        isOpen={confirmModal}
        onHide={() =>
          this.setState({
            confirmModal: false,
          })
        }
        title={titleModalConfirm}
        action={() => {
          parseInt(status_action) === TYPE_ACTION.DELETE ? this.deleteJob(job_id) : this.changeStatus()
        }}
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
                <h1 className="header">{STRING.recruitment_management}</h1>
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
    const { isLoading } = this.state
    return (
      <>
        {isLoading && <LoadingAction />}
        {this.renderBody()}
      </>
    )
  }
}

export default RecruitmentScreen
