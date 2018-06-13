import React from 'react'
import { Mutation } from 'react-apollo'

import * as GQL from '../graphql'

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
          const text = textInput.value
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
          <form onSubmit={handleSubmit}>
            <input name="text" />
            <input type="submit" value="Add" />
          </form>
        )
      }}
    </Mutation>
  )
}

export default TodoCreator
