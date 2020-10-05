import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    seeAllPosts: async (_, __) => {
      console.log('QUERY seeAllPosts');
      return prisma.posts({
        orderBy: 'createdAt_DESC',
      });
    },
  },
};

// TODO : load (start ~ end)
