import React from 'react'
import ReactDOM from 'react-dom'

import Todo from './Todo'

const modalElement = document.getElementById('modal')

class Modal extends React.Component {
  render() {
    return ReactDOM.createPortal(this.props.children, modalElement)
  }
}

export default Modal
