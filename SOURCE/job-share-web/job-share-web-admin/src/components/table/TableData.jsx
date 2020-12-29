import React from 'react'
import './Table.css'

const TableData = ({ tableHeader, tableBody }) => {
  return (
    <div className="m-3 mb-4">
      <table
        id="example2"
        className="table table-bordered table-striped table-hover table-responsive-sm table-responsive-md"
      >
        <thead className="text-center bg-thead">
          <tr>
            {tableHeader.map((item, index) => (
              <th key={index}>{item.header}</th>
            ))}
          </tr>
        </thead>
        {tableBody}
      </table>
    </div>
  )
}

export default TableData
