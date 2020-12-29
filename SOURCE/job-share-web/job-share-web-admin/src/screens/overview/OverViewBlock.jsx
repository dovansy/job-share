import React from 'react'
import { Col } from 'react-bootstrap'
import './OverView.css'

const OverViewBlock = ({ style, title, data, iconLabel }) => {
  return (
    <div className="overview--recruitment mx-4 px-4">
      <div className="mx-4 overview--div__text">
        <i className={iconLabel}></i>
        <span className="overview--text pl-1">{title}</span>
      </div>
      <div className="row overview--responsive pb-4">
        {style?.map((item, index) => (
          <div
            key={index}
            className="pl-3 pt-3 pr-4 overview--responsive__box"
            style={{
              borderLeft: `4px solid ${item.color}`,
              color: `${item.color}`,
            }}
          >
            <Col sm={9} className="ml-1">
              <p className="txt-title">{item.label}</p>
              <p className="txt--title__value ml-4">{data[index].value || 0}</p>
            </Col>
            <Col>
              <p className="mt-2"></p>
              <i style={{ color: '#DCE0EB', fontSize: 40 }} className={item.icon} />
            </Col>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OverViewBlock
