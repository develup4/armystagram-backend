import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    seeAllMemberFeeds: async (_, __) => {
      return prisma.posts({
        where: { user: { isMember: true } },
        orderBy: 'createdAt_DESC',
      });
    },
  },
};

// TODO : load (start ~ end)
