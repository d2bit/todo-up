import React from 'react'
import styled from 'react-emotion'

import TodoCreator from './components/TodoCreator'
import TodoList from './components/TodoList'

const Frame = styled('div')`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  margin: 1rem auto;
  width: 90%;
  box-shadow: 2px 2px 10px;
  padding: 1rem 0;

  @media (min-width: 540px) {
    max-width: 500px;
  }
`
const Title = styled('h1')`
  padding: 0;
  margin: 0;
  margin-bottom: 1rem;
  color: #333;
`

class App extends React.PureComponent {
  render() {
    return (
      <Frame>
        <Title>Todo UP!</Title>

        <TodoCreator />
        <TodoList />
      </Frame>
    )
  }
}

export default App
