import { isAuthenticated } from '../../../middlewares';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    registerMostLike: async (_, args, { request }) => {
      isAuthenticated(request);
      const { mostLike } = args;
      const { user } = request;
      console.log(`Register most like member => ${mostLike}`);

      try {
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            mostLike,
          },
        });
        return true;
      } catch {
        return false;
      }
    },
  },
};
