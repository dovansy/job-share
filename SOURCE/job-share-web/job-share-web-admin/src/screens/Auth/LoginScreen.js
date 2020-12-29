import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { STRING, MESSAGE } from '@constants/Constant'
import { Login } from '@constants/Api'
import { notifyFail, notifyWarning } from 'src/utils/notify'
import Cookie from 'js-cookie'
import backgroundImage from '../../assets/job.png'
import LoadingAction from '@components/loading/LoadingAction'
import '@styles/Login.css'
import { ROLE_TYPE } from '../../constants/Constant'

class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      width: window.innerWidth,
      height: window.innerHeight,
      loadingAction: false,
    }
  }
  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions)
  }

  login = async () => {
    const { username, password } = this.state
    this.setState({
      loadingAction: true,
    })
    if (!username || !password) {
      notifyWarning(MESSAGE.empty)
      this.setState({
        loadingAction: false,
      })
      return
    }
    try {
      const res = await Login({
        username: username,
        password: password,
        role_id: ROLE_TYPE.ADMIN,
      })
      this.setState({
        loadingAction: false,
      })
      Cookie.set('SESSION_ID', res.data.token, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 1 month
      })
      window.location.href = '/'
    } catch (err) {
      console.log(err)
      this.setState(
        {
          loadingAction: false,
        },
        () => notifyFail(err.msg)
      )
    }
  }

  handleTextChange(field, event) {
    this.setState({
      [field]: event.target.value,
    })
  }

  render() {
    const { username, password, loadingAction } = this.state
    const token = Cookie.get('SESSION_ID')
    if (token) {
      return <Redirect to="/" />
    }
    return (
      <>
        {loadingAction && <LoadingAction />}
        <div className="wrapper--login">
          <div className="loginForm">
            <div className="loginForm__img mt-0 mb-2">
              <img src={backgroundImage} alt="logo" style={{ width: '60%', height: 'auto' }} />
            </div>
            <form>
              <div className="form-group">
                <input
                  type="username"
                  autoComplete="off"
                  placeholder="Tài khoản"
                  className="form-control form-control-input"
                  value={username}
                  onChange={(e) => this.handleTextChange('username', e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  autoComplete="off"
                  placeholder="Mật khẩu"
                  className="form-control form-control-input"
                  value={password}
                  onChange={(e) => this.handleTextChange('password', e)}
                />
              </div>
              <div className="form-group">
                <p className="forgot-pass">{STRING.forgotPass}</p>
              </div>
              <Link>
                <button type="submit" className="btn" onClick={this.login}>
                  <div className="login-button-content">
                    <span>{STRING.login}</span>
                  </div>
                </button>
              </Link>
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default LoginScreen
