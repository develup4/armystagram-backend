import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    searchPost: async (_, args) => {
      `QUERY searchPost [term: ${args.term}]`;
      return prisma.posts({
        where: {
          OR: [
            { caption_contains: args.term },
            { hashtags_some: { where: { text: args.term } } },
          ],
        },
      });
    },
  },
};
