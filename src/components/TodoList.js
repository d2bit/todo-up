import React from 'react'
import { Query } from 'react-apollo'
import styled, { css } from 'react-emotion'

import * as GQL from '../graphql'
import Todo from './Todo'
import Spinner from './Spinner'

const Frame = styled('div')`
  max-width: 100%;
  display: flex;
  flex-flow: row wrap;
  margin: 1rem 1rem 0;
`
const spinnerCSS = css`
  margin-top: 2rem;
  width: 50%;
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
          return (
            <Spinner
              className={css`
                ${spinnerCSS};
              `}
            />
          )
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
