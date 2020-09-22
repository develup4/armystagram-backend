import { generateSecret, sendSecretMail } from '../../../utils';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;
      const Secret = generateSecret();
      try {
        await sendSecretMail(email, Secret);
        await prisma.updateUser({ data: { Secret }, where: { email } });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
