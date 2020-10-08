import './env';
import './passport';
import cors from 'cors';
import logger from 'morgan';
import schema from './schema';
import { GraphQLServer } from 'graphql-yoga';
import { authenticateJwt } from './passport';
import { isAuthenticated } from './middlewares';
import { uploadMiddleware, uploadController } from './upload';

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  // Share context with all resolvers
  context: ({ request }) => ({ request, isAuthenticated }),
});

// All http requests use belows
server.express.use(cors());
server.express.use(logger('dev'));
server.express.use(authenticateJwt);
server.express.post('/api/upload', uploadMiddleware, uploadController);

server.start({ port: PORT }, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
