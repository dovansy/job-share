import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, FormControl } from 'react-bootstrap'
import { getListCompany } from '@src/redux/actions'
import {
  STRING,
  ROUTER,
  NUMBER,
  STATUS,
  TYPE_ACTION,
  LABLE_BUTTON_SEARCH,
  LABLE_BUTTON_CLEARSEARCH,
} from '@constants/Constant'
import ConfirmModal from '@src/components/modal/ConfirmModal'
import TableData from '@src/components/table/TableData'
import ButtonType from '@src/components/button/ButtonType'
import PaginationComponent from '@src/components/pagination/PaginationComponent'
import LoadingAction from 'src/components/loading/LoadingAction'
import swal from 'sweetalert'
// import reactotron from 'reactotron-react-js'

class CompanyManagementScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      status_id: '',
      activePage: 1,
      conFirmModal: false,
      isExist: false,
      tableHeader: [
        {
          header: STRING.numericalOrder,
        },
        {
          header: STRING.name_companmy,
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
          header: STRING.status,
        },
        {
          header: STRING.action,
        },
      ],
    }
  }

  componentDidMount() {
    this.getListCompany()
  }

  async getListCompany() {
    const { search, activePage, status_id } = this.state
    await this.props.getListCompany({
      search: search,
      page: activePage,
      status_id: status_id,
    })
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
          activePage: 1,
        },
        () => this.getListCompany()
      )
    } catch (error) {
      this.setState({ isLoading: false })
    }
  }

  delete() {
    swal({
      title: 'Chức năng đang phát triển !',
      icon: 'warning',
    })
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

  handleChangeSelect = (fieldName, value) => {
    this.setState(
      {
        ...this.state,
        [fieldName]: value || '',
      },
      () => this.getListCompany()
    )
  }

  handleChangePage = (page) => {
    this.setState(
      {
        activePage: page,
      },
      () => this.getListCompany()
    )
  }

  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      this.getListCompany()
    }
  }

  renderField() {
    const { search, status_id } = this.state
    return (
      <Row className="mx-0">
        <Col sm={4}>
          <input
            onKeyPress={this.handleKeyPress}
            type="text"
            className="form-control"
            autoComplete="off"
            placeholder={STRING.name_companmy}
            value={search}
            onChange={(e) => this.handleChange('search', e.target.value)}
          />
        </Col>
        <Col sm={4}>
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
      </Row>
    )
  }

  renderButton() {
    return (
      <div className="button--flex mr-1">
        <ButtonType typeButton={LABLE_BUTTON_SEARCH} action={() => this.search()} />
        <ButtonType typeButton={LABLE_BUTTON_CLEARSEARCH} action={() => this.clearSearch()} />
      </div>
    )
  }

  renderTable() {
    const { tableHeader } = this.state
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
    const listCompany = this.props.listCompanyState?.data?.data
    const { isLoading } = this.props.listCompanyState
    const { activePage } = this.state
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
        {listCompany?.length ? (
          listCompany?.map((item, index) => (
            <tr key={index}>
              <td>{index + NUMBER.page_limit * (activePage - 1) + 1}</td>
              <td style={{ width: '25%' }}>{item.name || '--'}</td>
              <td>{item.phone || '--'}</td>
              <td>{item.email || '--'}</td>
              <td style={{ width: '30%' }}>{item.address}</td>
              <td>{item.is_active === STATUS.ACTIVE ? STRING.active : STRING.unActive}</td>
              <td>
                <Link to={ROUTER.COMPANY_DETAIL + '/' + item.id}>
                  <i className="btnInfo fa fa-fw fa-eye" />
                </Link>
                <i
                  className="btnDelete far fa-trash-alt"
                  onClick={() =>
                    this.setState({
                      typeAction: TYPE_ACTION.DELETE,
                      confirmModal: true,
                      titleModalConfirm: TYPE_ACTION.delete_title,
                    })
                  }
                />
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

  renderPagination() {
    const { activePage } = this.state
    const paging = this.props.listCompanyState?.data?.paging
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
    return (
      <ConfirmModal
        isOpen={this.state.confirmModal}
        onHide={() =>
          this.setState({
            confirmModal: false,
          })
        }
        title={STRING.delete}
        action={() => this.delete()}
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
                <h1 className="header">{STRING.company_management}</h1>
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
    const { isLoading } = this.props.listCompanyState
    return (
      <>
        {isLoading && <LoadingAction />}
        {this.renderBody()}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  listCompanyState: state.companyReducer,
})

const mapDispatchToProps = {
  getListCompany,
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyManagementScreen)
