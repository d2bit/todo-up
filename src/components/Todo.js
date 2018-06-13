import React from 'react'
import { Query, Mutation } from 'react-apollo'
import styled from 'react-emotion'

import * as GQL from '../graphql'

const Checkbox = styled('div')`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 1px solid black;
  margin-right: 0.3rem;
  ::before {
    ${props =>
      props.checked
        ? `
        content: '\\2714';
        font-weight: bold;
        color: green;
        margin: auto;
      `
        : ''};
  }
`

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
                <Checkbox
                  checked={todo.done}
                  onClick={event => {
                    event.preventDefault()
                    const todoClone = Object.assign({}, todo)
                    toggleTodoDone({
                      variables: { id },
                      optimisticResponse: {
                        __typename: 'Mutation',
                        todo: Object.assign(todoClone, {
                          done: !todo.done,
                          text: todo.text + '...',
                          createdAt: new Date(),
                        }),
                      },
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
