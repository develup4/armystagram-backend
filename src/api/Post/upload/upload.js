import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    upload: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { caption, files, hashtags } = args;
      console.log(
        `MUTATION upload [user: ${user.username} caption: ${caption} fileCount: ${files.length}]`
      );

      const post = await prisma.createPost({
        caption,
        user: { connect: { id: user.id } },
      });

      files.forEach(
        async (file) =>
          await prisma.createFile({
            url: file,
            post: {
              connect: {
                id: post.id,
              },
            },
          })
      );

      hashtags.forEach(
        async (hashtag) =>
          await prisma.createHashtag({
            text: hashtag,
            post: {
              connect: {
                id: post.id,
              },
            },
          })
      );
      return post;
    },
  },
};
