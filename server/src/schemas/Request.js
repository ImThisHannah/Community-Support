// /schemas/request.js
import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Request {
    id: Int
    request: String
  }

  extend type Query {
    getRequests: [Request]
  }

  extend type Mutation {
    addRequest(request: String!): Request
  }
`;

const requests = [
  { id: 1, request: 'Help with groceries' },
  { id: 2, request: 'Volunteer for tutoring' },
];

export const resolvers = {
  Query: {
    getRequests: () => requests,
  },
  Mutation: {
    addRequest: (parent, { request }) => {
      const newRequest = { id: requests.length + 1, request };
      requests.push(newRequest);
      return newRequest;
    },
  },
};
