import { prisma } from '../../../../generated/prisma-client';
import { generateSecret, sendSecretMail } from '../../../utils';

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, email, password } = args;
      console.log(`SignUp attempt ${username} ${email} ${password}`);

      // Check exist
      const exists = await prisma.$exists.user({
        OR: [{ username }, { email }],
      });

      if (exists) {
        return '닉네임 혹은 이메일이 중복되었어요 ㅠ';
      }

      // Create User
      await prisma.createUser({
        username,
        email,
        password,
      });

      // Make secret
      const Secret = generateSecret();
      console.log(`Generated secret : ${Secret}`);

      try {
        await sendSecretMail(email, Secret);
        console.log(`Send secret mail to ${email}`);

        await prisma.updateUser({ data: { Secret }, where: { email } });
        return 'SUCCESS';
      } catch (e) {
        return e;
      }
    },
  },
};
