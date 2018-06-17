import gql from 'graphql-tag'

// QUERIES
export const GET_TODOS = gql`
  query Todos {
    todos {
      id
      text
      done
      createdAt
    }
  }
`

export const GET_TODO = gql`
  query GetTodo($id: ID!) {
    todo(id: $id) {
      id
      text
      done
      createdAt
      updatedAt
    }
  }
`

// MUTATIONS
export const ADD_TODO = gql`
  mutation addTodo($input: AddTodoInput!) {
    todo: addTodo(input: $input) {
      id
      text
      done
      createdAt
    }
  }
`

export const TOGGLE_TODO_DONE = gql`
  mutation toggleTodoDone($id: ID!) {
    todo: toggleTodoDone(id: $id) {
      id
      text
      done
      createdAt
    }
  }
`
