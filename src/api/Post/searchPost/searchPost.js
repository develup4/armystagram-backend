import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    searchPost: async (_, args) => {
      console.log(`QUERY searchPost [term: ${args.term}]`);
      // TODO : Case sensitive..If needed, database have to store lowercase string
      // TODO : Korean search...

      return prisma.posts({
        where: {
          OR: [
            { caption_contains: args.term },
            { hashtags_some: { text: `#${args.term}` }},
          ],
        },
      });
    },
  },
};
