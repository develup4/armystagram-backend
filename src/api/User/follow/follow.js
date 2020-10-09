import { isAuthenticated } from '../../../middlewares';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    follow: async (_, args, { request }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      console.log(`follow from ${user.username} to ${id}`);

      if (user.id === id) {
        console.log("Can't follow me");
        return false;
      }

      try {
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            following: {
              connect: {
                id,
              },
            },
          },
        });
        return true;
      } catch {
        return false;
      }
    },
  },
};
