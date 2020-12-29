import React, { Component } from 'react'
import { Login } from '@constants/Api'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { notifyWarning } from 'src/utils/notify'
import { loginRecruitment } from '@src/redux/actions'
import Cookie from 'js-cookie'
import Footer from '../../Common/Footer/Footer'
import HeaderLogin from '../header/HeaderLogin'
import './LoginRecruitment.css'
import Loading from '../../Loading'
import { MESSAGE, ROUTER, ROLE_TYPE } from '@constants/Constant'
import * as API from '@constants/Api'
class LoginRecruitment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      width: window.innerWidth,
      height: window.innerHeight,
      loadingAction: false,
      hidden: true,
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
      const res = await API.Login({
        username: username,
        password: password,
        role_id: ROLE_TYPE.RECRUITMENT,
      })

      this.setState({
        loadingAction: false,
      })
      Cookie.set('SESSION_ID_RECRUITMENT', res.data.token, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 1 month
      })
      window.location.href = ROUTER.HOME_RECRUITMENT
    } catch (err) {
      console.log(err)
      this.setState({
        loadingAction: false,
      })
    }
  }

  handleTextChange(field, event) {
    this.setState({
      [field]: event.target.value,
    })
  }

  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      this.login()
    }
  }

  showPassword = () => {
    this.setState({ hidden: !this.state.hidden })
  }

  render() {
    const { username, password, hidden, loadingAction } = this.state
    const token = Cookie.get('SESSION_ID_RECRUITMENT')
    if (token) {
      return <Redirect to={ROUTER.HOME_RECRUITMENT} />
    }
    return (
      <div>
        {loadingAction && <Loading />}
        <div style={{ borderBottom: '0.1px solid #E7E7E7' }}>
          <HeaderLogin />
        </div>
        <div style={{ backgroundColor: '#EEF1F5' }}>
          <div className="container p-3" id="page-login">
            <div className="px-5 mx-5">
              <div className="panel panel-default">
                <div className="panel-heading" style={{ textAlign: 'center' }}>
                  Đăng nhập
                </div>
                <div className="panel-body bg-white">
                  <div>
                    <div className="form-group">
                      <input
                        onKeyPress={this.handleKeyPress}
                        type="email"
                        className="form-control"
                        name="email"
                        required=""
                        placeholder="Email"
                        value={username}
                        onChange={(e) => this.handleTextChange('username', e)}
                      />
                    </div>
                    <div className="form-group" style={{ textAlign: 'right' }}>
                      <input
                        onKeyPress={this.handleKeyPress}
                        type={hidden ? 'password' : 'text'}
                        className="form-control"
                        name="password"
                        required=""
                        value={password}
                        onChange={(e) => this.handleTextChange('password', e)}
                        placeholder="Mật khẩu"
                      />
                      {hidden ? (
                        <i
                          class="fas fa-eye-slash"
                          style={{
                            color: 'gray',
                            marginTop: -25,
                            marginLeft: -25,
                            position: 'absolute',
                            cursor: 'pointer',
                            zIndex: 1,
                          }}
                          onClick={this.showPassword}
                        />
                      ) : (
                        <i
                          className="fas fa-eye"
                          style={{
                            color: 'gray',
                            marginTop: -25,
                            marginLeft: -25,
                            position: 'absolute',
                            cursor: 'pointer',
                            zIndex: 1,
                          }}
                          onClick={this.showPassword}
                        />
                      )}
                    </div>
                    <div className="" style={{ textAlign: 'center' }}>
                      <Link>
                        <button type="submit" className="btn1 btn-primaryy" onClick={this.login}>
                          Đăng nhập
                        </button>
                      </Link>
                      {/* <a href="" className="hover-link ml-5">
                        Quên mật khẩu?
                      </a> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  userInfoState: state.userReducer,
})
const mapDispatchToProps = {
  loginRecruitment,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginRecruitment)
