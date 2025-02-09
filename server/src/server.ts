import express, { Request, Response } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { authenticateToken } from './services/auth-service.js';
import { typeDefs } from './schemas/typeDefs.js';
import { resolvers } from './schemas/resolvers.js';
import db from './config/connection.js';
import volunteerRoutes from './Routes/volunteerRoutes.js';
import path from 'path';

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async (): Promise<void> => {
  await server.start();
  await db;

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use('/api/volunteers', volunteerRoutes);

  app.use('/graphql', expressMiddleware(server as any, {
    // context: ({ req }: { req: Request }) => {
    //   return authenticateToken({ req });
    // },
    context: authenticateToken as any,
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve('../client/dist')));
  
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve('../client/dist/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();
