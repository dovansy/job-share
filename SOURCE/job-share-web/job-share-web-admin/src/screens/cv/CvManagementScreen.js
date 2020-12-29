import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, FormControl } from 'react-bootstrap'
import { STRING, ROUTER, NUMBER, LABLE_BUTTON_SEARCH, LABLE_BUTTON_CLEARSEARCH, STATUS } from '@constants/Constant'
import * as API from '@constants/Api'
import ConfirmModal from '@src/components/modal/ConfirmModal'
import TableData from '@src/components/table/TableData'
import ButtonType from '@src/components/button/ButtonType'
import PaginationComponent from 'src/components/pagination/PaginationComponent'
import LoadingAction from 'src/components/loading/LoadingAction'
import Select from 'react-select'
import swal from 'sweetalert'

class CvManagementScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      status_id: '',
      province: '',
      listCV: '',
      paging: '',
      list_province: [],
      activePage: 1,
      isLoading: false,
      conFirmModal: false,
      isExist: false,
      titleModalConfirm: '',
      typeAction: '',
      checked: [],
    }
  }

  componentDidMount() {
    this.getListProvince()
    this.getListCV()
  }

  async getListProvince() {
    this.setState({
      isLoading: true,
    })
    try {
      const res = await API.getListProvince()
      this.setState({
        isLoading: false,
        list_province: res.data.map((value) => ({
          value: value.id,
          label: value.name,
        })),
      })
    } catch (error) {
      this.setState({ isLoading: false })
    }
  }

  async getListCV() {
    this.setState({
      isLoading: true,
    })
    const { activePage, search, province, status_id } = this.state
    try {
      let res = await API.getListCV({
        page: activePage,
        search: search,
        status_id: status_id,
        province_id: province?.value || '',
        cv_status: '',
      })
      if (res.status === STATUS.ACTIVE) {
        this.setState({
          isLoading: false,
          listCV: res.data,
          paging: res.paging,
          checked: res?.data?.map((i) => false),
        })
      }
    } catch (error) {
      this.setState({
        isLoading: false,
      })
    }
  }

  async changeStatus() {
    const { checked, listCV, status_action } = this.state
    const listCVChecked = []
    checked.forEach((value, index) => {
      if (value) {
        listCVChecked.push(listCV[index].id)
      }
    })
    const Obj = {
      id: 3,
      status: status_action,
    }
    if (listCVChecked.length) {
      this.setState({ isLoading: true })
      try {
        const res = await API.changeStatusCV(Obj)
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
          this.getListCV()
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

  isOpen() {
    this.setState({
      conFirmModal: true,
    })
  }

  handleChange = (fieldName, value) => {
    this.setState({
      ...this.state,
      [fieldName]: value || '',
    })
  }

  handleChangePage = (page) => {
    this.setState({
      activePage: page,
    })
  }

  handleKeyPress = (e) => {
    if (e.charCode === 13) {
    }
  }

  handleChangeSelect = (fieldName, value) => {
    this.setState({ ...this.state, [fieldName]: value }, () => this.getListCV())
  }

  renderField() {
    const { search, status_id, province, list_province } = this.state
    return (
      <Row className="mx-0">
        <Col sm>
          <input
            onKeyPress={this.handleKeyPress}
            type="text"
            className="form-control"
            autoComplete="off"
            placeholder={STRING.title + ' Cv'}
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
            <option value={0}>{STRING.unActive}</option>
          </FormControl>
        </Col>
        <Col sm>
          <Select
            value={province}
            options={list_province}
            placeholder="Tất cả địa điểm"
            onChange={(e) => this.handleChangeSelect('province', e)}
          />
        </Col>
      </Row>
    )
  }

  renderButton() {
    return (
      <div className="button--flex mr-1">
        <ButtonType typeButton={LABLE_BUTTON_SEARCH} action={() => this.getListCV()} />
        <ButtonType
          typeButton={LABLE_BUTTON_CLEARSEARCH}
          action={() =>
            this.setState(
              {
                activePage: 1,
                search: '',
                status_id: '',
                province: '',
              },
              () => this.getListCV()
            )
          }
        />
      </div>
    )
  }

  renderTable() {
    const tableHeader = [
      {
        header: STRING.numericalOrder,
      },
      {
        header: STRING.title,
      },
      {
        header: STRING.user_created,
      },
      {
        header: STRING.phoneNumber,
      },
      {
        header: STRING.sex,
      },
      {
        header: STRING.address,
      },
      {
        header: STRING.status + ' tìm việc',
      },
      {
        header: STRING.action,
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
    const { isLoading, listCV, activePage } = this.state
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
        {listCV?.length ? (
          listCV?.map((item, index) => (
            <tr key={index}>
              <td>{index + NUMBER.page_limit * (activePage - 1) + 1}</td>
              <td>{item?.user_profile?.apply_work}</td>
              <td>{item?.user_profile?.name}</td>
              <td>{item?.user_profile?.phone}</td>
              <td>{item?.user_profile?.gender === STATUS.ACTIVE ? 'Nam' : 'Nữ'}</td>
              <td>{item?.user_profile?.address}</td>
              <td>{item?.cv_status === STATUS.ACTIVE ? 'Đang tìm việc' : 'Chưa tìm việc'}</td>
              <td>
                <Link to={ROUTER.CV_DETAIL + '/' + item.id}>
                  <i className="btnInfo fa fa-fw fa-eye" />
                </Link>
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
    const { confirmModal, titleModalConfirm } = this.state
    return (
      <ConfirmModal
        isOpen={confirmModal}
        onHide={() =>
          this.setState({
            confirmModal: false,
          })
        }
        title={titleModalConfirm}
        action={() => this.changeStatus()}
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
                <h1 className="header">{STRING.cv_management}</h1>
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

export default CvManagementScreen
