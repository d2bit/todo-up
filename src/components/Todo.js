import React from 'react'
import { Query, Mutation } from 'react-apollo'
import styled, { css } from 'react-emotion'

import * as GQL from '../graphql'
import { formatDate } from '../utils'

const Frame = styled('div')`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  background-color: #ccc;
`
const Element = styled('div')`
  display: flex;
  flex-basis: 90%;
  flex-flow: row nowrap;
`
const Controls = styled('div')``
const Checkbox = styled('div')`
  display: inline-block;
  flex-shrink: 0;
  align-self: center;
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
  flex-grow: 1;
`
const Subtitle = styled('span')`
  font-size: 0.7rem;
  margin: 0.3rem;
  color: rgb(100, 150, 200);
  align-self: flex-end;
`

function Todo({ id = '24GoSyc0K0zltl3ImDrd' }) {
  console.log('id', id)
  return (
    <Query query={GQL.GET_TODO} variables={{ id }}>
      {({ loading, error, data: { todo } }) => {
        if (loading) {
          return <h2>Loading...</h2>
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
            }}
          >
            {toggleTodoDone => (
              <Frame>
                <Element>
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
                            // description: todo.description,
                            createdAt: todo.createdAt,
                            updatedAt: new Date(),
                          }),
                        },
                      })
                    }}
                  />
                  <Title>Title</Title>
                  <Subtitle>{todo.text}</Subtitle>
                  <Title>Created at</Title>
                  <Subtitle>{formatDate(todo.createdAt)}</Subtitle>
                </Element>
              </Frame>
            )}
          </Mutation>
        )
      }}
    </Query>
  )
}

export default Todo
