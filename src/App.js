import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'react-emotion'

import EditTodo from './components/EditTodo'
import TodoCreator from './components/TodoCreator'
import TodoList from './components/TodoList'

const Frame = styled('div')`
  display: flex;
  flex-flow: row wrap;
  margin: 1rem auto;
  justify-content: center;
  align-content: start;
  width: 90%;
  box-shadow: 2px 2px 10px;
  padding: 1rem 0;
  min-height: 500px;

  @media (min-width: 540px) {
    max-width: 500px;
    min-height: 800px;
  }
`
const Title = styled('h1')`
  padding: 0;
  margin: 0 auto 1rem;
  color: #333;
`

const App = () => {
  return (
    <Frame>
      <Title>Todo UP!</Title>

      <Route path="/todos/:id" component={EditTodo} />
      <Route component={TodoCreator} />
      <Route component={TodoList} />
    </Frame>
  )
}

export default App
