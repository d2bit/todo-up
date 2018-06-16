import React from 'react'
import { Query } from 'react-apollo'
import styled, { css } from 'react-emotion'

import * as GQL from '../graphql'
import TodoListItem from './TodoListItem'
import Spinner from '../views/Spinner'

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

        return (
          <Frame>
            {todos.map(todo => <TodoListItem key={todo.id} todo={todo} />)}
          </Frame>
        )
      }}
    </Query>
  )
}

export default TodoList
