import { isAuthenticated } from '../../../middlewares';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: async (_, args, { request }) => {
    isAuthenticated(request);

    const { postId } = args;
    const { user } = request;

    const filterOptions = {
      AND: [
        {
          user: {
            id: user.id,
          },
        },
        {
          post: {
            id: postId,
          },
        },
      ],
    };
    try {
      const existLike = await prisma.$exists.like(filterOptions);
      if (existLike) {
        // like의 unique는 id밖에 없는데 여기서 알수없으니 Many에서 조건으로 찾는다
        await prisma.deleteManyLikes(filterOptions);
      } else {
        await prisma.createLike({
          user: {
            connect: {
              id: user.id,
            },
          },
          post: {
            connect: {
              id: postId,
            },
          },
        });
      }
      return true;
    } catch {
      return false;
    }
  },
};
