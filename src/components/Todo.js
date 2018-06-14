import React from 'react'
import { Query, Mutation } from 'react-apollo'
import styled from 'react-emotion'

import * as GQL from '../graphql'
import { formatDate } from '../utils'

const Frame = styled('div')`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  flex-basis: 100%;
  margin: 0.3rem;
`
const Checkbox = styled('div')`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 1px solid #555;
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
const Title = styled('span')`
  line-height: 1rem;
  font-size: 1.1rem;
  color: #333;
  margin: 0.3rem;
`
const Subtitle = styled('span')`
  font-size: 0.7rem;
  margin: 0.3rem;
  color: rgb(100, 150, 200);
  align-self: flex-end;
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
              <Frame>
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
                          text: todo.text,
                          createdAt: new Date(),
                        }),
                      },
                    })
                  }}
                />
                <Title>{todo.text}</Title>
                <Subtitle>{formatDate(todo.createdAt)}</Subtitle>
              </Frame>
            )}
          </Mutation>
        )
      }}
    </Query>
  )
}

export default Todo
