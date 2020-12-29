import React, { PureComponent } from 'react'
import { Input, FormFeedback } from 'reactstrap'
import { Row, Col, FormControl, Button, Modal } from 'react-bootstrap'
import { checkValidationError, checkValidationValue } from '@src/utils/checkValidateError'
import { STRING, TYPE_INPUT } from '@constants/Constant'

class ModalComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }
  renderField = (item) => {
    switch (item.type) {
      case TYPE_INPUT.select:
        return (
          <Row>
            <Col className="modal-field" sm={4}>
              <span>{item.titleName}</span>
            </Col>
            <Col sm={8}>
              <FormControl
                as="select"
                aria-describedby="basic-addon1"
                value={item.value}
                // onChange={(e) => this.handleChange('status', e.target.value)}
              >
                <option value="" defaultValue>
                  {STRING.status}
                </option>
                <option value="active">active</option>
                <option value="inActive">inActive</option>
              </FormControl>
            </Col>
          </Row>
        )
      case TYPE_INPUT.number:
        return (
          <Row>
            <Col className="modal-field" sm={4}>
              <p>
                {item.titleName}(<span style={{ color: 'red' }}>*</span>)
              </p>
            </Col>
            <Col sm={8}>
              <Input
                type="number"
                // disabled={isEditable}
                // aria-describedby="basic-addon1"
                placeholder={`${item.titleName}`}
                onChange={(e) => {
                  this.props.handleInputModal(item.valueName, e.target.value)
                }}
                invalid={item.error}
                value={item.value}
                onBlur={() => this.props.handleBlur(item.valueName, item.titleName)}
              />
              {item.error && <FormFeedback>{item.error}</FormFeedback>}
            </Col>
          </Row>
        )
      case TYPE_INPUT.radio:
        return (
          <Row>
            <Col className="modal-field" sm={4}>
              <p>
                {item.titleName}(<span style={{ color: 'red' }}>*</span>)
              </p>
            </Col>
            <Col sm={8}>
              <Input
                type="number"
                // disabled={isEditable}
                // aria-describedby="basic-addon1"
                placeholder={`${item.titleName}`}
                onChange={(e) => {
                  this.props.handleInputModal(item.valueName, e.target.value)
                }}
                invalid={item.error}
                value={item.value}
                onBlur={() => this.props.handleBlur(item.valueName, item.titleName)}
              />
              {item.error && <FormFeedback>{item.error}</FormFeedback>}
            </Col>
          </Row>
        )
      default:
        return (
          <Row>
            <Col className="modal-field" sm={4}>
              <p>
                {item.titleName}(<span style={{ color: 'red' }}>*</span>)
              </p>
            </Col>
            <Col sm={8}>
              <Input
                type="text"
                className="mb-0"
                // disabled={isEditable}
                placeholder={`${item.titleName}`}
                value={item.value}
                invalid={item.error ? true : false}
                onChange={(e) => {
                  this.props.handleInputModal(item.valueName, e.target.value)
                }}
                onBlur={() => this.props.handleBlur(item.valueName, item.titleName)}
              />
              {item.error && <FormFeedback>{item.error}</FormFeedback>}
            </Col>
          </Row>
        )
    }
  }

  render() {
    return (
      <Modal
        show={this.props.isOpen}
        onHide={this.props.onHide}
        size="md"
        dialogClassName="modal-100w"
        aria-labelledby="example-custom-modal-styling-title"
        centered
      >
        <Modal.Header closeButton style={{ backgroundColor: 'rgb(68, 87, 128)' }}>
          <h5 style={{ color: 'white' }}>{this.props.title}</h5>
        </Modal.Header>
        <Modal.Body className="custom-body">
          {this.props.allField?.map((item) => this.renderField(item))}
          <div className="col-12" style={{ textAlign: 'center' }}>
            <Button variant="primary" onClick={this.props.onHide}>
              {STRING.exit}
            </Button>
            <Button
              variant="success"
              onClick={this.props.addUpdateAccount}
              disabled={
                checkValidationError(this.props.checkValidateError) ||
                checkValidationValue(this.props.checkValidateValue)
              }
            >
              {STRING.save}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

export default ModalComponent
