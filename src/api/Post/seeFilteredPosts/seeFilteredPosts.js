import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    seeFilteredPosts: async (_, args, { request, isAuthenticated }) => {
      const { all, popular, liked, follower, member, memberName } = args;
      console.log(
        `QUERY seeFilteredPosts [all: ${all}, popular: ${popular}, liked: ${liked}, follower: ${follower}, member: ${member}]`
      );

      // All case
      if (all === true) {
        return prisma.posts({
          orderBy: 'createdAt_DESC',
        });
      }

      // Member case
      if (member === true) {
        if (memberName === 'BTS') {
          return await prisma.posts({
            where: { user: { isMember: true } },
            orderBy: 'createdAt_DESC',
          });
        } else {
          const a = await prisma.posts({
            where: {
              AND: [
                { user: { username: memberName } },
                { user: { isMember: true } },
              ],
            },
            orderBy: 'createdAt_DESC',
          });
          console.log(a);
          return a;
        }
      }

      let conditions = [];

      // Get popular posts first
      if (popular === true) {
        const popularPosts = await prisma.posts({
          orderBy: 'likeCount_DESC',
          first: 2,
        });

        if (liked === false && follower === false) {
          return popularPosts;
        }

        conditions.push({
          id_in: [...popularPosts.map((post) => post.id)],
        });
      }

      // Need to login(Like or Follower)
      isAuthenticated(request);
      const { user } = request;

      if (liked === true) {
        conditions.push({
          likes_some: {
            user: { id: user.id },
          },
        });
      }

      if (follower === true) {
        const following = await prisma.user({ id: user.id }).following();
        conditions.push({
          user: {
            id_in: [...following.map((user) => user.id), user.id],
          },
        });
      }

      console.log(conditions);

      return await prisma.posts({
        where: {
          OR: conditions,
        },
        orderBy: 'createdAt_DESC',
      });
    },
  },
};

// TODO : load (start ~ end)
