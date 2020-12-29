import React, { Component } from 'react'
import Header from '@src/components/Common/Header/Header'
import Footer from 'src/components/Common/Footer/Footer'
import Loading from 'src/components/Loading'
import * as API from '@constants/Api'
import './CompanyScreen.css'
import empty from '../../../../assets/empty.svg'
import reactotron from 'src/debug/ReactotronConfig'
import { ROUTER, STATUS } from '@constants/Constant'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'

class CompanyScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      activePage: 1,
      isLoading: false,
    }
  }
  componentDidMount() {
    this.getListCompany()
  }

  async getListCompany() {
    this.setState({
      isLoading: true,
    })
    const { search, activePage } = this.state
    try {
      const res = await API.getListCompany({
        search: search,
        page: activePage,
        status_id: 1,
      })

      if (res.status === STATUS.ACTIVE) {
        this.setState({
          isLoading: false,
          list_company: res.data,
          paging: res.paging,
        })
      }
    } catch (error) {
      this.setState({
        isLoading: false,
      })
    }
  }

  handleChange = (fieldName, value) => {
    this.setState({
      ...this.state,
      [fieldName]: value || '',
    })
  }

  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      this.getListCompany()
    }
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected
    this.setState(
      {
        activePage: selectedPage,
      },
      () => {
        this.getListCompany()
      }
    )
  }

  render() {
    const { isLoading, search, list_company, paging } = this.state
    const total_page = Math.ceil(paging?.totalItemCount / paging?.limit)
    return (
      <>
        <Header />
        {isLoading && <Loading />}
        <div className="container-fluid m-0 p-0" style={{ backgroundColor: '#F6F6F6' }}>
          <div className="box-search-top-list">
            <div className="container py-4">
              <div className="box-form-search-top-list">
                <h1>
                  Tìm kiếm <strong>danh sách công ty</strong> trên JobShare
                </h1>
                <div method="get" id="frm-search-top-list" style={{ margin: 20 }}>
                  <div className="row input-search-top-list">
                    <div className="col-sm-9">
                      <div className="form-group input-data">
                        <span>
                          <i
                            className="fas fa-search"
                            style={{
                              position: 'absolute',
                              color: 'lightgray',
                              fontSize: 20,
                              marginTop: 10,
                              marginLeft: 12,
                            }}
                          ></i>
                        </span>
                        <input
                          onKeyPress={this.handleKeyPress}
                          className="form-control"
                          placeholder="Nhập tên công ty"
                          id="keyword"
                          name="keyword"
                          value={search}
                          onChange={(e) => this.handleChange('search', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <button
                        className="btn-company-primary"
                        id="btn-search-top-list"
                        style={{ width: '100%', border: 'none', borderRadius: 4, marginBottom: 20 }}
                        onClick={() => this.getListCompany()}
                      >
                        <i className="fa fa-search" aria-hidden="true"></i> Tìm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="">
              <div className="text-center" style={{ backgroundColor: '#F6F6F6' }}>
                <div className="pt-3 bg-white">
                  <span style={{ fontSize: 24, fontWeight: 300 }}>Danh sách các công ty</span>
                  <hr />
                </div>
                {list_company?.length ? (
                  <div className="company-content">
                    <div
                      style={{
                        display: 'inline',
                      }}
                    >
                      <div className="row">
                        {list_company?.map((item, index) => (
                          <div
                            className="m-3 bg-white col-sm-5 col-md-3 col-12 company-item"
                            style={{
                              border: '1px solid lightgray',
                              boxShadow: '5px 7px 10px lightgray',
                              cursor: 'pointer',
                            }}
                            key={index}
                            onClick={() => this.props.history.push(ROUTER.COMPANY_DETAIL + '/' + item.id)}
                          >
                            <div className="company-info row">
                              <div className="company-logo mt-2 col-sm-3 col-xs-3 mr-0 pr-0">
                                <a>
                                  <img
                                    src={item?.image || require('../../../../assets/job2.png')}
                                    width="50"
                                    height="50"
                                    alt="logo"
                                    style={{ objectFit: 'contain' }}
                                  />
                                </a>
                              </div>
                              <div className="col-title mt-3 col-sm-9 col-xs-9 ml-0 pl-0">
                                <a className="bold text-highlight">{item.name}</a>
                              </div>
                            </div>
                            <hr />
                            <div className="company-des">
                              <p>{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-3" style={{ justifyContent: 'center', display: 'flex', marginLeft: -200 }}>
                      <ReactPaginate
                        previousLabel={'< Back'}
                        nextLabel={'Next >'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={total_page}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <img src={empty} style={{ width: 380, height: 160, margin: '50px auto' }} />
                    <p style={{ paddingBottom: 40 }}>Không có công ty nào!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}
export default CompanyScreen
