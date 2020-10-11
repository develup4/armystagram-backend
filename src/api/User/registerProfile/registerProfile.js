import { isAuthenticated } from '../../../middlewares';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    registerProfile: async (_, args, { request }) => {
      isAuthenticated(request);
      const { url } = args;
      const { user } = request;
      console.log(`Register profile picture => ${url}`);

      try {
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            profile: url,
          },
        });
        return true;
      } catch {
        return false;
      }
    },
  },
};
