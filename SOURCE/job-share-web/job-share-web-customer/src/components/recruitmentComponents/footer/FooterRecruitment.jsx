import React, { Component } from 'react'
import './FooterRecruitment.css'

export default class FooterRecruitment extends Component {
  render() {
    return (
      <div>
        <footer className="footer--recruitment">
          <div className="container">
            <div className="row">
              <div className="col-sm-8">
                <p className="mb-3">
                  <strong>JobShare Việt Nam</strong>
                </p>
                <p className="mb-1">Email: job.share.tlu@gmail.com</p>
                <p className="mb-1">Điện thoại:</p>
              </div>
              <div className="col-sm-4">
                <div className="row">
                  <a href="" className="logo">
                    <img src={require('@src/assets/job2.png')} alt="JobShare" style={{ marginLeft: 30, width: 50 }} />
                  </a>
                  <a href="">
                    <img
                      src={require('@src/assets/job-share-1.png')}
                      className="logo"
                      alt="Google"
                      style={{ marginLeft: 30, width: 80 }}
                    />
                  </a>
                </div>
                <p className="copyright mt-3">© 2020 - JobShare Việt Nam.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}
