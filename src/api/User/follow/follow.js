import { isAuthenticated } from '../../../middlewares';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    follow: async (_, args, { request }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      try {
        await prisma.updateUser({
          where: {
            id: user.id, // 요청하는 id는 request에서 찾고
          },
          data: {
            following: { connect: { id } }, // 이건 args로 받은 follow할 id
          },
        });
        return true;
      } catch {
        return false;
      }
    },
  },
};
