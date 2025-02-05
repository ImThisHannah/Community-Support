import { gql } from 'apollo-server';

interface Request {
  id: number;
  request: string;
}

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

const requests: Request[] = [
  { id: 1, request: 'Help with groceries' },
  { id: 2, request: 'Volunteer for tutoring' },
];

export const resolvers = {
  Query: {
    getRequests: (): Request[] => requests,
  },
  Mutation: {
    addRequest: (parent: any, { request }: { request: string }): Request => {
      const newRequest = { id: requests.length + 1, request };
      requests.push(newRequest);
      return newRequest;
    },
  },
};
