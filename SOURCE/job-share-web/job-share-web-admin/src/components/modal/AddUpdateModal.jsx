import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { STRING } from '@constants/Constant'

const AddUpdateModal = ({ isOpen, title, action, onHide, modalField }) => {
  return (
    <Modal
      show={isOpen}
      onHide={onHide}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
      centered
    >
      <Modal.Header closeButton style={{ backgroundColor: 'rgb(68, 87, 128)' }}>
        <h5 className="text-white">{title}</h5>
      </Modal.Header>
      <Modal.Body className="custom-body px-5">
        {modalField}
        <div className="mt-3 text-center">
          <Button onClick={onHide} variant="primary">
            {STRING.exit}
          </Button>
          <Button onClick={action} variant="success">
            {STRING.save}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}
export default AddUpdateModal
