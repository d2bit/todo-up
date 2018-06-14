import React from 'react'
import { Query } from 'react-apollo'
import styled from 'react-emotion'

import * as GQL from '../graphql'
import Todo from './Todo'

const Frame = styled('div')`
  display: flex;
  flex-flow: row wrap;
  align-items: left;
  margin: 1rem 1rem 0;
`

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
          <Frame>
            {todos.map(todo => <Todo key={todo.id} id={todo.id} />)}
          </Frame>
        )
      }}
    </Query>
  )
}

export default TodoList
