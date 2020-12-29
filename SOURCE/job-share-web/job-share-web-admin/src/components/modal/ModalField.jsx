import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Input } from 'reactstrap'
const ModalField = ({ label, placeholder, type, value, onChange }) => {
  return (
    <Row>
      <Col className="align-items-center" sm={4} style={{ marginTop: 6 }}>
        {label}
      </Col>
      <Col>
        <Input type={type} placeholder={placeholder} value={value} onChange={onChange} />
      </Col>
    </Row>
  )
}
export default ModalField
