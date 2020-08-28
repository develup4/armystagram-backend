import { isAuthenticated } from '../../../middlewares';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    seeRooms: async (_, __, { request }) => {
      isAuthenticated(request);
      return prisma
        .rooms({
          where: {
            participants_some: {
              id: user.id,
            },
          },
        })
        .$fragment(ROOM_FRAGMENT);
    },
  },
};
