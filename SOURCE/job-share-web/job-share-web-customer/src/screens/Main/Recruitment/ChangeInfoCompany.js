import React, { Component } from 'react'
import Footer from 'src/components/Common/Footer/Footer'
import HeaderLogin from 'src/components/recruitmentComponents/header/HeaderLogin'
import './HomeRecruitment.css'
import * as API from '@constants/Api'
import { STATUS } from '@constants/Constant'
import swal from 'sweetalert'
import Loading from 'src/components/Loading'
import reactotron from 'src/debug/ReactotronConfig'
import { Button } from 'react-bootstrap'

export default class ChangeInfoCompany extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      major: '',
      address: '',
      phone: '',
      email: '',
      url: '',
      image_info: '',
      image: null,
      number_of_staff: '',
      description: '',
      isLoading: false,
      user_info: '',
      file: null,
    }
  }
  componentDidMount() {
    this.getUserInfo()
  }

  async getUserInfo() {
    try {
      const res = await API.getUserInfo()
      if (res.status === STATUS.ACTIVE) {
        this.setState(
          {
            user_info: res.data,
          },
          () => this.getInfoCompany(res.data.company_id)
        )
      }
    } catch (error) {}
  }

  async getInfoCompany(company_id) {
    this.setState({
      isLoading: true,
    })
    try {
      const res = await API.getInfoCompany({
        company_id: company_id,
      })
      if (res.status === STATUS.ACTIVE) {
        this.setState({
          isLoading: false,
          name: res.data?.company?.name,
          major: res.data?.company?.major,
          address: res.data?.company?.address,
          phone: res.data?.company?.phone,
          email: res.data?.company?.email,
          url: res.data?.company?.url,
          number_of_staff: res.data?.company?.number_of_staff,
          description: res.data?.company?.description,
          image_info: res.data.company?.image,
        })
      }
    } catch (error) {
      this.setState({
        isLoading: false,
      })
    }
  }

  async updateCompany() {
    this.setState({
      isLoading: true,
    })
    const { name, major, address, phone, email, url, number_of_staff, description, image } = this.state
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('major', major)
      formData.append('address', address)
      formData.append('phone', phone)
      formData.append('email', email)
      formData.append('url', url)
      formData.append('number_of_staff', number_of_staff)
      formData.append('description', description)
      formData.append('image', image)
      reactotron.log(formData)
      const res = await API.updateCompany(formData)
      if (res.status === STATUS.ACTIVE) {
        this.setState(
          {
            isLoading: false,
          },
          () =>
            swal({
              title: 'Cập nhật thông tin thành công',
              icon: 'success',
            })
        )
      }
    } catch (error) {
      this.setState({
        isLoading: false,
      })
    }
  }

  checkValidate = () => {
    const { name, major, address, phone, email, url, number_of_staff, description } = this.state
    return !(name && major && address && phone && url && email && number_of_staff && description)
  }
  handleChange = (fieldName, value) => {
    this.setState({
      ...this.state,
      [fieldName]: value || '',
    })
  }

  fileUpload = (e) => {
    this.setState({ ...this.state, image: e.target.files[0], image_info: URL.createObjectURL(e.target.files[0]) })
  }

  render() {
    const { isLoading, name, major, address, phone, email, url, image_info, number_of_staff, description } = this.state
    return (
      <div>
        {isLoading && <Loading />}
        <div style={{ borderBottom: '0.1px solid #E7E7E7' }}>
          <HeaderLogin />
        </div>
        <div className="py-3" style={{ backgroundColor: '#EEF1F5' }}>
          <div className="container bg-white p-0">
            <div class="panel-heading">Thông tin công ty</div>
            <div className="row m-0">
              <div className="panel-body col-8">
                <table className="table no-border ">
                  <tr>
                    <th style={{ width: 170 }}>Tên công ty</th>
                    <td>
                      <input
                        maxLength="100"
                        className="input fullName input-company"
                        value={name}
                        placeholder="Tên công ty"
                        onChange={(e) => this.handleChange('name', e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Lĩnh vực hoạt động</th>
                    <td>
                      <input
                        maxLength="100"
                        className="input input-company"
                        value={major}
                        placeholder="Lĩnh vực hoạt động"
                        onChange={(e) => this.handleChange('major', e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Địa chỉ</th>
                    <td>
                      <input
                        maxLength="200"
                        className="input input-company"
                        value={address}
                        placeholder="Địa chỉ"
                        onChange={(e) => this.handleChange('address', e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Số điện thoại</th>
                    <td>
                      <input
                        maxLength="45"
                        className="input input-company"
                        value={phone}
                        placeholder="Số điện thoại"
                        onChange={(e) => this.handleChange('phone', e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>
                      <input
                        maxLength="45"
                        className="input input-company"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => this.handleChange('email', e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Website</th>
                    <td>
                      <input
                        maxLength="45"
                        className="input input-company"
                        value={url}
                        placeholder="Website"
                        onChange={(e) => this.handleChange('url', e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Quy mô</th>
                    <td>
                      <input
                        className="input input-company"
                        value={number_of_staff}
                        placeholder="Số nhân viên"
                        onChange={(e) => this.handleChange('number_of_staff', e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Mô tả</th>
                    <td>
                      <textarea
                        oninput="auto_grow"
                        rows="3"
                        cols="60"
                        maxLength="2000"
                        placeholder="Mô tả công ty"
                        className="input-des input-company"
                        value={description}
                        onChange={(e) => this.handleChange('description', e.target.value)}
                      />
                    </td>
                  </tr>
                </table>
              </div>
              <div className="panel-body col-4">
                <table className="table no-border ">
                  <tr>
                    <th style={{ width: 150 }}>Logo</th>
                  </tr>
                  <tr>
                    <th style={{ width: 150 }}>
                      {image_info && (
                        <img
                          id="cvo-profile-avatar"
                          src={image_info || ''}
                          fieldkey="avatar"
                          width="100"
                          height="auto"
                          className="mb-2"
                        />
                      )}
                      <div style={{ width: 300, overflow: 'hidden' }}>
                        <input type="file" onChange={this.fileUpload} />
                      </div>
                    </th>
                  </tr>
                </table>
              </div>
            </div>

            <div
              className="mb-5"
              style={{
                justifyContent: 'center',
                display: 'flex',
                textAlign: 'center',
                fontWeight: 450,
              }}
            >
              <Button
                className="btn btn--upload py-2 px-4"
                onClick={() => this.updateCompany()}
                disabled={this.checkValidate()}
              >
                Cập nhật
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
