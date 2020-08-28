import { isAuthenticated } from '../../../middlewares';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    editPost: async (_, args, { request }) => {
      isAuthenticated(request);
      const { id, caption, location } = args;
      const { user } = request;

      const post = prisma.$exists.post({
        where: { id, user: user.id },
        data: { caption, location },
      });

      if (post) {
        return prisma.updatePost({
          where: { id },
          data: { caption, location },
        });
      } else {
        throw Error("You can't do that");
      }
    },
  },
};
