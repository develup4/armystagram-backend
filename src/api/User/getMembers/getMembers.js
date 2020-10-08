import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    getMembers: async (_, __) =>
      prisma.users({
        where: {
          isMember: true,
        },
      }),
  },
};
