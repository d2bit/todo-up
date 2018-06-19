module.exports = `
  scalar Date

  type User {
    id: ID!
    email: String!
    username: String!
    createdAt: Date
    todos: [Todo]!
  }
  input AddUserInput {
    email: String!
    username: String!
  }

  type Todo {
    id: ID!
    text: String!
    description: String
    done: Boolean!
    doneAt: Date
    deleted: Boolean!
    deletedAt: Date
    createdAt: Date
    updatedAt: Date
    user: User!
  }
  input AddTodoInput {
    text: String!
    userId: ID!
  }
  input UpdateTodoInput {
    id: ID!
    text: String
    description: String
    done: Boolean
  }

  type Query {
    users: [User]!
    user(id: ID!): User!
    todos: [Todo]!
    todo(id: ID!): Todo!
  }

  type Mutation {
    addUser(input: AddUserInput!): User
    addTodo(input: AddTodoInput!): Todo
    toggleTodoDone(id: ID!): Todo
    markTodoDone(id: ID!): Todo
    updateTodo(input: UpdateTodoInput!): Todo
    deleteTodo(id: ID!): Todo
  }
`
