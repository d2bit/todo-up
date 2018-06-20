import React from 'react'
import styled from 'react-emotion'
import { Redirect } from 'react-router-dom'

import Modal from './Modal'
import TodoForm from './TodoForm'

const Frame = styled('div')`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #111d;
`

class EditTodo extends React.Component {
  state = {
    shouldClose: false,
  }

  closeFn = () => {
    this.setState({ shouldClose: true })
  }

  render() {
    if (this.state.shouldClose) {
      return <Redirect to="/" />
    }
    const { id } = this.props.match.params

    return (
      <Modal>
        <Frame onClick={this.closeFn}>
          <TodoForm id={id} closeFn={this.closeFn} />
        </Frame>
      </Modal>
    )
  }
}

export default EditTodo
