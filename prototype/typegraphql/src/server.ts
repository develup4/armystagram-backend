import './environment/.env';
import 'reflect-metadata';
import mergedSchema from './graphql/schema';
import { GraphQLServer } from 'graphql-yoga';
import { GraphQLSchema } from 'graphql';
import { PrismaClient } from '@prisma/client';

class Server {
  private gqlServer: GraphQLServer;
  private port: number | string;

  constructor(schema: GraphQLSchema) {
    const prisma = new PrismaClient();
    this.gqlServer = new GraphQLServer({
      schema,
      context: req => ({
        ...req,
        prisma,
      }),
    });

    this.port = process.env.PORT || 4000;
  }

  public start() {
    this.gqlServer.start({ port: this.port }, () =>
      console.log(`Server running on port ${this.port}`),
    );
  }
}

const server: Server = new Server(mergedSchema);
server.start();
