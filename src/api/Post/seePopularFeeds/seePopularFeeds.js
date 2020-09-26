import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    seePopularFeeds: async (_, __) => {
      // return prisma
      // .likesConnection({
      //   where: { post: { id: parent.id } },
      // })
      // .aggregate()
      // .count(),
      // todo : LIKECOUNT를 차라리 만들어서 소트기능을 제공받자
    },
  },
};

// TODO : load (start ~ end)
