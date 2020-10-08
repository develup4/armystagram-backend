import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    editUser: (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { username, email, profile } = args;
      const { user } = request;

      return prisma.updateUser({
        where: { id: user.id },
        data: { username, email, profile },
      });
    },
  },
};
