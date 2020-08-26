import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    // searchUser는 token으로 인증절차를 하지않아도 된다고 생각 => (request 뺐음)
    searchUser: async (_, args) =>
      prisma.users({
        where: {
          OR: [
            { username_contains: args.term },
            { firstName_contains: args.term },
            { lastName_contains: args.term },
          ],
        },
      }),
  },
};
