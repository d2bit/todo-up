import React from 'react'
import { Mutation } from 'react-apollo'
import styled from 'react-emotion'

import * as GQL from '../graphql'

const Frame = styled('div')`
  flex-basis: 100%;
  margin: 0.3rem;
  box-shadow: 3px 3px 5px #ccc;

  @media (min-width: 540px) {
    flex-basis: 80%;
    margin: 0.3rem auto;
  }
`
const Form = styled('form')`
  display: flex;
  flex-flow: row nowrap;
`
const Input = styled('input')`
  font-size: 1.2rem;
  color: #555;
  border: 1px solid #ccc;
  padding: 0.2rem;
  flex-grow: 1;
  width: 100px;
`
const Button = styled('button')`
  font-size: 1.2rem;
  color: #333;
  background-color: #eee;
  border: 1px solid #ccc;
  padding: 0.2rem 1rem;
`

function TodoCreator() {
  return (
    <Mutation
      mutation={GQL.ADD_TODO}
      update={(cache, { data: { todo } }) => {
        const { todos } = cache.readQuery({ query: GQL.GET_TODOS })
        cache.writeQuery({
          query: GQL.GET_TODOS,
          data: { todos: todos.concat([todo]) },
        })
        cache.writeQuery({
          query: GQL.GET_TODO,
          variables: { id: todo.id },
          data: { todo: todo },
        })
      }}
    >
      {addTodo => {
        function handleSubmit(evt) {
          evt.preventDefault()
          const userId = '8BGVuT9gIpTxkh3roBn5'
          const textInput = evt.target.children.text
          const text = textInput.value.trim()
          const isEmptyText = !text
          if (isEmptyText) {
            return false
          }

          textInput.value = ''
          addTodo({
            variables: { input: { text, userId } },
            optimisticResponse: {
              __typename: 'Mutation',
              todo: {
                __typename: 'Todo',
                id: Math.floor(Math.random() * 100000),
                done: false,
                text,
                createdAt: new Date(),
              },
            },
          }).catch(() => (textInput.value = text))
        }
        return (
          <Frame>
            <Form onSubmit={handleSubmit}>
              <Input name="text" />
              <Button type="submit">Add</Button>
            </Form>
          </Frame>
        )
      }}
    </Mutation>
  )
}

export default TodoCreator
