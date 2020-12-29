import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Cookie from 'js-cookie'
import { ROUTER } from '@constants/Constant'

export default class PrivateRoute extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      verified: true,
    }
  }

  render() {
    const { path, Component, exact } = this.props
    let token_recruitment = Cookie.get('SESSION_ID_RECRUITMENT')
    let hasToken_recruitment = token_recruitment ? true : false
    return (
      <Route
        path={path}
        exact={exact}
        render={(props) =>
          hasToken_recruitment === true ? <Component {...props} /> : <Redirect to={ROUTER.LOGIN_RECRUITMENT} />
        }
      />
    )
  }
}
