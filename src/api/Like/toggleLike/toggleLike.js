import { isAuthenticated } from '../../../middlewares';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    toggleLike: async (_, args, { request }) => {
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
        const existingLike = await prisma.$exists.like(filterOptions);
        if (existingLike) {
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

        // Update likeCount
        const likeCount = await prisma
          .likesConnection({
            where: { post: { id: postId } },
          })
          .aggregate()
          .count();
        await prisma.updatePost({ data: { likeCount }, where: { id: postId } });

        console.log(
          `MUTATION toggleLike [${
            user.username
          } changed to ${!existingLike}, likeCount ${likeCount}]`
        );
        return true;
      } catch {
        return false;
      }
    },
  },
};
