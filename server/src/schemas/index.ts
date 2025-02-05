import { DocumentNode } from 'graphql';
import { IResolvers } from '@graphql-tools/utils';
import { typeDefs as requestTypeDefs, resolvers as requestResolvers } from './Request.js';

export const typeDefs: DocumentNode[] = [requestTypeDefs];
export const resolvers: IResolvers[] = [requestResolvers];
