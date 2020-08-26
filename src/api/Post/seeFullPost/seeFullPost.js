import { prisma } from '../../../../generated/prisma-client';
import { COMMENT_FRAGMENT } from '../../../fragment';

export default {
  Query: {
    seeFullPost: async (_, args) => {
      const { id } = args;
      console.log(id);

      const post = await prisma.post({ id });
      console.log(post);

      const comments = await prisma
        .post({ id })
        .comments()
        .$fragment(COMMENT_FRAGMENT);
      const likeCount = await prisma
        .likesConnection({ where: { post: { id } } })
        .aggregate()
        .count();
      return { post, comments, likeCount };
    },
  },
};
