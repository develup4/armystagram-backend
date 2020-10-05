import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    seeMemberPosts: async (_, args) => {
      console.log(`QUERY seeMemberPosts [username : ${args.username}]`);
      if (args.username === 'BTS') {
        return await prisma.posts({
          where: { user: { isMember: true } },
          orderBy: 'createdAt_DESC',
        });
      } else {
        return await prisma.posts({
          where: {
            AND: [
              { user: { username: args.username } },
              { user: { isMember: true } },
            ],
          },
          orderBy: 'createdAt_DESC',
        });
      }
    },
  },
};
