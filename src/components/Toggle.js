import React from 'react'
import styled from 'react-emotion'

const ToggleFrame = styled('div')`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 3.5rem;
  height: 2rem;
  border: 1px solid #495057;
  border-radius: 4rem;
  justify-content: ${props => (props.checked ? 'flex-end' : 'flex-start')};
  background-color: ${props => (props.checked ? '#37b24d' : '#fa5252')};
  overflow: hidden;
`
const ToggleSwitch = styled('div')`
  width: 1.8rem;
  height: 1.8rem;
  border: 1px solid #495057;
  border-radius: 50%;
  background-color: #868e96;
  box-shadow: ${props => (props.checked ? '-1px 1px 5px' : '1px 1px 5px')};
`

class Toggle extends React.PureComponent {
  state = {
    checked: this.props.checked,
  }
  checkboxRef = this.props.innerRef || React.createRef()

  handleClick = event => {
    event.preventDefault()
    if (event.target === this.checkboxRef.current) {
      return
    }
    this.setState(({ checked }) => {
      this.checkboxRef.current.checked = !checked
      return { checked: !checked }
    })
  }

  render() {
    return (
      <ToggleFrame onClick={this.handleClick} checked={this.state.checked}>
        <ToggleSwitch checked={this.state.checked} />
        <input
          hidden
          ref={this.checkboxRef}
          type="checkbox"
          defaultChecked={this.state.checked}
        />
      </ToggleFrame>
    )
  }
}

export default Toggle
