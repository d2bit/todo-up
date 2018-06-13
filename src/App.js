import React from 'react'

import TodoCreator from './components/TodoCreator'
import TodoList from './components/TodoList'

class App extends React.PureComponent {
  render() {
    return (
      <div>
        <h1>Todo UP!</h1>

        <TodoCreator />
        <TodoList />
      </div>
    )
  }
}

export default App
