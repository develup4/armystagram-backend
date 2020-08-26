import { prisma } from '../../../../generated/prisma-client';
import { generateToken } from '../../../utils';

export default {
  Mutation: {
    confirmSecret: async (_, args, { request }) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        await prisma.updateUser({
          where: { id: user.id },
          data: { loginSecret: '' },
        }); // confirm이 끝났으면 secret 지우기
        return generateToken(user.id); // 아직 쓰이지않았음
      } else {
        throw Error('Wrong email/secret combination');
      }
    },
  },
};
