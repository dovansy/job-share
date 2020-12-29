import React, { Component } from 'react'
import empty from '../../../../../assets/empty.svg'

const ListCV = () => (
  <div>
    <h3>Time & Materials Statement of Work (SOW)</h3>
    <h4>General Information</h4>
    <table id="tab_customers" class="table table-striped">
      <colgroup>
        <col span="1" />
        <col span="1" />
      </colgroup>
      <thead>
        <tr class="warning">
          <th>SOW Creation Date</th>
          <th>SOW Start Date</th>
          <th>Project</th>
          <th>Last Updated</th>
          <th>SOW End Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Dec 13, 2017</td>
          <td>Jan 1, 2018</td>
          <td>NM Connect - NMETNMCM</td>
          <td>Dec 13, 2017</td>
          <td>Dec 31, 2018</td>
        </tr>
      </tbody>
    </table>
    <p>
      This is a Time and Materials Statement of Work between Northwestern Mutual Life Insurance Company and Infosys with
      all general terms and conditions as described in the current Master Agreement and its related documents
    </p>
  </div>
)
export default ListCV
