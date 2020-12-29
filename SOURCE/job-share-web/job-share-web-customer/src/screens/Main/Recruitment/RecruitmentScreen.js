import React, { Component } from 'react'
import HeaderRecruitment from '@src/components/recruitmentComponents/header/HeaderRecruitment'
import CompanyPartner from '@src/components/recruitmentComponents/content/CompanyPartner'
import ContentPageRecruitment from 'src/components/recruitmentComponents/content/ContentPageRecruitment'
import FooterRecruitment from 'src/components/recruitmentComponents/footer/FooterRecruitment'

export default class RecruitmentScreen extends Component {
  render() {
    return (
      <div>
        <HeaderRecruitment />
        <CompanyPartner />
        <ContentPageRecruitment />
        <FooterRecruitment />
      </div>
    )
  }
}
