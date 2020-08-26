import './env';
import { GraphQLServer } from 'graphql-yoga';
import { authenticateJwt } from './passport';
import logger from 'morgan';
import schema from './schema';

const PORT = process.env.PORT || 4000;
const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request }), // resolver에 데이터를 공유할 수 있다(_, args, {여기})
});

// 서버에 전달되는 모든 request마다 아래가 쓰이게 된다.
server.express.use(logger('dev'));
server.express.use(authenticateJwt);

server.start({ port: PORT }, () =>
  console.log(`Server running on port ${PORT}`)
);
