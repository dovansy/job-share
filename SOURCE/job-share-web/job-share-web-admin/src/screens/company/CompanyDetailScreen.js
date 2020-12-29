import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import { toDateString } from 'src/utils/helper'
import { getInfoCompany } from '@constants/Api'
import {
  STRING,
  NUMBER,
  ROUTER,
  TYPE_ACTION,
  LABLE_BUTTON_UNACTIVE,
  LABLE_BUTTON_ACTIVE,
  STATUS,
} from '@constants/Constant'
import ButtonType from '@src/components/button/ButtonType'
import ConfirmModal from '@src/components/modal/ConfirmModal'
import LoadingAction from 'src/components/loading/LoadingAction'
import TableData from '@src/components/table/TableData'
import StarRatings from 'react-star-ratings'
import './Company.css'

class CompanyDetailScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activePage: 1,
      confirmModal: false,
      isExist: false,
      isLoading: false,
      company_detail: '',
      list_staff: '',
      company: '',
      typeAction: '',
      titleModalConfirm: '',
      tableHeader: [
        {
          header: STRING.numericalOrder,
        },
        {
          header: STRING.fullName,
        },
        {
          header: STRING.email,
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
    }
  }

  componentDidMount() {
    this.getDetailCompany()
  }

  async getDetailCompany() {
    this.setState({
      isLoading: true,
    })
    try {
      const {
        match: { params },
      } = this.props
      const res = await getInfoCompany({ company_id: params.id })
      if (res.status === STATUS.ACTIVE) {
        this.setState({
          isLoading: false,
          company_detail: res.data?.company,
          list_staff: res.data?.listUser,
        })
      }
    } catch (error) {
      this.setState({
        isLoading: false,
      })
    }
  }

  active() {
    alert('active')
  }

  unactive() {
    alert('unactive')
  }

  deleteUserCompany() {
    alert('deleteUserCompany')
  }

  isOpen = (bool, value) => {
    this.setState({
      company: value,
      confirmModal: bool,
    })
  }

  renderActionConfirmModal = (typeAction) => {
    switch (typeAction) {
      case TYPE_ACTION.ACTIVE:
        return () => this.active()
      case TYPE_ACTION.UNACTIVE:
        return () => this.unactive()
      case TYPE_ACTION.DELETE:
        return () => this.deleteUserCompany()
      default:
        break
    }
  }

  renderInfo() {
    return (
      <div className="mx-3">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="home-tab"
              data-toggle="tab"
              href="#thong-tin-cong-ty"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Thông tin công ty
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="profile-tab"
              data-toggle="tab"
              href="#danh-sach-nhan-vien"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              Danh sách nhân viên
            </a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="thong-tin-cong-ty" role="tabpanel" aria-labelledby="home-tab">
            {this.renderCompanyInfo()}
          </div>
          <div className="tab-pane fade" id="danh-sach-nhan-vien" role="tabpanel" aria-labelledby="profile-tab">
            {this.renderListRecruitment()}
          </div>
        </div>
      </div>
    )
  }

  renderCompanyInfo() {
    const { company_detail } = this.state
    return (
      <div
        className="p-2"
        style={{ backgroundColor: 'white', borderRadius: '5px', boxShadow: '3px 3px 10px rgb(0, 0, 0, 0.4)' }}
      >
        <div className="m-2">
          <h6>Thông tin</h6>
          <div className="row">
            {/* col 1 */}
            <div className="col-md-6 col-12">
              <div className="row mx-2 my-1">
                <div className="col-5">
                  <Col>{STRING.name_companmy}</Col>
                </div>
                <div className="col-7">
                  <Col>
                    <strong>{company_detail?.name || '--'}</strong>
                  </Col>
                </div>
              </div>
              <div className="row mx-2 my-3">
                <div className="col-5">
                  <Col>{STRING.phoneNumber}</Col>
                </div>
                <div className="col-7">
                  <Col>
                    <strong>{company_detail?.phone || '--'}</strong>
                  </Col>
                </div>
              </div>
              <div className="row mx-2 my-3">
                <div className="col-5">
                  <Col>{STRING.email}</Col>
                </div>
                <div className="col-7">
                  <Col>
                    <strong>{company_detail?.email || '--'}</strong>
                  </Col>
                </div>
              </div>
              {/* <div className="row mx-2 my-3">
                <div className="col-5">
                  <Col>{STRING.average_of_age}</Col>
                </div>
                <div className="col-7">
                  <Col>
                    <strong>{company_detail?.average_of_age + ' tuổi' || '--'}</strong>
                  </Col>
                </div>
              </div> */}
              <div className="row mx-2 my-3">
                <div className="col-5">
                  <Col>{STRING.staff_number}</Col>
                </div>
                <div className="col-7">
                  <Col>
                    <strong>
                      {company_detail?.number_of_staff
                        ? `${company_detail?.number_of_staff} - ${company_detail?.number_of_staff + 20} nhân viên`
                        : '--'}
                    </strong>
                  </Col>
                </div>
              </div>
            </div>
            {/* col 2 */}
            <div className="col-md-6 col-12">
              <div className="row mx-2 my-1">
                <div className="col-5">
                  <Col>{STRING.address}</Col>
                </div>
                <div className="col-7">
                  <Col>
                    <strong>{company_detail?.address || '--'}</strong>
                  </Col>
                </div>
              </div>
              {/* <div className="row mx-2 my-3">
                <div className="col-5">
                  <Col>{STRING.fouding_day}</Col>
                </div>
                <div className="col-7">
                  <Col>
                    <strong>
                      {company_detail?.date_of_establishment
                        ? toDateString(company_detail?.date_of_establishment)
                        : '--'}
                    </strong>
                  </Col>
                </div>
              </div> */}
              <div className="row mx-2 my-3">
                <div className="col-5">
                  <Col>{STRING.status}</Col>
                </div>
                <div className="col-7">
                  <Col>
                    <strong>
                      {company_detail?.is_active === STATUS.ACTIVE ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                    </strong>
                  </Col>
                </div>
              </div>
              <div className="row mx-2 my-3">
                <div className="col-5">
                  <Col>{STRING.website}</Col>
                </div>
                <div className="col-7">
                  <Col>
                    {/* eslint-disable-next-line */}
                    <a href={company_detail?.url}>{company_detail?.url || '--'}</a>
                  </Col>
                </div>
              </div>
              <div className="row mx-2 my-3">
                <div className="col-5">
                  <Col>{STRING.rating}</Col>
                </div>
                <div className="col-7">
                  <Col>
                    <StarRatings
                      rating={company_detail?.rating || 0}
                      starRatedColor="orange"
                      numberOfStars={5}
                      name="rating"
                      starDimension="22px"
                      starSpacing="3px"
                    />
                  </Col>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="m-2">
          <h6>{STRING.description}</h6>
          <div className="col-12">
            <div className="mx-3 my-1">
              <p className="mx-1">{company_detail?.description}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderListRecruitment() {
    const { tableHeader } = this.state
    return (
      <div
        className="pt-4 pb-5"
        style={{ backgroundColor: 'white', borderRadius: '5px', boxShadow: '3px 3px 10px rgb(0, 0, 0, 0.4)' }}
      >
        <TableData tableBody={this.renderTableData()} tableHeader={tableHeader} />
      </div>
    )
  }

  renderTableData() {
    const { list_staff, activePage } = this.state
    return (
      <tbody>
        {list_staff?.data?.length ? (
          list_staff?.data?.map((item, index) => (
            <tr key={index}>
              <td>{index + NUMBER.page_limit * (activePage - 1) + 1}</td>
              <td>{item?.name || '--'}</td>
              <td>{item?.email || '--'}</td>
              <td>{item?.is_active === STATUS.ACTIVE ? STRING.active : STRING.unactive}</td>
              <td>{item?.created_date ? toDateString(item?.created_date) : '--'}</td>
              <td>
                <Link to={ROUTER.USER_DETAIL + '/' + item?.user_id}>
                  <i className="btnInfo fa fa-fw fa-eye" />
                </Link>
                <i
                  className="btnDelete far fa-trash-alt"
                  onClick={() => {
                    this.isOpen(true, item)
                    this.setState({
                      typeAction: TYPE_ACTION.DELETE,
                      titleModalConfirm: TYPE_ACTION.delete_title,
                    })
                  }}
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">{STRING.emptyData}</td>
          </tr>
        )}
      </tbody>
    )
  }

  renderBody() {
    const { confirmModal, typeAction, titleModalConfirm, company_detail } = this.state
    return (
      <div className="content-wrapper bg-white">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2 header--detail">
              <div className="ml-3">
                <h1 className="header h1--cursor" onClick={() => this.props.history.goBack()}>
                  <i className="fas mr-2 fa-angle-left" />
                  {STRING.company_detail} {company_detail?.name}
                </h1>
              </div>
              <div className="button--flex mr-1 mt-1">
                {company_detail?.is_active === STATUS.ACTIVE && (
                  <ButtonType
                    typeButton={LABLE_BUTTON_UNACTIVE}
                    action={() =>
                      this.setState({
                        typeAction: TYPE_ACTION.UNACTIVE,
                        confirmModal: true,
                        titleModalConfirm: TYPE_ACTION.unactive_title,
                      })
                    }
                  />
                )}
                {company_detail?.is_active === STATUS.UNACTIVE && (
                  <ButtonType
                    typeButton={LABLE_BUTTON_ACTIVE}
                    action={() =>
                      this.setState({
                        typeAction: TYPE_ACTION.ACTIVE,
                        confirmModal: true,
                        titleModalConfirm: TYPE_ACTION.active_title,
                      })
                    }
                  />
                )}
              </div>
            </div>
          </div>
          <ConfirmModal
            isOpen={confirmModal}
            onHide={() =>
              this.setState({
                confirmModal: false,
              })
            }
            title={titleModalConfirm}
            action={this.renderActionConfirmModal(typeAction)}
          />
          {this.renderInfo()}
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

export default CompanyDetailScreen
