import { prisma } from '../../../generated/prisma-client';

export default {
  User: {
    posts: ({ id }) => prisma.user({ id }).posts(),
    following: ({ id }) => prisma.user({ id }).following(),
    followers: ({ id }) => prisma.user({ id }).followers(),
    likes: ({ id }) => prisma.user({ id }).likes(),
    comments: ({ id }) => prisma.user({ id }).comments(),
    followingCount: ({ id }) =>
      prisma
        .usersConnection({ where: { followers_some: { id } } })
        .aggregate()
        .count(),
    followersCount: ({ id }) =>
      prisma
        .usersConnection({ where: { following_none: { id } } })
        .aggregate()
        .count(),
    fullName: (parent) => {
      return `${parent.firstName} ${parent.lastName}`;
    },
    isFollowing: async (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent; // parent에서 id를 가져와서 parentId라는 곳에 넣는 의미라고 한다(이해...)

      return await prisma.$exists.user({
        AND: [{ id: parentId }, { followers_some: { id: user.id } }], // followers_some 팔로워중에 something
      });
    },
    itsMe: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId; // user(request를 통해 요청하는 사람)과 찾은 User(parent)가 같은가
    },
  },
};
