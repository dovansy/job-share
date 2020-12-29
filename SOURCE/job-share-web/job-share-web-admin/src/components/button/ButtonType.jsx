import React from 'react'
import { Button } from 'react-bootstrap'
import './Button.css'

const ButtonType = ({ typeButton, action }) => {
  return (
    <Button variant={typeButton.variant} onClick={action}>
      {typeButton.label}
    </Button>
  )
}

export default ButtonType
