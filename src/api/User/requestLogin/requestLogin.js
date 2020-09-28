import { prisma } from '../../../../generated/prisma-client';
import { generateToken } from '../../../utils';

export default {
  Mutation: {
    requestLogin: async (_, args) => {
      const { email, password } = args;
      console.log(`Login attempt ${email} ${password}`);

      const user = await prisma.user({ email });
      console.log('Find user for login');
      console.log(user);

      if (user && user !== undefined && user.password === password) {
        const token = generateToken(user.id);
        console.log(`Generated token : ${token}`);
        return token;
      } else {
        return '';
      }
    },
  },
};
