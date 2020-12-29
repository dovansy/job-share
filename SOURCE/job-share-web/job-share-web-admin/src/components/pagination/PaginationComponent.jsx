import React from 'react'
import { NUMBER } from '@constants/Constant'
import Pagination from 'react-js-pagination'

const PaginationComponent = ({ activePage, action, total_Page }) => {
  return (
    <>
      <div style={{ opacity: 0.99 }} className="col-auto">
        <Pagination
          itemClass="page-item"
          linkClass="page-link"
          activePage={activePage}
          totalItemsCount={total_Page * NUMBER.page_limit}
          itemsCountPerPage={NUMBER.page_limit}
          pageRangeDisplayed={5}
          FirstLastPages
          onChange={(page) => action(page)}
        />
      </div>
    </>
  )
}
export default PaginationComponent
