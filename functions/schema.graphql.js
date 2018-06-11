module.exports = `
  scalar Date

  type User {
    id: ID!
    email: String!
    username: String!
    todos: [Todo]!
  }
  input AddUserInput {
    email: String!
    username: String!
  }

  type Todo {
    id: ID!
    text: String!
    done: Boolean!
    user: User!
    created_at: Date!
    updated_at: Date!
  }
  input AddTodoInput {
    text: String!
    userId: ID!
  }
  input MarkTodoDoneInput {
    id: ID!
  }

  type Query {
    users: [User]!
    user(id: ID!): User!
    todos: [Todo]!
    todo: Todo!
  }

  type Mutation {
    addUser(input: AddUserInput!): User
    addTodo(input: AddTodoInput!): Todo
    markTodoDone(input: MarkTodoDoneInput!): Todo
  }
`
