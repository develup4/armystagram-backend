import { isAuthenticated } from '../../../middlewares';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    seeFeed: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const following = await prisma
        .user({ where: { id: user.id } })
        .following();

      return await prisma.posts({
        where: {
          user: {
            id_in: [...following.map((user) => user.id), user.id], // followin과 내 포스트들
          },
        },
        orderBy: 'location_DESC',
      });
    },
  },
};
