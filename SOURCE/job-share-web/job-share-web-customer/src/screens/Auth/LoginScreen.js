import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { ROUTER, STRING } from '@constants/Constant'
import { Login } from '../../constants/Api'
import '../../styles/Login.css'
import Cookie from 'js-cookie'

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // username: 'admin',
      // password: '123456',
    }
    this.login = this.login.bind(this)
  }

  async login() {
    try {
      const res = await Login({
        USERNAME: this.state.username,
        PASS: this.state.password,
      })
      console.log(res)
      Cookie.set('SESSION_ID', res.data.TOKEN)
      window.location.href = '/'
    } catch (err) {
      console.log(err)
    }
  }

  handleTextChange(field, event) {
    this.setState({
      [field]: event.target.value,
    })
  }

  render() {
    const { username, password } = this.state
    // const token = Cookie.get('SESSION_ID')
    // if (token) {
    //   return <Redirect to="/" />
    // }
    return (
      <>
        {/* <div className="wrapper--login">
          <div className="bg-img"></div>
          <div className="loginForm">
            <div className="loginForm__img mt-0 mb-2">
              <img src={require('../../assets/logoUtruck.png')} alt="logo" style={{ width: '80%', height: 'auto' }} />
            </div>
            <form>
              <div className="form-group">
                <input
                  type="username"
                  placeholder="Nhập tên đăng nhập"
                  className="form-control"
                  // value={username}
                  value=""
                  onChange={(e) => this.handleTextChange('username', e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  className="form-control"
                  // value={password}
                  value=""
                  onChange={(e) => this.handleTextChange('password', e)}
                />
              </div>
              <div className="form-group">
                <a href="forgot-pass" style={{ textDecoration: 'none', color: 'white' }}>
                  {STRING.forgotPass}
                </a>
              </div>
              <Link to="/">
                <button type="submit" className="btn" >
                  <div className="login-button-content">
                    <span>{STRING.login}</span>
                  </div>
                </button>
              </Link>
            </form>
          </div>
        </div> */}
        <div classsName="container-fluid">
          <div class="container" id="page-login">
            <div class="row">
              <div class="col-md-6 col-md-offset-3">
                <div class="panel panel-default">
                  <div class="panel-heading">Đăng nhập</div>
                  <div class="panel-body">
                    <div class="alert alert-danger" style="display: none"></div>
                    <form action="" method="post">
                      <input type="hidden" name="_token" value="UyOYciRbsFeswoFRgeqvA8YQvzIwnSrfHYOuXT2s" />
                      <div class="form-group">
                        <input
                          type="email"
                          class="form-control"
                          name="email"
                          required=""
                          placeholder="Email"
                          value=""
                          autofocus=""
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="password"
                          class="form-control"
                          name="password"
                          required=""
                          placeholder="Mật khẩu"
                        />
                      </div>
                      <div class="form-group">
                        <Link>
                          <button type="submit" class="btn btn-primary">
                            Đăng nhập
                          </button>
                        </Link>
                        <a class="hover-link pull-right">Quên mật khẩu?</a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default LoginScreen
