import { gql } from 'apollo-server';
import { IResolvers } from 'graphql-tools';

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

interface Request {
  id: number;
  request: string;
}

const requests: Request[] = [
  { id: 1, request: 'Help with groceries' },
  { id: 2, request: 'Volunteer for tutoring' },
];

export const resolvers: IResolvers = {
  Query: {
    getRequests: (): Request[] => requests,
  },
  Mutation: {
    addRequest: (parent: any, { request }: { request: string }): Request => {
      const newRequest: Request = { id: requests.length + 1, request };
      requests.push(newRequest);
      return newRequest;
    },
  },
};
