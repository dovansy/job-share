import React, { Component } from 'react'
import './RecruitmentScreen.css'

export default class CompanyPartner extends Component {
  render() {
    return (
      <div className="content--companyPartner ">
        <div className="col-12 container list--ul mt-0 pt-0">
          <ul className="list--ul__inline">
            <li>
              <a>
                <img
                  src={require('../../../assets/vingroup.webp')}
                  alt="vin"
                  className="img--companyPartner"
                  style={{ objectFit: 'contain' }}
                />
              </a>
            </li>
            <li>
              <a>
                <img
                  src={require('../../../assets/fpt_icon.webp')}
                  alt="1vin"
                  className="img--companyPartner"
                  style={{ objectFit: 'contain' }}
                />
              </a>
            </li>
            <li>
              <a>
                <img
                  src={require('../../../assets/tiki.webp')}
                  alt="vin2"
                  className="img--companyPartner"
                  style={{ objectFit: 'contain' }}
                />
              </a>
            </li>
            <li>
              <a>
                <img
                  src={require('../../../assets/vingroup.webp')}
                  alt="win1"
                  className="img--companyPartner"
                  style={{ objectFit: 'contain' }}
                />
              </a>
            </li>
            <li>
              <a>
                <img
                  src={require('../../../assets/fpt_icon.webp')}
                  alt="fpt"
                  className="img--companyPartner"
                  style={{ objectFit: 'contain' }}
                />
              </a>
            </li>
            <li>
              <a>
                <img
                  src={require('../../../assets/tiki.webp')}
                  alt="tiki"
                  className="img--companyPartner"
                  style={{ objectFit: 'contain' }}
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
