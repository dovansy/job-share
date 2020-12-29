import React from 'react'
import { Col, Button, Modal } from 'react-bootstrap'
import { STRING } from '@constants/Constant'

const ConfirmModal = ({ isOpen, title, action, onHide }) => {
  return (
    <Modal
      show={isOpen}
      onHide={onHide}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
      centered
    >
      <Modal.Header closeButton style={{ backgroundColor: 'rgb(68, 87, 128)' }}>
        <h5 className="text-white">Bạn chắc chắn muốn {title} ?</h5>
      </Modal.Header>
      <Modal.Body className="custom-body">
        <div className="text-center">
          <Col>
            <Button variant="primary" onClick={onHide}>
              {STRING.exit}
            </Button>
            <Button variant="success" onClick={action}>
              {STRING.save}
            </Button>
          </Col>
        </div>
      </Modal.Body>
    </Modal>
  )
}
export default ConfirmModal
