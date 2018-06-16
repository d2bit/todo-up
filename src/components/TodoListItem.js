import React from 'react'
import { Query, Mutation } from 'react-apollo'

import * as GQL from '../graphql'
import { formatDate } from '../utils'
import View from '../views/TodoListItem'

function TodoListItem({ todo }) {
  return (
    <Mutation
      mutation={GQL.TOGGLE_TODO_DONE}
      update={(cache, { data: { todo } }) => {
        const { todos } = cache.readQuery({ query: GQL.GET_TODOS })
        const updatedTodos = todos.map(cachedTodo => {
          if (cachedTodo.id === todo.id) {
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
      {toggleTodoDone => {
        const toggleFn = event => {
          event.preventDefault && event.preventDefault()
          const todoClone = Object.assign({}, todo)
          toggleTodoDone({
            variables: { id: todo.id },
            optimisticResponse: {
              __typename: 'Mutation',
              todo: Object.assign(todoClone, {
                done: !todo.done,
                text: todo.text,
                createdAt: new Date(),
              }),
            },
          })
        }
        return (
          <View
            id={todo.id}
            text={todo.text}
            done={todo.done}
            createdAt={todo.createdAt}
            toggleFn={toggleFn}
          />
        )
      }}
    </Mutation>
  )
}

export default TodoListItem
