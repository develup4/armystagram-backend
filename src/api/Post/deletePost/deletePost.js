import { isAuthenticated } from '../../../middlewares';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    deletePost: async (_, args, { request }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      // const post = prisma.$exists.post({where:{id, user:user.id}});
      return prisma.deletePost({ where: { id } });
    },
  },
};
