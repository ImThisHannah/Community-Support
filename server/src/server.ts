import express, { Request, Response } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { authenticateToken } from './services/auth-service.js';
import { typeDefs } from './schemas/typeDefs.js';
import { resolvers } from './schemas/resolvers.js';
import volunteerRoutes from './Routes/volunteerRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/connection.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async (): Promise<void> => {
  await server.start();
  await connectDB();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use('/api/volunteers', volunteerRoutes);
  app.use('/api/volunteers/:id', volunteerRoutes);

  app.use('/graphql', expressMiddleware(server as any, {
    // context: ({ req }: { req: Request }) => {
    //   return authenticateToken({ req });
    // },
    context: authenticateToken as any,
  }));

  if (process.env.NODE_ENV === 'dev') {
    app.use(express.static(path.join(__dirname, '../../client/dist')));

    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();
