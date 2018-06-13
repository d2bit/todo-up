import React from 'react'
import { Query } from 'react-apollo'

import * as GQL from '../graphql'
import Todo from './Todo'

function TodoList() {
  function cacheTodoElements(cache, collection) {
    collection.map(todo =>
      cache.writeQuery({
        query: GQL.GET_TODO,
        variables: { id: todo.id },
        data: { todo },
      })
    )
  }

  return (
    <Query query={GQL.GET_TODOS}>
      {({ loading, error, client, data: { todos } }) => {
        if (loading) {
          return <h2>Loading...</h2>
        }
        cacheTodoElements(client.cache, todos)

        return (
          <ul>
            {todos.map(todo => (
              <li key={todo.id}>
                <Todo id={todo.id} />
              </li>
            ))}
          </ul>
        )
      }}
    </Query>
  )
}

export default TodoList
