import React from 'react'
import styled from 'react-emotion'

import Modal from './Modal'
import Todo from './Todo'

const Frame = styled('div')`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #111d;
`

class EditTodo extends React.Component {
  render() {
    return (
      <Modal>
        <Frame>
          <Todo />
        </Frame>
      </Modal>
    )
  }
}

export default EditTodo
