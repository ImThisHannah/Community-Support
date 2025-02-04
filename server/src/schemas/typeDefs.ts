import { gql } from 'apollo-server-express';

const typeDefs = gql

  type User {
    _id: String!
    username: String!
    email: String!
  }

  type Request {
    id: Int!
    request: String!
    user: User!
  }

  type Query {
    getRequests: [Request]
    getUserProfile: User
  }

  type Mutation {
    addRequest(request: String!): Request
    updateUserProfile(username: String, email: String): User
  }
;

export { typeDefs };
