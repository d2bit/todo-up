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
    done: Boolean!
    user: User!
    createdAt: Date
    updatedAt: Date
  }
  input AddTodoInput {
    text: String!
    userId: ID!
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
    markTodoDone(id: ID!): Todo
  }
`
