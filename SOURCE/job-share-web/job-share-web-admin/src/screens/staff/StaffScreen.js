import React, { Component } from 'react'
import { Row, Col, FormControl } from 'react-bootstrap'
import { validateForm } from '@src/utils/helper'
import { getListStaff, deleteUser, createStaff, updateStaff } from '@constants/Api'
import { toDateString } from '@src/utils/helper'
import { notifyFail, notifySuccess, notifyWarning } from 'src/utils/notify'
import {
  STRING,
  LABLE_BUTTON_SEARCH,
  LABLE_BUTTON_ADD,
  LABLE_BUTTON_CLEARSEARCH,
  TYPE_INPUT,
  STATUS,
  NUMBER,
  MESSAGE,
  ROLE_TYPE,
} from '@constants/Constant'
import DatePickerCustom from '@src/components/datetime/DatePickerCustom'
import ConfirmModal from '@src/components/modal/ConfirmModal'
import TableData from '@src/components/table/TableData'
import ButtonType from '@src/components/button/ButtonType'
import PaginationComponent from '@src/components/pagination/PaginationComponent'
import ModalComponent from '@src/components/modal/ModalComponent'
import LoadingAction from '@src/components/loading/LoadingAction'
// import reactotron from 'reactotron-react-js'

class StaffScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      [STRING.fromDate]: '',
      [STRING.toDate]: '',
      valueSeach: '',
      search: '',
      status_id: '',
      activePage: 1,
      confirmModal: false,
      isExist: false,
      isLoading: false,
      error: null,
      titleModal: '',
      modal: {
        fullName: '',
        phoneNumber: '',
        email: '',
        address: '',
        userName: '',
        password: '',
        confirmPassword: '',
      },
      validateError: {
        fullNameError: '',
        userNameError: '',
        phoneNumberError: '',
        emailError: '',
        addressError: '',
        passWordError: '',
        confirmPassWordError: '',
      },
      status: '',
      staffId: '',
      createAccount: false,
      editAccount: false,
      editStaff: false,
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
          header: STRING.status,
        },
        {
          header: STRING.createDate,
        },
        {
          header: STRING.action,
        },
      ],
      listStaff: [],
      paging: {},
      user: {},
    }
  }

  componentDidMount() {
    this.getListStaff()
  }

  async getListStaff() {
    this.setState({
      isLoading: true,
    })
    const { activePage, search, status_id, [STRING.fromDate]: from_date, [STRING.toDate]: to_date } = this.state
    try {
      const res = await getListStaff({
        page: activePage,
        search: search,
        status_id: status_id,
        from_date: from_date,
        to_date: to_date,
      })
      this.setState({
        listStaff: res.data,
        paging: res.paging,
        isLoading: false,
      })
    } catch (error) {
      this.setState({
        isLoading: false,
      })
    }
  }

  async delete(user_id) {
    this.setState({
      isLoading: true,
    })
    try {
      const res = await deleteUser({ user_id: user_id })
      if (res.status === 1) {
        this.getListStaff()
        this.setState({ isLoading: false, confirmModal: false }, () => notifySuccess(MESSAGE.success))
      }
    } catch (error) {
      this.setState(
        {
          isLoading: false,
        },
        () => notifyFail(error.msg)
      )
    }
  }

  addUpdateAccount = async () => {
    this.setState({
      isLoading: true,
    })
    const { fullName, userName, phoneNumber, address, email, password, confirmPassword } = this.state.modal
    const { editStaff, staffId } = this.state
    const Obj = {
      user_id: staffId || '',
      name: fullName,
      phone: phoneNumber,
      email: email,
      address: address,
      username: userName || '',
      password: password || '',
      role_id: ROLE_TYPE.ADMIN,
      gender: null,
      company_id: null,
      province_id: null,
      district_id: null,
    }
    if (password !== confirmPassword) {
      await this.setState(
        {
          isLoading: false,
        },
        () => notifyWarning('Mật khẩu không trùng khớp, vui lòng kiểm tra lại!')
      )
      return
    }
    try {
      let res
      if (editStaff) {
        res = await updateStaff(Obj)
      } else {
        res = await createStaff(Obj)
      }
      if (res.status === STATUS.ACTIVE) {
        await this.setState({ isLoading: false, createAccount: false }, () => notifySuccess(MESSAGE.success))
        this.getListStaff()
      }
    } catch (error) {
      this.setState({
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
          [STRING.fromDate]: '',
          [STRING.toDate]: '',
          activePage: 1,
        },
        () => this.getListStaff()
      )
    } catch (error) {
      this.setState({ isLoading: false })
    }
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
      () => this.getListStaff()
    )
  }

  isOpen = (bool, value) => {
    this.setState({
      user: value,
      confirmModal: bool,
    })
  }

  handleInputModal = async (fieldName, value) => {
    await this.setState({
      ...this.state,
      modal: {
        ...this.state.modal,
        [fieldName]: value || '',
      },
    })
  }

  handleBlur = (nameKey, titleName) => {
    validateForm(this, this.state.modal[nameKey], nameKey, titleName)
  }

  handleChangePage = (page) => {
    this.setState(
      {
        activePage: page,
      },
      () => this.getListStaff()
    )
  }

  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      this.getListStaff()
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
            placeholder={STRING.fullName + ', ' + STRING.phoneNumber}
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
        <ButtonType typeButton={LABLE_BUTTON_SEARCH} action={() => this.getListStaff()} />
        <ButtonType
          typeButton={LABLE_BUTTON_ADD}
          action={() => this.setState({ createAccount: true, titleModal: STRING.addStaff })}
        >
          {STRING.add}
        </ButtonType>
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

  renderTableData() {
    const { listStaff, activePage, isLoading } = this.state
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
        {listStaff?.length ? (
          listStaff?.map((item, index) => (
            <tr key={index}>
              <td>{index + NUMBER.page_limit * (activePage - 1) + 1}</td>
              <td>{item.name || '--'}</td>
              <td>{item.phone || '--'}</td>
              <td>{item.email || '--'}</td>
              <td>{item.address || '--'}</td>
              <td>{item.is_active === STATUS.ACTIVE ? STRING.active : STRING.unactive}</td>
              <td>{toDateString(item.created_date) || '--'}</td>
              <td>
                <i
                  className="btnEdit fa fa-fw fa-edit"
                  onClick={() => {
                    this.setState({
                      createAccount: true,
                      editStaff: true,
                      staffId: item.user_id,
                      titleModal: STRING.editStaff,
                      modal: {
                        ...this.state.modal,
                        fullName: item.name,
                        phoneNumber: item.phone,
                        email: item.email,
                        address: item.address,
                        userName: item.username,
                        password: item.password,
                        confirmPassword: item.password,
                      },
                    })
                  }}
                />
                <i className="btnDelete far fa-trash-alt" onClick={() => this.isOpen(true, item)} />
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

  renderModal = () => {
    const { userName, phoneNumber, email, address, password, confirmPassword, fullName } = this.state.modal
    const { titleModal, validateError, selected, modal, createAccount, editStaff } = this.state
    const { userNameError, phoneNumberError, emailError, fullNameError } = this.state.validateError
    const field = [
      {
        type: TYPE_INPUT.text,
        titleName: STRING.fullName,
        value: fullName,
        error: fullNameError,
        valueName: 'fullName',
        errorName: 'fullNameError',
      },
      {
        type: TYPE_INPUT.number,
        titleName: STRING.phoneNumber,
        value: phoneNumber,
        error: phoneNumberError,
        valueName: 'phoneNumber',
        errorName: 'phoneNumberError',
      },
      {
        type: TYPE_INPUT.text,
        titleName: STRING.email,
        value: email,
        error: emailError,
        valueName: 'email',
        errorName: 'emailError',
      },
      {
        type: TYPE_INPUT.text,
        titleName: STRING.address,
        value: address,
        error: '',
        valueName: 'address',
        errorName: '',
      },
      {
        type: TYPE_INPUT.text,
        titleName: STRING.userName,
        value: userName,
        error: userNameError,
        valueName: 'userName',
        errorName: 'userNameError',
      },
      {
        type: TYPE_INPUT.text,
        titleName: STRING.password,
        value: password,
        error: '',
        valueName: 'password',
        errorName: '',
      },
      {
        type: TYPE_INPUT.text,
        titleName: STRING.confirmPassword,
        value: confirmPassword,
        error: '',
        valueName: 'confirmPassword',
        errorName: '',
      },
    ]
    const fieldEdit = [
      {
        type: TYPE_INPUT.text,
        titleName: STRING.fullName,
        value: fullName,
        error: fullNameError,
        valueName: 'fullName',
        errorName: 'fullNameError',
      },
      {
        type: TYPE_INPUT.number,
        titleName: STRING.phoneNumber,
        value: phoneNumber,
        error: phoneNumberError,
        valueName: 'phoneNumber',
        errorName: 'phoneNumberError',
      },
      {
        type: TYPE_INPUT.text,
        titleName: STRING.email,
        value: email,
        error: emailError,
        valueName: 'email',
        errorName: 'emailError',
      },
      {
        type: TYPE_INPUT.text,
        titleName: STRING.address,
        value: address,
        error: '',
        valueName: 'address',
        errorName: '',
      },
    ]
    return (
      <>
        <ModalComponent
          allField={!editStaff ? field : fieldEdit}
          title={titleModal}
          listMultiselect={selected}
          checkValidateError={validateError}
          checkValidateValue={!editStaff && modal}
          handleInputModal={this.handleInputModal}
          isOpen={createAccount}
          handleBlur={this.handleBlur}
          addUpdateAccount={this.addUpdateAccount}
          onHide={() =>
            this.setState({
              editStaff: false,
              createAccount: false,
              modal: {
                userName: '',
                fullName: '',
                phoneNumber: '',
                email: '',
                address: '',
                password: '',
                confirmPassword: '',
              },
              validateError: {
                userNameError: '',
                fullNameError: '',
                phoneNumberError: '',
                emailError: '',
                passWordError: '',
                confirmPassWordError: '',
              },
            })
          }
        />
      </>
    )
  }

  renderConfirmModal = () => {
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

  renderBody = () => {
    return (
      <div className="content-wrapper bg-white">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="header">{STRING.staff_management}</h1>
              </div>
            </div>
          </div>
          {this.renderField()}
          {this.renderButton()}
          {this.renderModal()}
          {this.renderConfirmModal()}
          {this.renderTable()}
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

export default StaffScreen
