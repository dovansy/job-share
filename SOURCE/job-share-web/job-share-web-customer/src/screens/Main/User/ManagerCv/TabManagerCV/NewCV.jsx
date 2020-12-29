import React, { Component } from 'react'
import { STATUS } from '@constants/Constant'
import * as API from '@constants/Api'
import './CV.css'
import Loading from 'src/components/Loading'
import swal from 'sweetalert'
import Select from 'react-select'
import { toDateString } from 'src/utils/helper'
import ListCV from './ListCV'
import ReactToPrint from 'react-to-print'
import reactotron from 'src/debug/ReactotronConfig'
import noavatar from '../../../../../assets/noavatar.webp'

export default class NewCV extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_info: '',
      isLoading: false,
      name: '',
      bio: '',
      date_of_birth: '',
      gender: '',
      phone_number: '',
      email: '',
      address: '',
      description: '',
      image: null,
      education: {
        start_time: '',
        end_time: '',
        school: '',
        major: '',
      },
      experience: {
        start_time_work: '',
        end_time_work: '',
        company: '',
        work_location: '',
        exp_detail: '',
      },
      project: {
        start_time: '',
        end_time: '',
        name: '',
        description: '',
      },
      work_volumteer: {
        start_time_join: '',
        end_time_out: '',
        organization: '',
        work_volumteer_detail: '',
      },
      interests: '',
      list_location: [],
      location: '',
      cv_detail: '',
      //
      file: null,
    }
  }

  componentDidMount() {
    this.getUserInfo()
    this.getListProvince()
  }

  async getListProvince() {
    this.setState({
      isLoading: true,
    })
    try {
      const res = await API.getListProvince()
      this.setState({
        isLoading: false,
        list_location: res.data.map(
          (value) =>
            new Object({
              value: value.id,
              label: value.name,
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
        this.setState(
          {
            isLoading: false,
            user_info: res.data,
          },
          () => this.getCVDetail(res.data.user_id)
        )
      }
    } catch (error) {
      this.setState({
        isLoading: false,
      })
    }
  }

  async getCVDetail(user_id) {
    this.setState({ isLoading: true })
    try {
      let res = await API.getCVDetail({ user_id: user_id })
      reactotron.log(res)
      if (res.status === STATUS.ACTIVE) {
        this.setState({
          isLoading: false,
          cv_detail: res.data,
          name: res?.data?.user?.user_profile?.name,
          bio: res?.data?.user?.user_profile?.apply_work,
          date_of_birth: toDateString(res?.data?.user?.user_profile?.dob),
          gender: res?.data?.user?.user_profile?.gender === 1 ? 'nam' : 'Nữ',
          phone_number: res?.data?.user?.user_profile?.phone,
          email: res?.data?.user?.user_profile?.email,
          address: res?.data?.user?.user_profile?.address,
          description: res?.data?.user?.user_profile?.target_work,
          education: {
            start_time: res?.data?.education?.start_time,
            end_time: res?.data?.education?.end_time,
            school: res?.data?.education?.name,
            major: res?.data?.education?.major,
          },
          experience: {
            start_time_work: res?.data?.experience?.start_time,
            end_time_work: res?.data?.experience?.end_time,
            company: res?.data?.experience?.name,
            work_location: res?.data?.experience?.position,
            exp_detail: res?.data?.experience?.description,
          },
          project: {
            start_time: res?.data?.project?.start_time,
            end_time: res?.data?.project?.end_time,
            name: res?.data?.project?.name,
            description: res?.data?.project?.description,
          },
          work_volumteer: {
            start_time_join: res?.data?.volunteer?.start_time,
            end_time_out: res?.data?.volunteer?.end_time,
            organization: res?.data?.volunteer?.name,
            work_volumteer_detail: res?.data?.volunteer?.description,
          },
          interests: res?.data?.user?.user_profile?.hobby,
          image: res?.data?.user?.user_profile?.image,
          file: res?.data?.user?.user_profile?.image,
          location: { value: res?.data?.user?.user_profile?.province_id },
        })
      }
    } catch (error) {
      this.setState({
        isLoading: false,
      })
    }
  }

  async addUpdateCV() {
    this.setState({
      isLoading: true,
    })
    const {
      name,
      bio,
      date_of_birth,
      gender,
      phone_number,
      email,
      address,
      description,
      interests,
      user_info,
      location,
      image,
      cv_detail,
    } = this.state
    const { start_time, end_time, school, major } = this.state.education
    const { start_time_work, end_time_work, company, work_location, exp_detail } = this.state.experience
    const { start_time_join, end_time_out, organization, work_volumteer_detail } = this.state.work_volumteer
    const {
      start_time: start_time_pro,
      end_time: end_time_pro,
      name: name_pro,
      description: des_pro,
    } = this.state.project
    // const Obj = {
    //   userInfo: {
    //     user_id: user_info.user_id,
    //     name: name,
    //     phone: phone_number,
    //     gender: gender === 'nam' ? 1 : 2,
    //     email: email,
    //     address: address,
    //     province_id: location?.value,
    //     district_id: null,
    //     dob: date_of_birth,
    //     hobby: interests,
    //     apply_work: bio,
    //     target_work: description,
    //   },
    //   education: {
    //     name: school,
    //     start_time: start_time,
    //     end_time: end_time,
    //     major: major,
    //   },
    //   experience: {
    //     name: company,
    //     start_time: start_time_work,
    //     end_time: end_time_work,
    //     description: exp_detail,
    //     position: work_location,
    //   },
    //   volunteer: {
    //     name: organization,
    //     start_time: start_time_join,
    //     end_time: end_time_out,
    //     description: work_volumteer_detail,
    //   },
    //   project: {
    //     name: name_pro,
    //     start_time: start_time_pro,
    //     end_time: end_time_pro,
    //     description: des_pro,
    //   },
    // }
    // console.log('obj', Obj)
    // reactotron.log(name, this.state.education.school, company, organization, name_pro)
    if (name && school && company && organization && name_pro) {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('user_id', user_info.user_id)
      formData.append('name', name)
      formData.append('phone', phone_number)
      formData.append('gender', gender === 'nam' ? 1 : 2)
      formData.append('email', email)
      formData.append('address', address)
      formData.append('province_id', location?.value)
      formData.append('district_id', '')
      formData.append('dob', date_of_birth)
      formData.append('hobby', interests)
      formData.append('apply_work', bio)
      formData.append('target_work', description)
      formData.append('school', school)
      formData.append('start_time', start_time)
      formData.append('end_time', end_time)
      formData.append('major', major)
      formData.append('company', company)
      formData.append('start_time_work', start_time_work)
      formData.append('end_time_work', end_time_work)
      formData.append('exp_detail', exp_detail)
      formData.append('work_location', work_location)
      formData.append('organization', organization)
      formData.append('start_time_join', start_time_join)
      formData.append('end_time_out', end_time_out)
      formData.append('work_volumteer_detail', work_volumteer_detail)
      formData.append('name_pro', name_pro)
      formData.append('start_time_pro', start_time_pro)
      formData.append('end_time_pro', end_time_pro)
      formData.append('des_pro', des_pro)
      try {
        let res
        if (cv_detail?.user?.cv_status !== 1) {
          res = await API.createCV(formData)
        } else {
          res = await API.updateCV(formData)
        }
        if (res.status === STATUS.ACTIVE) {
          this.setState(
            {
              isLoading: false,
            },
            () =>
              swal({
                title: 'Cập nhật Cv thành công',
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
            title: 'Vui lòng điền đầy đủ thông tin',
            icon: 'warning',
          })
      )
    }
  }

  handleChang = (fieldName, value) => {
    this.setState({ ...this.state, [fieldName]: value || '' })
  }

  handleChangEdu = (fieldName, value) => {
    this.setState({
      ...this.state,
      education: {
        ...this.state.education,
        [fieldName]: value || '',
      },
    })
  }

  handleChangExp = (fieldName, value) => {
    this.setState({
      ...this.state,
      experience: {
        ...this.state.experience,
        [fieldName]: value || '',
      },
    })
  }

  handleChangVol = (fieldName, value) => {
    this.setState({
      ...this.state,
      work_volumteer: {
        ...this.state.work_volumteer,
        [fieldName]: value || '',
      },
    })
  }

  handleChangPro = (fieldName, value) => {
    this.setState({
      ...this.state,
      project: {
        ...this.state.project,
        [fieldName]: value || '',
      },
    })
  }

  handleChangeSelect(fieldName, value) {
    this.setState({ ...this.state, [fieldName]: value })
  }

  fileUpload = (e) => {
    this.setState({ ...this.state, image: e.target.files[0], file: URL.createObjectURL(e.target.files[0]) })
  }

  render() {
    const {
      name,
      bio,
      date_of_birth,
      gender,
      phone_number,
      email,
      address,
      description,
      interests,
      isLoading,
      location,
      list_location,
      cv_detail,
      image,
      file,
    } = this.state
    const { start_time, end_time, school, major } = this.state.education
    const { start_time_work, end_time_work, company, work_location, exp_detail } = this.state.experience
    const { start_time_join, end_time_out, organization, role, work_volumteer_detail } = this.state.work_volumteer
    return (
      <div>
        {isLoading && <Loading />}
        <div className="container ">
          <div className="row">
            <div className="col-md-12">
              <div className="tabbable-panel">
                <div className="tabbable-line">
                  <div className="nav nav-tabs">
                    <div className="mx-1 py-2 px-3 action-cv" onClick={() => this.addUpdateCV()}>
                      <span style={{ fontSize: 16 }}>Lưu CV</span>
                    </div>
                    <div className="mx-1 py-2 px-3 action-cv">
                      <ReactToPrint
                        trigger={() => <span style={{ fontSize: 16 }}>Download Pdf CV</span>}
                        content={() => this.componentRef}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-3" style={{ backgroundColor: '#EEF1F5' }}>
          <div className>
            <div className="tab-content">
              <div>
                <div id="cvo-document-root">
                  <div className="cvo-document" ref={(el) => (this.componentRef = el)}>
                    <div className="cvo-page">
                      <div className="cvo-subpage">
                        <div className="cvo-body">
                          <div className="cvo-main">
                            <div id="group-header">
                              <div id="cvo-profile" className="cvo-block">
                                <table className="profile-table">
                                  <tbody>
                                    <tr>
                                      <td className="avatar-wraper" rowSpan="9" style={{ width: '32%' }}>
                                        <img
                                          id="cvo-profile-avatar"
                                          src={file || noavatar}
                                          fieldkey="avatar"
                                          style={{ objectFit: 'contain' }}
                                        />

                                        <div
                                          className="mt-2 pl-4"
                                          style={{
                                            width: 180,
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            // textAlign: 'center',
                                          }}
                                        >
                                          <input
                                            type="file"
                                            name="file"
                                            id="file"
                                            class="inputfile"
                                            onChange={this.fileUpload}
                                          />
                                          <label className="ml-1" for="file">
                                            {image?.name || 'Avatar'}
                                          </label>
                                        </div>
                                      </td>
                                      <td>
                                        <span id="cvo-profile-fullname" cvo-placeholder="Họ tên">
                                          <input
                                            maxLength="45"
                                            style={{ textTransform: 'capitalize' }}
                                            className="input fullName"
                                            value={name || ''}
                                            placeholder="Họ tên"
                                            onChange={(e) => this.handleChang('name', e.target.value)}
                                          ></input>
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <span id="cvo-profile-title" className="default_min_width">
                                          <input
                                            maxLength="200"
                                            style={{ textTransform: 'capitalize' }}
                                            className="input fullName"
                                            value={bio}
                                            placeholder="Vị trí công việc"
                                            onChange={(e) => this.handleChang('bio', e.target.value)}
                                          ></input>
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <span className="profile-label">Ngày sinh: </span>
                                        <span className="profile-field default_min_width">
                                          <input
                                            className="input"
                                            value={date_of_birth}
                                            placeholder="Nhập ngày sinh"
                                            onChange={(e) => this.handleChang('date_of_birth', e.target.value)}
                                          ></input>
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <span className="profile-label">Giới tính: </span>
                                        <span className="profile-field default_min_width">
                                          <input
                                            style={{ textTransform: 'capitalize' }}
                                            className="input_gender"
                                            value={gender}
                                            placeholder="Nhập giới tính"
                                            onChange={(e) => this.handleChang('gender', e.target.value.toLowerCase())}
                                          />
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <span className="profile-label">Điện thoại: </span>
                                        <span className="profile-field default_min_width" id="cvo-profile-phone">
                                          <input
                                            className="input"
                                            value={phone_number}
                                            placeholder="Nhập số điện thoại"
                                            onChange={(e) => this.handleChang('phone_number', e.target.value)}
                                          />
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <span className="profile-label">Email: </span>
                                        <span className="profile-field default_min_width" id="cvo-profile-email">
                                          <input
                                            maxLength="45"
                                            className="input"
                                            value={email}
                                            placeholder="Nhập email"
                                            onChange={(e) => this.handleChang('email', e.target.value)}
                                          />
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <span className="profile-label">Địa chỉ: </span>
                                        <span className="profile-field default_min_width" id="cvo-profile-address">
                                          <input
                                            maxLength="200"
                                            className="input"
                                            value={address}
                                            placeholder="Nhập địa chỉ"
                                            onChange={(e) => this.handleChang('address', e.target.value)}
                                          />
                                        </span>
                                      </td>
                                    </tr>
                                    {!cv_detail?.education?.name & !cv_detail?.experience?.name &&
                                    !cv_detail?.project?.name &&
                                    !cv_detail?.volunteer?.name ? (
                                      <tr>
                                        <td>
                                          <span style={{ fontWeight: 700 }}>Bạn muốn làm việc ở: </span>
                                          <span className="profile-field default_min_width" id="cvo-profile-address">
                                            <span className="ctn-icon">
                                              <i
                                                className="fas fa-map-marker-alt"
                                                style={{ fontSize: 17, marginTop: 295, marginLeft: 290 }}
                                              ></i>
                                            </span>
                                            <Select
                                              value={location}
                                              options={list_location}
                                              placeholder="Tất cả địa điểm"
                                              onChange={(e) => this.handleChangeSelect('location', e)}
                                            />
                                          </span>
                                        </td>
                                      </tr>
                                    ) : null}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div id="group-content">
                              <div id="cvo-objective" className="cvo-block">
                                <h3 className="cvo-block-title">
                                  <span id="cvo-objective-blocktitle">Mục tiêu nghề nghiệp</span>
                                </h3>
                                <div className="cvo-block-body">
                                  <div id="cvo-objective-objective">
                                    <textarea
                                      rows="3"
                                      cols="85"
                                      maxLength="2000"
                                      placeholder="Mô tả mục tiêu nghề nghiệp của bạn."
                                      className="input-des"
                                      value={description}
                                      onChange={(e) => this.handleChang('description', e.target.value)}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div id="cvo-education" className="cvo-block">
                                <h3 className="cvo-block-title">
                                  <span id="cvo-education-blocktitle">Học vấn</span>
                                </h3>
                                <div id="education-table" className="cvo-block-body">
                                  <div
                                    className="row"
                                    type="fieldgroup"
                                    cvo-form-fieldgroup="true"
                                    blockkey="education"
                                  >
                                    <div className="cvo-education-time col-time">
                                      <span className="cvo-education-start start default_min_width">
                                        <input
                                          maxLength="20"
                                          className="input-time"
                                          value={start_time}
                                          placeholder="Từ"
                                          onChange={(e) => this.handleChangEdu('start_time', e.target.value)}
                                        />
                                      </span>
                                      -
                                      <span className="cvo-education-end end default_min_width">
                                        <input
                                          maxLength="20"
                                          className="input-time"
                                          value={end_time}
                                          placeholder="Đến"
                                          onChange={(e) => this.handleChangEdu('end_time', e.target.value)}
                                        />
                                      </span>
                                    </div>
                                    <div className="school">
                                      <span className="cvo-education-school default_min_width">
                                        <input
                                          maxLength="200"
                                          className="input mb-1"
                                          value={school}
                                          style={{ fontWeight: 'bold' }}
                                          placeholder="Tên trường học"
                                          onChange={(e) => this.handleChangEdu('school', e.target.value)}
                                        />
                                      </span>
                                      <span className="cvo-education-title default_min_width">
                                        <input
                                          maxLength="1000"
                                          className="input"
                                          value={major}
                                          placeholder="Ngành học, môn học"
                                          onChange={(e) => this.handleChangEdu('major', e.target.value)}
                                        />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div id="cvo-experience" className="cvo-block">
                                <h3 class="cvo-block-title">
                                  <span id="cvo-experience-blocktitle">Kinh nghiệm làm việc</span>
                                </h3>
                                <div id="experience-table" className="cvo-block-body">
                                  <div
                                    className="row"
                                    type="fieldgroup"
                                    cvo-form-fieldgroup="true"
                                    blockkey="experience"
                                  >
                                    <div className="cvo-experience-time col-time">
                                      <span class="cvo-experience-start start default_min_width">
                                        <input
                                          maxLength="20"
                                          className="input-time"
                                          value={start_time_work}
                                          placeholder="Từ"
                                          onChange={(e) => this.handleChangExp('start_time_work', e.target.value)}
                                        />
                                      </span>
                                      -
                                      <span class="cvo-experience-end end default_min_width">
                                        <input
                                          maxLength="20"
                                          className="input-time"
                                          value={end_time_work}
                                          placeholder="Đến"
                                          onChange={(e) => this.handleChangExp('end_time_work', e.target.value)}
                                        />
                                      </span>
                                    </div>
                                    <div class="company">
                                      <span class="cvo-experience-company default_min_width">
                                        <input
                                          maxLength="200"
                                          className="input mb-1"
                                          value={company}
                                          style={{ fontWeight: 'bold' }}
                                          placeholder="Tên công ty"
                                          onChange={(e) => this.handleChangExp('company', e.target.value)}
                                        />
                                      </span>
                                      <span className="cvo-experience-position default_min_width">
                                        <input
                                          maxLength="45"
                                          className="input mb-1"
                                          value={work_location}
                                          placeholder="Nhập vị trí làm việc"
                                          onChange={(e) => this.handleChangExp('work_location', e.target.value)}
                                        />
                                      </span>
                                      <div class="cvo-experience-details default_min_width">
                                        <textarea
                                          maxLength="2000"
                                          rows="2"
                                          cols="58"
                                          placeholder="Mô tả chi tiết công việc, những gì đạt được trong quá trình làm việc."
                                          className="input-des"
                                          value={exp_detail}
                                          onChange={(e) => this.handleChangExp('exp_detail', e.target.value)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/*  */}
                              <div id="cvo-experience" className="cvo-block">
                                <h3 class="cvo-block-title">
                                  <span id="cvo-experience-blocktitle">Dự án</span>
                                </h3>
                                <div id="experience-table" className="cvo-block-body">
                                  <div
                                    className="row"
                                    type="fieldgroup"
                                    cvo-form-fieldgroup="true"
                                    blockkey="experience"
                                  >
                                    <div className="cvo-experience-time col-time">
                                      <span class="cvo-experience-start start default_min_width">
                                        <input
                                          maxLength="20"
                                          className="input-time"
                                          value={this.state.project.start_time}
                                          placeholder="Từ"
                                          onChange={(e) => this.handleChangPro('start_time', e.target.value)}
                                        />
                                      </span>
                                      -
                                      <span class="cvo-experience-end end default_min_width">
                                        <input
                                          maxLength="20"
                                          className="input-time"
                                          value={this.state.project.end_time}
                                          placeholder="Đến"
                                          onChange={(e) => this.handleChangPro('end_time', e.target.value)}
                                        />
                                      </span>
                                    </div>
                                    <div class="company">
                                      <span class="cvo-experience-company default_min_width">
                                        <input
                                          maxLength="200"
                                          className="input mb-1"
                                          value={this.state.project.name}
                                          style={{ fontWeight: 'bold' }}
                                          placeholder="Tên dự án"
                                          onChange={(e) => this.handleChangPro('name', e.target.value)}
                                        />
                                      </span>
                                      <div class="cvo-experience-details default_min_width">
                                        <textarea
                                          oninput="auto_grow"
                                          rows="2"
                                          cols="58"
                                          maxLength="2000"
                                          placeholder="Mô tả chi tiết về dự án"
                                          className="input-des"
                                          value={this.state.project.description}
                                          onChange={(e) => this.handleChangPro('description', e.target.value)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/*  */}
                              <div id="cvo-experience" className="cvo-block">
                                <h3 class="cvo-block-title">
                                  <span id="cvo-experience-blocktitle">Hoạt động</span>
                                </h3>
                                <div id="experience-table" className="cvo-block-body">
                                  <div
                                    className="row"
                                    type="fieldgroup"
                                    cvo-form-fieldgroup="true"
                                    blockkey="experience"
                                  >
                                    <div className="cvo-experience-time col-time">
                                      <span class="cvo-experience-start start default_min_width">
                                        <input
                                          maxLength="20"
                                          className="input-time"
                                          value={start_time_join}
                                          placeholder="Từ"
                                          onChange={(e) => this.handleChangVol('start_time_join', e.target.value)}
                                        />
                                      </span>
                                      -
                                      <span class="cvo-experience-end end default_min_width">
                                        <input
                                          maxLength="20"
                                          className="input-time"
                                          value={end_time_out}
                                          placeholder="Đến"
                                          onChange={(e) => this.handleChangVol('end_time_out', e.target.value)}
                                        />
                                      </span>
                                    </div>
                                    <div class="company">
                                      <span class="cvo-experience-company default_min_width">
                                        <input
                                          maxLength="200"
                                          className="input mb-1"
                                          value={organization}
                                          style={{ fontWeight: 'bold' }}
                                          placeholder="Tên tổ chức"
                                          onChange={(e) => this.handleChangVol('organization', e.target.value)}
                                        />
                                      </span>
                                      <div class="cvo-experience-details default_min_width">
                                        <textarea
                                          oninput="auto_grow"
                                          rows="2"
                                          cols="58"
                                          placeholder="Mô tả chi tiết hoạt động bạn đã tham gia"
                                          className="input-des"
                                          maxLength="2000"
                                          value={work_volumteer_detail}
                                          onChange={(e) => this.handleChangVol('work_volumteer_detail', e.target.value)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div id="cvo-experience" className="cvo-block">
                                <h3 class="cvo-block-title">
                                  <span id="cvo-experience-blocktitle">Sở thích</span>
                                </h3>
                                <div className="cvo-block-body">
                                  <div id="cvo-objective-objective">
                                    <textarea
                                      rows="3"
                                      cols="85"
                                      placeholder="Sở thích của bạn"
                                      className="input-des"
                                      value={interests}
                                      maxLength="2000"
                                      onChange={(e) => this.handleChang('interests', e.target.value)}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
