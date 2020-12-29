import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import {
  LoginScreen,
  UserScreen,
  OverViewScreen,
  StaffScreen,
  RecruitmentScreen,
  ChatSupportScreen,
  CompanyManagementScreen,
  CvManagementScreen,
  NewsMamagementScreen,
  RecruitmentDetailScreen,
  CompanyDetailScreen,
  UserDetailScreen,
} from '@screens/index'
import { ROUTER } from '@constants/Constant'
import PrivateRoute from './PrivateRoute'
import Header from '@components/header/Header'
import SideBar from '@components/sidebar/SideBar'
import CvDetailScreen from '@screens/cv/CvDetailScreen'
// import OverViewScreen from '@screens/overview/OverViewScreen'

export class AppNavigator extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/Login" exact component={LoginScreen} />
          <PrivateRoute path="/" Component={MainNavigator} />
        </Switch>
      </Router>
    )
  }
}

class MainNavigator extends Component {
  render() {
    return (
      <>
        <Header />
        <SideBar />
        <Switch>
          <PrivateRoute path={ROUTER.USER} exact Component={UserScreen} />
          <PrivateRoute path={ROUTER.USER_DETAIL + '/:id'} exact Component={UserDetailScreen} />
          <PrivateRoute path={ROUTER.OVERVIEW} exact Component={OverViewScreen} />
          <PrivateRoute path={ROUTER.RECRUITMENT} exact Component={RecruitmentScreen} />
          <PrivateRoute path={ROUTER.RECRUITMENT_DETAIL + '/:id'} exact Component={RecruitmentDetailScreen} />
          <PrivateRoute path={ROUTER.CV_MANAGEMENT} exact Component={CvManagementScreen} />
          <PrivateRoute path={ROUTER.CV_DETAIL + '/:id'} exact Component={CvDetailScreen} />
          <PrivateRoute path={ROUTER.NEWS} exact Component={NewsMamagementScreen} />
          <PrivateRoute path={ROUTER.COMPANY} exact Component={CompanyManagementScreen} />
          <PrivateRoute path={ROUTER.COMPANY_DETAIL + '/:id'} exact Component={CompanyDetailScreen} />
          <PrivateRoute path={ROUTER.STAFF} exact Component={StaffScreen} />
          <PrivateRoute path={ROUTER.CHAT_SUPPORT} exact Component={ChatSupportScreen} />
          <Route render={() => <Redirect to={ROUTER.OVERVIEW} />} />
        </Switch>
      </>
    )
  }
}

export default AppNavigator
