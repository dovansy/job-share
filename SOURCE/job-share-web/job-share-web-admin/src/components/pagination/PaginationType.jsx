import React from 'react'
import { NUMBER } from '@constants/Constant'
import Pagination from 'react-js-pagination'

const PaginationType = ({ activePage, total_Page, action }) => {
  return (
    <div className="col-auto" style={{ opacity: 0.99 }}>
      <Pagination
        itemClass="page-item"
        linkClass="page-link"
        activePage={activePage}
        totalItemsCount={total_Page * NUMBER.page_limit}
        itemsCountPerPage={NUMBER.page_limit}
        pageRangeDisplayed={5}
        onChange={action}
      />
    </div>
  )
}

export default PaginationType
