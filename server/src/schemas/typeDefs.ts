import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Location {
    type: String!
    coordinates: [Float]!
  }

  type Request {
    id: ID!
    description: String!
    type: String!
    location: Location!
    urgency: String!
    status: String!
    user: User!
  }

  type Query {
    getRequests: [Request]!
    getUserProfile(id: ID!): User
  }

  type Mutation {
    addRequest(
      description: String!,
      type: String!,
      coordinates: [Float]!,
      urgency: String!,
      userId: ID!
    ): Request!
    addUser(
      username: String!,
      email: String!,
      password: String!
    ): User!
    login(email: String!, password: String!): String!
    updateUserProfile(id: ID!, username: String, email: String): User!
  }
`;

export { typeDefs };
