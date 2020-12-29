import React, { PureComponent } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import Footer from 'src/components/Common/Footer/Footer'
import HeaderLogin from '../header/HeaderLogin'
import RegisterContent from './RegisterContent'

export default class RegisterComponent extends PureComponent {
  render() {
    return (
      <div>
        <div style={{ borderBottom: '1px solid #E7E7E7' }}>
          <HeaderLogin />
        </div>
        <RegisterContent />
        <Footer />
      </div>
    )
  }
}
