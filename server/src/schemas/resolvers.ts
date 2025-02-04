import { BaseContext } from '../services/auth-service'; 
import { AuthenticationError } from '../services/auth-service'; 

const resolvers = {
  Query: {
    getUserProfile: (_parent: any, _args: any, context: BaseContext) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to view this resource');
      }
      return context.user;
    },

    getRequests: (_parent: any, _args: any, context: BaseContext) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to view requests');
      }
      return [{ id: 1, request: 'Need help with groceries' }]; 
    },
  },

  Mutation: {
    addRequest: (_parent: any, { request }: { request: string }, context: BaseContext) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to add a request');
      }
      const newRequest = { id: 2, request };
      return newRequest; 
    },
  },
};

export { resolvers };
