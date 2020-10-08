import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    editPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, caption } = args;
      const { user } = request;

      const post = await prisma.$exists.post({ id, user: { id: user.id } });
      if (post) {
        return prisma.updatePost({
          data: { caption, location },
          where: { id },
        });
      } else {
        throw Error('Temporary error!');
      }
    },
  },
};
