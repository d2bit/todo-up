import React from 'react'
import { Query, Mutation } from 'react-apollo'

import * as GQL from '../graphql'

function Todo({ id }) {
  return (
    <Query query={GQL.GET_TODO} variables={{ id }}>
      {({ loading, error, data: { todo } }) => {
        if (loading) {
          return <h2>Loading...</h2>
        }
        if (error) {
          return <pre>{JSON.stringify(error)}</pre>
        }

        return (
          <div>
            <Mutation
              mutation={GQL.TOGGLE_TODO_DONE}
              update={(cache, { data: { todo } }) => {
                const { todos } = cache.readQuery({ query: GQL.GET_TODOS })
                const updatedTodos = todos.map(cachedTodo => {
                  if (cachedTodo.id === id) {
                    return todo
                  }
                  return cachedTodo
                })
                cache.writeQuery({
                  query: GQL.GET_TODOS,
                  data: { todos: updatedTodos },
                })
                cache.writeQuery({
                  query: GQL.GET_TODO,
                  variables: { id },
                  data: { todo: todo },
                })
              }}
            >
              {toggleTodoDone => (
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={event => {
                    event.preventDefault()
                    const todoClone = Object.assign({}, todo)
                    toggleTodoDone({
                      variables: { id },
                    })
                  }}
                />
              )}
            </Mutation>
            <span>{todo.text}</span>
          </div>
        )
      }}
    </Query>
  )
}

export default Todo
