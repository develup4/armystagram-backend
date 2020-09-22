import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    seeAllFeeds: async (_, __) => {
      return prisma.posts({
        orderBy: 'createdAt_DESC',
      });
    },
  },
};
