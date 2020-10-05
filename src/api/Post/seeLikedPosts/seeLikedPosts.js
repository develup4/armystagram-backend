import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    seeLikedPosts: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      console.log(`QUERY seeLikedPosts [username : ${user.username}]`);

      return await prisma.posts({
        where: {
          likes_some: {
            user: { id: user.id },
          },
        },
        orderBy: 'createdAt_DESC',
      });
    },
  },
};
