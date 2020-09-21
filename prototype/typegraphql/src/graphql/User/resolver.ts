import 'reflect-metadata';
import { Resolver, Query } from 'type-graphql';
import { PrismaClient } from '@prisma/client';
import { User } from '../../../prisma/generated/type-graphql';

const prisma = new PrismaClient();

@Resolver()
export class UserResolver {
  @Query(() => [User])
  public seeAllUsers() {
    return prisma.user.findMany();
  }
}

export default UserResolver;
