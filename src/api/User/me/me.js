import { isAuthenticated } from '../../../middlewares';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    me: async (_, __, { request }) => {
      // args가 필요없는 쿼리라서 더블언더스코어로 그냥 처리했다
      isAuthenticated(request);
      const { user } = request;
      const userProfile = await prisma.user({ id: user.id });
      const posts = await prisma.user({ id: user.id }).posts();

      return { user: userProfile, posts };
    },
  },
};
