import { isAuthenticated } from '../../../middlewares';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    deletePost: async (_, args, { request }) => {
      isAuthenticated(request);
      const { id } = args;
      return prisma.deletePost({ where: { id } });
    },
  },
};
