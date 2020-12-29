import React, { Component } from 'react'
import Header from '@src/components/Common/Header/Header'
import Footer from 'src/components/Common/Footer/Footer'
import Loading from 'src/components/Loading'
import * as API from '@constants/Api'
import NewCV from './TabManagerCV/NewCV'
import './TabManagerCV/CV.css'
class ManagerCvScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
    }
  }
  render() {
    const { isLoading } = this.state
    return (
      <>
        <Header />
        {isLoading && <Loading />}
        <div className="container-fluid  px-0">
          <NewCV />
        </div>
        <Footer />
      </>
    )
  }
}
export default ManagerCvScreen
