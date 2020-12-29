import React, { Component } from 'react'
import { JOB_TYPE, STATUS, STRING, GENDER_TYPE, EXP_TYPE, SALARY_TYPE } from '@constants/Constant'
import * as API from '@constants/Api'
import './TabHomeMenu.css'
import Loading from 'src/components/Loading'
import swal from 'sweetalert'
import { Button } from 'react-bootstrap'
import reactotron from 'reactotron-react-js'
import DatePickerCustom from 'src/components/DatePickerCustom'
import Select from 'react-select'

class TabNewRecruitment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      salary_type: '',
      title: '',
      job_type: 1,
      amount: '',
      description: '',
      deadline: '',
      min_salary: '',
      max_salary: '',
      require_exp: 0,
      require_gender: 0,
      [STRING.deadline]: '',
      skill: '',
      benefit: '',
      isLoading: false,
      user_info: '',
      list_career: [],
      career: '',
    }
  }
  componentDidMount() {
    this.getUserInfo()
    this.getListProsition()
  }

  async getListProsition() {
    this.setState({
      isLoading: true,
    })
    try {
      const res = await API.getListPosition()
      this.setState({
        isLoading: false,
        list_career: res.data.map(
          (value) =>
            new Object({
              value: value.id,
              label: value.position,
            })
        ),
      })
    } catch (error) {
      this.setState({ isLoading: false })
    }
  }
  async getUserInfo() {
    this.setState({
      isLoading: true,
    })
    try {
      const res = await API.getUserInfo()
      if (res.status === STATUS.ACTIVE) {
        this.setState({
          isLoading: false,
          user_info: res.data,
        })
      }
    } catch (error) {
      this.setState({
        isLoading: false,
      })
    }
  }
  refreshPage = () => {
    window.location.reload()
  }

  async createNewJob() {
    const {
      title,
      description,
      min_salary,
      max_salary,
      require_exp,
      require_gender,
      skill,
      benefit,
      amount,
      job_type,
      [STRING.deadline]: deadline,
      user_info,
      career,
    } = this.state
    const Obj = {
      name: title,
      type: parseInt(job_type),
      amount: parseInt(amount),
      description: description,
      deadline: deadline,
      position_id: career?.value,
      min_salary: parseInt(min_salary),
      max_salary: parseInt(max_salary),
      require_exp: parseInt(require_exp),
      gender: parseInt(require_gender),
      skill: skill,
      benefit: benefit,
    }
    if (!user_info?.company_address) {
      swal({
        title: 'Vui lòng cập nhật thông tin công ty!',
        icon: 'warning',
      })
    } else {
      this.setState({ isLoading: true })
      try {
        const res = await API.createJob(Obj)
        if (res.status === STATUS.ACTIVE) {
          this.setState(
            {
              isLoading: false,
            },
            () =>
              swal({
                title: 'Tạo tin tuyển dụng thành công',
                icon: 'success',
              }).then((willDelete) => {
                if (willDelete) {
                  // window.location.href = '/nha-tuyen-dung-tin-tuyen-dung'
                  this.refreshPage()
                }
              })
          )
        }
      } catch (error) {
        this.setState({
          isLoading: false,
        })
      }
    }
  }

  handleChange = (fieldName, value) => {
    this.setState({
      ...this.state,
      [fieldName]: value || '',
    })
  }

  handleChangeSelect(fieldName, value) {
    this.setState({ [fieldName]: value })
  }

  checkEmptyValue = () => {
    const { salary_type, min_salary, max_salary } = this.state
    reactotron.log('min', min_salary)
    switch (salary_type) {
      case 1:
        if (!min_salary?.length) return false
      case 2:
        if (!max_salary) return false
      case 3:
        if (!min_salary && !max_salary) return false
      default:
        return true
    }
    //   if (!min_salary) {
    //     return false
    //   }
    // } else if (salary_type === 2) {
    //   if (!max_salary) {
    //     return false
    //   }
    // } else if (salary_type === 3) {
    //   if (!max_salary && !min_salary) {
    //     return false
    //   }
    // } else if (salary_type === '') {
    //   return true
    // }
  }

  checkValidate = () => {
    const { title, skill, benefit, description, career, [STRING.deadline]: deadline } = this.state
    return !(title && skill && benefit && career && deadline && description && this.checkEmptyValue())
  }

  render() {
    const {
      salary_type,
      title,
      description,
      min_salary,
      require_exp,
      require_gender,
      skill,
      benefit,
      amount,
      job_type,
      isLoading,
      max_salary,
      [STRING.deadline]: deadline,
      user_info,
      career,
      list_career,
    } = this.state

    return (
      <div>
        {isLoading && <Loading />}
        <div id="job-tabs">
          <ul className="row">
            <li>
              <a className="job-showing-tab">
                <div>Tạo tin tuyển dụng mới</div>
              </a>
            </li>
          </ul>
        </div>
        <div className="jobs my-1">
          <div className="form-group col-md-12 pt-3 px-4">
            <label>
              Tiêu đề <span class="text-danger">*</span>
            </label>
            <div class="help-block font-italic mb-2">
              Viết ngắn gọn, chính xác vị trí và công việc cần tuyển.
              {/* <span className="text-danger"> Không sử dụng các từ như [HN], lương cao, tuyển gấp,...</span> */}
            </div>
            <input
              type="text"
              maxLength="200"
              className="form-control outline ui-autocomplete-input"
              placeholder="VD: Nhân Viên Kinh Doanh, Chăm Sóc Khách Hàng, Lập Trình Viên PHP"
              name="title"
              id="jobTitle"
              value={title}
              autocomplete="off"
              onChange={(e) => this.handleChange('title', e.target.value)}
            />
          </div>
          <div className="col-md-12 px-4">
            <label>
              Ngành nghề <span class="text-danger">*</span>
            </label>
            <div class="help-block font-italic mb-2">Lựa chọn ngành nghê liên quan đến ví trí tuyển dụng này</div>
            <span className="ctn-icon">
              <i className="fas fa-tools select--recruitment" style={{ fontSize: 17 }}></i>
            </span>
            <Select
              value={career}
              id="career"
              options={list_career}
              placeholder="Tất cả ngành nghề"
              onChange={(e) => this.handleChangeSelect('career', e)}
            />
            {/* <input
              type="text"
              className="form-control outline ui-autocomplete-input"
              placeholder="Chọn ngành nghề"
              name="title"
              id="jobTitle"
              value={position_id}
              autocomplete="off"
            /> */}
          </div>
          <div className="col-md-12 mt-3 px-4">
            <label>
              Địa chỉ làm việc <span class="text-danger">*</span>
            </label>
            <div class="help-block font-italic mb-2">Ứng viên sẽ đi làm ở địa chỉ này (địa chỉ công ty)</div>
            <input
              type="text"
              disabled
              className="form-control outline ui-autocomplete-input"
              placeholder="Nhập địa chỉ"
              name="title"
              id="address"
              value={user_info?.company_address}
              autocomplete="off"
            />
          </div>
          <div className="row px-4 mt-3">
            <div className="form-group col-md-6">
              <label>Số lượng cần tuyển</label>
              <div className="help-block font-italic mb-2">Để trống mục này nếu không giới hạn số lượng tuyển</div>
              <input
                type="number"
                maxLength="4"
                className="form-control outline"
                placeholder="Nhập số lượng cần tuyển"
                name="quantity"
                id="quantity"
                min="0"
                max="1000"
                value={amount}
                onChange={(e) => this.handleChange('amount', e.target.value)}
              />
            </div>
            <div class="form-group col-md-6">
              <label>Loại hình làm việc</label>
              <div className="help-block font-italic mb-2">Chọn loại hình việc làm cần tuyển</div>
              <select
                name="type"
                className="form-control outline select2-hidden-accessible"
                id="job_type_select"
                tabindex="-1"
                aria-hidden="true"
                value={job_type}
                onChange={(e) => this.handleChange('job_type', e.target.value)}
              >
                {JOB_TYPE.map((item, index) => (
                  <option value={item.value} key={index} id={index}>
                    {item.lable}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row px-4">
            <div className="form-group col-md-6">
              <label>Giới tính</label>
              <select
                name="type"
                className="form-control outline select2-hidden-accessible"
                id="job_type_select_gender"
                tabindex="-1"
                aria-hidden="true"
                value={require_gender}
                onChange={(e) => this.handleChange('require_gender', e.target.value)}
              >
                {GENDER_TYPE.map((item, index) => (
                  <option value={item.value} key={index} id={index}>
                    {item.lable}
                  </option>
                ))}
              </select>
            </div>
            <div class="form-group col-md-6">
              <label>Kinh nghiệm</label>
              <select
                className="form-control outline select2-hidden-accessible"
                id="experience-type"
                tabindex="-1"
                aria-hidden="true"
                value={require_exp}
                onChange={(e) => this.handleChange('require_exp', e.target.value)}
              >
                {EXP_TYPE?.map((item, index) => (
                  <option value={item.value} key={index} id={index}>
                    {item.lable}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row px-4">
            <div className="form-group col-md-6">
              <label>Lương</label>
              <select
                name="type"
                className="form-control outline select2-hidden-accessible"
                id="job_type_select_salary"
                tabindex="-1"
                aria-hidden="true"
                onChange={(e) =>
                  this.setState({ salary_type: parseInt(e.target.value) }, () =>
                    this.handleChange('salary_type', e.target.value)
                  )
                }
              >
                {SALARY_TYPE?.map((item, index) => (
                  <option value={item.value} key={index} id={index}>
                    {item.lable}
                  </option>
                ))}
              </select>
            </div>
            {salary_type !== '' && (
              <div class="form-group col-md-6">
                <label className="col-12">Đơn vị (VNĐ)</label>
                {parseInt(salary_type) === 1 && (
                  <div
                    class="input-group input-group-solid"
                    id="salary_to"
                    style={{ width: '45%', display: 'inline-table' }}
                  >
                    <input
                      type="text"
                      className="form-control outline text-right border-0 pr-1"
                      placeholder="0"
                      name="salary_to"
                      value={min_salary}
                      maxlength="3"
                      max="99"
                      id="salary"
                      onChange={(e) => this.handleChange('min_salary', e.target.value)}
                    />
                    <span class="input-group-addon pr-1">triệu</span>
                  </div>
                )}
                {parseInt(salary_type) === 2 && (
                  <div
                    class="input-group input-group-solid"
                    id="salary_to_1"
                    style={{ width: '45%', display: 'inline-table' }}
                  >
                    <input
                      type="text"
                      id="salary"
                      className="form-control outline text-right border-0 pr-1"
                      placeholder="0"
                      name="salary_to"
                      value={max_salary}
                      maxlength="3"
                      onChange={(e) => this.handleChange('max_salary', e.target.value)}
                      max="99"
                    />
                    <span class="input-group-addon pr-1">triệu</span>
                  </div>
                )}
                {parseInt(salary_type) === 3 && (
                  <div className="row pl-3">
                    <div
                      className="input-group input-group-solid"
                      id="salary_to_3"
                      style={{ width: '45%', display: 'inline-table' }}
                    >
                      <input
                        type="text"
                        className="form-control outline text-right border-0 pr-1"
                        placeholder="0"
                        id="salary_to_1"
                        name="salary_to"
                        value={min_salary}
                        onChange={(e) => this.handleChange('min_salary', e.target.value)}
                        maxlength="3"
                        max="99"
                      />
                      <span class="input-group-addon pr-1">triệu</span>
                    </div>
                    <div className="mt-2">
                      <span id="salary-separator" className="mx-2" style={{ display: 'inline' }}>
                        -
                      </span>
                    </div>
                    <div
                      className="input-group input-group-solid"
                      id="salary_to"
                      style={{ width: '45%', display: 'inline-table' }}
                    >
                      <input
                        type="text"
                        className="form-control outline text-right border-0 pr-1"
                        placeholder="0"
                        name="salary_to"
                        id="salary_to_2"
                        value={max_salary}
                        onChange={(e) => this.handleChange('max_salary', e.target.value)}
                        maxlength="3"
                        max="99"
                      />
                      <span class="input-group-addon pr-1">triệu</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="row  px-4">
            <div class="form-group col-md-6">
              <label>
                {STRING.deadline}
                <span class="text-danger"> *</span>
              </label>
              <DatePickerCustom
                className={`date-picker form-control outline select2-hidden-accessible date--time`}
                dateFormat="dd/MM/yyyy"
                placeholderText={STRING.deadline}
                handleChange={this.handleChange}
                selected={deadline}
                minDate={Date.now()}
                id="date"
              />
            </div>
          </div>
          <div className="col-xs-12 px-4">
            <hr />
          </div>
          <div className="form-group col-md-12 px-4">
            <label>
              Mô tả công việc <span class="text-danger">*</span>
            </label>
            <div className="help-block font-italic">Mô tả công việc phải làm dựa theo vị trí ứng tuyển</div>
            <textarea
              maxLength="2000"
              value={description}
              style={{ padding: 5 }}
              placeholder="Mô tả về công việc"
              rows="5"
              cols="100"
              id="des"
              onChange={(e) => this.handleChange('description', e.target.value)}
            />
          </div>
          <div className="form-group col-md-12 px-4">
            <label>
              Yêu cầu ứng viên <span class="text-danger">*</span>
            </label>
            <div className="help-block font-italic">
              Các kỹ năng chuyên môn của ứng viên để đáp ứng nhu cầu công việc, các kỹ năng được ưu tiên của ứng viên...
              vv
            </div>
            <textarea
              maxLength="2000"
              value={skill}
              placeholder="Yêu cầu đối với ứng viên"
              style={{ padding: 5 }}
              rows="5"
              cols="100"
              id="skill"
              onChange={(e) => this.handleChange('skill', e.target.value)}
            />
          </div>
          <div className="form-group col-md-12 px-4">
            <label>
              Quyền lợi ứng viên <span class="text-danger">*</span>
            </label>
            <div className="help-block font-italic">
              Các quyền lợi ứng viên được hưởng khi được nhận vào công ty như chế độ đào tạo, bảo hiểm, nghỉ mát, hoa
              hồng.. vv
            </div>
            <textarea
              maxLength="2000"
              style={{ padding: 5 }}
              placeholder="Quyền lợi của ứng viên"
              rows="5"
              cols="100"
              value={benefit}
              id="benefit"
              onChange={(e) => this.handleChange('benefit', e.target.value)}
            />
          </div>
          <div className="col-xs-12 text-center mb-0 pb-4 pt-2">
            <Button
              disabled={this.checkValidate()}
              className="btn btn--upload py-2 px-4"
              onClick={() => this.createNewJob()}
            >
              Đăng tin
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default TabNewRecruitment
