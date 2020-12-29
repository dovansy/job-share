import React, { Component } from 'react'
import { connect } from 'react-redux'
import Cookie from 'js-cookie'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import {
  AuthScreen,
  FastWorkScreen,
  WorkingScreen,
  RecruitmentScreen,
  RegisterRecruitment,
  HomeRecruitment,
  Recruitment,
  SearchApplicant,
  ManagerCvScreen,
  CompanyScreen,
} from '@screens/index'
import PrivateRoute from './PrivateRoute'
import PrivateRouteRecruitment from './PrivateRouteRecruitment'
import { ROUTER } from '@constants/Constant'
import LoginRecruitment from 'src/components/recruitmentComponents/login/LoginRecruitment'
import HeaderLogin from 'src/components/recruitmentComponents/header/HeaderLogin'
import Header from 'src/components/Common/Header/Header'
import reactotron from 'src/debug/ReactotronConfig'
import CompanyDetail from '@screens/Main/User/Company/CompanyDetail'
import ChangeInfoCompany from '@screens/Main/Recruitment/ChangeInfoCompany'

export class AppNavigator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
    }
  }

  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route path={ROUTER.FAST_JOB} exact component={FastWorkScreen} />
            <Route path={ROUTER.SEARCH_JOB} exact component={WorkingScreen} />
            <Route path={ROUTER.RECRUITMENT} exact component={RecruitmentScreen} />
            <Route path={ROUTER.COMPANY_SHOW} exact component={CompanyScreen} />
            <Route path={ROUTER.COMPANY_DETAIL + '/:id'} exact component={CompanyDetail} />
            <Route path="/" exact component={WorkingScreen} />
            <Route path={ROUTER.LOGIN_APPLICANT} exact component={AuthScreen} />
            <Route path={ROUTER.LOGIN_RECRUITMENT} exact component={LoginRecruitment} />
            <Route path={ROUTER.REGISTER_RECRUITMENT} exact component={RegisterRecruitment} />
            {window.location.pathname.indexOf('/nha-tuyen-dung') !== -1 ? (
              <PrivateRouteRecruitment path="/" Component={MainNavigatorRecruitment} />
            ) : (
              <PrivateRoute path="/" Component={MainNavigatorApplicant} />
            )}
          </Switch>
        </Router>
      </>
    )
  }
}

class MainNavigatorRecruitment extends Component {
  render() {
    return (
      <>
        <Switch>
          <PrivateRouteRecruitment path={ROUTER.NEWS_RECRUITMENT} exact Component={Recruitment} />
          <PrivateRouteRecruitment path={ROUTER.SEARCH_APPLICANT} exact Component={SearchApplicant} />
          <PrivateRouteRecruitment path={ROUTER.HOME_RECRUITMENT} exact Component={HomeRecruitment} />
          <PrivateRouteRecruitment path={ROUTER.CHANGE_INFO_COMPANY} exact Component={ChangeInfoCompany} />
          <Route render={() => <Redirect to={ROUTER.HOME_RECRUITMENT} />} />
        </Switch>
      </>
    )
  }
}

class MainNavigatorApplicant extends Component {
  render() {
    return (
      <>
        <Switch>
          <PrivateRoute path={ROUTER.MANAGER_CV} exact Component={ManagerCvScreen} />
          <Route render={() => <Redirect to={ROUTER.MANAGER_CV} />} />
        </Switch>
      </>
    )
  }
}

export default AppNavigator
