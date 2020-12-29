import React, { Component } from 'react'
import { STRING, TYPE_INPUT } from '@constants/Constant'
import { Button } from 'react-bootstrap'
import { validateForm } from '@src/utils/helper'
import { checkValidationError, checkValidationValue } from '@src/utils/checkValidateError'
import { notifyWarning, notifySuccess } from 'src/utils/notify'
import { ROLE_TYPE, ROUTER, STATUS } from '@constants/Constant'
import ModalComponent from 'src/components/ModalComponent'
import Loading from 'src/components/Loading'
import * as API from '@constants/Api'
import reactotron from 'src/debug/ReactotronConfig'
import './RegisterComponent.css'
import swal from 'sweetalert'

export default class RegisterContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      valueSeach: '',
      activePage: 1,
      total_Page: 6,
      titleModal: '',
      districts: [],
      provinces: [],
      modal: {
        fullName: '',
        phoneNumber: '',
        gender: '',
        company: '',
        province: '',
        district: '',
      },
      validateError: {
        userNameError: '',
        phoneNumberError: '',
        role: [],
        passWordError: '',
        confirmPassWordError: '',
      },
      status: '',
      email: '',
      password: '',
      confirmPassword: '',
      isLoading: false,
      confirmModal: false,
      isExist: false,
      createAccount: false,
      editAccount: false,
      hidden: true,
      hiddenConfirm: true,
      search: '',
      list_company: [],
    }
  }

  componentDidMount() {
    this.getListProvince()
  }

  async getListCompany() {
    const { company } = this.state.modal
    try {
      const res = await API.getListCompany({
        search: company,
        page: 0,
        status_id: STATUS.ACTIVE,
      })

      if (res.status === STATUS.ACTIVE) {
        this.setState({
          list_company: res.data,
        })
      }
    } catch (error) {}
  }

  async getListProvince() {
    this.setState({
      isLoading: true,
    })
    try {
      const res = await API.getListProvince()
      this.setState({
        isLoading: false,
        provinces: res.data.map(
          (value) =>
            new Object({
              value: value.id,
              label: value.name,
              code: value.code,
            })
        ),
      })
    } catch (error) {
      this.setState({ isLoading: false })
    }
  }
  async getListDistrict(province_code) {
    this.setState({
      isLoading: true,
    })

    try {
      const res = await API.getListDistrict({ province_code: province_code })
      this.setState({
        isLoading: false,
        districts: res.data.map(
          (value) =>
            new Object({
              value: value.id,
              label: value.name,
              code: value.code,
            })
        ),
      })
    } catch (error) {
      this.setState({ isLoading: false })
    }
  }

  async createAccount() {
    this.setState({
      isLoading: true,
    })
    const { fullName, phoneNumber, address, company, gender, province, district } = this.state.modal
    const { email, password, confirmPassword } = this.state

    const Obj = {
      name: fullName,
      phone: phoneNumber,
      email: email.trim(),
      address: address || '',
      username: email.trim(),
      password: password,
      role_id: ROLE_TYPE.RECRUITMENT,
      gender: parseInt(gender),
      company: company,
      province_id: province.value,
      district_id: district.value,
    }
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      if (password !== confirmPassword) {
        this.setState(
          {
            isLoading: false,
          },
          () =>
            swal({
              title: 'Mật khẩu không trùng khớp, vui lòng kiểm tra lại!',
              icon: 'warning',
            })
        )
        return
      }
      if (password !== confirmPassword) {
        this.setState(
          {
            isLoading: false,
          },
          () => notifyWarning('Mật khẩu không trùng khớp, vui lòng kiểm tra lại!')
        )
        return
      }
      try {
        let res = await API.createUser(Obj)
        if (res.status === STATUS.ACTIVE) {
          this.setState({ isLoading: false }, () =>
            swal({
              title: 'Tạo tài khoản thành công',
              icon: 'success',
            })
          )
        }
      } catch (error) {
        this.setState({
          isLoading: false,
        })
      }
    } else {
      this.setState(
        {
          isLoading: false,
        },
        () =>
          swal({
            title: 'Vui lòng nhập lại email',
            icon: 'warning',
          })
      )
      return
    }
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

  handleChange(fieldName, value) {
    this.setState({
      [fieldName]: value || '',
    })
  }

  handleChangeModal = (fieldName, value) => {
    this.setState({
      ...this.state,
      modal: {
        ...this.state.modal,
        [fieldName]: value || '',
      },
    })
    if (fieldName === 'company') {
      this.getListCompany()
    }
  }

  showPassword = () => {
    this.setState({ hidden: !this.state.hidden })
  }

  showConfirmPassword = () => {
    this.setState({ hiddenConfirm: !this.state.hiddenConfirm })
  }

  handleChangeSelect = async (fieldName, value) => {
    await this.setState({ ...this.state, modal: { ...this.state.modal, [fieldName]: value || '' } })
    if (fieldName === 'province') {
      return this.getListDistrict(value.code)
    }
  }

  checkValidate() {
    const { email, password } = this.state
    const { fullName, phoneNumber, gender, province, district } = this.state.modal
    return !(email || password || fullName, phoneNumber, gender, province, district)
  }

  handleBlur = (nameKey, titleName) => {
    validateForm(this, this.state.modal[nameKey], nameKey, titleName)
  }

  handleClick = (value, index) => {
    this.setState({
      ...this.state.modal,
      modal: {
        company: value.name,
      },
      list_company: [],
    })
  }

  render() {
    const { fullName, phoneNumber, company, province, district, gender } = this.state.modal
    const {
      validateError,
      selected,
      modal,
      districts,
      provinces,
      isLoading,
      email,
      password,
      confirmPassword,
      hidden,
      hiddenConfirm,
    } = this.state
    const { userNameError, phoneNumberError } = this.state.validateError
    const field = [
      {
        type: TYPE_INPUT.text,
        titleName: STRING.fullName,
        value: fullName,
        error: userNameError,
        valueName: 'fullName',
        errorName: 'userNameError',
      },
      {
        type: TYPE_INPUT.text,
        titleName: STRING.phoneNumber,
        value: phoneNumber,
        error: phoneNumberError,
        valueName: 'phoneNumber',
        errorName: 'phoneNumberError',
      },
      {
        type: TYPE_INPUT.select,
        titleName: STRING.sex,
        value: gender,
        error: '',
        valueName: 'gender',
        errorName: '',
        valueArray: [
          { value: 1, label: 'Nam' },
          { value: 2, label: 'Nữ' },
        ],
      },

      {
        type: TYPE_INPUT.total_type,
        titleName: STRING.work_location,
        value_province: province,
        value_district: district,
        error: '',
        valueName_province: 'province',
        valueName_district: 'district',
        errorName: '',
        valueProvinces: provinces,
        valueDistricts: districts,
      },
    ]
    return (
      <div
        style={{ backgroundColor: '#EEF1F5' }}
        onClick={() =>
          this.setState({
            list_company: [],
          })
        }
      >
        {isLoading && <Loading />}
        <div className="container pt-4">
          <div className="row">
            <div className="col-md-12">
              <div className="panel panel-default" style={{ backgroundColor: 'white' }}>
                <div className="panel-heading" style={{ textAlign: 'center' }}>
                  Đăng ký tài khoản nhà tuyển dụng
                </div>
                <div className="panel-body form-horizontal">
                  <h4 style={{ marginBottom: 20, textTransform: 'uppercase' }}>Thông tin Đăng nhập</h4>
                  <div className="form-group row">
                    <label className="control-label col-md-3">
                      Email đăng nhập: <span class="text-danger">*</span>
                    </label>
                    <div class="col-md-9">
                      <input
                        maxLength="45"
                        type="email"
                        id="email"
                        name="email"
                        required="required"
                        placeholder="Email"
                        value={email}
                        className="form-control"
                        onChange={(e) => this.handleChange('email', e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="control-label col-md-3">
                      Mật khẩu: <span class="text-danger">*</span>
                    </label>
                    <div class="col-md-9" style={{ textAlign: 'right' }}>
                      <input
                        type={hidden ? 'password' : 'text'}
                        id="password"
                        name="password"
                        required="required"
                        placeholder="Mật khẩu (từ 6 đến 25 ký tự)"
                        className="form-control"
                        value={password}
                        onChange={(e) => this.handleChange('password', e.target.value)}
                      />
                      {hidden ? (
                        <i
                          class="fas fa-eye-slash"
                          style={{
                            color: 'gray',
                            marginTop: -27,
                            marginLeft: -25,
                            position: 'absolute',
                            cursor: 'pointer',
                            zIndex: 1,
                          }}
                          onClick={this.showPassword}
                        />
                      ) : (
                        <i
                          className="fas fa-eye"
                          style={{
                            color: 'gray',
                            marginTop: -27,
                            marginLeft: -25,
                            position: 'absolute',
                            cursor: 'pointer',
                            zIndex: 1,
                          }}
                          onClick={this.showPassword}
                        />
                      )}
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="control-label col-md-3">
                      Nhập lại mật khẩu:<span class="text-danger">*</span>
                    </label>
                    <div class="col-md-9" style={{ textAlign: 'right' }}>
                      <input
                        type={hiddenConfirm ? 'password' : 'text'}
                        id="password_confirmation"
                        name="password_confirmation"
                        required="required"
                        placeholder="Nhập lại mật khẩu"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => this.handleChange('confirmPassword', e.target.value)}
                      />
                      {hiddenConfirm ? (
                        <i
                          class="fas fa-eye-slash"
                          style={{
                            color: 'gray',
                            marginTop: -27,
                            marginLeft: -25,
                            position: 'absolute',
                            cursor: 'pointer',
                            zIndex: 1,
                          }}
                          onClick={this.showConfirmPassword}
                        />
                      ) : (
                        <i
                          className="fas fa-eye"
                          style={{
                            color: 'gray',
                            marginTop: -27,
                            marginLeft: -25,
                            position: 'absolute',
                            cursor: 'pointer',
                            zIndex: 1,
                          }}
                          onClick={this.showConfirmPassword}
                        />
                      )}
                    </div>
                  </div>
                  <h4 style={{ marginBottom: 20, textTransform: 'uppercase' }}>Thông tin Nhà tuyển dụng</h4>
                  <div className="form-group row">
                    <label className="control-label col-md-3">
                      Tên công ty: <span class="text-danger">*</span>
                    </label>
                    <div class="col-md-9">
                      <input
                        type="email"
                        id="email"
                        maxLength="100"
                        autoComplete="off"
                        name="email"
                        required="required"
                        placeholder="Tên công ty"
                        value={company}
                        className="form-control"
                        onChange={(e) => this.handleChangeModal('company', e.target.value)}
                      />
                      {this.state.list_company && (
                        <div
                          className="listCustomer p-0 mt-1 col"
                          style={{
                            position: 'absolute',
                            width: '94%',
                          }}
                        >
                          {this.state.list_company?.map((item, index) => (
                            <div className="divCustomer">
                              <li className="optionCustomer" onClick={() => this.handleClick(item, index)}>
                                {item.name || ''}
                              </li>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <ModalComponent
                    allField={field}
                    handleBlur={this.handleBlur}
                    checkValidateError={validateError}
                    checkValidateValue={modal}
                    handleInputModal={this.handleInputModal}
                    handleChangeSelect={this.handleChangeSelect}
                  />
                  <div className="col-12" style={{ textAlign: 'center' }}>
                    <Button
                      className="btn-complete"
                      onClick={() => this.createAccount()}
                      disabled={this.checkValidate()}
                    >
                      {STRING.complete}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            {/* <div class="col-md-4">
              <div class="panel panel-default" style={{ backgroundColor: 'white' }}>
                <div class="panel-heading">Quy định</div>
                <div class="panel-body">
                  <p>
                    Để đảm bảo chất lượng dịch vụ, JobShare
                    <span class="text-primary"> không cho phép một người dùng tạo nhiều tài khoản khác nhau</span>. Nếu
                    phát hiện vi phạm, JobShare sẽ ngừng cung cấp dịch vụ tới tất cả các tài khoản trùng lặp hoặc chặn
                    toàn bộ truy cập tới hệ thống website của JobShare.
                  </p>
                  <p>
                    Đối với trường hợp khách hàng đã sử dụng hết 3 tin tuyển dụng miễn phí, JobShare hỗ trợ kích hoạt
                    đăng tin tuyển dụng không giới hạn sau khi quý doanh nghiệp cung cấp thông tin giấy phép kinh doanh.
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    )
  }
}
