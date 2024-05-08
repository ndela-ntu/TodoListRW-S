export const schema = gql`
  type Todo {
    id: Int!
    name: String!
    description: String!
    isComplete: Boolean!
    createdAt: DateTime!
  }

  type Query {
    todos: [Todo!]! @requireAuth
    todo(id: Int!): Todo @requireAuth
  }

  input CreateTodoInput {
    name: String!
    description: String!
    isComplete: Boolean!
  }

  input UpdateTodoInput {
    name: String
    description: String
    isComplete: Boolean
  }

  type Mutation {
    createTodo(input: CreateTodoInput!): Todo! @requireAuth
    updateTodo(id: Int!, input: UpdateTodoInput!): Todo! @requireAuth
    deleteTodo(id: Int!): Todo! @requireAuth
  }
`
