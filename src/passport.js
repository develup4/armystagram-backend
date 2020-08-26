import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { prisma } from '../generated/prisma-client';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // request의 bearer토큰을 추출
  secretOrKey: process.env.JWT_SECRET, // generateToken에 쓰인것과 동일
};

const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id });
    if (user !== null) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};

// express의 use때문에 모든 request에서 호출된다
export const authenticateJwt = (req, res, next) =>
  passport.authenticate('jwt', { sessions: false }, (error, user) => {
    // 토큰이 일치해서 유저를 찾았다면(verifyUser성공) 리퀘스트에 유저정보를 싣는다
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);

// 여기서 request마다 토큰을 복호화해서 id를 만들어낸다 - jwtOptions에 쓴대로
// generateToken을 보면 id로 만들고있으니 복호화하면 id이다. env의 같은 secret을 쓰고있다.
// 만들어내서 verifyUser()를 불러준다.
// passport.authenticate에게 찾은 user 전달
passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();
